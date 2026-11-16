"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSCEIVER = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class TRANSCEIVER extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.mode = 0;
    }
    setup() {
        console.log("[Transceiver] Setup complete - Mode: receive");
        const csnPin = this.pins.csn[0].digital;
        csnPin.state = avr8js_1.PinState.Low;
    }
    setMode(modeValue) {
        this.mode = modeValue;
        const csnPin = this.pins.csn[0].digital;
        csnPin.state = modeValue === 1 ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
        console.log("[Transceiver] Mode changed to:", modeValue === 1 ? "transmit" : "receive");
    }
}
exports.TRANSCEIVER = TRANSCEIVER;
//# sourceMappingURL=transceiver.js.map