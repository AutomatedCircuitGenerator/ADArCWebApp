"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HCSR04 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class HCSR04 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.distance = 20;
    }
    update(state) {
        this.setDistance(state.distance);
    }
    setDistance(distance) {
        this.distance = distance;
    }
    setup() {
        this.pins.trigger[0].digital.addListener(this.trigger.bind(this));
    }
    trigger(state) {
        if (state === avr8js_1.PinState.High) {
            setTimeout(() => this.echo(), 1);
        }
    }
    echo() {
        this.pins.echo[0].digital.state = avr8js_1.PinState.High;
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            this.pins.echo[0].digital.state = avr8js_1.PinState.Low;
        }, this.distance * 58 * (execute_1.AVRRunner.getInstance().board.cpu.frequency / 1e6));
    }
}
exports.HCSR04 = HCSR04;
//# sourceMappingURL=hcsr04.js.map