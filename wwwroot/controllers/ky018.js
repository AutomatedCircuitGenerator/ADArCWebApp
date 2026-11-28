"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY018 = void 0;
const controller_1 = require("./controller");
class KY018 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.lux = 100;
        this.GAMMA = .7;
        this.RL10 = 50000;
        this.R_FIXED = 10000;
        this.isInSimulation = false;
    }
    update(state) {
        this.setLux(state.lux);
    }
    setLux(lux) {
        if (lux < .1) {
            this.lux = .1;
        }
        else if (lux > 100000) {
            this.lux = 100000;
        }
        else {
            this.lux = lux;
        }
        if (this.isInSimulation) {
            this.luxToVoltage(lux);
        }
    }
    setup() {
        this.isInSimulation = true;
        this.luxToVoltage(this.lux);
    }
    luxToVoltage(lux) {
        const R_PHOTO = (this.RL10 * Math.pow(10, this.GAMMA)) / Math.pow(lux, this.GAMMA);
        const V_OUT = 5 * (R_PHOTO / (R_PHOTO + this.R_FIXED));
        this.pins.analog_out[0].analog.voltage = V_OUT;
    }
}
exports.KY018 = KY018;
//# sourceMappingURL=ky018.js.map