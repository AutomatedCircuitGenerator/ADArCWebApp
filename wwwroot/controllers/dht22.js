"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHT22 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class DHT22 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.temperature = 20;
        this.humidity = 40;
        this.lastFallingEdge = null;
    }
    setup() {
        this.signal = this.pins.signal[0].digital;
        this.cpu = execute_1.AVRRunner.getInstance().board.cpu;
        this.signal.addListener(this.handleSignalChange.bind(this));
    }
    handleSignalChange(state) {
        const now = this.cpu.cycles / this.cpu.frequency * 1000000;
        if (state === avr8js_1.PinState.Low)
            this.lastFallingEdge = now;
        if (state === avr8js_1.PinState.Input && this.lastFallingEdge !== null) {
            const durationUs = now - this.lastFallingEdge;
            if (durationUs >= 1000) {
                this.lastFallingEdge = null;
                this.sendAckAndData();
            }
        }
    }
    update(state) {
        this.humidity = Math.min(100, Math.max(0, state.humidity));
        this.temperature = Math.min(80, Math.max(-40, state.temperature));
    }
    sendAckAndData() {
        let counter = 0;
        const dataBytes = this.valuesToDigitalSignal();
        const usToCycles = (us) => execute_1.AVRRunner.getInstance().usToCycles(us);
        const schedule = (callback, us) => {
            const cycles = counter + usToCycles(us);
            this.cpu.addClockEvent(callback, counter);
            counter = cycles;
        };
        schedule(() => { }, 250);
        schedule(() => this.signal.state = avr8js_1.PinState.Low, 80);
        schedule(() => this.signal.state = avr8js_1.PinState.High, 80);
        for (let i = 0; i < 40; i++) {
            const byte = dataBytes[Math.floor(i / 8)];
            const bit = (byte >> (7 - (i % 8))) & 1;
            schedule(() => this.signal.state = avr8js_1.PinState.Low, 50);
            schedule(() => this.signal.state = avr8js_1.PinState.High, bit ? 70 : 27);
        }
        schedule(() => this.signal.state = avr8js_1.PinState.Low, 0);
        schedule(() => this.signal.state = avr8js_1.PinState.Input, 0);
    }
    valuesToDigitalSignal() {
        const hum = Math.round(this.humidity * 10);
        let temp = Math.round(this.temperature * 10);
        let tempHigh;
        let tempLow;
        if (temp < 0) {
            temp = -temp;
            tempHigh = ((temp >> 8) & 0x7F) | 0x80;
        }
        else {
            tempHigh = (temp >> 8) & 0x7F;
        }
        tempLow = temp & 0xFF;
        return [
            (hum >> 8) & 0xFF,
            hum & 0xFF,
            tempHigh,
            tempLow,
            ((hum >> 8) + (hum & 0xFF) + tempHigh + tempLow) & 0xFF,
        ];
    }
}
exports.DHT22 = DHT22;
//# sourceMappingURL=dht22.js.map