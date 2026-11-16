"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADXL345I2C = exports.ADXL345_ADDR = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const memory_1 = require("@controllers/memory");
exports.ADXL345_ADDR = 0x53;
const REGISTERS = {
    DEVID: { address: 0x00, size: 1 },
    THRESH_TAP: { address: 0x1D, size: 1 },
    OFSX: { address: 0x1E, size: 1 },
    OFSY: { address: 0x1F, size: 1 },
    OFSZ: { address: 0x20, size: 1 },
    DUR: { address: 0X21, size: 1 },
    LATENT: { address: 0x22, size: 1 },
    WINDOW: { address: 0x23, size: 1 },
    THRESH_ACT: { address: 0x24, size: 1 },
    THRES_INACT: { address: 0x25, size: 1 },
    TIME_INACT: { address: 0x26, size: 1 },
    ACT_INACT_CTL: { address: 0x27, size: 1 },
    THRESH_FF: { address: 0x28, size: 1 },
    TIME_FF: { address: 0x29, size: 1 },
    TAP_AXES: { address: 0x2A, size: 1 },
    ACT_TAP_STATUS: { address: 0x2B, size: 1 },
    BW_RATE: { address: 0x2C, size: 1 },
    POWER_CTL: { address: 0x2D, size: 1 },
    INT_ENABLE: { address: 0x2E, size: 1 },
    INT_MAP: { address: 0x2F, size: 1 },
    INT_SOURCE: { address: 0x30, size: 1 },
    DATA_FORMAT: { address: 0x31, size: 1 },
    DATAX: { address: 0x32, size: 2 },
    DATAY: { address: 0x34, size: 2 },
    DATAZ: { address: 0x36, size: 2 },
    FIFO_CTL: { address: 0x38, size: 1 },
    FIFO_STATUS: { address: 0x39, size: 1 },
};
class ADXL345I2C extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.address = null;
        this.memory = new memory_1.Memory(128);
    }
    update(state) {
        this.setMotion(state.motion === "Constant Acceleration");
    }
    setMotion(moving) {
        if (moving) {
            this.setAccel(1, 1, 1);
        }
        else {
            this.setAccel(0, 1, 0);
        }
    }
    setAccel(x, y, z) {
        this.setRegister("DATAX", x);
        this.setRegister("DATAY", y);
        this.setRegister("DATAZ", z);
    }
    setup() {
        execute_1.AVRRunner.getInstance().board.twis[0].registerController(this.id, this);
        this.address = null;
        this.setRegister("DEVID", 0xE5);
        this.setRegister("BW_RATE", 0xA);
        this.setRegister("INT_SOURCE", 0x2);
    }
    setRegister(register, value) {
        this.memory.write(REGISTERS[register], value);
    }
    i2cConnect(addr, write) {
        return true;
    }
    i2cDisconnect() {
    }
    i2cReadByte(acked) {
        let byte;
        if (this.address !== null) {
            byte = this.memory[this.address];
        }
        else {
            byte = 0xff;
        }
        this.address = acked ? (this.address + 1) % this.memory.size : null;
        return byte;
    }
    i2cWriteByte(value) {
        if (this.address !== null) {
            this.memory[this.address] = value;
            this.address = null;
        }
        else {
            this.address = value;
        }
        return true;
    }
}
exports.ADXL345I2C = ADXL345I2C;
//# sourceMappingURL=adxl345i2c.js.map