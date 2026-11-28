import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";
import { Digital } from "../boards/board";

export class NEMA17 extends Controller {
    private stepPin: Digital;
    private dirPin: Digital;

    private currentPos: number = 0;
    private stepsPerRev: number = 200;

    private motorShaft: SVGGElement | null = null;

    override update(state: Record<string, any>) {
        const steps = Number(state.stepsperrev ?? 200);
        this.stepsPerRev = Math.max(1, Math.round(steps));
    }

    setup() {
        this.stepPin = this.pins.STEP[0].digital;
        this.dirPin = this.pins.DIR[0].digital;

        this.currentPos = 0;
        this.motorShaft = this.element.querySelector("#g22") as SVGGElement | null;
        if (!this.motorShaft)
            console.error("Motor shaft not found in SVG. Animation will be disabled. Check your SVG file.");
        else
            this.motorShaft.setAttribute("transform", "rotate(0 314 96)");

        // Every falling edge on STEP triggers a step
        this.stepPin.addListener(this.onStep.bind(this));
    }

    override cleanup() {
        this.currentPos = 0;
        this.motorShaft?.setAttribute("transform", "rotate(0 314 96)");
    }

    private onStep(state: PinState) {
        if (state !== PinState.Low) return; // only act on falling edge
        if (!this.motorShaft) return;

        const direction = this.dirPin.state === PinState.High ? 1 : -1;

        this.currentPos = (this.currentPos + direction) % this.stepsPerRev;
        if (this.currentPos < 0)
            this.currentPos += this.stepsPerRev;

        const angle = (this.currentPos / this.stepsPerRev) * 360;
        this.motorShaft.setAttribute("transform", `rotate(${angle} 314 96)`);
    }
}
