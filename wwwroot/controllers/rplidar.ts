import {Controller} from "./controller";
import {u8} from "@lib/avr8js/types";

// implements 
// https://github.com/robopeak/rplidar_arduino/tree/501a44d51c0b1eeee30c71ca64ed84b69b001c9b/RPLidarDriver/inc

// Commands without payload and response
const RPLIDAR_CMD_STOP = 0x25
const RPLIDAR_CMD_SCAN = 0x20
const RPLIDAR_CMD_FORCE_SCAN = 0x21
const RPLIDAR_CMD_RESET = 0x40


// Commands without payload but have response
const RPLIDAR_CMD_GET_DEVICE_INFO = 0x50
const RPLIDAR_CMD_GET_DEVICE_HEALTH = 0x52


// Response
const RPLIDAR_ANS_TYPE_MEASUREMENT = 0x81

const RPLIDAR_ANS_TYPE_DEVINFO = 0x4
const RPLIDAR_ANS_TYPE_DEVHEALTH = 0x6


const RPLIDAR_STATUS_OK = 0x0
const RPLIDAR_STATUS_WARNING = 0x1
const RPLIDAR_STATUS_ERROR = 0x2

const RPLIDAR_RESP_MEASUREMENT_SYNCBIT = (0x1 << 0)
const RPLIDAR_RESP_MEASUREMENT_QUALITY_SHIFT = 2
const RPLIDAR_RESP_MEASUREMENT_CHECKBIT = (0x1 << 0)
const RPLIDAR_RESP_MEASUREMENT_ANGLE_SHIFT = 1

// RP-Lidar Input Packets

const RPLIDAR_CMD_SYNC_BYTE = 0xA5
const RPLIDAR_CMDFLAG_HAS_PAYLOAD = 0x80


const RPLIDAR_ANS_SYNC_BYTE1 = 0xA5
const RPLIDAR_ANS_SYNC_BYTE2 = 0x5A

const RPLIDAR_ANS_PKTFLAG_LOOP = 0x1

export class RPLidarA1M9 extends Controller {

    private distance: number = 0;
    private angle: number = 0;
    private serialNumber: number = 1;
    //state
    private currentCmd: u8 | null = null;
    private inSync: boolean = false;
    private payloadSize:number;
    private payload:number;
    private checksum:number;//i dont think this matters
    //bytesRecv?

    setup() {
        this.pins.rx[0].usart.onByteTransmit = this.rxListener.bind(this);
    }


    //we will always get u8 sync and u8 cmd. will sometimes get u8 size of payload, (max 2^8) payload, and u8 checksum
    rxListener(value: u8) {
        if (value === RPLIDAR_CMD_SYNC_BYTE) {
            this.inSync = true;
        }
        while (this.inSync) {
            if (this.currentCmd == null){
                this.currentCmd = value;
            }
        }
        //completetransfer
//reset func
        this.inSync = false;
        this.currentCmd = null;
    }


    getDeviceHealth() {

    }
}