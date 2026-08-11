"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX31856 = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class MAX31856 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._temperature = -20;
        this.byteCount = 0;
        this.spiCallback = (byte) => {
            if (!this.shouldReadSPI) {
                this.byteCount = 0;
                return;
            }
            if (this._temperature === undefined) {
                console.log("Temperature undefined");
                return;
            }
            const raw = Math.round(this._temperature / 0.25);
            let byteToSend = 0;
            switch (this.byteCount) {
                case 0:
                    byteToSend = 0;
                    console.log("SPI byte 0 - sending config dummy: 0");
                    break;
                case 1:
                    byteToSend = (raw >> 8) & 0xFF;
                    console.log("SPI byte 1 - sending MSB:", byteToSend, "for temp:", this._temperature);
                    break;
                case 2:
                    byteToSend = raw & 0xFF;
                    console.log("SPI byte 2 - sending LSB:", byteToSend, "for temp:", this._temperature);
                    break;
            }
            this.byteCount = (this.byteCount + 1) % 3;
            const spi = execute_1.AVRRunner.getInstance().board.spis[0];
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => spi.completeTransfer(byteToSend), spi.transferCycles);
        };
    }
    update(state) {
        if (state.temperature != null) {
            if (state.temperature > 350) {
                state.temperature = 350;
            }
            else if (state.temperature < -200) {
                state.temperature = -200;
            }
            this._temperature = state.temperature;
            console.log("MAX31856 temperature updated to:", this._temperature);
        }
    }
    setup() {
        const spi = execute_1.AVRRunner.getInstance().board.spis[0];
        if (spi) {
            spi.addListener(this.spiCallback);
            console.log("MAX31856 SPI listener attached");
        }
    }
    get shouldReadSPI() {
        return this.pins.cs[0].digital.state === avr8js_1.PinState.Low;
    }
}
exports.MAX31856 = MAX31856;
//# sourceMappingURL=max31856.js.map