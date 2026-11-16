"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOF = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const gpio_1 = require("@lib/avr8js/peripherals/gpio");
const REG = {
    IDENTIFICATION_MODEL_ID: 0x010F,
    SYSTEM_START: 0x0087,
    GPIO_TIO_HV_STATUS: 0x0031,
    FIRMWARE_SYSTEM_STATUS: 0x00E5,
    RESULT_RANGE_STATUS: 0x0089,
    RESULT_DISTANCE: 0x0096,
    GPIO_HV_MUX_CTRL: 0x0030,
    SYSTEM_INTERRUPT_CLEAR: 0x0086,
    RESULT_SPAD_NB: 0x008C,
    RESULT_SIGNAL_RATE: 0x008E,
    RESULT_AMBIENT_RATE: 0x0090,
    RESULT_SIGMA: 0x0092,
    I2C_SLAVE_DEVICE_ADDRESS: 0x0001,
};
class TOF extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.registerPointer = 0;
        this.pointerBytesReceived = 0;
        this.memory = new Uint8Array(65536);
        this.distance = 20;
        this.signalRate = 25600;
        this.numberOfSpad = 128;
        this.ambientRate = 6400;
        this.sigma = 8;
        this.rangeStatus = 0;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.timingBudget = 50;
        this.lastMeasurementTime = 0;
        this.xshut = false;
        this.i2cAddress = 0x29;
    }
    setup() {
        this.lastMeasurementTime = Date.now();
        this.setXShut(gpio_1.PinState.High);
        this.pins.xshut[0].digital.addListener(() => this.setXShut(this.pins.xshut[0].digital.state));
    }
    read8(address) {
        return this.memory[address];
    }
    write8(address, value) {
        value &= 0xFF;
        this.memory[address] = value;
        this.handleRegisterWrite(address, value);
    }
    rawWrite8(address, value) {
        this.memory[address] = value & 0xFF;
    }
    rawWrite16(address, value) {
        this.memory[address] = (value >> 8) & 0xFF;
        this.memory[address + 1] = value & 0xFF;
    }
    initializeRegisters() {
        this.rawWrite16(REG.IDENTIFICATION_MODEL_ID, 0xEBAA);
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, 0);
        this.rawWrite8(REG.FIRMWARE_SYSTEM_STATUS, 0x03);
        this.rawWrite8(REG.GPIO_HV_MUX_CTRL, 0);
        this.rawWrite16(REG.RESULT_SPAD_NB, this.numberOfSpad * 256);
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, this.i2cAddress);
        this.updateMeasurementRegisters();
    }
    updateMeasurementRegisters() {
        this.rawWrite8(REG.RESULT_RANGE_STATUS, this.rangeStatus);
        this.rawWrite8(REG.RESULT_SPAD_NB, this.numberOfSpad);
        this.rawWrite16(REG.RESULT_SIGNAL_RATE, Math.round(this.signalRate / 8));
        this.rawWrite16(REG.RESULT_AMBIENT_RATE, Math.round(this.ambientRate / 8));
        this.rawWrite16(REG.RESULT_SIGMA, this.sigma * 4);
        this.rawWrite16(REG.RESULT_DISTANCE, this.distance);
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, this.dataReady ? 0 : 1);
    }
    update(state) {
        if (state.distance !== undefined) {
            this.distance = Math.max(1, Math.min(1300, state.distance));
            this.simulateMeasurement();
        }
        if (state.signal !== undefined) {
            this.signalRate = state.signal;
        }
        if (state.rangeStatus !== undefined) {
            this.rangeStatus = state.rangeStatus;
        }
        this.updateMeasurementRegisters();
    }
    updateMeasurement() {
        if (!this.ranging) {
            return;
        }
        const now = Date.now();
        if (now - this.lastMeasurementTime < this.timingBudget) {
            return;
        }
        this.lastMeasurementTime = now;
        this.simulateMeasurement();
        this.dataReady = true;
        this.updateMeasurementRegisters();
    }
    cleanup() {
        this.powerOff();
    }
    registerWithI2C() {
        const bus = execute_1.AVRRunner.getInstance().board.twis[0];
        bus.registerController(this.i2cAddress, this);
    }
    i2cConnect(addr, write) {
        if (addr != this.i2cAddress) {
            console.log("ADDR MISMATCH");
            return false;
        }
        if (write) {
            this.pointerBytesReceived = 0;
        }
        return true;
    }
    i2cDisconnect() {
        this.pointerBytesReceived = 0;
    }
    i2cWriteByte(value) {
        if (!this.xshut)
            return false;
        if (this.pointerBytesReceived == 0) {
            this.registerPointer = value << 8;
            this.pointerBytesReceived = 1;
            return true;
        }
        if (this.pointerBytesReceived == 1) {
            this.registerPointer |= value;
            this.pointerBytesReceived = 2;
            return true;
        }
        this.write8(this.registerPointer, value);
        this.registerPointer++;
        return true;
    }
    i2cReadByte(acked) {
        if (!this.xshut)
            return 0xFF;
        this.updateMeasurement();
        if (this.registerPointer >= this.memory.length)
            return 0xFF;
        const value = this.read8(this.registerPointer);
        if (acked) {
            this.registerPointer++;
        }
        return value;
    }
    handleRegisterWrite(address, value) {
        switch (address) {
            case REG.SYSTEM_START:
                if (value == 0x21 || value == 0x40) {
                    this.initialized = true;
                    this.startRanging();
                }
                else if (value == 0x80 || value == 0x00) {
                    this.stopRanging();
                }
                break;
            case REG.SYSTEM_INTERRUPT_CLEAR:
                this.clearInterrupt();
                break;
            case REG.I2C_SLAVE_DEVICE_ADDRESS:
                this.setAddress(value);
                break;
        }
    }
    startRanging() {
        if (!this.initialized)
            return;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
        this.simulateMeasurement();
        this.updateMeasurementRegisters();
    }
    stopRanging() {
        if (!this.xshut) {
            return;
        }
        this.ranging = false;
        this.updateMeasurementRegisters();
    }
    clearInterrupt() {
        this.dataReady = false;
        this.updateMeasurementRegisters();
    }
    simulateMeasurement() {
        this.signalRate = Math.max(2000, 30000 - this.distance * 5);
        this.ambientRate = 6400;
        this.sigma = Math.round(5 + this.distance / 500);
        this.numberOfSpad = 128;
        if (this.distance > 1300) {
            this.rangeStatus = 4;
        }
        else {
            this.rangeStatus = 9;
        }
    }
    setXShut(level) {
        if (level == gpio_1.PinState.Low) {
            this.powerOff();
        }
        else {
            this.powerOn();
        }
    }
    resetState() {
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
    }
    powerOff() {
        this.xshut = false;
        this.resetState();
        const bus = execute_1.AVRRunner.getInstance().board.twis[0];
        bus.unregisterController(this.i2cAddress);
        this.memory.fill(0);
    }
    powerOn() {
        this.xshut = true;
        this.resetState();
        this.i2cAddress = 0x29;
        this.initializeRegisters();
        this.registerWithI2C();
    }
    setAddress(newAddr) {
        newAddr &= 0x7F;
        if (newAddr == this.i2cAddress)
            return;
        const bus = execute_1.AVRRunner.getInstance().board.twis[0];
        bus.unregisterController(this.i2cAddress);
        this.i2cAddress = newAddr;
        this.registerWithI2C();
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, newAddr);
    }
}
exports.TOF = TOF;
//# sourceMappingURL=tof.js.map