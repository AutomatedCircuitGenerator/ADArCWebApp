import {Controller} from "@controllers/controller";
import {I2CController} from "@lib/i2c-bus";
import {AVRRunner} from "@lib/execute";

export const BNO055_ADDR = 0x28;

type Register = {
    address: number;
    default?: number;
};

const registers: { [key: string]: Register } = {
    CHIP_ID: { address: 0x00, default: 0xA0 },
    EULER_HEADING_LSB: { address: 0x1A, default: 0x00 }, // 45° LSB
    EULER_HEADING_MSB: { address: 0x1B, default: 0x20 }, // 45° MSB
    EULER_ROLL_LSB: { address: 0x1C, default: 0x00 },   // Assuming 0° for roll
    EULER_ROLL_MSB: { address: 0x1D, default: 0x00 },
    EULER_PITCH_LSB: { address: 0x1E, default: 0x00 },  // Assuming 0° for pitch
    EULER_PITCH_MSB: { address: 0x1F, default: 0x00 },
};

export class BNO055 extends Controller implements I2CController {
    private address : number | null = null;
    private memory = new Uint8Array(128);
    
    reset(): void {
        for (const register of Object.values(registers)) {
            this.memory[register.address] = register.default ?? 0;
        }
    }

    setup(): void {
        AVRRunner.getInstance().twi.eventHandler.registerController(BNO055_ADDR, this);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {}

    i2cReadByte(acked: boolean): number {
        let byte;
        if (this.address !== null) { // addr has been properly specified in a previous write
            byte = this.memory[this.address]; 
        } else { // error state, addr has not been specified
            byte = 0xff;
        }
        this.address = null;
        return byte;
    }

    i2cWriteByte(value: number): boolean {
        if (this.address !== null) { // addr has been specified in a previous write, time to write to memory
            this.memory[this.address] = value;
            this.address = null;
        } else { // we are setting the addr to prepare for a read/write
            this.address = value;
        }
        return true;
    }
    
}