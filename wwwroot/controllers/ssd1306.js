"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSD1306 = void 0;
const controller_1 = require("@controllers/controller");
class SSD1306 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.updated = true;
        this.buffer = new Uint8Array(128 * 64);
        this.mode = "command";
        this.expectingControlByte = true;
        this.powered = false;
        this.currentCommand = -1;
        this.commandBytesRemaining = 0;
        this.pageStart = 0;
        this.pageEnd = 7;
        this.columnStart = 0;
        this.columnEnd = 127;
        this.currentColumn = 0;
        this.currentPage = 0;
        this.displayOn = true;
        this.inverted = false;
        this.entireDisplayOn = false;
        this.addressingMode = 2;
        this.contrast = 0x7F;
        this.multiplex = 63;
        this.segmentRemap = false;
        this.displayOffset = 0;
        this.chargePump = 0x14;
        this.chargePumpEnabled = true;
        this.comPinsConfig = 0x12;
        this.displayClock = 0x80;
        this.precharge = 0xF1;
        this.vcomh = 0x40;
        this.comScanDirection = false;
        this.displayStartLine = 0;
        this.comScanReverse = false;
        this.scrollDirection = 0;
        this.scrollStartPage = 0;
        this.scrollEndPage = 7;
        this.scrollEnabled = false;
        this.scrollOffset = 0;
        this.scrollTimer = null;
        this.verticalScrollTopFixed = 0;
        this.verticalScrollRows = 64;
        this.scrollVerticalOffset = 0;
        this.scrollUseVertical = false;
        this.pixelColor = "#BFEFFF";
        this.frameIntervals = [5, 64, 128, 256, 3, 4, 25, 2,];
        this.scrollFrameCode = 0;
    }
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
        if (this.scrollTimer != null) {
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
        }
    }
    reset() {
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
        this.verticalScrollTopFixed = 0;
        this.verticalScrollRows = 64;
        this.scrollVerticalOffset = 0;
        this.scrollUseVertical = false;
        this.pixelColor = "#BFEFFF";
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
        for (let page = 0; page < 8; page++) {
            for (let x = 0; x < 128; x++) {
                const b = this.buffer[page * 128 + x];
                for (let bit = 0; bit < 8; bit++) {
                    let pixelOn = this.entireDisplayOn || (b & (1 << bit)) !== 0;
                    if (this.inverted) {
                        pixelOn = !pixelOn;
                    }
                    if (pixelOn) {
                        litPixels++;
                        let logicalY = page * 8 + bit;
                        logicalY = (logicalY + this.displayStartLine) % 64;
                        logicalY = (logicalY + this.displayOffset) % 64;
                        if (this.scrollEnabled && this.scrollUseVertical) {
                            const top = this.verticalScrollTopFixed;
                            const rows = this.verticalScrollRows;
                            if (logicalY >= top && logicalY < top + rows) {
                                let localY = logicalY - top;
                                localY = (localY + this.scrollOffset * this.scrollVerticalOffset + rows) % rows;
                                logicalY = top + localY;
                            }
                        }
                        const pixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        let drawX = this.segmentRemap ? 127 - x : x;
                        const drawY = this.comScanReverse ? 63 - logicalY : logicalY;
                        const currentPage = logicalY >> 3;
                        if (this.scrollEnabled && currentPage >= this.scrollStartPage &&
                            currentPage <= this.scrollEndPage) {
                            drawX = (drawX + this.scrollOffset + 128) % 128;
                        }
                        pixel.setAttribute("x", (625 + drawX * 2.82).toString());
                        pixel.setAttribute("y", (355 + drawY * 3.0).toString());
                        pixel.setAttribute("width", "2.82");
                        pixel.setAttribute("height", "3");
                        pixel.setAttribute("fill", this.pixelColor);
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
    i2cReadByte() {
        return 0xFF;
    }
    i2cWriteByte(value) {
        console.log("RAW BYTE =", value.toString(16));
        if (this.expectingControlByte) {
            this.expectingControlByte = false;
            const dc = (value & 0x40) !== 0;
            this.mode = dc ? "data" : "command";
            console.log("CONTROL =", value.toString(16), "mode =", this.mode);
            return true;
        }
        if (this.mode === "data") {
            const index = this.currentPage * 128 + this.currentColumn;
            if (index >= 0 && index < 1024) {
                this.buffer[index] = value;
            }
            switch (this.addressingMode) {
                case 0:
                    this.currentColumn++;
                    if (this.currentColumn > this.columnEnd) {
                        this.currentColumn = this.columnStart;
                        this.currentPage++;
                        if (this.currentPage > this.pageEnd) {
                            this.currentPage = this.pageStart;
                        }
                    }
                    break;
                case 1:
                    this.currentPage++;
                    if (this.currentPage > this.pageEnd) {
                        this.currentPage = this.pageStart;
                        this.currentColumn++;
                        if (this.currentColumn > this.columnEnd) {
                            this.currentColumn = this.columnStart;
                        }
                    }
                    break;
                case 2:
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
            if (value >= 0x00 && value <= 0x0F) {
                this.currentColumn = (this.currentColumn & 0xF0) | (value & 0x0F);
                console.log("Lower Column ->", this.currentColumn);
                return true;
            }
            if (value >= 0x10 && value <= 0x1F) {
                this.currentColumn = (this.currentColumn & 0x0F) | ((value & 0x0F) << 4);
                console.log("Higher Column ->", this.currentColumn);
                return true;
            }
            if (value >= 0xB0 && value <= 0xB7) {
                this.currentPage = value & 0x07;
                console.log("Page Start ->", this.currentPage);
                return true;
            }
            if ((value & 0xC0) === 0x40) {
                this.displayStartLine = value & 0x3F;
                this.render();
                return true;
            }
            switch (value) {
                case 0x21:
                    this.currentCommand = 0x21;
                    this.commandBytesRemaining = 2;
                    break;
                case 0x22:
                    this.currentCommand = 0x22;
                    this.commandBytesRemaining = 2;
                    break;
                case 0xAE:
                    this.displayOn = false;
                    this.render();
                    break;
                case 0xAF:
                    this.displayOn = true;
                    this.render();
                    break;
                case 0xA6:
                    this.inverted = false;
                    this.render();
                    break;
                case 0xA7:
                    this.inverted = true;
                    this.render();
                    break;
                case 0xA4:
                    this.entireDisplayOn = false;
                    this.render();
                    break;
                case 0xA5:
                    this.entireDisplayOn = true;
                    this.render();
                    break;
                case 0x20:
                    this.currentCommand = 0x20;
                    this.commandBytesRemaining = 1;
                    break;
                case 0x81:
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
                case 0xA1:
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
                case 0xC8:
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
                    if (this.scrollTimer != null) {
                        clearInterval(this.scrollTimer);
                        this.scrollTimer = null;
                    }
                    this.render();
                    break;
                case 0x2F:
                    this.scrollEnabled = true;
                    console.log("Scroll Activated");
                    this.startScroll();
                    break;
                case 0xA3:
                    this.currentCommand = 0xA3;
                    this.commandBytesRemaining = 2;
                    break;
                case 0x29:
                    this.scrollDirection = 1;
                    this.scrollUseVertical = true;
                    this.currentCommand = 0x29;
                    this.commandBytesRemaining = 5;
                    break;
                case 0x2A:
                    this.scrollDirection = -1;
                    this.scrollUseVertical = true;
                    this.currentCommand = 0x2A;
                    this.commandBytesRemaining = 5;
                    break;
                default:
                    console.warn("Unhandled SSD1306 command:", "0x" + value.toString(16).padStart(2, "0"));
                    break;
            }
            return true;
        }
        return true;
    }
    handleCommandParameter(value) {
        switch (this.currentCommand) {
            case 0x20:
                this.addressingMode = Math.min(value & 0x03, 2);
                console.log("Addressing Mode =", this.addressingMode);
                break;
            case 0x21:
                if (this.commandBytesRemaining === 2) {
                    this.columnStart = value;
                }
                else {
                    this.columnEnd = value;
                    this.currentColumn = this.columnStart;
                    console.log("COLUMN", this.columnStart, this.columnEnd);
                }
                break;
            case 0x22:
                if (this.commandBytesRemaining === 2) {
                    this.pageStart = value & 0x07;
                }
                else {
                    this.pageEnd = value & 0x07;
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
            case 0x26:
            case 0x27:
                switch (this.commandBytesRemaining) {
                    case 6:
                        break;
                    case 5:
                        this.scrollStartPage = value & 0x07;
                        break;
                    case 4:
                        this.scrollFrameCode = value & 0x07;
                        break;
                    case 3:
                        this.scrollEndPage = value & 0x07;
                        break;
                    case 2:
                        break;
                    case 1:
                        this.scrollDirection = (this.currentCommand == 0x26) ? 1 : -1;
                        console.log("Horizontal Scroll", this.scrollDirection == 1 ? "Right" : "Left", "Pages", this.scrollStartPage, "-", this.scrollEndPage, "Interval", this.scrollFrameCode);
                        break;
                }
                console.log("Scroll:", this.scrollStartPage, this.scrollEndPage, this.scrollFrameCode);
                break;
            case 0xA3:
                if (this.commandBytesRemaining === 2) {
                    this.verticalScrollTopFixed = value;
                }
                else {
                    this.verticalScrollRows = value;
                    console.log("Vertical Scroll Area:", this.verticalScrollTopFixed, this.verticalScrollRows);
                }
                break;
            case 0x29:
            case 0x2A:
                switch (this.commandBytesRemaining) {
                    case 4:
                        this.scrollStartPage = value & 0x07;
                        break;
                    case 3:
                        this.scrollFrameCode = value & 0x07;
                        break;
                    case 2:
                        this.scrollEndPage = value & 0x07;
                        break;
                    case 1:
                        this.scrollVerticalOffset = value & 0x3F;
                        break;
                }
                break;
        }
        this.commandBytesRemaining--;
        if (this.commandBytesRemaining === 0) {
            this.currentCommand = -1;
        }
    }
    startScroll() {
        const frames = this.frameIntervals[this.scrollFrameCode];
        const interval = frames * 10;
        if (this.scrollTimer != null) {
            clearInterval(this.scrollTimer);
        }
        this.scrollTimer = window.setInterval(() => {
            if (!this.scrollEnabled)
                return;
            if (this.scrollDirection > 0) {
                this.scrollOffset++;
            }
            else {
                this.scrollOffset--;
            }
            this.render();
        }, interval);
        console.log("FrameCode =", this.scrollFrameCode, "Interval =", interval);
    }
    display() {
        this.render();
    }
}
exports.SSD1306 = SSD1306;
//# sourceMappingURL=ssd1306.js.map