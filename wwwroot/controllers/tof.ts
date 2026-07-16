import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";

const TOF_I2C_ADDRESS = 0x29;



export class TOF extends Controller implements I2CController {
    private registerPointer = 0;
    private registerHighByte = 0;
    private expectingHighByte = true;
    private expectingLowByte = false;
    private expectingData = false;
    
    private memory = new Uint8Array(65536);
    private startTime: number = 0;

    setup(): void {
        this.registerWithI2C();
        this.startTime = Date.now();
        this.initializeRegisters();
    }

    private read8(address: number): number {
        return this.memory[address];
    }

    private write8(address: number, value: number): void {
        this.memory[address] = value & 0xFF;
    }

    private read16(address: number): number {
        return this.memory[address] |
            (this.memory[address + 1] << 8);
    }

    private write16(address: number, value: number): void {
        this.memory[address] = value & 0xFF;
        this.memory[address + 1] = (value >> 8) & 0xFF;
    }

    private initializeRegisters(): void {

    }

    override update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            // Clamp to 0-5000 range
            let distance = state.distance;
            if (distance < 0) distance = 0;
            if (distance > 5000) distance = 5000;

        }
    }
    
    setRegister(register: string, value: number) {
    }


    cleanup(): void {

    }

    private registerWithI2C(): void {
        const i2cBus = AVRRunner.getInstance().board.twis[0];
        i2cBus.registerController(TOF_I2C_ADDRESS, this);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        console.log("CONNECT");
        if (addr !== TOF_I2C_ADDRESS)
            return false;
        if (write) {
            this.expectingHighByte = true;
            this.expectingLowByte = false;
            this.expectingData = false;
        }
        return true;
    }

    i2cDisconnect(): void {
        // Don't reset - keep state for next transaction
    }

    i2cWriteByte(value: number): boolean {
        console.log("WRITE", this.registerPointer.toString(16), value.toString(16));
        if (this.expectingHighByte) {
            this.registerHighByte = value;
            this.expectingHighByte = false;
            this.expectingLowByte = true;
            return true;
        }

        if (this.expectingLowByte) {
            this.registerPointer = (this.registerHighByte << 8) | value;
            this.expectingLowByte = false;
            this.expectingData = true;
            return true;
        }

        this.write8(this.registerPointer, value);
        this.registerPointer++;
        return true;
    }

    i2cReadByte(acked: boolean): number {
        console.log("READ");
        this.updateRegisters();
        const value = this.read8(this.registerPointer);
        if (acked) {
            this.registerPointer++;
        }
        return value;
    }

    private updateRegisters(): void {

    }

    private updateTime() {
        const elapsedTime = Date.now() - this.startTime;
        this.setRegister("TICK", elapsedTime);
    }

}