"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GP2Y1014AU0F = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class GP2Y1014AU0F extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.dustdensity = 0;
        this.updateVoutVoltage = () => {
            console.log("Sampling dust at density:", this.dustdensity);
            if (!this.pins.vout || !this.pins.vout[0]) {
                console.log("VOUT pin not found!");
                return;
            }
            let voltage = ((this.dustdensity / 1000.0) + 0.1) / 0.17;
            voltage = Math.max(0, Math.min(5.0, voltage));
            console.log("Setting vout voltage to:", voltage, "V");
            this.pins.vout[0].analog.voltage = voltage;
        };
    }
    update(state) {
        if (state.dustdensity !== undefined) {
            this.dustdensity = state.dustdensity;
            console.log("Dust density updated to:", this.dustdensity);
        }
    }
    setup() {
        if (this.pins.led && this.pins.led[0]) {
            this.pins.led[0].digital.addListener((state) => {
                console.log("LED state changed to:", state === avr8js_1.PinState.Low ? "LOW" : "HIGH");
                if (state === avr8js_1.PinState.Low) {
                    this.updateVoutVoltage();
                }
            });
        }
    }
}
exports.GP2Y1014AU0F = GP2Y1014AU0F;
//# sourceMappingURL=gp2y1014au0f.js.map