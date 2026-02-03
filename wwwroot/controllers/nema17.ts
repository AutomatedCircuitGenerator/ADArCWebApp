import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";
import { Digital } from "../boards/board";

export class NEMA17 extends Controller {
    private stepPin!: Digital;
    private dirPin!: Digital;
    private currentPos: number;
    private stepsPerRev: number;

    override update(state: Record<string, any>) {
        this.stepsPerRev = Math.max(0, state.stepsperrev || 200);
    }
    
    setup() {
        this.stepPin = this.pins.STEP[0].digital;
        this.dirPin = this.pins.DIR[0].digital;
        this.currentPos = 0;
        this.stepsPerRev = 200;
        
        // Every falling edge on STEP triggers a step
        this.stepPin.addListener(this.onStep.bind(this));
    }

    cleanup() {
        // nothing to cleanup for console output
    }

    private onStep(state: PinState) {
        if (state !== PinState.Low) return; // only act on falling edge

        const dir = this.dirPin.state === PinState.High ? 1 : -1;
        this.currentPos += dir;

        const angle = (this.currentPos % this.stepsPerRev) * (360 / this.stepsPerRev);
        const directionStr = dir === 1 ? "Clockwise" : "Counter-Clockwise";

        console.log(
            `Step: ${this.currentPos}, Angle: ${angle.toFixed(2)}°, Direction: ${directionStr}`
        );
    }
}