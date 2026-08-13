"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY024 = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class KY024 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.gauss = 0;
        this.isInSimulation = false;
        this.isMagneticFieldDetected = false;
    }
    update(state) {
        this.setGauss(state.gauss);
        this.setIsMagneticFieldDetected(Math.abs(state.gauss) > Number.EPSILON);
    }
    setGauss(gauss) {
        if (gauss < -1000) {
            this.gauss = -1000;
        }
        else if (gauss > 1000) {
            this.gauss = 1000;
        }
        else {
            this.gauss = gauss;
        }
        if (this.isInSimulation) {
            this.gaussToVoltage(this.gauss);
        }
    }
    setIsMagneticFieldDetected(isMagneticFieldDetected) {
        this.isMagneticFieldDetected = isMagneticFieldDetected;
        if (this.isInSimulation) {
            this.pins.digital_out[0].digital.state = this.isMagneticFieldDetected ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
        }
    }
    setup() {
        this.isInSimulation = true;
        this.gaussToVoltage(this.gauss);
    }
    gaussToVoltage(gauss) {
        const V_OUT = 1.0 + ((gauss + 1000) / 2000) * 3.0;
        this.pins.analog_out[0].analog.voltage = V_OUT;
    }
}
exports.KY024 = KY024;
//# sourceMappingURL=ky024.js.map