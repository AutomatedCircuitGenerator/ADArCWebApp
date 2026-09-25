import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";

export class A4988 extends Controller {
    private dirState: PinState = PinState.Low;
    private prevStepState: PinState = PinState.Low;
    private angle: number = 0;
    setup() {
        this.pins.step[0].digital.addListener((state) => this.stepListener(state));
        this.pins.dir[0].digital.addListener((state) => this.dirListener(state));
    }
    cleanup() {
        this.angle = 0;
        this.prevStepState = PinState.Low;
    }
    stepListener(state: PinState) {
        const risingEdge = this.prevStepState === PinState.Low && state === PinState.High;
        this.prevStepState = state;
        if (!risingEdge) return;
        this.rotateShaft();
    } 
    dirListener(state: PinState) {
        this.dirState = state;
    }
    rotateShaft() {
        if (this.dirState === PinState.Low) this.angle += 1.8;
        else this.angle -= 1.8;
        const shaft = document.querySelector("#shaft");
        shaft.setAttribute("transform", `rotate(${this.angle} 180 172)`);
    }
}