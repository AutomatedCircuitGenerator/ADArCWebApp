import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";
import {Memory} from "@controllers/memory";

// I2C address must match Razor component and CodeForGen
const TOF_I2C_ADDRESS = 0x29;

// Register definitions - addresses and sizes
const REGISTERS = {
    DIST: { address: 0x00, size: 2 },
    FLUX: { address: 0x02, size: 2 },
    TEMP: { address: 0x04, size: 2 },
    TICK: { address: 0x06, size: 2 },
    ERROR: { address: 0x08, size: 2 },
} as const;

export class TOF extends Controller implements I2CController {
    private i2cAddress: number | null = null;
    private memory = new Memory(128);
    private startTime: number = 0;

    /**
     * Setup the controller - called before simulation starts
     * Initializes I2C registration and default register values
     * Abstract method required by Controller base class
     */
    setup(): void {
        this.registerWithI2C();
        this.startTime = Date.now();
        this.initializeRegisters();
    }

    /**
     * Update distance register from simulation state
     * Called by AVRRunner during execution loop when environmental settings change
     * Optional override of Controller base class method
     */
    update(state: Record<string, any>): void {
        if (state.distance !== undefined) {
            this.setRegister("DIST", state.distance);
        }
    }

    /**
     * Cleanup when simulation stops
     * Resets the I2C address pointer
     * Optional override of Controller base class method
     */
    cleanup(): void {
        this.i2cAddress = null;
    }

    /**
     * Register this controller with the I2C bus
     */
    private registerWithI2C(): void {
        const i2cBus = AVRRunner.getInstance().board.twis[0];
        i2cBus.registerController(this.id, this);
    }

    /**
     * Initialize default register values
     */
    private initializeRegisters(): void {
        this.setRegister("FLUX", 200);
        this.setRegister("TEMP", 2500);
        this.setRegister("ERROR", 0);
    }

    /**
     * Write a value to a register
     */
    private setRegister(register: keyof typeof REGISTERS, value: number): void {
        const reg = REGISTERS[register];
        this.memory.write(reg, value);
    }

    /**
     * I2C Connection handler
     * Accepts connections on our I2C address (0x29)
     */
    i2cConnect(addr: number, write: boolean): boolean {
        return addr === TOF_I2C_ADDRESS;
    }

    /**
     * I2C Disconnection handler
     * Clears the address pointer when connection ends
     */
    i2cDisconnect(): void {
        this.i2cAddress = null;
    }

    /**
     * I2C Read byte
     * Returns the byte at the current address pointer
     * Auto-increments address on ACK, clears on NACK
     */
    i2cReadByte(acked: boolean): number {
        this.updateTime();
        let byte: number;

        if (this.i2cAddress !== null) {
            // Address pointer is set, return the byte at that address
            byte = this.memory[this.i2cAddress];

            // If master sends ACK, increment address for sequential read
            // If NACK (not acked), clear address pointer
            if (acked) {
                this.i2cAddress = (this.i2cAddress + 1) % this.memory.size;
            } else {
                this.i2cAddress = null;
            }
        } else {
            // Error state: address pointer not set
            byte = 0xFF;
        }

        return byte;
    }

    /**
     * I2C Write byte
     * First write sets the address pointer, subsequent writes write to memory
     */
    i2cWriteByte(value: number): boolean {
        if (this.i2cAddress === null) {
            // First write: set the address pointer
            this.i2cAddress = value;
        } else {
            // Subsequent write: write to memory at current address
            this.memory[this.i2cAddress] = value;
            this.i2cAddress = null;
        }
        return true;
    }

    /**
     * Update the TICK register with elapsed time
     */
    private updateTime(): void {
        const elapsedTime = Date.now() - this.startTime;
        this.setRegister("TICK", elapsedTime);
    }
}