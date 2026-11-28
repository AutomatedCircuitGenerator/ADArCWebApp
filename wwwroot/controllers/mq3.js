"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQ3 = void 0;
const controller_1 = require("@controllers/controller");
class MQ3 extends controller_1.Controller {
    update(state) {
        this.setAlcohol(state.alcohol);
    }
    setAlcohol(alcohol) {
        if (alcohol < 0) {
            this.alcohol = 0;
        }
        else if (alcohol > 1024) {
            this.alcohol = 5;
        }
        else {
            this.alcohol = alcohol * 5 / 1024;
        }
        if (!this.inSimulation) {
            return;
        }
        this.pins.analog_out[0].analog.voltage = this.alcohol;
    }
    setup() {
        this.inSimulation = true;
        this.pins.analog_out[0].analog.voltage = this.alcohol;
    }
}
exports.MQ3 = MQ3;
//# sourceMappingURL=mq3.js.map