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

    // Accelerometer Data Registers
    ACCEL_X_LSB: { address: 0x08 },
    ACCEL_X_MSB: { address: 0x09 },
    ACCEL_Y_LSB: { address: 0x0A },
    ACCEL_Y_MSB: { address: 0x0B },
    ACCEL_Z_LSB: { address: 0x0C },
    ACCEL_Z_MSB: { address: 0x0D },

    // Magnetometer Data Registers
    MAG_X_LSB: { address: 0x0E },
    MAG_X_MSB: { address: 0x0F },
    MAG_Y_LSB: { address: 0x10 },
    MAG_Y_MSB: { address: 0x11 },
    MAG_Z_LSB: { address: 0x12 },
    MAG_Z_MSB: { address: 0x13 },

    // Gyroscope Data Registers
    GYRO_X_LSB: { address: 0x14 },
    GYRO_X_MSB: { address: 0x15 },
    GYRO_Y_LSB: { address: 0x16 },
    GYRO_Y_MSB: { address: 0x17 },
    GYRO_Z_LSB: { address: 0x18 },
    GYRO_Z_MSB: { address: 0x19 },

    // Euler Data Registers
    EULER_HEADING_LSB: { address: 0x1A },
    EULER_HEADING_MSB: { address: 0x1B },
    EULER_ROLL_LSB: { address: 0x1C },
    EULER_ROLL_MSB: { address: 0x1D },
    EULER_PITCH_LSB: { address: 0x1E },
    EULER_PITCH_MSB: { address: 0x1F },

    // Quaternion Data Registers
    QUATERNION_W_LSB: { address: 0x20 },
    QUATERNION_W_MSB: { address: 0x21 },
    QUATERNION_X_LSB: { address: 0x22 },
    QUATERNION_X_MSB: { address: 0x23 },
    QUATERNION_Y_LSB: { address: 0x24 },
    QUATERNION_Y_MSB: { address: 0x25 },
    QUATERNION_Z_LSB: { address: 0x26 },
    QUATERNION_Z_MSB: { address: 0x27 },

    // Linear Acceleration Data Registers
    LINEAR_ACCEL_X_LSB: { address: 0x28 },
    LINEAR_ACCEL_X_MSB: { address: 0x29 },
    LINEAR_ACCEL_Y_LSB: { address: 0x2A },
    LINEAR_ACCEL_Y_MSB: { address: 0x2B },
    LINEAR_ACCEL_Z_LSB: { address: 0x2C },
    LINEAR_ACCEL_Z_MSB: { address: 0x2D },

    // Gravity Data Registers
    GRAVITY_X_LSB: { address: 0x2E },
    GRAVITY_X_MSB: { address: 0x2F },
    GRAVITY_Y_LSB: { address: 0x30 },
    GRAVITY_Y_MSB: { address: 0x31 },
    GRAVITY_Z_LSB: { address: 0x32 },
    GRAVITY_Z_MSB: { address: 0x33 },

    // Temperature Register
    TEMP: { address: 0x34 },
    
    // Calibration
    CALIBRATION: { address: 0x35, default: 0xFF },
} as const;

type Vector = {x: number, y: number, z: number};
export class BNO055 extends Controller implements I2CController {
    private address : number | null = null;
    private memory = new Uint8Array(128);
    private accelerometer: Vector = { x: 0, y: 0, z: 0 };
    private gyroscope: Vector = { x: 0, y: 0, z: 0 };
    private magnetometer: Vector = { x: 0, y: 0, z: 0 };
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
    
    setMotion(rotating: boolean) {
        if (rotating) {
            this.sensorControls.setGyroscope(0, 0, 90);
        }
        this.rotating = rotating;
    }

    sensorControls = {
        setAcceleration: (x: number, y: number, z: number) => {
            this.accelerometer = {x, y, z};
            this.setVector(registers.ACCEL_X_LSB.address, [x, y, z], 100);
            this.calculateOrientation();
        },
        setGravity: (x: number, y: number, z: number) => {
            this.setVector(registers.GRAVITY_X_LSB.address, [x, y, z], 100);
        },
        setMagnetometer: (x: number, y: number, z: number) => {
            this.magnetometer = {x, y, z};
            this.setVector(registers.MAG_X_LSB.address, [x, y, z], 16);
            this.calculateOrientation();
        },
        setGyroscope: (x: number, y: number, z: number) => {
            this.gyroscope = {x, y, z};
            this.setVector(registers.GYRO_X_LSB.address, [x, y, z], 16);
            this.calculateOrientation();
        },
        setLinearAcceleration: (x: number, y: number, z: number) => {
            this.setVector(registers.LINEAR_ACCEL_X_LSB.address, [x, y, z], 100);
        },
        setTemp: (temp: number) => {
            this.memory[registers.TEMP.address] = temp;
        },
    };
    
    private calculateOrientation() {
        const avgX = (this.accelerometer.x + this.gyroscope.x + this.magnetometer.x) / 3;
        const avgY = (this.accelerometer.y + this.gyroscope.y + this.magnetometer.y) / 3;
        const avgZ = (this.accelerometer.z + this.gyroscope.z + this.magnetometer.z) / 3;

        this.setVector(registers.EULER_HEADING_LSB.address, [avgX, avgY, avgZ], 16);
        const { w, x, y, z } = this.eulerToQuaternion(avgX, avgY, avgZ);
        this.setVector(registers.QUATERNION_W_LSB.address, [w, x, y, z], 16384);
    }
    
    setup(): void {
        this.pins.sda[0].twi.registerController(this.id, this);
        
        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            }
        }

        this.sensorControls.setGravity(0.0, 0.0, 9.81);      // Sample gravity vector (m/s^2)
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
            if (this.address === registers.EULER_HEADING_LSB.address && this.rotating) { 
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
                    this.setVector(registers.EULER_HEADING_LSB.address,
                        [this.orientation.x, this.orientation.y, this.orientation.z], 16);
                }
            }
            
            byte = this.memory[this.address]; 
            
            if (this.address === registers.EULER_PITCH_MSB.address && this.rotating) {
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