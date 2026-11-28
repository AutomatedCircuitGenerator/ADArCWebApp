"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHT30 = void 0;
const controller_1 = require("@controllers/controller");
const SHT30_ADDR = 0x44;
class SHT30 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.commandBuffer = [];
        this.readBuffer = [];
        this.readIndex = 0;
        this.temperatureC = 25.0;
        this.humidityRH = 50.0;
    }
    setup() {
        this.pins.sda[0].twi.registerController(SHT30_ADDR, this);
    }
    update(state) {
        this.temperatureC = Math.min(125, Math.max(-40, state.temperature));
        this.humidityRH = Math.min(100, Math.max(0, state.humidity));
    }
    i2cConnect(addr, _write) {
        return addr === SHT30_ADDR;
    }
    i2cDisconnect() {
        this.commandBuffer = [];
        this.readIndex = 0;
    }
    i2cWriteByte(value) {
        this.commandBuffer.push(value);
        if (this.commandBuffer.length === 2) {
            const [msb, lsb] = this.commandBuffer;
            this.commandBuffer = [];
            this.handleCommand(msb, lsb);
        }
        return true;
    }
    i2cReadByte(acked) {
        if (this.readIndex >= this.readBuffer.length)
            return 0xff;
        const byte = this.readBuffer[this.readIndex++];
        if (!acked)
            this.readIndex = 0;
        return byte;
    }
    handleCommand(msb, lsb) {
        const validCommands = [
            [0x2C, 0x06],
            [0x2C, 0x0D],
            [0x2C, 0x10],
            [0x24, 0x00],
            [0x24, 0x0B],
            [0x24, 0x16],
        ];
        for (const [cmdMSB, cmdLSB] of validCommands) {
            if (msb === cmdMSB && lsb === cmdLSB) {
                this.performMeasurement(msb, lsb);
                return;
            }
        }
    }
    performMeasurement(msb, lsb) {
        let temp = this.temperatureC;
        let hum = this.humidityRH;
        if (msb === 0x2C || msb === 0x24) {
            switch (lsb) {
                case 0x06:
                case 0x00:
                    temp += this.rand(-0.05, 0.05);
                    hum += this.rand(-0.2, 0.2);
                    break;
                case 0x0D:
                case 0x0B:
                    temp += this.rand(-0.1, 0.1);
                    hum += this.rand(-0.5, 0.5);
                    break;
                case 0x10:
                case 0x16:
                    temp += this.rand(-0.2, 0.2);
                    hum += this.rand(-1.0, 1.0);
                    break;
            }
        }
        hum = Math.max(0, Math.min(100, hum));
        const tempRaw = Math.round((temp + 45) * (0xFFFF / 175));
        const humRaw = Math.round(hum * 0xFFFF / 100.0);
        const tMSB = (tempRaw >> 8) & 0xff;
        const tLSB = tempRaw & 0xff;
        const hMSB = (humRaw >> 8) & 0xff;
        const hLSB = humRaw & 0xff;
        const tCRC = this.crc8(tMSB, tLSB);
        const hCRC = this.crc8(hMSB, hLSB);
        this.readBuffer = [
            tMSB, tLSB, tCRC,
            hMSB, hLSB, hCRC,
        ];
        this.readIndex = 0;
    }
    crc8(msb, lsb) {
        let crc = 0xff;
        crc ^= msb;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
            crc &= 0xff;
        }
        crc ^= lsb;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
            crc &= 0xff;
        }
        return crc;
    }
    rand(min, max) {
        return min + Math.random() * (max - min);
    }
}
exports.SHT30 = SHT30;
//# sourceMappingURL=sht30.js.map