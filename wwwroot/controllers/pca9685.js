"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCA9685 = void 0;
const controller_1 = require("@controllers/controller");
const memory_1 = require("@controllers/memory");
const SERVO_MIN = 150;
const SERVO_MAX = 600;
const REGISTERS = {
    LED0_ON: { address: 0x6, size: 2 },
    LED0_OFF: { address: 0x8, size: 2 },
};
class PCA9685 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.address = null;
        this.memory = new memory_1.Memory(128);
    }
    setup() {
        this.pins.sda[0].twi.registerController(this.id, this);
        this.memory.clear();
        this.address = null;
    }
    i2cConnect(addr, write) {
        return true;
    }
    i2cDisconnect() {
        this.address = null;
    }
    i2cReadByte(acked) {
        let byte;
        if (this.address !== null) {
            byte = this.memory[this.address];
        }
        else {
            byte = 0xff;
        }
        this.address = this.address + 1 % this.memory.size;
        return byte;
    }
    i2cWriteByte(value) {
        if (this.address !== null) {
            this.memory[this.address] = value;
            if (this.address === 0x9) {
                this.renderHorn(this.calculateAngle());
            }
            this.address = this.address + 1 % this.memory.size;
        }
        else {
            this.address = value;
        }
        return true;
    }
    renderHorn(angle) {
        const horn = this.element.querySelector(".horn");
        horn.style.transform = `rotate(${angle}deg)`;
    }
    calculateAngle() {
        const on = this.memory.read(REGISTERS.LED0_ON);
        const off = this.memory.read(REGISTERS.LED0_OFF);
        const pulse = off - on;
        const angle = ((pulse - SERVO_MIN) / (SERVO_MAX - SERVO_MIN)) * 180;
        return Math.max(0, Math.min(180, angle));
    }
}
exports.PCA9685 = PCA9685;
//# sourceMappingURL=pca9685.js.map