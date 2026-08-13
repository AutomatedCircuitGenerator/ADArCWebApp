"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY012 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class KY012 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        this.BUZZER_FREQUENCY = 2500;
        this.isActive = false;
    }
    setup() {
        this.initAudio();
        const signalPins = this.pins["digital_out"];
        if (!(signalPins === null || signalPins === void 0 ? void 0 : signalPins.length)) {
            console.warn("KY-012: Signal pin not connected");
            return;
        }
        signalPins[0].digital.addListener(this.handleStateChange.bind(this));
    }
    initAudio() {
        try {
            this.audioContext = new AudioContext();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 0.1;
            this.gainNode.connect(this.audioContext.destination);
        }
        catch (err) {
            console.error("KY-012: Failed to initialize audio", err);
        }
    }
    handleStateChange(state) {
        switch (state) {
            case avr8js_1.PinState.High:
                if (!this.isActive) {
                    this.startBuzzer();
                }
                break;
            case avr8js_1.PinState.Low:
                if (this.isActive) {
                    this.stopBuzzer();
                }
                break;
            default:
                if (this.isActive) {
                    this.stopBuzzer();
                }
        }
    }
    startBuzzer() {
        try {
            if (!this.audioContext || this.audioContext.state === 'closed') {
                this.initAudio();
            }
            this.oscillator = this.audioContext.createOscillator();
            this.oscillator.type = 'square';
            this.oscillator.frequency.setValueAtTime(this.BUZZER_FREQUENCY, this.audioContext.currentTime);
            this.oscillator.connect(this.gainNode);
            this.oscillator.start();
            this.isActive = true;
        }
        catch (err) {
            console.error("KY-012: Failed to start buzzer", err);
        }
    }
    stopBuzzer() {
        if (!this.isActive)
            return;
        try {
            if (this.oscillator) {
                this.oscillator.stop();
                this.oscillator.disconnect();
                this.oscillator = null;
            }
            this.isActive = false;
        }
        catch (err) {
            console.error("KY-012: Failed to stop buzzer", err);
        }
    }
    cleanup() {
        this.stopBuzzer();
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.gainNode = null;
        }
    }
}
exports.KY012 = KY012;
//# sourceMappingURL=ky012.js.map