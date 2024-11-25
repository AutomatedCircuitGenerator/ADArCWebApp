import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export class RGBLED extends Controller {

    private pwmPeriods = {
        3: 32640,
        11: 32640,
        5: 16320,
        6: 16320,
        9: 16320,
        10: 16320
    };

    private rBrightness: number;
    private rPeriod: number;
    private rRisingEdgeCycle: number;
    private rFallingEdgeCycle: number;
    private rFirstHigh: boolean;
    private rLastPinState: PinState;


    private gBrightness: number;
    private gPeriod: number;
    private gRisingEdgeCycle: number;
    private gFallingEdgeCycle: number;
    private gFirstHigh: boolean;
    private gLastPinState: PinState;


    private bBrightness: number;
    private bPeriod: number;
    private bRisingEdgeCycle: number;
    private bFallingEdgeCycle: number;
    private bFirstHigh: boolean;
    private bLastPinState: PinState;

    private animationFrameId: number | null = null;

    setup() {
        this.rBrightness = 0;
        this.rPeriod = 0;
        this.rRisingEdgeCycle = 0;
        this.rFallingEdgeCycle = 0;
        this.rFirstHigh = false;
        this.rLastPinState = this.pins.R[0].digital.state;

        this.gBrightness = 0;
        this.gPeriod = 0;
        this.gRisingEdgeCycle = 0;
        this.gFallingEdgeCycle = 0;
        this.gFirstHigh = false;
        this.gLastPinState = this.pins.G[0].digital.state;

        this.bBrightness = 0;
        this.bPeriod = 0;
        this.bRisingEdgeCycle = 0;
        this.bFallingEdgeCycle = 0;
        this.bFirstHigh = false;
        this.bLastPinState = this.pins.B[0].digital.state;

        this.animationFrameId = null;

        //this should be calculated with real register checks, but like who has time for that.
        this.rPeriod = this.pwmPeriods[this.pinIndices.R[0].valueOf()];
        this.gPeriod = this.pwmPeriods[this.pinIndices.G[0].valueOf()];
        this.bPeriod = this.pwmPeriods[this.pinIndices.B[0].valueOf()];
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

    rListener(state: PinState) {
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;

        if (state === PinState.High) {
            this.rRisingEdgeCycle = currentCycle;
            if (this.rFirstHigh) {
                this.rBrightness = 0;
                this.rFirstHigh = false;
            } else {
                this.rBrightness = Math.max((this.rPeriod - (currentCycle - this.rFallingEdgeCycle)) / this.rPeriod, 0);
            }

        } else if (state === PinState.Low) {
            if (this.rLastPinState === PinState.High) {
                this.rFallingEdgeCycle = currentCycle;
                this.rBrightness = Math.min((currentCycle - this.rRisingEdgeCycle) / this.rPeriod, 1);

            }
        }
        this.rLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    gListener(state: PinState) {
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;

        if (state === PinState.High) {
            this.gRisingEdgeCycle = currentCycle;
            if (this.gFirstHigh) {
                this.gBrightness = 0;
                this.gFirstHigh = false
            } else {
                this.gBrightness = Math.max((this.gPeriod - (currentCycle - this.gFallingEdgeCycle)) / this.gPeriod, 0);
            }

        } else if (state === PinState.Low) {
            if (this.gLastPinState === PinState.High) {
                this.gFallingEdgeCycle = currentCycle;
                this.gBrightness = Math.min((currentCycle - this.gRisingEdgeCycle) / this.gPeriod, 1);
            }
        }
        this.gLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    bListener(state: PinState) {
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;

        if (state === PinState.High) {
            this.bRisingEdgeCycle = currentCycle;
            if (this.bFirstHigh) {
                this.bBrightness = 0;
                this.bFirstHigh = false
            } else {
                this.bBrightness = Math.max((this.bPeriod - (currentCycle - this.bFallingEdgeCycle)) / this.bPeriod, 0);
            }

        } else if (state === PinState.Low) {
            if (this.bLastPinState === PinState.High) {
                this.bFallingEdgeCycle = currentCycle;
                this.bBrightness = Math.min((currentCycle - this.bRisingEdgeCycle) / this.bPeriod, 1);
            }
        }
        this.bLastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }


    private renderSvg() {
        const totalBrightness: number = Math.max(this.rBrightness, this.gBrightness, this.bBrightness);
        console.log(this.rBrightness, this.gBrightness, this.bBrightness)
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
