import {Controller} from "@controllers/controller";
import {I2CController} from "@lib/i2c-bus";
import {AVRRunner} from "@lib/execute";
import {Memory} from "@controllers/memory";

// https://github.com/sparkfun/SparkFun_ADXL345_Arduino_Library
// https://www.analog.com/media/en/technical-documentation/data-sheets/adxl345.pdf

//With the ALT ADDRESS pin high, the 7-bit
// I2C address for the device is 0x1D, followed by the R/W bit. This
// translates to 0x3A for a write and 0x3B for a read. An alternate
// I2C address of 0x53 (followed by the R/W bit) can be chosen by
// grounding the SDO/ALT ADDRESS pin (Pin 12)
export const ADXL345_ADDR = 0x53; //if SDO/ALT pin is grounded This translates to 0xA6 for a write and 0xA7 for a read.

const REGISTERS = {
    DEVID: {address: 0x00, size: 1},
    THRESH_TAP: {address: 0x1D, size: 1},
    OFSX: {address: 0x1E, size: 1}, //offsets get added to measurements before output
    OFSY: {address: 0x1F, size: 1},
    OFSZ: {address: 0x20, size: 1},
    DUR: {address: 0X21, size: 1},
    LATENT: {address: 0x22, size: 1},
    WINDOW: {address: 0x23, size: 1},
    THRESH_ACT: {address: 0x24, size: 1},
    THRES_INACT: {address: 0x25, size: 1},
    TIME_INACT: {address: 0x26, size: 1},
    ACT_INACT_CTL: {address: 0x27, size: 1},
    THRESH_FF: {address: 0x28, size: 1},
    TIME_FF: {address: 0x29, size: 1},
    TAP_AXES: {address: 0x2A, size: 1},
    ACT_TAP_STATUS: {address: 0x2B, size: 1},
    BW_RATE: {address: 0x2C, size: 1},
    POWER_CTL: {address: 0x2D, size: 1},
    INT_ENABLE: {address: 0x2E, size: 1},
    INT_MAP: {address: 0x2F, size: 1},
    INT_SOURCE: {address: 0x30, size: 1},
    DATA_FORMAT: {address: 0x31, size: 1}, // bit flags
    DATAX: {address: 0x32, size: 2}, // hi-low
    DATAY: {address: 0x34, size: 2},
    DATAZ: {address: 0x36, size: 2},
    FIFO_CTL: {address: 0x38, size: 1},
    FIFO_STATUS: {address: 0x39, size: 1},
} as const

//Only supports acceleration, not tap. Can add as a todo if needed
export class ADXL345I2C extends Controller implements I2CController {
    private address: null | number = null; // I2C has you write the address to read, and then calls read, so need to save
    private memory = new Memory(128);

    setMotion(moving: boolean) {
        if (moving) {
            this.setAccel(1, 1, 1); // in g
        } else {
            this.setAccel(0, 1, 0);
        }
    }

    setAccel(x: number, y: number, z: number) {
        this.setRegister("DATAX", x);
        this.setRegister("DATAY", y);
        this.setRegister("DATAZ", z);
    }

    setup() {
        AVRRunner.getInstance().twi.eventHandler.registerController(ADXL345_ADDR, this);
        this.memory.clear()
        this.address = null;
        this.setRegister("DEVID", 0xE5);
        this.setRegister("BW_RATE", 0xA);
        this.setRegister("INT_SOURCE", 0x2);
        this.setMotion(false);
        // this.setRegister("DATA_FORMAT", 0x0);
    }

    setRegister(register: string, value: number) {
        this.memory.write(REGISTERS[register], value);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {
    }

    i2cReadByte(acked: boolean): number {
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
}