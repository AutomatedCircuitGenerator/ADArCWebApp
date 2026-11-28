"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPK = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class NPK extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._nitrogen = 0;
        this._phosphorus = 0;
        this._potassium = 0;
        this.valuesChanged = false;
    }
    update(state) {
        let changed = false;
        if (state.nitrogen !== undefined) {
            this._nitrogen = Math.max(0, Math.min(1024, state.nitrogen));
            console.log("[NPK] Nitrogen:", this._nitrogen, "ppm");
            changed = true;
        }
        if (state.phosphorus !== undefined) {
            this._phosphorus = Math.max(0, Math.min(1024, state.phosphorus));
            console.log("[NPK] Phosphorus:", this._phosphorus, "ppm");
            changed = true;
        }
        if (state.potassium !== undefined) {
            this._potassium = Math.max(0, Math.min(1024, state.potassium));
            console.log("[NPK] Potassium:", this._potassium, "ppm");
            changed = true;
        }
        if (changed) {
            this.valuesChanged = true;
        }
    }
    setup() {
        console.log("[NPK] Setup complete");
        this.scheduleDataSending();
    }
    scheduleDataSending() {
        const sendData = () => {
            this.checkAndSendData();
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(sendData, 500000);
        };
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(sendData, 500000);
    }
    checkAndSendData() {
        const dePin = this.pins.DE[0].digital.state;
        const rePin = this.pins.RE[0].digital.state;
        if (dePin === avr8js_1.PinState.High && rePin === avr8js_1.PinState.Low) {
            this.sendModbusResponse();
            this.valuesChanged = false;
        }
    }
    sendModbusResponse() {
        const uart = execute_1.AVRRunner.getInstance().board.usarts[0];
        if (!uart) {
            console.error("[NPK] UART not available");
            return;
        }
        const packet = this.buildModbusPacket();
        console.log("[NPK] Sending packet:", packet.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
        const usToCycles = (us) => execute_1.AVRRunner.getInstance().usToCycles(us);
        let cumulativeCycles = 0;
        for (let i = 0; i < packet.length; i++) {
            const byte = packet[i];
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                uart.writeByte(byte, true);
            }, cumulativeCycles);
            cumulativeCycles += usToCycles(1200);
        }
    }
    buildModbusPacket() {
        const nHigh = (this._nitrogen >> 8) & 0xFF;
        const nLow = this._nitrogen & 0xFF;
        const pHigh = (this._phosphorus >> 8) & 0xFF;
        const pLow = this._phosphorus & 0xFF;
        const kHigh = (this._potassium >> 8) & 0xFF;
        const kLow = this._potassium & 0xFF;
        const packet = [
            0x01,
            0x03,
            0x06,
            nHigh, nLow,
            pHigh, pLow,
            kHigh, kLow,
            0x00, 0x00
        ];
        return packet;
    }
}
exports.NPK = NPK;
//# sourceMappingURL=npk.js.map