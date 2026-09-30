import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";

export class A4988 extends Controller {
    // Store the current state of the A4988 control pins
    private dirState: PinState = PinState.Low;
    private enState: PinState = PinState.Low;
    private slpState: PinState = PinState.High;
    private rstState: PinState = PinState.High;
    private ms1State: PinState = PinState.Low;
    private ms2State: PinState = PinState.Low;
    private ms3State: PinState = PinState.Low;
    private prevStepState: PinState = PinState.Low;
    private angle: number = 0;
    
    setup() {
        // Listen for changes on each A4988 control pin
        this.pins.step[0].digital.addListener((state) => this.stepListener(state));
        this.pins.dir[0].digital.addListener((state) => this.dirListener(state));
        this.pins.en[0].digital.addListener((state) => this.enListener(state));
        this.pins.slp[0].digital.addListener((state) => this.slpListener(state));
        this.pins.rst[0].digital.addListener((state) => this.rstListener(state));
        this.pins.ms1[0].digital.addListener((state) => this.ms1Listener(state));
        this.pins.ms2[0].digital.addListener((state) => this.ms2Listener(state));
        this.pins.ms3[0].digital.addListener((state) => this.ms3Listener(state));
    }
    
    cleanup() {
        this.angle = 0;
        this.prevStepState = PinState.Low;
    }
    
    stepListener(state: PinState) {
        // The motor moves only on the rising edge of the STEP signal
        const risingEdge = this.prevStepState === PinState.Low && state === PinState.High;
        this.prevStepState = state;
        if (!risingEdge) return;
        if (this.enState === PinState.High) return;
        if (this.rstState === PinState.Low) return;
        if (this.slpState === PinState.Low) return;
        this.rotateShaft();
    }
    
    dirListener(state: PinState) {
        this.dirState = state;
    }
    
    enListener(state: PinState) {
        this.enState = state;
    }
    
    slpListener(state: PinState) {
        this.slpState = state;
    }
    
    rstListener(state: PinState) {
        this.rstState = state;
    }
    
    ms1Listener(state: PinState) {
        this.ms1State = state;
    }
    
    ms2Listener(state: PinState) {
        this.ms2State = state;
    }
    
    ms3Listener(state: PinState) {
        this.ms3State = state;
    }
    
    stepAngle():number {
        // MS1-MS3 determine the microstepping resolution
        let stepAngle:number;
        const ms1 = this.ms1State;
        const ms2 = this.ms2State;
        const ms3 = this.ms3State;
        if (!ms1 && !ms2 && !ms3) stepAngle = 1.8;
        else if (ms1 && !ms2 && !ms3) stepAngle = 0.9;
        else if (!ms1 && ms2 && !ms3) stepAngle = 0.45;
        else if (ms1 && ms2 && !ms3) stepAngle = 0.225;
        else if (ms1 && ms2 && ms3) stepAngle = 0.1125;
        
        return stepAngle;
    }
    
    rotateShaft() {
        // DIR determines whether the shaft rotates clockwise or counterclockwise
        if (this.dirState === PinState.Low) this.angle += this.stepAngle();
        else this.angle -= this.stepAngle();
        const shaft = document.querySelector("#shaft");
        shaft.setAttribute("transform", `rotate(${this.angle} 180 172)`);
    }
}