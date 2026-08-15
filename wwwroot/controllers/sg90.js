"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SG90 = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
const execute_1 = require("@lib/execute");
class SG90 extends controller_1.Controller {
    setup() {
        var _a;
        this.fallingEdgeCycle = undefined;
        this.risingEdgeCycle = undefined;
        this.animationFrameId = null;
        this.signal = this.pins.orange[0].digital;
        (_a = this.signal) === null || _a === void 0 ? void 0 : _a.addListener(this.onSignalChange.bind(this));
    }
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.hornAngle = null;
        this.renderHorn();
    }
    onSignalChange(state) {
        const currentCycle = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        if (state === avr8js_1.PinState.High) {
            this.risingEdgeCycle = currentCycle;
        }
        else if (state === avr8js_1.PinState.Low && this.risingEdgeCycle !== undefined) {
            this.fallingEdgeCycle = currentCycle;
            const pulseWidthCycles = this.fallingEdgeCycle - this.risingEdgeCycle;
            const pulseWidthMs = this.cyclesToMs(pulseWidthCycles);
            const angle = Math.round(this.msToAngle(pulseWidthMs));
            if (this.previousAngle !== angle) {
                this.hornAngle = angle;
                if (!this.animationFrameId) {
                    this.animationFrameId = requestAnimationFrame(this.renderHorn.bind(this));
                }
            }
            this.previousAngle = angle;
        }
    }
    renderHorn() {
        var _a;
        const horn = this.element.querySelector(".horn");
        const transformValue = `translate(91.467 59.773) rotate(${(_a = this.hornAngle) !== null && _a !== void 0 ? _a : 0}) translate(-91.467 -59.773)`;
        horn.setAttribute('transform', transformValue);
        this.animationFrameId = null;
    }
    cyclesToMs(cycles) {
        return (cycles * 1000) / (execute_1.AVRRunner.getInstance().board.cpu.frequency / 1000);
    }
    msToAngle(ms) {
        const minPulse = 544;
        const maxPulse = 2400;
        const minAngle = 0;
        const maxAngle = 180;
        if (ms <= minPulse)
            return minAngle;
        if (ms >= maxPulse)
            return maxAngle;
        return ((ms - minPulse) / (maxPulse - minPulse)) * (maxAngle - minAngle) + minAngle;
    }
}
exports.SG90 = SG90;
//# sourceMappingURL=sg90.js.map