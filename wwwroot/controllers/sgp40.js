"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SGP40 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
class SGP40 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._vocIndex = 0;
        this._temperature = 25.0;
        this._humidity = 50.0;
        this.writeBuffer = [];
        this.readBuffer = [];
        this.readIndex = 0;
    }
    update(state) {
        if (state.vocIndex !== undefined) {
            this._vocIndex = Math.max(0, Math.round(state.vocIndex));
        }
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }
        if (state.humidity !== undefined) {
            this._humidity = state.humidity;
        }
        this.component.invokeMethodAsync("UpdateState", {
            vocIndex: this._vocIndex,
            temperature: this._temperature,
            humidity: this._humidity
        });
    }
    setup() {
        execute_1.AVRRunner.getInstance().board.twis[0].registerController(0x59, this);
        this.writeBuffer = [];
        this.readBuffer = [];
        this.readIndex = 0;
    }
    cleanup() {
        execute_1.AVRRunner.getInstance().board.twis[0].unregisterController(0x59);
    }
    i2cConnect(addr, write) {
        if (write) {
            this.writeBuffer = [];
        }
        else {
            const command = this.writeBuffer.length >= 2
                ? (this.writeBuffer[0] << 8) | this.writeBuffer[1]
                : 0;
            if (command === 0x280e) {
                this.readBuffer = [0xD4, 0x00, 0xC2];
            }
            else {
                const ticks = Math.max(15000, Math.min(45000, 35000 - (this._vocIndex - 100) * 50));
                this.readBuffer = [(ticks >> 8) & 0xFF, ticks & 0xFF, 0x55];
            }
            this.readIndex = 0;
        }
        return true;
    }
    i2cDisconnect() {
    }
    i2cReadByte(acked) {
        const byte = this.readIndex < this.readBuffer.length
            ? this.readBuffer[this.readIndex]
            : 0xFF;
        if (acked) {
            this.readIndex++;
        }
        else {
            this.readIndex = 0;
        }
        return byte;
    }
    i2cWriteByte(value) {
        this.writeBuffer.push(value);
        return true;
    }
}
exports.SGP40 = SGP40;
//# sourceMappingURL=sgp40.js.map