"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY003 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class KY003 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.isFieldDetected = false;
    }
    setup() {
        this.setFieldDetected(this.isFieldDetected);
    }
    update(state) {
        this.setFieldDetected(state.magfield === "Detected");
    }
    setFieldDetected(isFieldDetected) {
        this.isFieldDetected = isFieldDetected;
        if (this.pins.digital_out)
            this.pins.digital_out[0].digital.state = isFieldDetected ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
    }
}
exports.KY003 = KY003;
//# sourceMappingURL=ky003.js.map