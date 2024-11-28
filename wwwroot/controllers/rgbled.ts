import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";
import {TimerMode} from "@lib/avr8js/peripherals/timer";


//https://docs.arduino.cc/tutorials/generic/secrets-of-arduino-pwm/
//https://serval.mythic-beasts.com/~markt/ATmega-timers.html
//https://forum.arduino.cc/t/arduino-mega-pwm-generation/643026/3
export class RGBLED extends Controller {
    //fpwm = clock/(prescaler*top)

    private unoPwmPeriods = {
        3: 32640, // 1/(16000000/64/255/2) [490.1960784314] = 0.00204
        11: 32640,
        5: 16320, //1/(16000000/64/256) [976.5625] = 0.001024 
        6: 16320,
        9: 16320,
        10: 16320
    };
    private megaPwmPeriods = {
        2: 32640,
        3: 32640,
        4: 16320,
        5: 32640,
        6: 32640,
        7: 32640,
        8: 32640,
        9: 32640,
        10: 32640,
        11: 32640,
        12: 32640,
        13: 16320,
        44: 32640,
        45: 32640,
        46: 32640,
    }

    private rBrightness: number;
    private rPeriod: number;
    private rFirstHigh: boolean;
    private rLastPinState: PinState;
    private rPreviousFallingEdgeCycle: number;
    private rPreviousRisingEdgeCycle: number;

    private gBrightness: number;
    private gPeriod: number;
    private gFirstHigh: boolean;
    private gLastPinState: PinState;
    private gPreviousFallingEdgeCycle: number;
    private gPreviousRisingEdgeCycle: number;

    private bBrightness: number;
    private bPeriod: number;
    private bFirstHigh: boolean;
    private bLastPinState: PinState;
    private bPreviousFallingEdgeCycle: number;
    private bPreviousRisingEdgeCycle: number;


    private animationFrameId: number | null = null;
    private rPeriodCreated: boolean;
    private bPeriodCreated: boolean;
    private gPeriodCreated: boolean;


    setup() {

        this.rPeriodCreated = true;
        this.gPeriodCreated = true;
        this.bPeriodCreated = true;

        this.rLastPinState = this.pins.R[0].digital.state;
        this.rFirstHigh = true;
        this.rBrightness = 0;
        this.rPeriod = 0;
        this.rPreviousFallingEdgeCycle = 0;
        this.rPreviousRisingEdgeCycle = 0;

        this.gLastPinState = this.pins.G[0].digital.state;
        this.gFirstHigh = true;
        this.gBrightness = 0;
        this.gPeriod = 0;
        this.gPreviousFallingEdgeCycle = 0;
        this.gPreviousRisingEdgeCycle = 0;

        this.bLastPinState = this.pins.B[0].digital.state;
        this.bFirstHigh = true;
        this.bBrightness = 0;
        this.bPeriod = 0;
        this.bPreviousFallingEdgeCycle = 0;
        this.bPreviousRisingEdgeCycle = 0;


        this.animationFrameId = null;

        //this should be calculated with real register checks, but like who has time for that.
        if (AVRRunner.getInstance().board.timers.length === 3) {
            this.rPeriod = this.unoPwmPeriods[this.pinIndices.R[0].valueOf()];
            this.gPeriod = this.unoPwmPeriods[this.pinIndices.G[0].valueOf()];
            this.bPeriod = this.unoPwmPeriods[this.pinIndices.B[0].valueOf()];
        } else if (AVRRunner.getInstance().board.timers.length === 6) {
            this.rPeriod = this.megaPwmPeriods[this.pinIndices.R[0].valueOf()];
            this.gPeriod = this.megaPwmPeriods[this.pinIndices.G[0].valueOf()];
            this.bPeriod = this.megaPwmPeriods[this.pinIndices.B[0].valueOf()];
        } else {
            throw new Error("Unknown board. cannot create pwm component")
        }
        this.pins.R[0].digital.addListener(this.rListener.bind(this));
        this.pins.G[0].digital.addListener(this.gListener.bind(this));
        this.pins.B[0].digital.addListener(this.bListener.bind(this));
        //https://deepbluembedded.com/arduino-timers/


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
        if (this.rPeriodCreated) {
            const timerMode = this.pins.R[0].timer.getTimerMode();
            console.log(`getTimerMode : ${timerMode}`);
            let period = 1;
            if (timerMode === TimerMode.FastPWM) {
                period = ((this.pins.R[0].timer.TOP + 1) * this.pins.R[0].timer.getDivider());
            } else if (timerMode === TimerMode.PWMPhaseCorrect) {
                period = (2 * (this.pins.R[0].timer.TOP + 1) * this.pins.R[0].timer.getDivider());

            }
            // const period = (this.pins.B[0].timer.TOP + 1) / (AVRRunner.getInstance().board.cpu.frequency / this.pins.B[0].timer.getDivider())

            console.log(`theoretical period ${period}`)

            this.rPeriodCreated = false;
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
        if (this.gPeriodCreated) {
            const timerMode = this.pins.G[0].timer.getTimerMode();
            console.log(`getTimerMode : ${timerMode}`);
            let period = 1;
            if (timerMode === TimerMode.FastPWM) {
                period = ((this.pins.G[0].timer.TOP + 1) * this.pins.G[0].timer.getDivider()) ;
            } else if (timerMode === TimerMode.PWMPhaseCorrect) {
                period = (2 * (this.pins.G[0].timer.TOP + 1) * this.pins.G[0].timer.getDivider());

            }
            // const period = (this.pins.B[0].timer.TOP + 1) / (AVRRunner.getInstance().board.cpu.frequency / this.pins.B[0].timer.getDivider())

            console.log(`theoretical period ${period}`)

            this.gPeriodCreated = false;
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
        if (this.bPeriodCreated) {
            const timerMode = this.pins.B[0].timer.getTimerMode();
            console.log(`getTimerMode : ${timerMode}`);
            let period = 1;
            if (timerMode === TimerMode.FastPWM) {
                period = ((this.pins.B[0].timer.TOP + 1) * this.pins.B[0].timer.getDivider()) ;
            } else if (timerMode === TimerMode.PWMPhaseCorrect) {
                period = (2 * (this.pins.B[0].timer.TOP + 1) * this.pins.B[0].timer.getDivider());

            }
            // const period = (this.pins.B[0].timer.TOP + 1) / (AVRRunner.getInstance().board.cpu.frequency / this.pins.B[0].timer.getDivider())

            console.log(`theoretical period ${period}`)

            this.bPeriodCreated = false;
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


// const int bluePin = 5;
// const int greenPin = 6;
// const int redPin= 3;
// // *Interfacing RGB LED with Arduino 
// // * Author: Osama Ahmed 
//
//
// void setup() {
//     //Defining the pins as OUTPUT
//     pinMode(redPin,  OUTPUT);
//     pinMode(greenPin, OUTPUT);
//     pinMode(bluePin, OUTPUT);
// }
// void  loop() {
//     setColor(0, 255, 0); // Red Color
//     delay(1000);
//     setColor(0,  0, 0); // Green Color
//     delay(1000);
//     setColor(255,  0, 0); // Green Color
//     delay(1000);
//     setColor(0,  0, 0); // Green Color
//     delay(1000);
//     setColor(0,  0, 255); // Green Color
//     delay(1000);
//     setColor(0,  0, 0); // Green Color
//     delay(1000);
//
// }
// void setColor(int redValue, int greenValue,  int blueValue) {
//     analogWrite(redPin, redValue);
//     analogWrite(greenPin,  greenValue);
//     analogWrite(bluePin, blueValue);
// }
