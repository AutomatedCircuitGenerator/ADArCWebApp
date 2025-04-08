import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {I2CController} from "@lib/i2c-bus";
import {Memory} from "@controllers/memory";

const TF_LUNA_LIDAR_ADDR = 0x10;

const REGISTERS = {
    DIST: { address: 0x00, size: 2 },
    FLUX: { address: 0x02, size: 2 },
    TEMP: { address: 0x04, size: 2 },
    TICK: { address: 0x06, size: 2 },
    ERROR: { address: 0x08, size: 2 },
} as const;

export class TFLunaLidarI2C extends Controller implements I2CController {
    private address : number | null = null;
    private memory = new Memory(128);
    private startTime: number;
    
    override update(state: Record<string, any>) {
        this.setRegister("DIST", state.distance);
    }
    
    setRegister(register: string, value: number) {
        this.memory.write(REGISTERS[register], value);
    }
    
    setup(): void {
        AVRRunner.getInstance().board.twis[0].registerController(this.id, this);
        this.address = null;
        this.startTime = Date.now();
        this.setRegister("FLUX", 200); 
        this.setRegister("TEMP", 2500);    
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {
    }

    i2cReadByte(acked: boolean): number {
        this.updateTime();
        let byte: number;
        if (this.address !== null) { // addr has been properly specified in a previous write
            byte = this.memory[this.address];
        } else { // error state, addr has not been specified
            byte = 0xff;
        }

        // if we get an ack, we increment the address for a sequential read, otherwise, we are done and clear the address
        this.address = acked ? (this.address + 1) % this.memory.size : null;
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
    
    private updateTime() {
        const elapsedTime = Date.now() - this.startTime;
        this.setRegister("TICK", elapsedTime);
    }
}