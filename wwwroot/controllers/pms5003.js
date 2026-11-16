"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PMS5003 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class PMS5003 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._pm1_0 = 0;
        this._pm2_5 = 0;
        this._pm10 = 0;
    }
    update(state) {
        if (state.pm1_0 !== undefined) {
            this._pm1_0 = Math.max(0, Math.min(1000, state.pm1_0));
        }
        if (state.pm2_5 !== undefined) {
            this._pm2_5 = Math.max(0, Math.min(1000, state.pm2_5));
        }
        if (state.pm10 !== undefined) {
            this._pm10 = Math.max(0, Math.min(1000, state.pm10));
        }
        console.log(`[PMS5003] PM1.0: ${this._pm1_0}, PM2.5: ${this._pm2_5}, PM10: ${this._pm10}`);
    }
    setup() {
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (txdPin && txdPin.digital) {
            txdPin.digital.state = avr8js_1.PinState.High;
        }
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.sendSerialPMS(), 1000000);
    }
    sendSerialPMS() {
        const runner = execute_1.AVRRunner.getInstance();
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (!txdPin) {
            console.error("[PMS5003] No TXD pin connected to Arduino");
            return;
        }
        const packet = this.buildPMS5003Packet();
        const cyclesPerBit = 1667;
        const cyclesPerByte = cyclesPerBit * 10;
        let baseCycles = 0;
        for (let i = 0; i < packet.length; i++) {
            const byte = packet[i];
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
            baseCycles += cyclesPerByte;
        }
        runner.board.cpu.addClockEvent(() => this.sendSerialPMS(), 16000000);
    }
    buildPMS5003Packet() {
        const packet = new Array(32).fill(0);
        packet[0] = 0x42;
        packet[1] = 0x4D;
        packet[2] = 0x00;
        packet[3] = 0x1C;
        packet[4] = (this._pm1_0 >> 8) & 0xFF;
        packet[5] = this._pm1_0 & 0xFF;
        packet[6] = (this._pm2_5 >> 8) & 0xFF;
        packet[7] = this._pm2_5 & 0xFF;
        packet[8] = (this._pm10 >> 8) & 0xFF;
        packet[9] = this._pm10 & 0xFF;
        packet[10] = packet[4];
        packet[11] = packet[5];
        packet[12] = packet[6];
        packet[13] = packet[7];
        packet[14] = packet[8];
        packet[15] = packet[9];
        let sum = 0;
        for (let i = 0; i < 30; i++) {
            sum += packet[i];
        }
        packet[30] = (sum >> 8) & 0xFF;
        packet[31] = sum & 0xFF;
        return packet;
    }
}
exports.PMS5003 = PMS5003;
//# sourceMappingURL=pms5003.js.map