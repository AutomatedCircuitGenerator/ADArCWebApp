import { Controller } from "@controllers/controller";
import { AVRRunner } from "@lib/execute";
import { I2CBus, I2CController } from "@lib/i2c-bus";
import { PinState } from "@lib/avr8js/peripherals/gpio";

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

export class VL53L0X extends Controller implements I2CController {

    private registerPointer = 0;
    private pointerBytesReceived = 0;
    private memory = new Uint8Array(256);
    private distance = 200;      // mm
    private signalRate = 30000;
    private ambientRate = 6000;
    private rangeStatus = 0;
    private initialized = false;
    private ranging = false;
    private dataReady = false;
    private timingBudget = 50;
    private lastMeasurementTime = 0;
    private xshut = false;
    private i2cAddress = 0x29;
    private stopVariable = 0;

    setup(): void {
        this.lastMeasurementTime = Date.now();
        this.setXShut(PinState.High);
        this.pins.xshut[0].digital.addListener(() =>
            this.setXShut(this.pins.xshut[0].digital.state)
        );
    }

    private read8(address: number): number {
        return this.memory[address];
    }

    private write8(address: number, value: number): void {
        value &= 0xFF;
        this.memory[address] = value;
        this.handleRegisterWrite(address, value);
    }

    private read16(address: number): number {
        return (this.memory[address] << 8) | this.memory[address + 1];
    }

    private write16(address: number, value: number): void {
        this.memory[address] = (value >> 8) & 0xFF;
        this.memory[address + 1] = value & 0xFF;
    }

    private rawWrite8(address: number, value: number) {
        this.memory[address] = value & 0xFF;
    }

    private rawWrite16(address: number, value: number) {
        this.memory[address] = (value >> 8) & 0xFF;
        this.memory[address + 1] = value & 0xFF;
    }

    private initializeRegisters(): void {
        this.rawWrite8(REG.IDENTIFICATION_MODEL_ID, 0xEE);
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, this.i2cAddress);
        this.updateMeasurementRegisters();
    }

    private updateMeasurementRegisters(): void {
        this.rawWrite8(REG.RESULT_INTERRUPT_STATUS, this.dataReady ? 0x07 : 0x00);
        this.rawWrite8(REG.RESULT_RANGE_STATUS,this.rangeStatus);
        // distance lives at RESULT_RANGE_STATUS + 10
        this.rawWrite16(REG.RESULT_RANGE_STATUS + 10, this.distance);
    }

    override update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            this.distance = Math.max(0, Math.min(5000, state.distance));
            this.simulateMeasurement();
        }
        this.updateMeasurementRegisters();
    }

    private updateMeasurement(): void {
        if (!this.ranging) return;
        const now = Date.now();
        if (now - this.lastMeasurementTime < this.timingBudget) {
            return;
        }
        this.lastMeasurementTime = now;
        this.simulateMeasurement();
        this.dataReady = true;
        this.updateMeasurementRegisters();
    }

    cleanup(): void {
        this.powerOff();
    }

    private registerWithI2C() {
        const bus = AVRRunner.getInstance().board.twis[0] as I2CBus;
        bus.registerController(this.i2cAddress, this);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        if (!this.xshut) return false;
        return addr === this.i2cAddress;
    }

    i2cDisconnect(): void {
        this.pointerBytesReceived=0;
    }

    i2cWriteByte(value: number): boolean {
        if(!this.xshut) return false;
        if(this.pointerBytesReceived==0){
            this.registerPointer=value;
            this.pointerBytesReceived=1;
            return true;
        }
        this.write8(this.registerPointer,value);
        this.registerPointer++;
        return true;
    }

    i2cReadByte(acked: boolean): number {
        if (!this.xshut) return 0xFF;
        this.updateMeasurement();
        const value = this.read8(this.registerPointer);
        if (acked) this.registerPointer++;
        return value;
    }

    private handleRegisterWrite(addr: number, value: number) {
        switch (addr) {
            case REG.SYSRANGE_START:
                if (value == 0x01) {
                    this.initialized = true;
                    this.startRanging();
                } else if (value == 0x02 || value == 0x04) {
                    this.startContinuous();
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

    private powerOff() {
        this.xshut = false;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        const bus = AVRRunner.getInstance().board.twis[0] as I2CBus;
        bus.unregisterController(this.i2cAddress);
        this.memory.fill(0);
    }

    private powerOn() {
        this.xshut = true;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.i2cAddress = 0x29;
        this.initializeRegisters();
        this.registerWithI2C();
    }

    private setAddress(addr: number) {
        addr &= 0x7F;
        if (addr == this.i2cAddress) return;
        const bus = AVRRunner.getInstance().board.twis[0] as I2CBus;
        bus.unregisterController(this.i2cAddress);
        this.i2cAddress = addr;
        this.registerWithI2C();
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, addr);
    }

    private simulateMeasurement() {
        this.signalRate = Math.max(2000, 30000 - this.distance * 8);
        this.ambientRate = 6000;
        if (this.distance > 1200) {
            this.rangeStatus = 4;
        } else {
            this.rangeStatus = 0;
        }
        this.updateMeasurementRegisters();
    }

    private startContinuous(){
        this.ranging=true;
        this.lastMeasurementTime=Date.now();
        this.dataReady=false;
    }

    private startRanging() {
        if (!this.initialized) return;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
        this.simulateMeasurement();
        this.updateMeasurementRegisters();
    }

    private stopContinuous() {
        this.ranging = false;
    }

    private clearInterrupt(){
        this.dataReady=false;
    }

    public setXShut(level: PinState) {
        if (level == PinState.Low) {
            this.powerOff();
        } else {
            this.powerOn();
        }
    }
}