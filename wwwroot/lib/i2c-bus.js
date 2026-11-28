"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I2CBus = void 0;
class I2CBus {
    constructor(twi) {
        this.twi = twi;
        this.controllers = {};
        this.activeController = null;
        this.writeMode = false;
        twi.eventHandler = this;
    }
    registerController(addr, device) {
        this.controllers[addr] = device;
    }
    unregisterController(addr) {
        delete this.controllers[addr];
    }
    start() {
        this.twi.completeStart();
    }
    stop() {
        if (this.activeController) {
            this.activeController.i2cDisconnect();
            this.activeController = null;
        }
        this.twi.completeStop();
    }
    connectToSlave(addr, write) {
        let result = false;
        const device = this.controllers[addr];
        if (device) {
            result = device.i2cConnect(addr, write);
            if (result) {
                this.activeController = device;
                this.writeMode = write;
            }
        }
        this.twi.completeConnect(result);
    }
    writeByte(value) {
        if (this.activeController && this.writeMode) {
            this.twi.completeWrite(this.activeController.i2cWriteByte(value));
        }
        else {
            this.twi.completeWrite(false);
        }
    }
    readByte(ack) {
        if (this.activeController && !this.writeMode) {
            this.twi.completeRead(this.activeController.i2cReadByte(ack));
        }
        else {
            this.twi.completeRead(0xff);
        }
    }
}
exports.I2CBus = I2CBus;
//# sourceMappingURL=i2c-bus.js.map