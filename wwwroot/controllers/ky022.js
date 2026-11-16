"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KY022 = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
const ADDRESS = 0x10;
class KY022 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.simulationStarted = false;
    }
    setup() {
        this.signal = this.pins.digital_out[0].digital;
        this.cpu = execute_1.AVRRunner.getInstance().board.cpu;
        this.signal.state = avr8js_1.PinState.High;
        this.simulationStarted = true;
    }
    cleanup() {
        this.simulationStarted = false;
        super.cleanup();
    }
    setCommand(command) {
        if (!this.simulationStarted)
            return;
        this.counter = 0;
        this.pulse(9);
        this.space(4.5);
        this.writeByte(ADDRESS);
        this.writeByte(this.invert(ADDRESS));
        this.writeByte(command);
        this.writeByte(this.invert(command));
        this.pulse(0.5625);
    }
    writeByte(byte) {
        for (let i = 7; i >= 0; i--) {
            const bit = ((byte >> i) & 1) === 1;
            this.writeBit(bit);
        }
    }
    writeBit(bit) {
        this.pulse(0.5625);
        if (bit) {
            this.space(1.6875);
        }
        else {
            this.space(0.5625);
        }
    }
    pulse(ms) {
        if (this.counter === 0) {
            this.signal.state = avr8js_1.PinState.Low;
        }
        else {
            this.cpu.addClockEvent(() => {
                this.signal.state = avr8js_1.PinState.Low;
            }, this.counter);
        }
        this.counter += this.msToCycles(ms);
        this.cpu.addClockEvent(() => {
            this.signal.state = avr8js_1.PinState.High;
        }, this.counter);
    }
    space(ms) {
        this.counter += this.msToCycles(ms);
    }
    invert(byte) {
        return ~byte & 0xFF;
    }
    msToCycles(ms) {
        return ms * (this.cpu.frequency / 1000);
    }
}
exports.KY022 = KY022;
//# sourceMappingURL=ky022.js.map