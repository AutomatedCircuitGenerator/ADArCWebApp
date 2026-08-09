"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HX711 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class HX711 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.weight = 100;
        this.bitIndex = 23;
    }
    update(state) {
        this.setWeight(state.weight);
    }
    setup() {
        this.data = this.pins.dat[0].digital;
        this.clock = this.pins.clk[0].digital;
        this.bitIndex = 23;
        this.clock.addListener((state) => this.handleClock(state));
    }
    setWeight(weight) {
        this.weight = weight;
    }
    handleClock(state) {
        if (state === avr8js_1.PinState.Low) {
            this.data.state = ((this.weight >> this.bitIndex) & 1) === 1 ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
            this.bitIndex--;
            if (this.bitIndex < 0) {
                this.bitIndex = 24;
            }
        }
    }
}
exports.HX711 = HX711;
//# sourceMappingURL=hx711.js.map