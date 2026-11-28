"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HCSR501 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class HCSR501 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.isInSimulation = false;
        this.setIsMotionDetected = (isMotionDetected) => {
            this.isMotionDetected = isMotionDetected > 0;
            if (this.isInSimulation && this.isMotionDetected) {
                this.detectMotion();
            }
        };
        this.setTriggerMode = (triggerMode) => {
            this.triggerMode = triggerMode > 0;
        };
        this.setTimeDelaySeconds = (timeDelaySeconds) => {
            this.timeDelaySeconds = timeDelaySeconds;
        };
    }
    update(state) {
        this.setTriggerMode(state.triggermode);
        this.setTimeDelaySeconds(state.timedelayseconds);
    }
    setup() {
        clearTimeout(this.motionTimeoutId);
        this.isInTimeWindow = false;
        this.isInSimulation = true;
        console.log("setup");
    }
    cleanup() {
        clearTimeout(this.motionTimeoutId);
    }
    detectMotion() {
        if (this.triggerMode) {
            if (!this.isInTimeWindow) {
                this.pins.digital_out[0].digital.state = avr8js_1.PinState.High;
                this.isInTimeWindow = true;
                this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].digital.state = avr8js_1.PinState.Low;
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                }, this.timeDelaySeconds * 1000);
            }
            else {
                clearTimeout(this.motionTimeoutId);
                this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].digital.state = avr8js_1.PinState.Low;
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                }, this.timeDelaySeconds * 1000);
            }
        }
        else {
            if (this.isInTimeWindow) {
                return;
            }
            else {
                this.isInTimeWindow = true;
                this.pins.digital_out[0].digital.state = avr8js_1.PinState.High;
                this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].digital.state = avr8js_1.PinState.Low;
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                }, this.timeDelaySeconds * 1000);
            }
        }
    }
}
exports.HCSR501 = HCSR501;
//# sourceMappingURL=hcsr501.js.map