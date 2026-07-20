import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";

const TOF_I2C_ADDRESS = 0x29;
const REG = {
    MODEL_ID: 0x010F,
    MODULE_TYPE: 0x0110,
    REVISION_ID: 0x0111,
    SYSTEM_START: 0x0087,
    GPIO_TIO_HV_STATUS: 0x0031,
    FIRMWARE_SYSTEM_STATUS: 0x00E5,
    RESULT_RANGE_STATUS: 0x0089,
    RESULT_DISTANCE: 0x0096,
    RESULT_SIGNAL: 0x0098,
    RESULT_AMBIENT: 0x009A,
    GPIO_HV_MUX_CTRL: 0x0030,
    SYSTEM_INTERRUPT_CLEAR: 0x0086,
    RESULT_SPAD_NB: 0x008C,
    RESULT_SIGNAL_RATE: 0x008E,
    RESULT_AMBIENT_RATE: 0x0090,
    RESULT_SIGMA: 0x0092,
};


export class TOF extends Controller implements I2CController {
    private registerPointer = 0;
    private pointerBytesReceived = 0;
    
    private memory = new Uint8Array(65536);
    private startTime: number = 0;
    
    private distance = 1000;          // mm
    private signal = 200;             // kcps/spad
    private ambient = 50;
    private sigma = 8;
    private rangeStatus = 0;
    private initialized = false;
    private ranging = false;
    private dataReady = false;
    private interruptRaised = false;
    private timingBudget = 50;
    private interMeasurement = 0;
    private lastMeasurementTime = 0;
    private numberOfSpad = 128;

    setup(): void {
        this.registerWithI2C();
        this.initializeRegisters();
        this.lastMeasurementTime=Date.now();
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
        return this.memory[address] |
            (this.memory[address + 1] << 8);
    }

    private write16(address: number, value: number): void {
        this.memory[address] = value & 0xFF;
        this.memory[address + 1] = (value >> 8) & 0xFF;
    }

    private rawWrite8(address: number, value: number) {
        this.memory[address] = value & 0xFF;
    }

    private rawWrite16(address: number, value: number) {
        this.memory[address] = value & 0xFF;
        this.memory[address + 1] = (value >> 8) & 0xFF;
    }

    private initializeRegisters(): void {
        // Model ID
        this.rawWrite16(REG.MODEL_ID, 0xEBAA);
        // GPIO status
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, 0);
        this.rawWrite8(REG.MODULE_TYPE,0x01);
        this.rawWrite8(REG.REVISION_ID,0x10);
        this.rawWrite8(REG.FIRMWARE_SYSTEM_STATUS,0x03);
        this.rawWrite8(REG.GPIO_HV_MUX_CTRL,0);
        this.rawWrite16(REG.RESULT_SPAD_NB, this.numberOfSpad * 256);
        this.updateMeasurementRegisters();
    }

    private updateMeasurementRegisters(): void {
        this.rawWrite8(REG.RESULT_RANGE_STATUS, this.rangeStatus);
        this.rawWrite16(REG.RESULT_SPAD_NB, this.numberOfSpad * 256);
        this.rawWrite16(REG.RESULT_SIGNAL_RATE, Math.round(this.signal / 8));
        this.rawWrite16(REG.RESULT_AMBIENT_RATE, Math.round(this.ambient / 8));
        this.rawWrite16(REG.RESULT_SIGMA, this.sigma * 4);
        this.rawWrite16(REG.RESULT_DISTANCE, this.distance);
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, this.dataReady ? 1 : 0);
    }

    override update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            this.distance = Math.max(0, Math.min(5000, state.distance));
            this.calculateMeasurement();
            this.dataReady = true;
        }

        if (state.signal !== undefined) {
            this.signal = state.signal;
        }

        if (state.rangeStatus !== undefined) {
            this.rangeStatus = state.rangeStatus;
        }

        this.updateMeasurementRegisters();
    }

    private updateMeasurement(): void {
        console.log("updateMeasurement", this.ranging, this.initialized, Date.now() - this.lastMeasurementTime);
        if (!this.ranging) {
            return;
        }
        const now = Date.now();
        if (now - this.lastMeasurementTime < this.timingBudget) {
            return;
        }
        this.lastMeasurementTime = now;
        this.calculateMeasurement();
        this.dataReady = true;
        console.log("DATA READY!");
        this.interruptRaised = true;
        this.updateMeasurementRegisters();
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS, 1);
    }

    cleanup(): void {

    }

    private registerWithI2C(): void {
        const i2cBus = AVRRunner.getInstance().board.twis[0];
        i2cBus.registerController(TOF_I2C_ADDRESS, this);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        console.log("CONNECT");
        if(addr!=TOF_I2C_ADDRESS) return false;

        if(write){
            this.pointerBytesReceived=0;
        }

        return true;
    }

    i2cDisconnect(): void {
        this.pointerBytesReceived=0;
    }

    i2cWriteByte(value: number): boolean {
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
        console.log(this.registerPointer.toString(16), this.read8(this.registerPointer));
        this.updateMeasurement();
        if(this.registerPointer >= this.memory.length) return 0xFF;
        const value=this.read8(this.registerPointer);
        console.log("READ", this.registerPointer.toString(16), value, "acked=", acked);
        if(acked){
            this.registerPointer++;
        }
        return value;
    }

    private handleRegisterWrite(address:number,value:number):void{
        switch(address){
            case REG.SYSTEM_START:
                console.log("SYSTEM_START =", value.toString(16));
                if(value==0x21 || value==0x40) {
                    this.initialized = true;
                    this.startRanging();
                } else if (value == 0x00) {
                    this.stopRanging();
                }
                break

            case REG.SYSTEM_INTERRUPT_CLEAR:
                this.clearInterrupt();
                break;
        }
    }

    private startRanging(): void {
        if(!this.initialized) return;
        this.ranging=true;
        this.dataReady=false;
        this.interruptRaised=false;
        this.lastMeasurementTime=Date.now();
        this.calculateMeasurement();
        this.updateMeasurementRegisters();
    }

    private stopRanging(): void {
        this.ranging = false;
        this.updateMeasurementRegisters();
    }

    private clearInterrupt(): void {
        this.dataReady = false;
        this.interruptRaised = false;
        this.updateMeasurementRegisters();
        this.rawWrite8(REG.GPIO_TIO_HV_STATUS,0);
    }

    private calculateMeasurement(): void {

        // ---------- Signal ----------
        // Signal decreases as distance increases
        this.signal = Math.max(20, Math.round(400 - this.distance * 0.12));

        // ---------- Ambient ----------
        // Keep ambient constant for now
        this.ambient = 50;

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

}