"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEN0219 = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
const avr8js_1 = require("@lib/avr8js");
class SEN0219 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._co2 = 550;
        this.inSimulation = false;
        this.cycleActive = false;
    }
    update(state) {
        if (state.co2 !== undefined) {
            this.setCO2(state.co2);
        }
    }
    setCO2(co2) {
        if (co2 < 400)
            co2 = 400;
        if (co2 > 5000)
            co2 = 5000;
        this._co2 = co2;
    }
    setup() {
        if (this.inSimulation)
            return;
        this.inSimulation = true;
        this.startPWMCycle();
    }
    startPWMCycle() {
        this.cycleActive = true;
        this.cycleEvent();
    }
    cycleEvent() {
        var _a, _b, _c;
        if (!this.inSimulation || !this.cycleActive)
            return;
        const tHighMs = (this._co2 / 5.0) + 2.0;
        const tCycleMs = 1004.0;
        const tLowMs = tCycleMs - tHighMs;
        const runner = execute_1.AVRRunner.getInstance();
        if (!runner || !runner.board || !runner.board.cpu) {
            setTimeout(() => this.cycleEvent(), 100);
            return;
        }
        const cpu = runner.board.cpu;
        const freq = cpu.frequency;
        const tHighCycles = (tHighMs / 1000.0) * freq;
        const tLowCycles = (tLowMs / 1000.0) * freq;
        const pin = (_c = (_b = (_a = this.pins) === null || _a === void 0 ? void 0 : _a.analog_out) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.digital;
        if (!pin) {
            setTimeout(() => this.cycleEvent(), 100);
            return;
        }
        pin.state = avr8js_1.PinState.High;
        cpu.addClockEvent(() => {
            pin.state = avr8js_1.PinState.Low;
            cpu.addClockEvent(() => {
                this.cycleEvent();
            }, tLowCycles);
        }, tHighCycles);
    }
}
exports.SEN0219 = SEN0219;
//# sourceMappingURL=sen0219.js.map