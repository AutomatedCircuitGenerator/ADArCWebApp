"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcadePushButton = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class ArcadePushButton extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.isPushed = false;
    }
    setup() {
        this.digitalOut = this.pins.digital_out[0];
        this.digitalOut.digital.state = this.isPushed ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
    }
    update(state) {
        this.setPushed(state.pushed === "Pushed");
    }
    setPushed(pushed) {
        this.isPushed = pushed;
        if (!this.element) {
            return;
        }
        const surface = this.element.querySelector(".surface");
        if (surface) {
            surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
        }
        this.digitalOut.digital.state = pushed ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
    }
}
exports.ArcadePushButton = ArcadePushButton;
//# sourceMappingURL=arcade-push-button.js.map