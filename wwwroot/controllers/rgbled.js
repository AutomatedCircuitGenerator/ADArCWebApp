"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGBLED = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
const execute_1 = require("@lib/execute");
class RGBLED extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.animationFrameId = null;
    }
    setup() {
        this.rLastPinState = this.pins.R[0].digital.state;
        this.rFirstHigh = true;
        this.rBrightness = 0;
        this.rPeriod = 0;
        this.rPreviousFallingEdgeCycle = 0;
        this.rPreviousRisingEdgeCycle = 0;
        this.rIsPeriodCreated = false;
        this.gLastPinState = this.pins.G[0].digital.state;
        this.gFirstHigh = true;
        this.gBrightness = 0;
        this.gPeriod = 0;
        this.gPreviousFallingEdgeCycle = 0;
        this.gPreviousRisingEdgeCycle = 0;
        this.gIsPeriodCreated = false;
        this.bLastPinState = this.pins.B[0].digital.state;
        this.bFirstHigh = true;
        this.bBrightness = 0;
        this.bPeriod = 0;
        this.bPreviousFallingEdgeCycle = 0;
        this.bPreviousRisingEdgeCycle = 0;
        this.bIsPeriodCreated = false;
        this.animationFrameId = null;
        this.pins.R[0].digital.addListener(this.rListener.bind(this));
        this.pins.G[0].digital.addListener(this.gListener.bind(this));
        this.pins.B[0].digital.addListener(this.bListener.bind(this));
    }
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.rBrightness = 0;
        this.gBrightness = 0;
        this.bBrightness = 0;
        this.renderSvg();
    }
    rWatchDog(lastState, lastStateCycle) {
        if (lastState === avr8js_1.PinState.High && this.rPreviousFallingEdgeCycle <= lastStateCycle) {
            this.rBrightness = 1;
        }
        else if (lastState === avr8js_1.PinState.Low && this.rPreviousRisingEdgeCycle <= lastStateCycle) {
            this.rBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    gWatchDog(lastState, lastStateCycle) {
        if (lastState === avr8js_1.PinState.High && this.gPreviousFallingEdgeCycle <= lastStateCycle) {
            this.gBrightness = 1;
        }
        else if (lastState === avr8js_1.PinState.Low && this.gPreviousRisingEdgeCycle <= lastStateCycle) {
            this.gBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    bWatchDog(lastState, lastStateCycle) {
        if (lastState === avr8js_1.PinState.High && this.bPreviousFallingEdgeCycle <= lastStateCycle) {
            this.bBrightness = 1;
        }
        else if (lastState === avr8js_1.PinState.Low && this.bPreviousRisingEdgeCycle <= lastStateCycle) {
            this.bBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    rListener(state) {
        if (!this.rIsPeriodCreated) {
            this.rPeriod = this.pins.R[0].timer.getPwmPeriod();
            this.rIsPeriodCreated = true;
        }
        const currentCycle = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        if (state === avr8js_1.PinState.High) {
            this.rPreviousRisingEdgeCycle = currentCycle;
            if (this.rFirstHigh) {
                this.rBrightness = 0;
                this.rFirstHigh = false;
            }
            else {
                this.rBrightness = Math.max((this.rPeriod - (currentCycle - this.rPreviousFallingEdgeCycle)) / this.rPeriod, 0);
            }
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.rWatchDog(state, currentCycle), this.rPeriod - 3);
        }
        else if (state === avr8js_1.PinState.Low) {
            if (this.rLastPinState === avr8js_1.PinState.High) {
                this.rPreviousFallingEdgeCycle = currentCycle;
                this.rBrightness = Math.min((currentCycle - this.rPreviousRisingEdgeCycle) / this.rPeriod, 1);
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.rWatchDog(state, currentCycle), this.rPeriod - 3);
            }
        }
        this.rLastPinState = state;
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    gListener(state) {
        if (!this.gIsPeriodCreated) {
            this.gPeriod = this.pins.G[0].timer.getPwmPeriod();
            this.gIsPeriodCreated = true;
        }
        const currentCycle = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        if (state === avr8js_1.PinState.High) {
            this.gPreviousRisingEdgeCycle = currentCycle;
            if (this.gFirstHigh) {
                this.gBrightness = 0;
                this.gFirstHigh = false;
            }
            else {
                this.gBrightness = Math.max((this.gPeriod - (currentCycle - this.gPreviousFallingEdgeCycle)) / this.gPeriod, 0);
            }
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.gWatchDog(state, currentCycle), this.gPeriod - 3);
        }
        else if (state === avr8js_1.PinState.Low) {
            if (this.gLastPinState === avr8js_1.PinState.High) {
                this.gPreviousFallingEdgeCycle = currentCycle;
                this.gBrightness = Math.min((currentCycle - this.gPreviousRisingEdgeCycle) / this.gPeriod, 1);
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.gWatchDog(state, currentCycle), this.gPeriod - 3);
            }
        }
        this.gLastPinState = state;
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    bListener(state) {
        if (!this.bIsPeriodCreated) {
            this.bPeriod = this.pins.B[0].timer.getPwmPeriod();
            this.bIsPeriodCreated = true;
        }
        const currentCycle = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        if (state === avr8js_1.PinState.High) {
            this.bPreviousRisingEdgeCycle = currentCycle;
            if (this.bFirstHigh) {
                this.bBrightness = 0;
                this.bFirstHigh = false;
            }
            else {
                this.bBrightness = Math.max((this.bPeriod - (currentCycle - this.bPreviousFallingEdgeCycle)) / this.bPeriod, 0);
            }
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.bWatchDog(state, currentCycle), this.bPeriod - 3);
        }
        else if (state === avr8js_1.PinState.Low) {
            if (this.bLastPinState === avr8js_1.PinState.High) {
                this.bPreviousFallingEdgeCycle = currentCycle;
                this.bBrightness = Math.min((currentCycle - this.bPreviousRisingEdgeCycle) / this.bPeriod, 1);
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.bWatchDog(state, currentCycle), this.bPeriod - 3);
            }
        }
        this.bLastPinState = state;
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    renderSvg() {
        const totalBrightness = Math.max(this.rBrightness, this.gBrightness, this.bBrightness);
        const totalOpacity = totalBrightness != 0 ? 0.2 + totalBrightness * 0.6 : 0;
        const redBlur = this.element.querySelector("#rgbRedBlur");
        redBlur.setAttribute("stdDeviation", `${this.rBrightness * 3}`);
        const greenBlur = this.element.querySelector("#rgbGreenBlur");
        greenBlur.setAttribute("stdDeviation", `${this.gBrightness * 3}`);
        const blueBlur = this.element.querySelector("#rgbBlueBlur");
        blueBlur.setAttribute("stdDeviation", `${this.bBrightness * 3}`);
        const redCircle = this.element.querySelector("#rgbRedCircle");
        redCircle.setAttribute("r", `${this.rBrightness * 5 + 2}`);
        redCircle.setAttribute("opacity", `${Math.min(this.rBrightness * 20, 0.3)}`);
        const greenCircle = this.element.querySelector("#rgbGreenCircle");
        greenCircle.setAttribute("r", `${this.gBrightness * 5 + 2}`);
        greenCircle.setAttribute("opacity", `${Math.min(this.gBrightness * 20, 0.3)}`);
        const blueCircle = this.element.querySelector("#rgbBlueCircle");
        blueCircle.setAttribute("r", `${this.bBrightness * 5 + 2}`);
        blueCircle.setAttribute("opacity", `${Math.min(this.bBrightness * 20, 0.3)}`);
        const mixedCircle = this.element.querySelector("#rgbMixedCircle");
        mixedCircle.setAttribute("fill", `rgb(${this.rBrightness * 255}, ${this.gBrightness * 255}, ${this.bBrightness * 255})`);
        mixedCircle.setAttribute("opacity", `${totalOpacity}`);
        const hollowCircle = this.element.querySelector("#rgbHollowCircle");
        hollowCircle.setAttribute("opacity", `${totalOpacity}`);
        this.animationFrameId = null;
    }
}
exports.RGBLED = RGBLED;
//# sourceMappingURL=rgbled.js.map