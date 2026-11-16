"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRDETECTOR = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class IRDETECTOR extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.thresholdLow = 2;
        this.thresholdHigh = 30;
        this.distance = 20;
        this.obstacleDetected = false;
    }
    update(state) {
        if (state.distance !== undefined) {
            this.distance = state.distance;
        }
        if (state.thresholdLow !== undefined) {
            this.thresholdLow = state.thresholdLow;
        }
        if (state.thresholdHigh !== undefined) {
            this.thresholdHigh = state.thresholdHigh;
        }
        this.evaluateObstacle();
        this.updateOutput();
    }
    setup() {
        this.digitalOut = this.pins.out[0];
        this.setPowerLed(true);
        this.evaluateObstacle();
        this.updateOutput();
    }
    cleanup() {
        this.setPowerLed(false);
        this.setDetectLed(false);
    }
    evaluateObstacle() {
        this.obstacleDetected = this.distance >= this.thresholdLow && this.distance <= this.thresholdHigh;
    }
    updateOutput() {
        this.digitalOut.digital.state = this.obstacleDetected ? avr8js_1.PinState.Low : avr8js_1.PinState.High;
        this.setDetectLed(this.obstacleDetected);
    }
    setPowerLed(on) {
        const display = on ? "inherit" : "none";
        this.element.querySelector("#powerLED").style.display = display;
        this.element.querySelector("#powerGlow").style.display = display;
    }
    setDetectLed(on) {
        const display = on ? "inherit" : "none";
        this.element.querySelector("#detectLED").style.display = display;
        this.element.querySelector("#detectGlow").style.display = display;
    }
}
exports.IRDETECTOR = IRDETECTOR;
//# sourceMappingURL=irdetector.js.map