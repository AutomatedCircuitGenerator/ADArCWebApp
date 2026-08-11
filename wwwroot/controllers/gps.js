"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPS = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class GPS extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._latitude = 20.0;
        this._longitude = 40.0;
        this._fix = 1.0;
        this._quality = 1.0;
        this._speed = 0.0;
        this._angle = 0.0;
        this._altitude = 100.0;
        this._satellites = 8.0;
    }
    update(state) {
        if (typeof state.latitude === "number")
            this._latitude = state.latitude;
        if (typeof state.longitude === "number")
            this._longitude = state.longitude;
        if (typeof state.fix === "number")
            this._fix = state.fix;
        if (typeof state.quality === "number")
            this._quality = state.quality;
        if (typeof state.speed === "number")
            this._speed = state.speed;
        if (typeof state.angle === "number")
            this._angle = state.angle;
        if (typeof state.altitude === "number")
            this._altitude = state.altitude;
        if (typeof state.satellites === "number")
            this._satellites = state.satellites;
    }
    setParam(key, value) {
        if (key === "latitude")
            this._latitude = value;
        else if (key === "longitude")
            this._longitude = value;
        else if (key === "fix")
            this._fix = value;
        else if (key === "quality")
            this._quality = value;
        else if (key === "speed")
            this._speed = value;
        else if (key === "angle")
            this._angle = value;
        else if (key === "altitude")
            this._altitude = value;
        else if (key === "satellites")
            this._satellites = value;
        console.log(`[GPS TS] Param updated: ${key} = ${value}`);
    }
    setup() {
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (txdPin && txdPin.digital) {
            txdPin.digital.state = avr8js_1.PinState.High;
        }
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.sendSerialNMEA(), 1000000);
    }
    sendSerialNMEA() {
        const runner = execute_1.AVRRunner.getInstance();
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (!txdPin) {
            console.error("[GPS TS] No TXD pin connected to Arduino");
            return;
        }
        const { timeStr, dateStr } = this.getUTCFormatted();
        const fixActive = this._fix > 0;
        const gprmc = this.generateGPRMC(this._latitude, this._longitude, this._speed, this._angle, timeStr, dateStr, fixActive);
        const gpgga = this.generateGPGGA(this._latitude, this._longitude, timeStr, this._quality, this._satellites, this._altitude);
        const sentence = gprmc + "\r\n" + gpgga + "\r\n";
        console.log("[GPS TS] Sending NMEA packet:", sentence);
        const cyclesPerBit = 1667;
        const cyclesPerChar = cyclesPerBit * 10;
        let baseCycles = 0;
        for (let i = 0; i < sentence.length; i++) {
            const byte = sentence.charCodeAt(i);
            runner.board.cpu.addClockEvent(() => {
                txdPin.digital.state = avr8js_1.PinState.Low;
            }, baseCycles);
            for (let bit = 0; bit < 8; bit++) {
                const bitVal = (byte >> bit) & 1;
                runner.board.cpu.addClockEvent(() => {
                    txdPin.digital.state = bitVal ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
                }, baseCycles + (bit + 1) * cyclesPerBit);
            }
            runner.board.cpu.addClockEvent(() => {
                txdPin.digital.state = avr8js_1.PinState.High;
            }, baseCycles + 9 * cyclesPerBit);
            baseCycles += cyclesPerChar;
        }
        runner.board.cpu.addClockEvent(() => this.sendSerialNMEA(), 16000000);
    }
    formatCoord(coord, isLat) {
        const absolute = Math.abs(coord);
        const degrees = Math.floor(absolute);
        const minutes = (absolute - degrees) * 60;
        const degreeString = degrees.toString().padStart(isLat ? 2 : 3, "0");
        const minutesString = minutes.toFixed(4).padStart(7, "0");
        return `${degreeString}${minutesString}`;
    }
    getUTCFormatted() {
        const d = new Date();
        const hour = d.getUTCHours().toString().padStart(2, "0");
        const minute = d.getUTCMinutes().toString().padStart(2, "0");
        const second = d.getUTCSeconds().toString().padStart(2, "0");
        const day = d.getUTCDate().toString().padStart(2, "0");
        const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = (d.getUTCFullYear() % 100).toString().padStart(2, "0");
        return {
            timeStr: `${hour}${minute}${second}.000`,
            dateStr: `${day}${month}${year}`
        };
    }
    generateGPRMC(lat, lon, speed, angle, timeStr, dateStr, fixActive) {
        const latDir = lat >= 0 ? "N" : "S";
        const lonDir = lon >= 0 ? "E" : "W";
        const status = fixActive ? "A" : "V";
        const latStr = this.formatCoord(lat, true);
        const lonStr = this.formatCoord(lon, false);
        const payload = `GPRMC,${timeStr},${status},${latStr},${latDir},${lonStr},${lonDir},${speed.toFixed(1)},${angle.toFixed(1)},${dateStr},,,A`;
        return this.appendChecksum(payload);
    }
    generateGPGGA(lat, lon, timeStr, fixQuality, satellites, altitude) {
        const latDir = lat >= 0 ? "N" : "S";
        const lonDir = lon >= 0 ? "E" : "W";
        const latStr = this.formatCoord(lat, true);
        const lonStr = this.formatCoord(lon, false);
        const payload = `GPGGA,${timeStr},${latStr},${latDir},${lonStr},${lonDir},${fixQuality},${satellites.toString().padStart(2, "0")},0.9,${altitude.toFixed(1)},M,0.0,M,,`;
        return this.appendChecksum(payload);
    }
    appendChecksum(payload) {
        let checksum = 0;
        for (let i = 0; i < payload.length; i++) {
            checksum ^= payload.charCodeAt(i);
        }
        return `$${payload}*${checksum.toString(16).toUpperCase().padStart(2, "0")}`;
    }
}
exports.GPS = GPS;
//# sourceMappingURL=gps.js.map