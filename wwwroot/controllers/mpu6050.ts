import {Controller} from "@controllers/controller";
import {Memory} from "@controllers/memory";
import {I2CController} from "@lib/i2c-bus";
import {AVRRunner} from "@lib/execute";

export const I2C_MST_CTRL = 0x68; //68 if ad0 is low, els 69

type Register = {
    address: number;
    default?: number;
};

const registers: { [key: string]: Register } = {
    CONFIG: { address: 0x1A},
    GYRO_CONFIG: { address: 0x1B},
    ACCEL_CONFIG: { address: 0x1C},

    //Acceleration data registers
    ACCEL_XOUT_H: { address: 0x3B},
    ACCEL_XOUT_L: { address: 0x3C},
    ACCEL_YOUT_H: { address: 0x3D},
    ACCEL_YOUT_L: { address: 0x3E},
    ACCEL_ZOUT_H: { address: 0x3F},
    ACCEL_ZOUT_L: { address: 0x40},

    // Temperature registers
    TEMP_OUT_H: { address: 0x41 },
    TEMP_OUT_L: { address: 0x42 },

    //Gyroscope data registers
    GYRO_XOUT_H: { address: 0x43},
    GYRO_XOUT_L: { address: 0x44},
    GYRO_YOUT_H: { address: 0x45},
    GYRO_YOUT_L: { address: 0x46},
    GYRO_ZOUT_H: { address: 0x47},
    GYRO_ZOUT_L: { address: 0x48},

    //Euler Angle registers (no official euler angle registers)
    EULER_HEADING_H: { address: 0x49 },
    EULER_HEADING_L: { address: 0x4A },
    EULER_ROLL_H: { address: 0x4B },
    EULER_ROLL_L: { address: 0x4C },
    EULER_PITCH_H: { address: 0x4D },
    EULER_PITCH_L: { address: 0x4E },

    //Quaternion registers (no official quaternion registers)
    QUATERNIONW_H: { address: 0x4F },
    QUATERNIONW_L: { address: 0x50 },
    QUATERNIONX_H: { address: 0x51 },
    QUATERNIONX_L: { address: 0x52 },
    QUATERNIONY_H: { address: 0x53 },
    QUATERNIONY_L: { address: 0x54 },
    QUATERNIONZ_H: { address: 0x55 },
    QUATERNIONZ_L: { address: 0x56 },

    //Linear Acceleration data registers
    LINEAR_ACCEL_X_H: { address: 0x57},
    LINEAR_ACCEL_X_L: { address: 0x58},
    LINEAR_ACCEL_Y_H: { address: 0x59},
    LINEAR_ACCEL_Y_L: { address: 0x5A},
    LINEAR_ACCEL_Z_H: { address: 0x5B},
    LINEAR_ACCEL_Z_L: { address: 0x5C},
    
    //Other
    PWR_MGMT_1: { address: 0x6B,default:0x40},
    PWR_MGMT_2: {address: 0X6C,default:0x00},
    WHO_AM_I: {address: 0x75,default:0x68}
    
} as const;

type Vector = {x: number, y: number, z: number};
export class MPU6050 extends Controller implements I2CController {
    private address : number | null = null;
    private memory = new Uint8Array(128);
    private accelerometer: Vector = { x: 0, y: 0, z: 0 };
    private gyroscope: Vector = { x: 0, y: 0, z: 0 };
    private orientation: Vector = { x: 0, y: 0, z: 0 };
    private lastRead: number;
    private rotating = false;

    private setVector(address: number, vector: number[], scalar: number) {
        let writePointer = address;

        for (const num of vector) {
            const scaled = Math.round(num * scalar);
            const lsb = scaled & 0xFF;
            const msb = (scaled >> 8) & 0xFF;
            this.memory[writePointer] = lsb;
            writePointer++;
            this.memory[writePointer] = msb;
            writePointer++;
        }
    }

    private eulerToQuaternion(heading: number, roll: number, pitch: number) {
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        heading = toRadians(heading);
        roll = toRadians(roll);
        pitch = toRadians(pitch);

        const cy = Math.cos(heading * 0.5);
        const sy = Math.sin(heading * 0.5);
        const cr = Math.cos(roll * 0.5);
        const sr = Math.sin(roll * 0.5);
        const cp = Math.cos(pitch * 0.5);
        const sp = Math.sin(pitch * 0.5);

        const qx = sr * cp * cy - cr * sp * sy;
        const qy = cr * sp * cy + sr * cp * sy;
        const qz = cr * cp * sy - sr * sp * cy;
        const qw = cr * cp * cy + sr * sp * sy;

        return { x: qx, y: qy, z: qz, w: qw };
    }

    sensorControls = {
        setAcceleration: (x: number, y: number, z: number) => {
            this.accelerometer = {x, y, z};
            this.setVector(registers.ACCEL_XOUT_H.address, [x, y, z], 100);
            this.calculateOrientation();
        },
        setGyroscope: (x: number, y: number, z: number) => {
            this.gyroscope = {x, y, z};
            this.setVector(registers.GYRO_XOUT_H.address, [x, y, z], 16);
            this.calculateOrientation();
        },
        setTemp: (temp: number) => {
            this.memory[registers.TEMP_OUT_H.address] = temp;
        },
        setLinearAcceleration: (x: number, y: number, z: number) => {
            this.setVector(registers.LINEAR_ACCEL_X_H.address, [x, y, z], 100);
        },
    };

    private calculateOrientation() {
        const avgX = (this.accelerometer.x + this.gyroscope.x) / 2;
        const avgY = (this.accelerometer.y + this.gyroscope.y) / 2;
        const avgZ = (this.accelerometer.z + this.gyroscope.z) / 2;

        this.setVector(registers.EULER_HEADING_H.address, [avgX, avgY, avgZ], 16);
        const { w, x, y, z } = this.eulerToQuaternion(avgX, avgY, avgZ);
        this.setVector(registers.QUATERNIONW_H.address, [w, x, y, z], 16384);
    }


    setup(): void {
        AVRRunner.getInstance().board.twis[0].registerController(I2C_MST_CTRL, this);

        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            }
        }

        //this.sensorControls.setGravity(0.0, 0.0, 9.81);      // Sample gravity vector (m/s^2)
        this.sensorControls.setLinearAcceleration(0.1, 0.2, 0.3); // Sample linear acceleration (m/s^2)
        this.sensorControls.setTemp(75);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {}

    i2cReadByte(acked: boolean): number {
        let byte;
        if (this.address !== null) { // addr has been properly specified in a previous write
            if (this.address === registers.EULER_HEADING_H.address && this.rotating) {
                const currentTime = Date.now();
                const timeDiff = (this.lastRead !== undefined) ? (currentTime - this.lastRead) / 1000 : 0; // in seconds

                if (timeDiff > 0) {
                    // Integrate gyroscope data to update orientation
                    const gyroX = this.gyroscope.x * timeDiff; // Angular change in degrees
                    const gyroY = this.gyroscope.y * timeDiff;
                    const gyroZ = this.gyroscope.z * timeDiff;

                    // Update the orientation values (assuming you have `orientation` to store this)
                    this.orientation.x += gyroZ; // Using Z-axis for heading
                    this.orientation.y += gyroX;    // Using X-axis for pitch
                    this.orientation.z += gyroY;     // Using Y-axis for roll

                    // Normalize orientation values if necessary
                    this.orientation.x = this.orientation.x % 360; // Keep within 0-360 degrees
                    this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y)); // Limit pitch
                    this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z)); // Limit roll

                    // Update the last read timestamp
                    this.lastRead = currentTime;

                    // Update the euler angles in memory
                    this.setVector(registers.EULER_HEADING_H.address,
                        [this.orientation.x, this.orientation.y, this.orientation.z], 16);
                }
            }

            byte = this.memory[this.address];

            if (this.address === registers.EULER_PITCH_L.address && this.rotating) {
                this.lastRead = Date.now();
            }
        } else { // error state, addr has not been specified
            byte = 0xff;
        }

        // if we get an ack, we increment the address for a sequential read, otherwise, we are done and clear the address
        this.address = acked ? (this.address + 1) % this.memory.length : null;
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
