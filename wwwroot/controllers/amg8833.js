"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMG8833 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
class AMG8833 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._temperature = 25.0;
        this._pixels = [];
        this.readIndex = 0;
    }
    update(state) {
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
            console.log("[AMG8833] Temperature updated to:", this._temperature, "°C");
            this.generatePixelGrid();
        }
    }
    setup() {
        const twi = execute_1.AVRRunner.getInstance().board.twis[0];
        if (twi) {
            twi.registerController(0x69, this);
        }
        this.generatePixelGrid();
    }
    generatePixelGrid() {
        this._pixels = [];
        for (let row = 0; row < 8; row++) {
            const pixelRow = [];
            for (let col = 0; col < 8; col++) {
                const distFromCenter = Math.sqrt(Math.pow(row, 2) + Math.pow(col, 2));
                const variation = distFromCenter * 0.5;
                const pixelTemp = this._temperature - variation;
                pixelRow.push(Math.max(-40, Math.min(80, pixelTemp)));
            }
            this._pixels.push(pixelRow);
        }
    }
    i2cConnect(addr, write) {
        this.readIndex = 0;
        return true;
    }
    i2cDisconnect() {
        this.readIndex = 0;
    }
    i2cReadByte(acked) {
        if (this.readIndex >= 128) {
            return 0xFF;
        }
        const pixelIndex = Math.floor(this.readIndex / 2);
        const row = Math.floor(pixelIndex / 8);
        const col = pixelIndex % 8;
        const temp = this._pixels[row][col];
        let rawValue = Math.round(temp * 4);
        if (rawValue < 0) {
            rawValue = (0x1000 + rawValue) & 0xFFF;
        }
        else {
            rawValue = rawValue & 0xFFF;
        }
        let byteToReturn = 0;
        if (this.readIndex % 2 === 0) {
            byteToReturn = rawValue & 0xFF;
        }
        else {
            byteToReturn = (rawValue >> 8) & 0xFF;
        }
        this.readIndex++;
        return byteToReturn;
    }
    i2cWriteByte(value) {
        return true;
    }
}
exports.AMG8833 = AMG8833;
//# sourceMappingURL=amg8833.js.map