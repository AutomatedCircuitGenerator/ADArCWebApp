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
        this.pins.scl[0].twi.registerController(0x3C, this);
        console.log("registered");
        this.render();
    }

    cleanup() {
        console.log("SSD1306 cleanup");
        this.powered = false;
        this.buffer.fill(0);
        this.expectingControlByte = true;
        this.mode = "command";
        this.currentCommand = -1;
        this.commandBytesRemaining = 0;
        this.render();
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
        if (!this.powered) {
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
                    if(b & (1 << bit)) {
                        litPixels++;
                        const y = page * 8 + bit;
                        const pixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                        pixel.setAttribute("x", (625 + x * 2.82).toString());
                        pixel.setAttribute("y", (355 + y * 3.0).toString());
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
        console.log("byte =", value.toString(16), "expectControl =", this.expectingControlByte, "mode =", this.mode);
        if(this.expectingControlByte) {
            this.expectingControlByte = false;
            if(value === 0x40) {
                this.mode = "data";
            }
            else {
                this.mode = "command";
            }
            return true;
        }

        if(this.mode === "data") {
            const index = this.currentPage * 128 + this.currentColumn;
            if(index>=0 && index<1024){
                this.buffer[index]=value;
            }
            this.currentColumn++;
            if(this.currentColumn>this.columnEnd){
                this.currentColumn=this.columnStart;
                this.currentPage++;
                if(this.currentPage>this.pageEnd){
                    this.currentPage=this.pageStart;
                }
            }
        }

        if (this.mode === "command") {
            if (this.commandBytesRemaining > 0) {
                this.handleCommandParameter(value);
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

                default:
                    break;
            }
            return true;
        }
        return true;
    }

    private handleCommandParameter(value:number){
        if(this.currentCommand===0x21){
            if(this.commandBytesRemaining===2){
                this.columnStart=value;
            }
            else{
                this.columnEnd=value;
                this.currentColumn=this.columnStart;
            }
        }

        if(this.currentCommand===0x22){
            if(this.commandBytesRemaining===2){
                this.pageStart=value;
            }
            else{
                this.pageEnd=value;
                this.currentPage=this.pageStart;
            }
        }

        this.commandBytesRemaining--;
        if(this.commandBytesRemaining===0){
            this.currentCommand=-1;
        }
    }

    display() {
        this.render();
    }
}