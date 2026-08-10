"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VL53L0X = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const gpio_1 = require("@lib/avr8js/peripherals/gpio");
const REG = {
    I2C_SLAVE_DEVICE_ADDRESS: 0x8A,
    IDENTIFICATION_MODEL_ID: 0xC0,
    SYSRANGE_START: 0x00,
    SYSTEM_SEQUENCE_CONFIG: 0x01,
    SYSTEM_INTERRUPT_CLEAR: 0x0B,
    RESULT_INTERRUPT_STATUS: 0x13,
    RESULT_RANGE_STATUS: 0x14,
    OSC_CALIBRATE_VAL: 0xF8,
    SYSTEM_INTERMEASUREMENT_PERIOD: 0x04,
    RESULT_RANGE_MM: 0x1E,
};
class VL53L0X extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.registerPointer = 0;
        this.pointerBytesReceived = 0;
        this.memory = new Uint8Array(256);
        this.distance = 100;
        this.signalRate = 30000;
        this.ambientRate = 6000;
        this.rangeStatus = 0;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.lastMeasurementTime = 0;
        this.xshut = false;
        this.i2cAddress = 0x29;
        this.continuousMode = false;
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
        this.rawWrite8(REG.IDENTIFICATION_MODEL_ID, 0xEE);
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, this.i2cAddress);
        this.rawWrite8(0x89, 0x00);
        this.rawWrite8(0x83, 0x01);
        this.rawWrite8(0x92, 0x8C);
        for (let i = 0; i < 6; i++)
            this.rawWrite8(0xB0 + i, 0xFF);
        this.updateMeasurementRegisters();
    }
    updateMeasurementRegisters() {
        this.rawWrite8(REG.RESULT_INTERRUPT_STATUS, this.dataReady ? 0x07 : 0x00);
        this.rawWrite8(REG.RESULT_RANGE_STATUS, this.rangeStatus);
        this.rawWrite16(REG.RESULT_RANGE_STATUS + 10, this.distance);
    }
    update(state) {
        if (state.distance !== undefined) {
            this.distance = Math.max(30, Math.min(2000, state.distance));
            this.simulateMeasurement();
        }
    }
    updateMeasurement() {
        if (!this.ranging)
            return;
        this.rawWrite8(REG.SYSRANGE_START, 0);
        this.dataReady = true;
        this.simulateMeasurement();
        if (!this.continuousMode)
            this.ranging = false;
    }
    cleanup() {
        this.powerOff();
    }
    registerWithI2C() {
        const bus = execute_1.AVRRunner.getInstance().board.twis[0];
        bus.registerController(this.i2cAddress, this);
    }
    i2cConnect(addr, write) {
        if (!this.xshut)
            return false;
        if (write) {
            this.pointerBytesReceived = 0;
        }
        return addr === this.i2cAddress;
    }
    i2cDisconnect() {
        this.pointerBytesReceived = 0;
    }
    i2cWriteByte(value) {
        if (!this.xshut)
            return false;
        if (this.pointerBytesReceived == 0) {
            this.registerPointer = value;
            this.pointerBytesReceived = 1;
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
        const value = this.read8(this.registerPointer);
        if (acked)
            this.registerPointer++;
        return value;
    }
    handleRegisterWrite(addr, value) {
        if (addr === 0x83 && value === 0x00) {
            this.rawWrite8(0x83, 0x01);
        }
        switch (addr) {
            case REG.SYSRANGE_START:
                if (value == 0) {
                    this.stopContinuous();
                }
                else if (value & 0x02) {
                    this.startContinuous();
                }
                else if (value & 0x01) {
                    this.initialized = true;
                    this.startRanging();
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
        this.updateMeasurementRegisters();
    }
    resetState() {
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.continuousMode = false;
        this.pointerBytesReceived = 0;
        this.registerPointer = 0;
        this.lastMeasurementTime = 0;
    }
    setAddress(addr) {
        addr &= 0x7F;
        if (addr == this.i2cAddress)
            return;
        const bus = execute_1.AVRRunner.getInstance().board.twis[0];
        bus.unregisterController(this.i2cAddress);
        this.i2cAddress = addr;
        this.registerWithI2C();
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, addr);
    }
    simulateMeasurement() {
        this.signalRate = Math.max(2000, 30000 - this.distance * 8);
        this.ambientRate = 6000;
        if (this.distance > 1200) {
            this.rangeStatus = 4;
        }
        else {
            this.rangeStatus = 0;
        }
        this.updateMeasurementRegisters();
    }
    startContinuous() {
        this.continuousMode = true;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
    }
    startRanging() {
        if (!this.initialized)
            return;
        this.continuousMode = false;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
    }
    stopContinuous() {
        this.ranging = false;
        this.continuousMode = false;
        this.updateMeasurementRegisters();
    }
    clearInterrupt() {
        this.dataReady = false;
        this.updateMeasurementRegisters();
    }
    setXShut(level) {
        if (level == gpio_1.PinState.Low) {
            this.powerOff();
        }
        else {
            this.powerOn();
        }
    }
}
exports.VL53L0X = VL53L0X;
//# sourceMappingURL=vl53l0x.js.map