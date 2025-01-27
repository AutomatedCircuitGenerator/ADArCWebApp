import {Controller} from "@controllers/controller";
import {Memory} from "@controllers/memory";
import {I2CController} from "@lib/i2c-bus";
import {AVRRunner} from "@lib/execute";

// I2C address for the MPU6050 (0x68 when AD0 pin is low, 0x69 when high), *not functional*
export const I2C_MST_CTRL = 0x68;

type Register = {
    address: number;
    default?: number;
};

// Complete register map matching the real MPU6050 sensor
const registers: { [key: string]: Register } = {
    // Configuration registers
    CONFIG: {address: 0x1A},
    GYRO_CONFIG: {address: 0x1B},
    ACCEL_CONFIG: {address: 0x1C},

    // Acceleration data registers
    ACCEL_XOUT_H: {address: 0x3B},
    ACCEL_XOUT_L: {address: 0x3C},
    ACCEL_YOUT_H: {address: 0x3D},
    ACCEL_YOUT_L: {address: 0x3E},
    ACCEL_ZOUT_H: {address: 0x3F},
    ACCEL_ZOUT_L: {address: 0x40},

    // Temperature registers
    TEMP_OUT_H: {address: 0x41},
    TEMP_OUT_L: {address: 0x42},

    // Gyroscope data registers
    GYRO_XOUT_H: {address: 0x43},
    GYRO_XOUT_L: {address: 0x44},
    GYRO_YOUT_H: {address: 0x45},
    GYRO_YOUT_L: {address: 0x46},
    GYRO_ZOUT_H: {address: 0x47},
    GYRO_ZOUT_L: {address: 0x48},

    // Extended functionality - Euler angle registers (simulated)
    EULER_HEADING_H: {address: 0x49},
    EULER_HEADING_L: {address: 0x4A},
    EULER_ROLL_H: {address: 0x4B},
    EULER_ROLL_L: {address: 0x4C},
    EULER_PITCH_H: {address: 0x4D},
    EULER_PITCH_L: {address: 0x4E},

    // Extended functionality - Quaternion registers (simulated)
    QUATERNIONW_H: {address: 0x4F},
    QUATERNIONW_L: {address: 0x50},
    QUATERNIONX_H: {address: 0x51},
    QUATERNIONX_L: {address: 0x52},
    QUATERNIONY_H: {address: 0x53},
    QUATERNIONY_L: {address: 0x54},
    QUATERNIONZ_H: {address: 0x55},
    QUATERNIONZ_L: {address: 0x56},

    // Extended functionality - Linear acceleration registers (simulated)
    LINEAR_ACCEL_X_H: {address: 0x57},
    LINEAR_ACCEL_X_L: {address: 0x58},
    LINEAR_ACCEL_Y_H: {address: 0x59},
    LINEAR_ACCEL_Y_L: {address: 0x5A},
    LINEAR_ACCEL_Z_H: {address: 0x5B},
    LINEAR_ACCEL_Z_L: {address: 0x5C},

    // Power management and device identification
    PWR_MGMT_1: {address: 0x6B, default: 0x40},
    PWR_MGMT_2: {address: 0x6C, default: 0x00},
    WHO_AM_I: {address: 0x75, default: 0x68}
} as const;

type Vector = { x: number, y: number, z: number };

export class MPU6050 extends Controller implements I2CController {
    private address: number | null = null;
    private memory = new Uint8Array(128);
    private accelerometer: Vector = {x: 0, y: 0, z: 1};  // Initialize with gravity on Z-axis
    private gyroscope: Vector = {x: 0, y: 0, z: 0};
    private orientation: Vector = {x: 0, y: 0, z: 0};
    private lastRead: number = Date.now();
    private rotating = false;
    private temperature = 25.0;  // Start at room temperature (25°C)

    // Add realistic sensor noise
    private addSensorNoise(value: number, magnitude: number = 0.01): number {
        return value + (Math.random() - 0.5) * magnitude;
    }

    // Convert temperature to MPU6050 format
    private encodeTemperature(celsius: number): number {
        return Math.round((celsius - 36.53) * 340);
    }

    private setVector(address: number, vector: number[], scalar: number) {
        let writePointer = address;

        for (const num of vector) {
            const noisyValue = this.addSensorNoise(num);
            const scaled = Math.round(noisyValue * scalar);
            const msb = (scaled >> 8) & 0xFF;
            const lsb = scaled & 0xFF;
            this.memory[writePointer] = msb;
            writePointer++;
            this.memory[writePointer] = lsb;
            writePointer++;
        }
    }

    private eulerToQuaternion(heading: number, roll: number, pitch: number) {
        const toRadians = (degrees: number) => degrees * (Math.PI / 180);

        heading = toRadians(heading);
        roll = toRadians(roll);
        pitch = toRadians(pitch);

        const cy = Math.cos(heading * 0.5);
        const sy = Math.sin(heading * 0.5);
        const cr = Math.cos(roll * 0.5);
        const sr = Math.sin(roll * 0.5);
        const cp = Math.cos(pitch * 0.5);
        const sp = Math.sin(pitch * 0.5);

        const qw = cr * cp * cy + sr * sp * sy;
        const qx = sr * cp * cy - cr * sp * sy;
        const qy = cr * sp * cy + sr * cp * sy;
        const qz = cr * cp * sy - sr * sp * cy;

        return {w: qw, x: qx, y: qy, z: qz};
    }

    private calculateOrientation() {
        const currentTime = Date.now();
        const timeDiff = (currentTime - this.lastRead) / 1000;
        this.lastRead = currentTime;

        if (this.rotating && timeDiff > 0) {
            // Update orientation based on gyroscope readings
            this.orientation.x += this.gyroscope.z * timeDiff;
            this.orientation.y += this.gyroscope.x * timeDiff;
            this.orientation.z += this.gyroscope.y * timeDiff;

            // Normalize angles to valid ranges
            this.orientation.x = this.orientation.x % 360;
            this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y));
            this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z));

            // Calculate gravity distribution based on orientation
            const gravityX = Math.sin(this.orientation.y * Math.PI / 180) * 9.81;
            const gravityY = -Math.sin(this.orientation.z * Math.PI / 180) * 9.81;
            const gravityZ = Math.cos(this.orientation.y * Math.PI / 180) *
                Math.cos(this.orientation.z * Math.PI / 180) * 9.81;

            this.accelerometer = {x: gravityX, y: gravityY, z: gravityZ};
        }

        // Update all sensor registers
        this.setVector(registers.ACCEL_XOUT_H.address,
            [this.accelerometer.x, this.accelerometer.y, this.accelerometer.z],
            16384 / 9.81);  // Convert to sensor units (16384 = 1g)

        this.setVector(registers.GYRO_XOUT_H.address,
            [this.gyroscope.x, this.gyroscope.y, this.gyroscope.z],
            131);  // Convert to sensor units (131 = 1 degree/sec)

        this.setVector(registers.EULER_HEADING_H.address,
            [this.orientation.x, this.orientation.y, this.orientation.z],
            16);

        const quaternion = this.eulerToQuaternion(
            this.orientation.x,
            this.orientation.z,
            this.orientation.y
        );
        this.setVector(registers.QUATERNIONW_H.address,
            [quaternion.w, quaternion.x, quaternion.y, quaternion.z],
            16384);
    }

    setMotion(rotating: boolean) {
        if (rotating) {
            this.sensorControls.setGyroscope(0, 0, 90);
        } else {
            this.sensorControls.setGyroscope(0, 0, 0);
        }
        this.rotating = rotating;
    }

    sensorControls = {
        setAcceleration: (x: number, y: number, z: number) => {
            this.accelerometer = {x, y, z};
            this.calculateOrientation();
        },

        setGyroscope: (x: number, y: number, z: number) => {
            this.gyroscope = {x, y, z};
            this.rotating = (x !== 0 || y !== 0 || z !== 0);
            this.calculateOrientation();
        },

        setTemp: (temp: number) => {
            this.temperature = temp;
            const encoded = this.encodeTemperature(temp);
            this.memory[registers.TEMP_OUT_H.address] = (encoded >> 8) & 0xFF;
            this.memory[registers.TEMP_OUT_L.address] = encoded & 0xFF;
        },

        setOrientation: (pitch: number, roll: number, yaw: number) => {
            this.orientation = {x: yaw, y: pitch, z: roll};
            this.calculateOrientation();
        }
    };

    setup(): void {
        this.pins.sda[0].twi.registerController(this.id, this);

        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            }
        }

        this.sensorControls.setTemp(25);
        this.calculateOrientation();
        this.element.querySelector("#mpuLed").setAttribute("fill", "#80ff80");
    }

    cleanup() {
        this.element.querySelector("#mpuLed").setAttribute("fill", "none");
    }

    i2cConnect(addr: number, write: boolean): boolean {
        return true;
    }

    i2cDisconnect(): void {
    }

    i2cReadByte(acked: boolean): number {
        let byte: number;
        if (this.address !== null) {
            this.calculateOrientation();
            byte = this.memory[this.address];
        } else {
            byte = 0xff;
        }

        this.address = acked ? (this.address + 1) % this.memory.length : null;
        return byte;
    }

    i2cWriteByte(value: number): boolean {
        if (this.address !== null) {
            this.memory[this.address] = value;
            if (this.address === registers.PWR_MGMT_1.address) {
                const isResetBitSet: boolean = ((value >> 7) & 0xFF) == 1;
                if (isResetBitSet) {
                    this.reset();
                }
            }
            this.address = null;
        } else {
            this.address = value;
        }
        return true;
    }

    private reset() {
        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            } else {
                this.memory[register.address] = 0;
            }
        }
        this.memory[registers.PWR_MGMT_1.address] = 0; // Default value is 1 in msb, lib expects 0 after reset
    }
}