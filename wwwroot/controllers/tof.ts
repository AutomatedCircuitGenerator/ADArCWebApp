import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";
import {PinState} from "@lib/avr8js/peripherals/gpio";
import {I2CBus} from "@lib/i2c-bus";

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


export class TOF extends Controller implements I2CController {
    private registerPointer = 0;
    private pointerBytesReceived = 0;
    
    private memory = new Uint8Array(65536);
    
    private distance = 0;          // mm
    private signalRate = 25600;     // kcps
    private numberOfSpad = 128;
    private ambientRate = 6400;
    private sigma = 8;
    private rangeStatus = 0;
    private initialized = false;
    private ranging = false;
    private dataReady = false;
    private interruptRaised = false;
    private timingBudget = 50;
    private interMeasurement = 0;
    private lastMeasurementTime = 0;
    private xshut = true;
    private i2cAddress = 0x29;

    setup(): void {
        console.log(this.pins);
        this.registerWithI2C();
        this.initializeRegisters();
        this.lastMeasurementTime=Date.now();
        // this.pins.xshut[0].digital?.addListener((state) => {
        //     this.setXShut(state === PinState.High);
        // });
        this.setXShut(true);
    }

    private read8(address: number): number {
        return this.memory[address];
    }

    private write8(address: number, value: number): void {
        value &= 0xFF;
        this.memory[address]=value;
        this.handleRegisterWrite(address,value);
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

    private rawWrite32(address: number, value: number) {
        this.memory[address] = (value >> 24) & 0xFF;
        this.memory[address + 1] = (value >> 16) & 0xFF;
        this.memory[address + 2] = (value >> 8) & 0xFF;
        this.memory[address + 3] = value & 0xFF;
    }

    private initializeRegisters(): void {
        // Model ID
        this.rawWrite16(REG.IDENTIFICATION_MODEL_ID, 0xEBAA);
        // GPIO status
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, 0);
        this.rawWrite8(REG.FIRMWARE_SYSTEM_STATUS,0x03);
        this.rawWrite8(REG.GPIO_HV_MUX_CTRL,0);
        this.rawWrite16(REG.RESULT_SPAD_NB, this.numberOfSpad * 256);
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, this.i2cAddress);
        this.updateMeasurementRegisters();
    }

    private updateMeasurementRegisters(): void {
        this.rawWrite8(REG.RESULT_RANGE_STATUS, this.rangeStatus);
        this.rawWrite8(REG.RESULT_SPAD_NB, this.numberOfSpad);
        this.rawWrite16(REG.RESULT_SIGNAL_RATE, Math.round(this.signalRate / 8));
        this.rawWrite16(REG.RESULT_AMBIENT_RATE, Math.round(this.ambientRate / 8));
        this.rawWrite16(REG.RESULT_SIGMA, this.sigma * 4);
        this.rawWrite16(REG.RESULT_DISTANCE, this.distance);
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, this.dataReady ? 0 : 1);
    }

    override update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            this.distance = Math.max(0, Math.min(5000, state.distance));
            this.simulateMeasurement();
            this.updateMeasurementRegisters();
        }

        if (state.signal !== undefined) {
            this.signalRate = state.signal;
        }

        if (state.rangeStatus !== undefined) {
            this.rangeStatus = state.rangeStatus;
        }

        this.updateMeasurementRegisters();
    }

    private updateMeasurement(): void {
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
        this.interruptRaised = true;
        this.updateMeasurementRegisters();
    }

    cleanup(): void {

    }

    private registerWithI2C(): void {
        const i2cBus = AVRRunner.getInstance().board.twis[0];
        // Register on every possible 7-bit I2C address.
        i2cBus.registerController(this.i2cAddress, this);

    }

    i2cConnect(addr: number, write: boolean): boolean {
        console.log("CONNECT");
        if (!this.xshut) {
            console.log("XSHUT OFF");
            return false;
        }

        if (addr != this.i2cAddress) {
            console.log("ADDR MISMATCH");
            return false;
        }

        if(write){
            this.pointerBytesReceived=0;
        }

        return true;
    }

    i2cDisconnect(): void {
        this.pointerBytesReceived=0;
    }

    i2cWriteByte(value: number): boolean {
        if (!this.xshut) return false;
        if(this.pointerBytesReceived==0){
            this.registerPointer=value<<8;
            this.pointerBytesReceived=1;
            return true;
        }

        if(this.pointerBytesReceived==1){
            this.registerPointer|=value;
            this.pointerBytesReceived=2;
            return true;
        }

        this.write8(this.registerPointer,value);
        this.registerPointer++;
        return true;
    }

    i2cReadByte(acked: boolean): number {
        console.log("READ");
        if (!this.xshut) return 0xFF;
        this.updateMeasurement();
        if(this.registerPointer >= this.memory.length) return 0xFF;
        const value=this.read8(this.registerPointer);
        if(acked){
            this.registerPointer++;
        }
        return value;
    }

    private handleRegisterWrite(address:number,value:number):void{
        switch(address){
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

    private startRanging(): void {
        if(!this.initialized) return;
        this.ranging=true;
        this.dataReady=false;
        this.interruptRaised=false;
        this.lastMeasurementTime=Date.now();
        this.simulateMeasurement();
        this.updateMeasurementRegisters();
    }

    private stopRanging(): void {
        if (!this.xshut) {
            return;
        }
        this.ranging = false;
        this.updateMeasurementRegisters();
    }

    private clearInterrupt(): void {
        this.dataReady = false;
        this.interruptRaised = false;
        this.updateMeasurementRegisters();
    }

    private simulateMeasurement(): void {

        // ---------- Signal ----------
        // Signal decreases as distance increases
        this.signalRate = Math.max(2000, 30000 - this.distance * 5);

        // ---------- Ambient ----------
        // Keep ambient constant for now
        this.ambientRate = 6400;

        // ---------- Sigma ----------
        // Sigma increases with distance
        this.sigma = Math.round(5 + this.distance / 500);

        // ---------- Number of SPAD ----------
        this.numberOfSpad = 128;

        // ---------- Raw Range Status ----------
        if (this.distance > 4000) {
            // Out of range
            this.rangeStatus = 4;
        }
        else {
            // Valid measurement
            this.rangeStatus = 9;
        }
    }

    public setXShut(level: boolean) {
        if (level) {
            this.powerOn();
        } else {
            this.powerOff();
        }
    }

    private powerOff() {
        this.xshut = false;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.interruptRaised = false;
        this.memory.fill(0);
    }

    private powerOn() {
        this.xshut = true;
        this.initialized = false;
        this.ranging = false;
        this.dataReady = false;
        this.interruptRaised = false;
        const bus = AVRRunner.getInstance().board.twis[0];
        bus.changeControllerAddress(this.i2cAddress, 0x29);
        this.i2cAddress = 0x29;
        this.initializeRegisters();
    }

    private setAddress(newAddr: number): void {
        newAddr &= 0x7F;
        const bus = AVRRunner.getInstance().board.twis[0];
        bus.changeControllerAddress(this.i2cAddress, newAddr);
        this.i2cAddress = newAddr;
        this.rawWrite8(REG.I2C_SLAVE_DEVICE_ADDRESS, newAddr);
    }
}