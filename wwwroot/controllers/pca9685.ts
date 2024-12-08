import {Controller} from "@controllers/controller";
import {I2CController} from "@lib/i2c-bus";
import {Memory} from "@controllers/memory";

const SERVO_MIN = 150;
const SERVO_MAX = 600;

const REGISTERS = {
    LED0_ON: { address: 0x6, size: 2 },
    LED0_OFF: { address: 0x8, size: 2 },
} as const;

export class PCA9685 extends Controller implements I2CController {
    private address : number | null = null;
    private memory = new Memory(128);

    setup(): void {
        this.pins.sda[0].twi.registerController(this.id, this);
        this.memory.clear();
        this.address = null;
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {
        this.address = null;
    }

    i2cReadByte(acked: boolean): number {
        let byte: number;
        if (this.address !== null) { // addr has been properly specified in a previous write
            byte = this.memory[this.address];
        } else { // error state, addr has not been specified
            byte = 0xff;
        }

        this.address = this.address + 1 % this.memory.size;
        return byte;
    }

    i2cWriteByte(value: number): boolean {
        if (this.address !== null) { // addr has been specified in a previous write, time to write to memory
            this.memory[this.address] = value;
            if (this.address === 0x9) {
                this.renderHorn(this.calculateAngle());
            }
            this.address = this.address + 1 % this.memory.size;
        } else { // we are setting the addr to prepare for a read/write
            this.address = value;
        }
        return true;
    }

    private renderHorn(angle: number) {
        const horn = this.element.querySelector<SVGPathElement>(".horn");
        horn.style.transform = `rotate(${angle}deg)`;
    }
    
    private calculateAngle() {
        const on = this.memory.read(REGISTERS.LED0_ON);
        const off = this.memory.read(REGISTERS.LED0_OFF);
        
        const pulse = off - on;

        // Map the pulse width to the servo angle range
        const angle = ((pulse - SERVO_MIN) / (SERVO_MAX - SERVO_MIN)) * 180;

        return Math.max(0, Math.min(180, angle)); // Clamp the angle to the range [0, 180]
    }
}