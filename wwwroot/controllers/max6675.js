"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX6675 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class MAX6675 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.setTemperature = (temperature) => {
            this._temperature = temperature;
        };
        this.nextByteIsHigh = false;
        this.spiCallback = (byte) => {
            if (!this.shouldReadSPI) {
                return;
            }
            if (this._temperature == undefined) {
                console.log("Undefined\n");
            }
            let temperature = Math.round((this._temperature / 0.25) << 3);
            let byteToSend;
            if (!this.nextByteIsHigh) {
                byteToSend = (temperature >> 8) & 0xFF;
            }
            else {
                byteToSend = temperature & 0xFF;
            }
            this.nextByteIsHigh = !this.nextByteIsHigh;
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => execute_1.AVRRunner.getInstance().board.spis[0].completeTransfer(byteToSend), execute_1.AVRRunner.getInstance().board.spis[0].transferCycles);
        };
    }
    update(state) {
        this.setTemperature(state.temperature);
    }
    setup() {
        execute_1.AVRRunner.getInstance().board.spis[0].addListener(this.spiCallback);
    }
    get shouldReadSPI() {
        return this.pins.cs[0].digital.state == avr8js_1.PinState.Low;
    }
}
exports.MAX6675 = MAX6675;
//# sourceMappingURL=max6675.js.map