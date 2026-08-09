"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY008 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class KY008 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.toggleLaser = (state) => {
            const beam = this.element.querySelector("#laser-beam");
            beam.style.fill = state === avr8js_1.PinState.High ? "url(#a)" : "none";
        };
    }
    setup() {
        this.pins.digital_in[0].digital.addListener(this.toggleLaser);
    }
}
exports.KY008 = KY008;
//# sourceMappingURL=ky008.js.map