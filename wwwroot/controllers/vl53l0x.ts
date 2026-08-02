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
    private distance = 100;      // mm
    private signalRate = 30000;
    private ambientRate = 6000;
    private rangeStatus = 0;
    private initialized = false;
    private ranging = false;
    private dataReady = false;
    private lastMeasurementTime = 0;
    private xshut = false;
    private i2cAddress = 0x29;
    private continuousMode=false;

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
        this.rawWrite8(0x89, 0x00);
        this.rawWrite8(0x83, 0x01);      
        this.rawWrite8(0x92, 0x8C);
        for (let i = 0; i < 6; i++)
            this.rawWrite8(0xB0 + i, 0xFF);
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
            this.distance = Math.max(30, Math.min(2000, state.distance));
            this.simulateMeasurement();
        }
    }

    private updateMeasurement(): void {
        if (!this.ranging) return;
        this.rawWrite8(REG.SYSRANGE_START, 0);
        this.dataReady = true;
        this.simulateMeasurement();
        if (!this.continuousMode)
            this.ranging = false;
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
        if(write){
            this.pointerBytesReceived = 0;
        }
        return addr === this.i2cAddress;
    }

    i2cDisconnect(): void {
        this.pointerBytesReceived = 0;
    }

    i2cWriteByte(value: number): boolean {
        if(!this.xshut) return false;
        if(this.pointerBytesReceived == 0){
            this.registerPointer = value;
            this.pointerBytesReceived = 1;
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
        if (addr === 0x83 && value === 0x00) {
            this.rawWrite8(0x83, 0x01);
        }
        switch (addr) {
            case REG.SYSRANGE_START:
                if (value == 0) {
                    this.stopContinuous();
                } else if (value & 0x02) {
                    this.startContinuous();
                } else if (value & 0x01) {
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

    private powerOff() {
        this.xshut = false;
        this.resetState();
        const bus = AVRRunner.getInstance().board.twis[0] as I2CBus;
        bus.unregisterController(this.i2cAddress);
        this.memory.fill(0);
    }

    private powerOn() {
        this.xshut = true;
        this.resetState();
        this.i2cAddress = 0x29;
        this.initializeRegisters();
        this.registerWithI2C();
        this.updateMeasurementRegisters();
    }
    
    private resetState(): void {
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.continuousMode = false;
        this.pointerBytesReceived=0;
        this.registerPointer=0;
        this.lastMeasurementTime = 0;
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
        this.continuousMode = true;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
    }

    private startRanging() {
        if (!this.initialized) return;
        this.continuousMode=false;
        this.ranging = true;
        this.dataReady = false;
        this.lastMeasurementTime = Date.now();
    }

    private stopContinuous() {
        this.ranging = false;
        this.continuousMode = false;
        this.updateMeasurementRegisters();
    }

    private clearInterrupt(){
        this.dataReady=false;
        this.updateMeasurementRegisters();
    }

    public setXShut(level: PinState) {
        if (level == PinState.Low) {
            this.powerOff();
        } else {
            this.powerOn();
        }
    }
}