import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";
import {Memory} from "@controllers/memory";

const TOF_I2C_ADDRESS = 0x29;

const REGISTERS = {
    DIST: { address: 0x00, size: 2 },
    FLUX: { address: 0x02, size: 2 },
    TEMP: { address: 0x04, size: 2 },
    TICK: { address: 0x06, size: 2 },
    ERROR: { address: 0x08, size: 2 },
} as const;

export class TOF extends Controller implements I2CController {
    private i2cAddressPointer: number | null = null;
    private memory = new Memory(128);
    private startTime: number = 0;

    setup(): void {
        this.registerWithI2C();
        this.startTime = Date.now();
        this.initializeRegisters();
    }

    private initializeRegisters(): void {
        // Don't hardcode 100 - it should come from the property
        this.writeRegister("FLUX", 200);
        this.writeRegister("TEMP", 2500);
        this.writeRegister("ERROR", 0);
    }

    override update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            // Clamp to 0-5000 range
            let distance = state.distance;
            if (distance < 0) distance = 0;
            if (distance > 5000) distance = 5000;

            this.writeRegister("DIST", distance);
        }
    }
    
    setRegister(register: string, value: number) {
        this.memory.write(REGISTERS[register], value);
    }


    cleanup(): void {
        this.i2cAddressPointer = null;
    }

    private registerWithI2C(): void {
        const i2cBus = AVRRunner.getInstance().board.twis[0];
        i2cBus.registerController(TOF_I2C_ADDRESS, this);
    }

    private writeRegister(register: keyof typeof REGISTERS, value: number): void {
        const reg = REGISTERS[register];
        // Write as little-endian 16-bit value
        this.memory[reg.address] = value & 0xFF;
        this.memory[reg.address + 1] = (value >> 8) & 0xFF;
    }

    private readRegister(register: keyof typeof REGISTERS): number {
        const reg = REGISTERS[register];
        // Read as little-endian 16-bit value
        return this.memory[reg.address] | (this.memory[reg.address + 1] << 8);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        if (addr === TOF_I2C_ADDRESS) {
            if (write) {
                // Write mode: reset address pointer on connect
                this.i2cAddressPointer = null;
            } else {
                // Read mode: address pointer should already be set from previous write
            }
            return true;
        }
        return false;
    }

    i2cDisconnect(): void {
        // Don't reset - keep state for next transaction
    }

    i2cWriteByte(value: number): boolean {
        if (this.i2cAddressPointer === null) {
            // First byte: set the address pointer
            this.i2cAddressPointer = value;
            return true;
        } else {
            // Subsequent bytes: write to memory
            this.memory[this.i2cAddressPointer] = value;
            this.i2cAddressPointer++;
            return true;
        }
    }

    i2cReadByte(acked: boolean): number {
        this.updateTime();

        if (this.i2cAddressPointer === null) {
            return 0xFF;
        }

        const byte = this.memory[this.i2cAddressPointer];

        // Auto-increment on ACK
        if (acked) {
            this.i2cAddressPointer++;
        }

        return byte;
    }

    private updateTime() {
        const elapsedTime = Date.now() - this.startTime;
        this.setRegister("TICK", elapsedTime);
    }

}