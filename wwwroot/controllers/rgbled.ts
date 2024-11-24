import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export class RGBLED extends Controller {
    private rLastState: PinState = PinState.Input;
    private rLastStateCycles: number = 0;
    private rHighCycles: number = 0;
    private rFirstCallCycles: number = 0;
    private rBrightness: number = 0;
    private rPeriod: number = 0;
    private rIsFirstCall: boolean = true;
    private rRisingEdgeTime: number = 0;

    private gLastState: PinState = PinState.Input;
    private gLastStateCycles: number = 0;
    private gHighCycles: number = 0;
    private gFirstCallCycles: number = 0;
    private gBrightness: number = 0;
    private gPeriod: number = 0;
    private gIsFirstCall: boolean = true;
    private gRisingEdgeTime: number = 0;

    private bLastState: PinState = PinState.Input;
    private bLastStateCycles: number = 0;
    private bHighCycles: number = 0;
    private bFirstCallCycles: number = 0;
    private bBrightness: number = 0;
    private bPeriod: number = 0;
    private bIsFirstCall: boolean = true;
    private bRisingEdgeTime: number = 0;


    private animationFrameId: number | null = null;


    setup() {
        this.rLastState = PinState.Input;
        this.rLastStateCycles = 0;
        this.rHighCycles = 0;
        this.rFirstCallCycles = 0;
        this.rBrightness = 0;
        this.rPeriod = 0;
        this.rIsFirstCall = true;
        this.rRisingEdgeTime = 0;

        this.gLastState = PinState.Input;
        this.gLastStateCycles = 0;
        this.gHighCycles = 0;
        this.gFirstCallCycles = 0;
        this.gBrightness = 0;
        this.gPeriod = 0;
        this.gIsFirstCall = true;
        this.gRisingEdgeTime = 0;

        this.bLastState = PinState.Input;
        this.bLastStateCycles = 0;
        this.bHighCycles = 0;
        this.bFirstCallCycles = 0;
        this.bBrightness = 0;
        this.bPeriod = 0;
        this.bIsFirstCall = true;
        this.bRisingEdgeTime = 0;

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

    rListener(state: PinState) {
        const avrInstance = AVRRunner.getInstance();
        const cpuCycles = avrInstance.board.cpu.cycles;

        if (this.rIsFirstCall) {
            this.rFirstCallCycles = cpuCycles;
            this.rIsFirstCall = false;
        }

        const delta = cpuCycles - this.rLastStateCycles;

        if (this.rLastState === PinState.High) {
            this.rHighCycles = delta;
        }

        if (this.rLastState === PinState.Low) {
            // this.rSeenRisingEdge = true;

            if (this.rRisingEdgeTime > 0) {
                this.rPeriod = cpuCycles - this.rRisingEdgeTime;
            }

            this.rRisingEdgeTime = cpuCycles;
        }

        this.rLastState = state;
        this.rLastStateCycles = cpuCycles - this.rFirstCallCycles;

        // This is extremely rubbish but like what ya gonna do
        if (!(AVRRunner.getInstance().board.cpu.cycles - this.rFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.rBrightness = 0;
        } else if (this.rBrightness == 0 && this.rRisingEdgeTime) {
            this.rBrightness = 1;
        } else if (!this.rPeriod) {
            this.rBrightness = 0;
        } else {
            this.rBrightness = Math.min(this.rHighCycles / this.rPeriod, 1);
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    gListener(state: PinState) {
        const avrInstance = AVRRunner.getInstance();
        const cpuCycles = avrInstance.board.cpu.cycles;

        if (this.gIsFirstCall) {
            this.gFirstCallCycles = cpuCycles;
            this.gIsFirstCall = false;
        }

        const delta = cpuCycles - this.gLastStateCycles;

        if (this.gLastState === PinState.High) {
            this.gHighCycles = delta;
        }

        if (this.gLastState === PinState.Low) {
            // this.gSeenRisingEdge = true;

            if (this.gRisingEdgeTime > 0) {
                this.gPeriod = cpuCycles - this.gRisingEdgeTime;
            }

            this.gRisingEdgeTime = cpuCycles;
        }

        this.gLastState = state;
        this.gLastStateCycles = cpuCycles - this.gFirstCallCycles;

        // This is extremely cancerous but like what ya gonna do
        if (!(AVRRunner.getInstance().board.cpu.cycles - this.gFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.gBrightness = 0;
        } else if (this.gBrightness == 0 && this.gRisingEdgeTime > 0) {
            this.gBrightness = 1;
        } else if (!this.gPeriod) {
            this.gBrightness = 0;
        } else {
            this.gBrightness = Math.min(this.gHighCycles / this.gPeriod, 1);
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    bListener(state: PinState) {
        const avrInstance = AVRRunner.getInstance();
        const cpuCycles = avrInstance.board.cpu.cycles;

        if (this.bIsFirstCall) {
            this.bFirstCallCycles = cpuCycles;
            this.bIsFirstCall = false;
        }

        const delta = cpuCycles - this.bLastStateCycles;

        if (this.bLastState === PinState.High) {
            this.bHighCycles = delta;
        }

        if (this.bLastState === PinState.Low) {
            // this.rSeenRisingEdge = true;

            if (this.bRisingEdgeTime > 0) {
                this.bPeriod = cpuCycles - this.bRisingEdgeTime;
            }

            this.bRisingEdgeTime = cpuCycles;
        }

        this.bLastState = state;
        this.bLastStateCycles = cpuCycles - this.bFirstCallCycles;

        // This is extremely cancerous but like what ya gonna do
        if (!(AVRRunner.getInstance().board.cpu.cycles - this.bFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.bBrightness = 0;
        } else if (this.bBrightness == 0 && this.bRisingEdgeTime > 0) {
            this.bBrightness = 1;
        } else if (!this.bPeriod) {
            this.bBrightness = 0;
        } else {
            this.bBrightness = Math.min(this.bHighCycles / this.bPeriod, 1);
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }


    private renderSvg() {
        const totalBrightness = Math.max(this.rBrightness, this.gBrightness, this.bBrightness);
        const totalOpacity = totalBrightness != 0 ? 0.2 + totalBrightness * 0.6 : 0;

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
        mixedCircle.setAttribute("fill", `rgb(${this.rBrightness * 255}, ${this.gBrightness * 255 + this.bBrightness * 90}, ${this.bBrightness * 255})`);
        mixedCircle.setAttribute("opacity", `${totalOpacity}`);

        const hollowCircle = this.element.querySelector("#rgbHollowCircle");
        hollowCircle.setAttribute("opacity", `${totalOpacity}`);

        this.animationFrameId = null;
    }
}
