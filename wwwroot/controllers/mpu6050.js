"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPU6050 = exports.I2C_MST_CTRL = void 0;
const controller_1 = require("@controllers/controller");
exports.I2C_MST_CTRL = 0x68;
const registers = {
    CONFIG: { address: 0x1A },
    GYRO_CONFIG: { address: 0x1B },
    ACCEL_CONFIG: { address: 0x1C },
    ACCEL_XOUT_H: { address: 0x3B },
    ACCEL_XOUT_L: { address: 0x3C },
    ACCEL_YOUT_H: { address: 0x3D },
    ACCEL_YOUT_L: { address: 0x3E },
    ACCEL_ZOUT_H: { address: 0x3F },
    ACCEL_ZOUT_L: { address: 0x40 },
    TEMP_OUT_H: { address: 0x41 },
    TEMP_OUT_L: { address: 0x42 },
    GYRO_XOUT_H: { address: 0x43 },
    GYRO_XOUT_L: { address: 0x44 },
    GYRO_YOUT_H: { address: 0x45 },
    GYRO_YOUT_L: { address: 0x46 },
    GYRO_ZOUT_H: { address: 0x47 },
    GYRO_ZOUT_L: { address: 0x48 },
    EULER_HEADING_H: { address: 0x49 },
    EULER_HEADING_L: { address: 0x4A },
    EULER_ROLL_H: { address: 0x4B },
    EULER_ROLL_L: { address: 0x4C },
    EULER_PITCH_H: { address: 0x4D },
    EULER_PITCH_L: { address: 0x4E },
    QUATERNIONW_H: { address: 0x4F },
    QUATERNIONW_L: { address: 0x50 },
    QUATERNIONX_H: { address: 0x51 },
    QUATERNIONX_L: { address: 0x52 },
    QUATERNIONY_H: { address: 0x53 },
    QUATERNIONY_L: { address: 0x54 },
    QUATERNIONZ_H: { address: 0x55 },
    QUATERNIONZ_L: { address: 0x56 },
    LINEAR_ACCEL_X_H: { address: 0x57 },
    LINEAR_ACCEL_X_L: { address: 0x58 },
    LINEAR_ACCEL_Y_H: { address: 0x59 },
    LINEAR_ACCEL_Y_L: { address: 0x5A },
    LINEAR_ACCEL_Z_H: { address: 0x5B },
    LINEAR_ACCEL_Z_L: { address: 0x5C },
    PWR_MGMT_1: { address: 0x6B, default: 0x40 },
    PWR_MGMT_2: { address: 0x6C, default: 0x00 },
    WHO_AM_I: { address: 0x75, default: 0x68 }
};
class MPU6050 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.address = null;
        this.memory = new Uint8Array(128);
        this.accelerometer = { x: 0, y: 0, z: 1 };
        this.gyroscope = { x: 0, y: 0, z: 0 };
        this.orientation = { x: 0, y: 0, z: 0 };
        this.lastRead = Date.now();
        this.rotating = false;
        this.temperature = 25.0;
        this.sensorControls = {
            setAcceleration: (x, y, z) => {
                this.accelerometer = { x, y, z };
                this.calculateOrientation();
            },
            setGyroscope: (x, y, z) => {
                this.gyroscope = { x, y, z };
                this.rotating = (x !== 0 || y !== 0 || z !== 0);
                this.calculateOrientation();
            },
            setTemp: (temp) => {
                this.temperature = temp;
                const encoded = this.encodeTemperature(temp);
                this.memory[registers.TEMP_OUT_H.address] = (encoded >> 8) & 0xFF;
                this.memory[registers.TEMP_OUT_L.address] = encoded & 0xFF;
            },
            setOrientation: (pitch, roll, yaw) => {
                this.orientation = { x: yaw, y: pitch, z: roll };
                this.calculateOrientation();
            }
        };
    }
    addSensorNoise(value, magnitude = 0.01) {
        return value + (Math.random() - 0.5) * magnitude;
    }
    encodeTemperature(celsius) {
        return Math.round((celsius - 36.53) * 340);
    }
    setVector(address, vector, scalar) {
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
        const qw = cr * cp * cy + sr * sp * sy;
        const qx = sr * cp * cy - cr * sp * sy;
        const qy = cr * sp * cy + sr * cp * sy;
        const qz = cr * cp * sy - sr * sp * cy;
        return { w: qw, x: qx, y: qy, z: qz };
    }
    calculateOrientation() {
        const currentTime = Date.now();
        const timeDiff = (currentTime - this.lastRead) / 1000;
        this.lastRead = currentTime;
        if (this.rotating && timeDiff > 0) {
            this.orientation.x += this.gyroscope.z * timeDiff;
            this.orientation.y += this.gyroscope.x * timeDiff;
            this.orientation.z += this.gyroscope.y * timeDiff;
            this.orientation.x = this.orientation.x % 360;
            this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y));
            this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z));
            const gravityX = Math.sin(this.orientation.y * Math.PI / 180) * 9.81;
            const gravityY = -Math.sin(this.orientation.z * Math.PI / 180) * 9.81;
            const gravityZ = Math.cos(this.orientation.y * Math.PI / 180) *
                Math.cos(this.orientation.z * Math.PI / 180) * 9.81;
            this.accelerometer = { x: gravityX, y: gravityY, z: gravityZ };
        }
        this.setVector(registers.ACCEL_XOUT_H.address, [this.accelerometer.x, this.accelerometer.y, this.accelerometer.z], 16384 / 9.81);
        this.setVector(registers.GYRO_XOUT_H.address, [this.gyroscope.x, this.gyroscope.y, this.gyroscope.z], 131);
        this.setVector(registers.EULER_HEADING_H.address, [this.orientation.x, this.orientation.y, this.orientation.z], 16);
        const quaternion = this.eulerToQuaternion(this.orientation.x, this.orientation.z, this.orientation.y);
        this.setVector(registers.QUATERNIONW_H.address, [quaternion.w, quaternion.x, quaternion.y, quaternion.z], 16384);
    }
    update(state) {
        this.setMotion(state.motion === "Rotating");
    }
    setMotion(rotating) {
        if (rotating) {
            this.sensorControls.setGyroscope(0, 0, 90);
        }
        else {
            this.sensorControls.setGyroscope(0, 0, 0);
        }
        this.rotating = rotating;
    }
    setup() {
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
    i2cConnect(addr, write) {
        return true;
    }
    i2cDisconnect() {
    }
    i2cReadByte(acked) {
        let byte;
        if (this.address !== null) {
            this.calculateOrientation();
            byte = this.memory[this.address];
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
            if (this.address === registers.PWR_MGMT_1.address) {
                const isResetBitSet = ((value >> 7) & 0xFF) == 1;
                if (isResetBitSet) {
                    this.reset();
                }
            }
            this.address = null;
        }
        else {
            this.address = value;
        }
        return true;
    }
    reset() {
        for (const register of Object.values(registers)) {
            if (register.default) {
                this.memory[register.address] = register.default;
            }
            else {
                this.memory[register.address] = 0;
            }
        }
        this.memory[registers.PWR_MGMT_1.address] = 0;
    }
}
exports.MPU6050 = MPU6050;
//# sourceMappingURL=mpu6050.js.map