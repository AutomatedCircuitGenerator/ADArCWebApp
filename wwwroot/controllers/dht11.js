"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHT11 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class DHT11 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.temperature = 22;
        this.humidity = 50;
        this.lastFallingEdge = null;
    }
    setup() {
        this.signal = this.pins.digital_out[0].digital;
        this.cpu = execute_1.AVRRunner.getInstance().board.cpu;
        this.signal.addListener(this.handleSignalChange.bind(this));
        console.log("[DHT11] Setup complete, listening on digital_out");
    }
    handleSignalChange(state) {
        const now = this.cpu.cycles / this.cpu.frequency * 1000000;
        if (state === avr8js_1.PinState.Low) {
            this.lastFallingEdge = now;
            console.log("[DHT11] MCU pulled line LOW, waiting for 1ms...");
        }
        if (state === avr8js_1.PinState.Input && this.lastFallingEdge !== null) {
            const durationUs = now - this.lastFallingEdge;
            console.log(`[DHT11] Line released, duration: ${durationUs}us`);
            if (durationUs >= 1000) {
                console.log("[DHT11] Start signal detected! Sending ACK and data...");
                this.lastFallingEdge = null;
                this.sendAckAndData();
            }
        }
    }
    update(state) {
        if (state.humidity !== undefined) {
            this.humidity = Math.min(100, Math.max(0, state.humidity));
            console.log("[DHT11] Humidity:", this.humidity);
        }
        if (state.temperature !== undefined) {
            this.temperature = Math.min(60, Math.max(-20, state.temperature));
            console.log("[DHT11] Temperature:", this.temperature);
        }
    }
    sendAckAndData() {
        let counter = 0;
        const dataBytes = this.valuesToDigitalSignal();
        console.log("[DHT11] Sending data bytes:", dataBytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
        const usToCycles = (us) => execute_1.AVRRunner.getInstance().usToCycles(us);
        const schedule = (callback, us) => {
            const cycles = counter + usToCycles(us);
            this.cpu.addClockEvent(callback, counter);
            counter = cycles;
        };
        schedule(() => { }, 250);
        schedule(() => this.signal.state = (avr8js_1.PinState.Low), 50);
        schedule(() => this.signal.state = (avr8js_1.PinState.High), 80);
        for (let i = 0; i < 40; i++) {
            const byte = dataBytes[Math.floor(i / 8)];
            const bit = (byte >> (7 - (i % 8))) & 1;
            schedule(() => this.signal.state = (avr8js_1.PinState.Low), 50);
            schedule(() => this.signal.state = (avr8js_1.PinState.High), bit ? 70 : 26);
        }
        schedule(() => this.signal.state = (avr8js_1.PinState.Low), 0);
        schedule(() => this.signal.state = (avr8js_1.PinState.Input), 0);
        console.log("[DHT11] Data transmission complete");
    }
    valuesToDigitalSignal() {
        let humidity = Math.min(90, Math.max(20, this.humidity));
        let temperature = Math.min(50, Math.max(0, this.temperature));
        const humInt = Math.floor(humidity);
        const humDec = 0;
        const tempInt = Math.floor(temperature);
        const tempDec = 0;
        const checksum = (humInt + humDec + tempInt + tempDec) & 0xFF;
        return [
            humInt & 0xFF,
            humDec & 0xFF,
            tempInt & 0xFF,
            tempDec & 0xFF,
            checksum
        ];
    }
}
exports.DHT11 = DHT11;
//# sourceMappingURL=dht11.js.map