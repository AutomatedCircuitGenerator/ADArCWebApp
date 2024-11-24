import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export class RGBLED extends Controller {
    private rLastState: PinState = PinState.Input;
    private rLastStateCycles: number = 0;
    private rHighCycles: number = 0;
    private rFirstCallCycles: number = 0;
    private rBrightness: number = 0;
    private rSeenRisingEdge = false;

    private gLastState: PinState = PinState.Input;
    private gLastStateCycles: number = 0;
    private gHighCycles: number = 0;
    private gFirstCallCycles: number = 0;
    private gBrightness: number = 0;
    private gSeenRisingEdge = false;

    private bLastState: PinState = PinState.Input;
    private bLastStateCycles: number = 0;
    private bHighCycles: number = 0;
    private bFirstCallCycles: number = 0;
    private bBrightness: number = 0;
    private bSeenRisingEdge = false;


    private rIsFirstCall: boolean = true;
    private gIsFirstCall: boolean = true;
    private bIsFirstCall: boolean = true;


    setup() {
        this.rLastState = PinState.Input;
        // the cycle counter at the last edge
        this.rLastStateCycles = 0;
        this.rHighCycles = 0;
        this.rFirstCallCycles = 0;
        this.rBrightness = 0;
        this.rSeenRisingEdge = false;


        this.gLastState = PinState.Input;
        this.gLastStateCycles = 0;
        this.gHighCycles = 0;
        this.gFirstCallCycles = 0;
        this.gBrightness = 0;
        this.gSeenRisingEdge = false;


        this.bLastState = PinState.Input;
        this.bLastStateCycles = 0;
        this.bHighCycles = 0;
        this.bFirstCallCycles = 0;
        this.bBrightness = 0;
        this.bSeenRisingEdge = false;

        this.rIsFirstCall = true;
        this.gIsFirstCall = true;
        this.bIsFirstCall = true;

        this.pins.R[0].digital.addListener(this.rListener.bind(this));
        this.pins.G[0].digital.addListener(this.gListener.bind(this));
        this.pins.B[0].digital.addListener(this.bListener.bind(this));
    }

    rListener(state: PinState) {
        if (this.rIsFirstCall) {
            //We may be called at some point in the future when we havent started the pwm yet. still to be tested
            this.rFirstCallCycles = AVRRunner.getInstance().board.cpu.cycles
            this.rIsFirstCall = false;
        }
        //time of pulse
        const delta: number = AVRRunner.getInstance().board.cpu.cycles - this.rLastStateCycles;
        if (this.rLastState === PinState.High) {
            this.rHighCycles += delta;
        }
        if (this.rLastState === PinState.Low) {
            this.rSeenRisingEdge = true;
        }

        this.rLastState = state;
        this.rLastStateCycles = AVRRunner.getInstance().board.cpu.cycles - this.rFirstCallCycles;

        if (!(AVRRunner.getInstance().board.cpu.cycles - this.rFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.rBrightness = 0;
        } else if (this.rBrightness == 0 && this.rSeenRisingEdge) {
            this.rBrightness = 1;
        } else {
            this.rBrightness = Math.min(this.rHighCycles / (AVRRunner.getInstance().board.cpu.cycles - this.rFirstCallCycles), 1);
        }
    }
    gListener(state: PinState) {
        if (this.gIsFirstCall) {
            //We may be called at some point in the future when we havent started the pwm yet. still to be tested
            this.gFirstCallCycles = AVRRunner.getInstance().board.cpu.cycles
            this.gIsFirstCall = false;
        }
        //time of pulse
        const delta: number = AVRRunner.getInstance().board.cpu.cycles - this.gLastStateCycles;
        if (this.gLastState === PinState.High) {
            this.gHighCycles += delta;
        }
        if (this.gLastState === PinState.Low) {
            this.gSeenRisingEdge = true;
        }

        this.gLastState = state;
        this.gLastStateCycles = AVRRunner.getInstance().board.cpu.cycles - this.gFirstCallCycles;

        if (!(AVRRunner.getInstance().board.cpu.cycles - this.gFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.gBrightness = 0;
        } else if (this.gBrightness == 0 && this.gSeenRisingEdge) {
            this.gBrightness = 1;
        } else {
            this.gBrightness = Math.min(this.gHighCycles / (AVRRunner.getInstance().board.cpu.cycles - this.gFirstCallCycles), 1);
        }
    }
    bListener(state: PinState) {
        if (this.bIsFirstCall) {
            //We may be called at some point in the future when we havent started the pwm yet. still to be tested
            this.bFirstCallCycles = AVRRunner.getInstance().board.cpu.cycles
            this.bIsFirstCall = false;
        }
        //time of pulse
        const delta: number = AVRRunner.getInstance().board.cpu.cycles - this.bLastStateCycles;
        if (this.bLastState === PinState.High) {
            this.bHighCycles += delta;
        }
        if (this.bLastState === PinState.Low) {
            this.bSeenRisingEdge = true;
        }

        this.bLastState = state;
        this.bLastStateCycles = AVRRunner.getInstance().board.cpu.cycles - this.bFirstCallCycles;

        if (!(AVRRunner.getInstance().board.cpu.cycles - this.bFirstCallCycles)) {
            //on our first call we will be here. dont want to make two if statements and this is better protection, but if this somehow gets to be 0 during the run the brightness will get messed up, cause next branch relies on it
            this.bBrightness = 0;
        } else if (this.bBrightness == 0 && this.bSeenRisingEdge) {
            this.bBrightness = 1;
        } else {
            this.bBrightness = Math.min(this.bHighCycles / (AVRRunner.getInstance().board.cpu.cycles - this.bFirstCallCycles), 1);
        }
    }
}