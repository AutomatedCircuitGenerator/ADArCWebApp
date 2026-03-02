import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";
import { Digital } from "../boards/board";

export class NEMA17 extends Controller {
    private stepPin: Digital;
    private dirPin: Digital;
    
    private currentPos: number;
    private stepsPerRev: number;
    
    private motorShaft: SVGGElement | null;
    private originalTransform: string;

    override update(state: Record<string, any>) {
        this.stepsPerRev = Math.max(0, state.stepsperrev || 200);
    }
    
    setup() {
        this.stepPin = this.pins.STEP[0].digital;
        this.dirPin = this.pins.DIR[0].digital;
        
        this.currentPos = 0;
        this.stepsPerRev = 200;
        this.motorShaft = this.element.querySelector("#g22") as SVGGElement | null;
        this.originalTransform = this.motorShaft?.getAttribute("transform") || "";
        if (!this.motorShaft)
            console.error("Motor shaft not found in SVG. Animation will be disabled. Check your SVG file. ");
        
        // Every falling edge on STEP triggers a step
        this.stepPin.addListener(this.onStep.bind(this));
        
        this.onStep(PinState.Low);
    }

    private onStep(state: PinState) {
        if (state !== PinState.Low) return; // only act on falling edge
        
        if (!this.motorShaft) return;
        
        const direction = this.dirPin.state === PinState.High ? 1 : -1;
        
        this.currentPos += direction;
        this.currentPos %= this.stepsPerRev;
        
        // Keep motor position positive
        if (this.currentPos < 0) 
            this.currentPos += this.stepsPerRev;
        const angle = (this.currentPos / this.stepsPerRev) * 2 * Math.PI;

        const radius = 0.2;
        
        const dx = radius * Math.cos(angle) * Math.cos(Math.PI / 4); // Scale the x displacement because the shaft is at an angle to the viewbox
        const dy = radius * Math.sin(angle);
        
        const newTransform = `translate(${dx} ${dy}) ${this.originalTransform}`;
        
        this.motorShaft?.setAttribute(
            "transform",
            newTransform
        );
    }
}