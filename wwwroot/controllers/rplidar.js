"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPLidarA1M9 = void 0;
const controller_1 = require("./controller");
const RPLIDAR_CMD_STOP = 0x25;
const RPLIDAR_CMD_SCAN = 0x20;
const RPLIDAR_CMD_FORCE_SCAN = 0x21;
const RPLIDAR_CMD_RESET = 0x40;
const RPLIDAR_CMD_GET_DEVICE_INFO = 0x50;
const RPLIDAR_CMD_GET_DEVICE_HEALTH = 0x52;
const RPLIDAR_ANS_TYPE_MEASUREMENT = 0x81;
const RPLIDAR_ANS_TYPE_DEVINFO = 0x4;
const RPLIDAR_ANS_TYPE_DEVHEALTH = 0x6;
const RPLIDAR_STATUS_OK = 0x0;
const RPLIDAR_STATUS_WARNING = 0x1;
const RPLIDAR_STATUS_ERROR = 0x2;
const RPLIDAR_RESP_MEASUREMENT_SYNCBIT = (0x1 << 0);
const RPLIDAR_RESP_MEASUREMENT_QUALITY_SHIFT = 2;
const RPLIDAR_RESP_MEASUREMENT_CHECKBIT = (0x1 << 0);
const RPLIDAR_RESP_MEASUREMENT_ANGLE_SHIFT = 1;
const RPLIDAR_CMD_SYNC_BYTE = 0xA5;
const RPLIDAR_CMDFLAG_HAS_PAYLOAD = 0x80;
const RPLIDAR_ANS_SYNC_BYTE1 = 0xA5;
const RPLIDAR_ANS_SYNC_BYTE2 = 0x5A;
const RPLIDAR_ANS_PKTFLAG_LOOP = 0x1;
class RPLidarA1M9 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.distance = 0;
        this.angle = 0;
        this.serialNumber = 1;
        this.currentCmd = null;
        this.inSync = false;
        this.payloadSize = null;
        this.payload = null;
        this.checksum = null;
    }
    setup() {
        this.pins.rx[0].usart.onByteTransmit = this.rxListener.bind(this);
    }
    rxListener(value) {
        if (value === RPLIDAR_CMD_SYNC_BYTE && !this.inSync) {
            this.inSync = true;
            return;
        }
        if (this.inSync) {
            if (this.currentCmd == null) {
                this.currentCmd = value;
                if (this.currentCmd == RPLIDAR_CMD_STOP ||
                    this.currentCmd == RPLIDAR_CMD_SCAN ||
                    this.currentCmd == RPLIDAR_CMD_FORCE_SCAN ||
                    this.currentCmd == RPLIDAR_CMD_RESET ||
                    this.currentCmd == RPLIDAR_CMD_GET_DEVICE_INFO ||
                    this.currentCmd == RPLIDAR_CMD_GET_DEVICE_HEALTH) {
                }
                return;
            }
            else if (this.payloadSize == null) {
                this.payloadSize = value;
                return;
            }
            else if (this.payload.length < this.payloadSize) {
                this.payload.push(value);
                return;
            }
            else {
                this.checksum = value;
                return;
            }
        }
        return this.notOk();
    }
    afterCmdFinishSelfReset() {
        this.inSync = false;
        this.currentCmd = null;
        this.payloadSize = null;
        this.payload = null;
        this.checksum = null;
    }
    notOk() {
    }
    cmdStop() {
    }
    cmdScan() {
    }
    cmdForceScan() {
    }
    cmdReset() {
    }
    cmdGetDeviceInfo() {
    }
    cmdGetDeviceHealth() {
    }
    writeBack() {
    }
}
exports.RPLidarA1M9 = RPLidarA1M9;
//# sourceMappingURL=rplidar.js.map