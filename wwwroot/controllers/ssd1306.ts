import { I2CController } from "@lib/i2c-bus";
import { Controller } from "@controllers/controller";

export class SSD1306 extends Controller implements I2CController {
    
    private updated = true;
    private buffer = new Uint8Array(128 * 64);
    private mode: "command" | "data" = "command";
    private expectingControlByte = true;
    private powered = false;
    private currentCommand = -1;
    private commandBytesRemaining = 0;
    private pageStart = 0;
    private pageEnd = 7;
    private columnStart = 0;
    private columnEnd = 127;
    private currentColumn = 0;
    private currentPage = 0;
    private displayOn = true;
    private inverted = false;
    private entireDisplayOn = false;
    private addressingMode = 2;
    private contrast = 0x7F;
    private multiplex = 63;
    private segmentRemap = false;
    private displayOffset = 0;      // D3
    private chargePump = 0x14;      // 8D
    private chargePumpEnabled = true;
    private comPinsConfig = 0x12;   // DA
    private displayClock = 0x80;    // D5
    private precharge = 0xF1;       // D9
    private vcomh = 0x40;           // DB
    private comScanDirection = false;
    private displayStartLine = 0;
    private comScanReverse = false;
    private scrollDirection = 0;   // 1=right -1=left
    private scrollStartPage = 0;
    private scrollEndPage = 7;
    private scrollInterval = 0;
    private scrollEnabled = false;
    private scrollOffset = 0;
    private scrollTimer: number | null = null;

    setup() {
        console.log("SSD1306 setup");
        this.powered = true;
        this.buffer.fill(0);
        this.expectingControlByte = true;
        this.mode = "command";
        this.currentCommand = -1;
        this.commandBytesRemaining = 0;
        this.columnStart = 0;
        this.columnEnd = 127;
        this.pageStart = 0;
        this.pageEnd = 7;
        this.currentColumn = 0;
        this.currentPage = 0;
        this.displayOn = true;
        this.inverted = false;
        this.pins.scl[0].twi.registerController(0x3C, this);
        console.log("registered");
        this.render();
        this.reset();
    }

    cleanup() {
        console.log("SSD1306 cleanup");
        this.powered = false;
        this.buffer.fill(0);
        this.expectingControlByte = true;
        this.mode = "command";
        this.currentCommand = -1;
        this.commandBytesRemaining = 0;
        this.displayOn = true;
        this.inverted = false;
        this.currentColumn = 0;
        this.currentPage = 0;
        this.render();
        this.reset();
        if(this.scrollTimer != null){
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
        }
    }

    private reset() {
        this.addressingMode = 0;
        this.columnStart = 0;
        this.columnEnd = 127;
        this.pageStart = 0;
        this.pageEnd = 7;
        this.segmentRemap = false;
        this.comScanDirection = false;
        this.displayOffset = 0;
        this.displayClock = 0x80;
        this.chargePump = 0x14;
        this.precharge = 0xF1;
        this.vcomh = 0x40;
        this.comPinsConfig = 0x12;
        this.contrast = 0xCF;
        this.displayOn = true;
        this.inverted = false;
        this.entireDisplayOn = false;
        this.multiplex = 63;
        this.scrollOffset = 0;
        this.scrollEnabled = false;
        this.scrollDirection = 1;
        this.scrollStartPage = 0;
        this.scrollEndPage = 7;
        this.scrollInterval = 0;
    }

    update() {
        if (this.updated) {
            this.render();
            this.updated = false;
        }
    }

    render() {
        const pixels = this.element.querySelector("#oledPixels");
        let litPixels = 0;
        if (!this.powered || !this.displayOn) {
            pixels.innerHTML = "";
            return;
        }

        if (!pixels) {
            return;
        }

        pixels.innerHTML = "";

        for(let page=0; page<8; page++) {
            for(let x=0; x<128; x++) {
                const b = this.buffer[page * 128 + x];
                for(let bit=0; bit<8; bit++) {
                    let pixelOn = this.entireDisplayOn || (b & (1 << bit)) !== 0;
                    if (this.inverted) {
                        pixelOn = !pixelOn;
                    }
                    if(pixelOn) {
                        litPixels++;
                        const logicalY = (page * 8 + bit + this.displayStartLine) % 64;
                        const y = (logicalY + this.displayOffset) % 64;
                        const pixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        // The SVG coordinate direction is opposite to the SSD1306 SEG direction.
                        // Therefore, A1 (Segment Remap) corresponds to no flipping in SVG,
                        // while A0 corresponds to horizontal flipping in SVG.
                        let drawX = this.segmentRemap ? 127 - x : x;
                        const drawY = this.comScanReverse ? 63 - y : y;
                        if(this.scrollEnabled && page >= this.scrollStartPage && page <= this.scrollEndPage){
                            drawX = (drawX + this.scrollOffset + 128) % 128;
                        }
                        pixel.setAttribute("x", (625 + drawX * 2.82).toString());
                        pixel.setAttribute("y", (355 + drawY * 3.0).toString());
                        pixel.setAttribute("width", "2.82");
                        pixel.setAttribute("height", "3");
                        pixel.setAttribute("fill", "white");
                        pixels.appendChild(pixel);
                    }
                }
            }
        }
        console.log("litPixels =", litPixels);
    }

    i2cConnect() {
        console.log("I2C CONNECT");
        this.expectingControlByte = true;
        return true;
    }

    i2cDisconnect() {
        console.log("I2C DISCONNECT");
        this.render();
        return true;
    }

    i2cReadByte(): number {
        return 0xFF;
    }

    i2cWriteByte(value: number) {
        console.log("RAW BYTE =", value.toString(16));
        if (this.expectingControlByte) {
            this.expectingControlByte = false;
            const dc = (value & 0x40) !== 0;
            this.mode = dc ? "data" : "command";
            console.log("CONTROL =", value.toString(16), "mode =", this.mode);
            return true;
        }

        if(this.mode === "data") {
            const index = this.currentPage * 128 + this.currentColumn;
            if(index>=0 && index<1024){
                this.buffer[index]=value;
            }
            
            switch(this.addressingMode) {
                case 0:     // Horizontal
                    this.currentColumn++;
                    if (this.currentColumn > this.columnEnd) {
                        this.currentColumn = this.columnStart;
                        this.currentPage++;
                        if (this.currentPage > this.pageEnd) {
                            this.currentPage = this.pageStart;
                        }
                    }
                    break;

                case 1:     // Vertical
                    this.currentPage++;
                    if (this.currentPage > this.pageEnd) {
                        this.currentPage = this.pageStart;
                        this.currentColumn++;
                        if (this.currentColumn > this.columnEnd) {
                            this.currentColumn = this.columnStart;
                        }
                    }
                    break;

                case 2:     // Page
                    this.currentColumn++;
                    if (this.currentColumn > this.columnEnd) {
                        this.currentColumn = this.columnStart;
                    }
                    break;
            }
        }

        if (this.mode === "command") {
            console.log("COMMAND:", "0x" + value.toString(16).padStart(2, "0"));
            if (this.commandBytesRemaining > 0) {
                this.handleCommandParameter(value);
                return true;
            }

            // Set Lower Column Start Address for Page Addressing Mode
            if (value >= 0x00 && value <= 0x0F) {
                this.currentColumn = (this.currentColumn & 0xF0) | (value & 0x0F);
                console.log("Lower Column ->", this.currentColumn);
                return true;
            }

            // Set Higher Column Start Address for Page Addressing Mode
            if (value >= 0x10 && value <= 0x1F) {
                this.currentColumn = (this.currentColumn & 0x0F) | ((value & 0x0F) << 4);
                console.log("Higher Column ->", this.currentColumn);
                return true;
            }

            // Set Page Start Address
            if (value >= 0xB0 && value <= 0xB7) {
                this.currentPage = value & 0x07;
                console.log("Page Start ->", this.currentPage);
                return true;
            }

            // Set Display Start Line
            if ((value & 0xC0) === 0x40) {
                this.displayStartLine = value & 0x3F;
                this.render();
                return true;
            }

            switch(value) {
                case 0x21:      // COLUMNADDR
                    this.currentCommand = 0x21;
                    this.commandBytesRemaining = 2;
                    break;

                case 0x22:      // PAGEADDR
                    this.currentCommand = 0x22;
                    this.commandBytesRemaining = 2;
                    break;

                case 0xAE:      // display off
                    this.displayOn = false;
                    this.render();
                    break;

                case 0xAF:      // display on
                    this.displayOn = true;
                    this.render();
                    break;

                case 0xA6:      // normal display
                    this.inverted = false;
                    this.render();
                    break;

                case 0xA7:     // inverse display
                    this.inverted = true;
                    this.render();
                    break;

                case 0xA4:     // entire display off
                    this.entireDisplayOn = false;
                    this.render();
                    break;

                case 0xA5:     // entire display on
                    this.entireDisplayOn = true;
                    this.render();
                    break;

                case 0x20:      // Memory Addressing Mode
                    this.currentCommand = 0x20;
                    this.commandBytesRemaining = 1;
                    break;

                case 0x81:     // Contrast Control
                    this.currentCommand = 0x81;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xA8:
                    this.currentCommand = 0xA8;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xA0:
                    this.segmentRemap = true;
                    console.log("Segment Remap: Mirrored");
                    this.render();
                    break;

                case 0xA1:     // default value : normal
                    this.segmentRemap = false;
                    console.log("Segment Remap: Normal");
                    this.render();
                    break;

                case 0xD3:
                    this.currentCommand = 0xD3;
                    this.commandBytesRemaining = 1;
                    break;

                case 0x8D:
                    this.currentCommand = 0x8D;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xDA:
                    this.currentCommand = 0xDA;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xD5:
                    this.currentCommand = 0xD5;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xD9:
                    this.currentCommand = 0xD9;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xDB:
                    this.currentCommand = 0xDB;
                    this.commandBytesRemaining = 1;
                    break;

                case 0xC0:
                    this.comScanReverse = true;
                    this.render();
                    break;

                case 0xC8:     // default value : normal
                    this.comScanReverse = false;
                    this.render();
                    break;

                case 0xE3:
                    console.log("NOP");
                    break;

                case 0x26:
                    this.currentCommand = 0x26;
                    this.commandBytesRemaining = 6;
                    break;

                case 0x27:
                    this.currentCommand = 0x27;
                    this.commandBytesRemaining = 6;
                    break;

                case 0x2E:
                    this.scrollEnabled = false;
                    console.log("Scroll Deactivated");
                    if(this.scrollTimer!=null){
                        clearInterval(this.scrollTimer);
                        this.scrollTimer=null;
                    }
                    this.render();
                    break;

                case 0x2F:
                    this.scrollEnabled = true;
                    console.log("Scroll Activated");
                    this.startScroll();
                    break;

                default:
                    console.warn("Unhandled SSD1306 command:", "0x" + value.toString(16).padStart(2, "0"));
                    break;
            }
            return true;
        }
        return true;
    }

    private handleCommandParameter(value: number) {

        switch(this.currentCommand) {

            case 0x20:
                this.addressingMode = Math.min(value & 0x03, 2);
                console.log("Addressing Mode =", this.addressingMode);
                break;

            case 0x21:
                if(this.commandBytesRemaining === 2) {
                    this.columnStart = value;
                } else {
                    this.columnEnd = value;
                    this.currentColumn = this.columnStart;
                    console.log("COLUMN", this.columnStart, this.columnEnd);
                }
                break;

            case 0x22:
                if(this.commandBytesRemaining === 2) {
                    this.pageStart = value & 0x07;
                } else {
                    this.pageEnd   = value & 0x07;
                    this.currentPage = this.pageStart;
                    console.log("PAGE", this.pageStart, this.pageEnd);
                }
                break;

            case 0x81:
                this.contrast = value;
                console.log("Contrast =", value);
                break;

            case 0xA8:
                this.multiplex = Math.max(0x0F, Math.min(value, 0x3F));
                console.log("Multiplex =", value + 1, "rows");
                break;

            case 0xD3:
                this.displayOffset = value & 0x3F;
                break;

            case 0x8D:
                this.chargePump = value;
                this.chargePumpEnabled = (value & 0x14) === 0x14;
                console.log("Charge Pump =", value.toString(16));
                break;

            case 0xDA:
                this.comPinsConfig = value;
                console.log("COM Pins =", value.toString(16));
                break;

            case 0xD5:
                this.displayClock = value;
                console.log("Display Clock =", value);
                break;

            case 0xD9:
                this.precharge = value;
                console.log("Precharge =", value);
                break;

            case 0xDB:
                this.vcomh = value;
                console.log("VCOMH =", value.toString(16));
                break;

                // scroll
            case 0x26:    
            case 0x27:
                switch(this.commandBytesRemaining){

                    case 6:
                        // dummy
                        break;

                    case 5:
                        this.scrollStartPage = value & 0x07;
                        break;

                    case 4:
                        this.scrollInterval = value;
                        break;

                    case 3:
                        this.scrollEndPage = value & 0x07;
                        break;

                    case 2:
                        // dummy
                        break;

                    case 1:
                        // dummy
                        this.scrollDirection = (this.currentCommand == 0x26) ? 1 : -1;
                        console.log("Horizontal Scroll", this.scrollDirection == 1 ? "Right":"Left", "Pages", this.scrollStartPage, "-", this.scrollEndPage, "Interval", this.scrollInterval);
                        break;
                }
                console.log("Scroll:", this.scrollStartPage, this.scrollEndPage, this.scrollInterval);

                break;
        }

        this.commandBytesRemaining--;

        if(this.commandBytesRemaining === 0) {
            this.currentCommand = -1;
        }
    }

    private startScroll() {
        if(this.scrollTimer != null) {
            clearInterval(this.scrollTimer);
        }
        this.scrollTimer = window.setInterval(()=>{
            if(!this.scrollEnabled) return;
            if(this.scrollDirection > 0) {
                this.scrollOffset++;
            } else {
                this.scrollOffset--;
            }
            this.render();
            },50);
    }

    display() {
        this.render();
    }
}