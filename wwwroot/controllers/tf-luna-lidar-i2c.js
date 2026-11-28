"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFLunaLidarI2C = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const memory_1 = require("@controllers/memory");
const TF_LUNA_LIDAR_ADDR = 0x10;
const REGISTERS = {
    DIST: { address: 0x00, size: 2 },
    FLUX: { address: 0x02, size: 2 },
    TEMP: { address: 0x04, size: 2 },
    TICK: { address: 0x06, size: 2 },
    ERROR: { address: 0x08, size: 2 },
};
class TFLunaLidarI2C extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.address = null;
        this.memory = new memory_1.Memory(128);
    }
    update(state) {
        this.setRegister("DIST", state.distance);
    }
    setRegister(register, value) {
        this.memory.write(REGISTERS[register], value);
    }
    setup() {
        execute_1.AVRRunner.getInstance().board.twis[0].registerController(this.id, this);
        this.address = null;
        this.startTime = Date.now();
        this.setRegister("FLUX", 200);
        this.setRegister("TEMP", 2500);
    }
    i2cConnect(addr, write) {
        return true;
    }
    i2cDisconnect() {
    }
    i2cReadByte(acked) {
        this.updateTime();
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
    updateTime() {
        const elapsedTime = Date.now() - this.startTime;
        this.setRegister("TICK", elapsedTime);
    }
}
exports.TFLunaLidarI2C = TFLunaLidarI2C;
//# sourceMappingURL=tf-luna-lidar-i2c.js.map