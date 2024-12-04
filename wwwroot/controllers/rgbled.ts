import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";


//https://docs.arduino.cc/tutorials/generic/secrets-of-arduino-pwm/
//https://serval.mythic-beasts.com/~markt/ATmega-timers.html
//https://forum.arduino.cc/t/arduino-mega-pwm-generation/643026/3
//https://deepbluembedded.com/arduino-timers/
export class RGBLED extends Controller {

    private rBrightness: number;
    private rPeriod: number;
    private rFirstHigh: boolean;
    private rLastPinState: PinState;
    private rPreviousFallingEdgeCycle: number;
    private rPreviousRisingEdgeCycle: number;
    private rIsPeriodCreated: boolean;

    private gBrightness: number;
    private gPeriod: number;
    private gFirstHigh: boolean;
    private gLastPinState: PinState;
    private gPreviousFallingEdgeCycle: number;
    private gPreviousRisingEdgeCycle: number;
    private gIsPeriodCreated: boolean;

    private bBrightness: number;
    private bPeriod: number;
    private bFirstHigh: boolean;
    private bLastPinState: PinState;
    private bPreviousFallingEdgeCycle: number;
    private bPreviousRisingEdgeCycle: number;
    private bIsPeriodCreated: boolean;

    private animationFrameId: number | null = null;

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

    rWatchDog(lastState: PinState, lastStateCycle: number) {
        if (lastState === PinState.High && this.rPreviousFallingEdgeCycle <= lastStateCycle) {
            this.rBrightness = 1;
        } else if (lastState === PinState.Low && this.rPreviousRisingEdgeCycle <= lastStateCycle) {
            this.rBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    gWatchDog(lastState: PinState, lastStateCycle: number) {
        if (lastState === PinState.High && this.gPreviousFallingEdgeCycle <= lastStateCycle) {
            this.gBrightness = 1;
        } else if (lastState === PinState.Low && this.gPreviousRisingEdgeCycle <= lastStateCycle) {
            this.gBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    bWatchDog(lastState: PinState, lastStateCycle: number) {
        if (lastState === PinState.High && this.bPreviousFallingEdgeCycle <= lastStateCycle) {
            this.bBrightness = 1;
        } else if (lastState === PinState.Low && this.bPreviousRisingEdgeCycle <= lastStateCycle) {
            this.bBrightness = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }


    rListener(state: PinState) {
        if (!this.rIsPeriodCreated) {
            this.rPeriod = this.pins.R[0].timer.getPwmPeriod();
            this.rIsPeriodCreated = true;
        }
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;
        if (state === PinState.High) {
            this.rPreviousRisingEdgeCycle = currentCycle;

            if (this.rFirstHigh) {
                this.rBrightness = 0;
                this.rFirstHigh = false;
            } else {
                this.rBrightness = Math.max((this.rPeriod - (currentCycle - this.rPreviousFallingEdgeCycle)) / this.rPeriod, 0);
            }
            // want watch dog to run before next cycle so states dont get corrupted
            AVRRunner.getInstance().board.cpu.addClockEvent(() => this.rWatchDog(state, currentCycle), this.rPeriod - 3);

        } else if (state === PinState.Low) {
            if (this.rLastPinState === PinState.High) {
                this.rPreviousFallingEdgeCycle = currentCycle;
                this.rBrightness = Math.min((currentCycle - this.rPreviousRisingEdgeCycle) / this.rPeriod, 1)
                AVRRunner.getInstance().board.cpu.addClockEvent(() => this.rWatchDog(state, currentCycle), this.rPeriod - 3);
            }
        }

        this.rLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    gListener(state: PinState) {
        if (!this.gIsPeriodCreated) {
            this.gPeriod = this.pins.G[0].timer.getPwmPeriod();
            this.gIsPeriodCreated = true;
        }
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;
        if (state === PinState.High) {
            this.gPreviousRisingEdgeCycle = currentCycle;

            if (this.gFirstHigh) {
                this.gBrightness = 0;
                this.gFirstHigh = false;
            } else {
                this.gBrightness = Math.max((this.gPeriod - (currentCycle - this.gPreviousFallingEdgeCycle)) / this.gPeriod, 0);
            }
            // want watch dog to run before next cycle so states dont get corrupted
            AVRRunner.getInstance().board.cpu.addClockEvent(() => this.gWatchDog(state, currentCycle), this.gPeriod - 3);

        } else if (state === PinState.Low) {
            if (this.gLastPinState === PinState.High) {
                this.gPreviousFallingEdgeCycle = currentCycle;
                this.gBrightness = Math.min((currentCycle - this.gPreviousRisingEdgeCycle) / this.gPeriod, 1)
                AVRRunner.getInstance().board.cpu.addClockEvent(() => this.gWatchDog(state, currentCycle), this.gPeriod - 3);
            }
        }

        this.gLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    bListener(state: PinState) {
        if (!this.bIsPeriodCreated) {
            this.bPeriod = this.pins.B[0].timer.getPwmPeriod();
            this.bIsPeriodCreated = true;
        }
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;
        if (state === PinState.High) {
            this.bPreviousRisingEdgeCycle = currentCycle;

            if (this.bFirstHigh) {
                this.bBrightness = 0;
                this.bFirstHigh = false;
            } else {
                this.bBrightness = Math.max((this.bPeriod - (currentCycle - this.bPreviousFallingEdgeCycle)) / this.bPeriod, 0);
            }
            // want watch dog to run before next cycle so states dont get corrupted
            AVRRunner.getInstance().board.cpu.addClockEvent(() => this.bWatchDog(state, currentCycle), this.bPeriod - 3);

        } else if (state === PinState.Low) {
            if (this.bLastPinState === PinState.High) {
                this.bPreviousFallingEdgeCycle = currentCycle;
                this.bBrightness = Math.min((currentCycle - this.bPreviousRisingEdgeCycle) / this.bPeriod, 1)
                AVRRunner.getInstance().board.cpu.addClockEvent(() => this.bWatchDog(state, currentCycle), this.bPeriod - 3);
            }
        }

        this.bLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }


    private renderSvg() {
        const totalBrightness: number = Math.max(this.rBrightness, this.gBrightness, this.bBrightness);
        const totalOpacity: number = totalBrightness != 0 ? 0.2 + totalBrightness * 0.6 : 0;

        const redBlur: Element = this.element.querySelector("#rgbRedBlur");
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
        mixedCircle.setAttribute("fill", `rgb(${this.rBrightness * 255}, ${this.gBrightness * 255}, ${this.bBrightness * 255})`); //green had + this.bBrightness * 90
        mixedCircle.setAttribute("opacity", `${totalOpacity}`);

        const hollowCircle = this.element.querySelector("#rgbHollowCircle");
        hollowCircle.setAttribute("opacity", `${totalOpacity}`);

        this.animationFrameId = null;
    }
}
