"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRVPH = void 0;
const controller_1 = require("@controllers/controller");
class SRVPH extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.ph = 7.0;
    }
    update(state) {
        this.setph(state.ph);
    }
    setph(ph) {
        if (ph < 0)
            this.ph = 0;
        else if (ph > 14)
            this.ph = 14;
        else
            this.ph = ph;
        this.pins.ADC[0].analog.voltage = this.phToVoltage(this.ph);
    }
    setup() {
        this.pins.ADC[0].analog.voltage = this.phToVoltage(this.ph);
    }
    phToVoltage(ph) {
        return (ph - 15.509) / (-5.6548);
    }
}
exports.SRVPH = SRVPH;
//# sourceMappingURL=srvph.js.map