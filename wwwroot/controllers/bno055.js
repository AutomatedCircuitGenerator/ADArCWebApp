"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BNO055 = exports.BNO055_ADDR = void 0;
const controller_1 = require("@controllers/controller");
exports.BNO055_ADDR = 0x28;
const registers = {
    CHIP_ID: { address: 0x00, default: 0xA0 },
    ACCEL_X_LSB: { address: 0x08 },
    ACCEL_X_MSB: { address: 0x09 },
    ACCEL_Y_LSB: { address: 0x0A },
    ACCEL_Y_MSB: { address: 0x0B },
    ACCEL_Z_LSB: { address: 0x0C },
    ACCEL_Z_MSB: { address: 0x0D },
    MAG_X_LSB: { address: 0x0E },
    MAG_X_MSB: { address: 0x0F },
    MAG_Y_LSB: { address: 0x10 },
    MAG_Y_MSB: { address: 0x11 },
    MAG_Z_LSB: { address: 0x12 },
    MAG_Z_MSB: { address: 0x13 },
    GYRO_X_LSB: { address: 0x14 },
    GYRO_X_MSB: { address: 0x15 },
    GYRO_Y_LSB: { address: 0x16 },
    GYRO_Y_MSB: { address: 0x17 },
    GYRO_Z_LSB: { address: 0x18 },
    GYRO_Z_MSB: { address: 0x19 },
    EULER_HEADING_LSB: { address: 0x1A },
    EULER_HEADING_MSB: { address: 0x1B },
    EULER_ROLL_LSB: { address: 0x1C },
    EULER_ROLL_MSB: { address: 0x1D },
    EULER_PITCH_LSB: { address: 0x1E },
    EULER_PITCH_MSB: { address: 0x1F },
    QUATERNION_W_LSB: { address: 0x20 },
    QUATERNION_W_MSB: { address: 0x21 },
    QUATERNION_X_LSB: { address: 0x22 },
    QUATERNION_X_MSB: { address: 0x23 },
    QUATERNION_Y_LSB: { address: 0x24 },
    QUATERNION_Y_MSB: { address: 0x25 },
    QUATERNION_Z_LSB: { address: 0x26 },
    QUATERNION_Z_MSB: { address: 0x27 },
    LINEAR_ACCEL_X_LSB: { address: 0x28 },
    LINEAR_ACCEL_X_MSB: { address: 0x29 },
    LINEAR_ACCEL_Y_LSB: { address: 0x2A },
    LINEAR_ACCEL_Y_MSB: { address: 0x2B },
    LINEAR_ACCEL_Z_LSB: { address: 0x2C },
    LINEAR_ACCEL_Z_MSB: { address: 0x2D },
    GRAVITY_X_LSB: { address: 0x2E },
    GRAVITY_X_MSB: { address: 0x2F },
    GRAVITY_Y_LSB: { address: 0x30 },
    GRAVITY_Y_MSB: { address: 0x31 },
    GRAVITY_Z_LSB: { address: 0x32 },
    GRAVITY_Z_MSB: { address: 0x33 },
    TEMP: { address: 0x34 },
    CALIBRATION: { address: 0x35, default: 0xFF },
};
class BNO055 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.address = null;
        this.memory = new Uint8Array(128);
        this.accelerometer = { x: 0, y: 0, z: 0 };
        this.gyroscope = { x: 0, y: 0, z: 0 };
        this.magnetometer = { x: 0, y: 0, z: 0 };
        this.orientation = { x: 0, y: 0, z: 0 };
        this.rotating = false;
        this.sensorControls = {
            setAcceleration: (x, y, z) => {
                this.accelerometer = { x, y, z };
                this.setVector(registers.ACCEL_X_LSB.address, [x, y, z], 100);
                this.calculateOrientation();
            },
            setGravity: (x, y, z) => {
                this.setVector(registers.GRAVITY_X_LSB.address, [x, y, z], 100);
            },
            setMagnetometer: (x, y, z) => {
                this.magnetometer = { x, y, z };
                this.setVector(registers.MAG_X_LSB.address, [x, y, z], 16);
                this.calculateOrientation();
            },
            setGyroscope: (x, y, z) => {
                this.gyroscope = { x, y, z };
                this.setVector(registers.GYRO_X_LSB.address, [x, y, z], 16);
                this.calculateOrientation();
            },
            setLinearAcceleration: (x, y, z) => {
                this.setVector(registers.LINEAR_ACCEL_X_LSB.address, [x, y, z], 100);
            },
            setTemp: (temp) => {
                this.memory[registers.TEMP.address] = temp;
            },
        };
    }
    setVector(address, vector, scalar) {
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
    eulerToQuaternion(heading, roll, pitch) {
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
    update(state) {
        this.setMotion(state.motion === "Rotating");
    }
    setMotion(rotating) {
        if (rotating) {
            this.sensorControls.setGyroscope(0, 0, 90);
        }
        this.rotating = rotating;
    }
    calculateOrientation() {
        const avgX = (this.accelerometer.x + this.gyroscope.x + this.magnetometer.x) / 3;
        const avgY = (this.accelerometer.y + this.gyroscope.y + this.magnetometer.y) / 3;
        const avgZ = (this.accelerometer.z + this.gyroscope.z + this.magnetometer.z) / 3;
        this.setVector(registers.EULER_HEADING_LSB.address, [avgX, avgY, avgZ], 16);
        const { w, x, y, z } = this.eulerToQuaternion(avgX, avgY, avgZ);
        this.setVector(registers.QUATERNION_W_LSB.address, [w, x, y, z], 16384);
    }
    setup() {
        this.pins.sda[0].twi.registerController(this.id, this);
        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            }
        }
        this.sensorControls.setGravity(0.0, 0.0, 9.81);
        this.sensorControls.setLinearAcceleration(0.1, 0.2, 0.3);
        this.sensorControls.setTemp(75);
    }
    i2cConnect(addr, write) {
        return true;
    }
    i2cDisconnect() { }
    i2cReadByte(acked) {
        let byte;
        if (this.address !== null) {
            if (this.address === registers.EULER_HEADING_LSB.address && this.rotating) {
                const currentTime = Date.now();
                const timeDiff = (this.lastRead !== undefined) ? (currentTime - this.lastRead) / 1000 : 0;
                if (timeDiff > 0) {
                    const gyroX = this.gyroscope.x * timeDiff;
                    const gyroY = this.gyroscope.y * timeDiff;
                    const gyroZ = this.gyroscope.z * timeDiff;
                    this.orientation.x += gyroZ;
                    this.orientation.y += gyroX;
                    this.orientation.z += gyroY;
                    this.orientation.x = this.orientation.x % 360;
                    this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y));
                    this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z));
                    this.lastRead = currentTime;
                    this.setVector(registers.EULER_HEADING_LSB.address, [this.orientation.x, this.orientation.y, this.orientation.z], 16);
                }
            }
            byte = this.memory[this.address];
            if (this.address === registers.EULER_PITCH_MSB.address && this.rotating) {
                this.lastRead = Date.now();
            }
        }
        else {
            byte = 0xff;
        }
        this.address = acked ? (this.address + 1) % this.memory.length : null;
        return byte;
    }
    i2cWriteByte(value) {
        if (this.address !== null) {
            this.memory[this.address] = value;
            this.address = null;
        }
        else {
            this.address = value;
        }
        return true;
    }
}
exports.BNO055 = BNO055;
//# sourceMappingURL=bno055.js.map