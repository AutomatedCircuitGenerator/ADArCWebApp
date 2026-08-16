"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPS20N0040D = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class MPS20N0040D extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.pressure = 0;
        this.offset = 0;
        this.scale = 200;
        this.adcValue = 0;
        this.pulseCount = 0;
        this.shifting = false;
    }
    update(state) {
        if (state.pressure !== undefined) {
            this.pressure = state.pressure;
            console.log("MPS20N0040D pressure updated to:", this.pressure);
            if (!this.shifting) {
                this.computeADC();
            }
        }
        if (state.scale !== undefined) {
            this.scale = state.scale;
            console.log("MPS20N0040D scale updated to:", this.scale);
            if (!this.shifting) {
                this.computeADC();
            }
        }
    }
    setup() {
        var _a, _b, _c, _d;
        if (!((_b = (_a = this.pins) === null || _a === void 0 ? void 0 : _a.sck) === null || _b === void 0 ? void 0 : _b[0]) || !((_d = (_c = this.pins) === null || _c === void 0 ? void 0 : _c.dout) === null || _d === void 0 ? void 0 : _d[0])) {
            console.error("Pins not initialized:", this.pins);
            return;
        }
        const sck = this.pins.sck[0].digital;
        const dout = this.pins.dout[0].digital;
        dout.state = avr8js_1.PinState.High;
        sck.addListener((state) => {
            if (state === avr8js_1.PinState.High) {
                this.pulseCount++;
                this.clockTick();
            }
        });
        console.log("MPS20N0040D setup complete");
        setTimeout(() => {
            this.shifting = false;
            this.computeADC();
        }, 1000);
    }
    computeADC() {
        let value = Math.floor(this.offset + this.pressure * this.scale);
        value = ((value % 0x1000000) + 0x1000000) % 0x1000000;
        this.adcValue = value;
        this.shifting = true;
        this.pulseCount = 0;
        this.pins.dout[0].digital.state = avr8js_1.PinState.Low;
        console.log("MPS20N0040D ADC computed:", value, "from pressure:", this.pressure, "raw bits:", value.toString(2).padStart(24, '0'));
    }
    clockTick() {
        const dout = this.pins.dout[0].digital;
        if (this.pulseCount <= 24) {
            const bit = (this.adcValue >> (24 - this.pulseCount)) & 1;
            dout.state = bit === 1 ? avr8js_1.PinState.High : avr8js_1.PinState.Low;
        }
        else if (this.pulseCount === 25) {
            this.shifting = false;
            dout.state = avr8js_1.PinState.High;
            setTimeout(() => {
                this.computeADC();
            }, 50);
        }
    }
}
exports.MPS20N0040D = MPS20N0040D;
//# sourceMappingURL=mps20n0040d.js.map