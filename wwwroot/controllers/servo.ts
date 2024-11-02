import { Controller } from "@controllers/controller";
import { Pin } from "./pin";
import { PinState } from "@lib/avr8js";
import { AVRRunner } from "@lib/execute";

export class Servo extends Controller {
    private signal?: Pin;
    private risingEdgeCycle?: number;
    private fallingEdgeCycle?: number;
    private previousAngle?: number;

    setup(): void {
        this.fallingEdgeCycle = undefined;
        this.risingEdgeCycle = undefined;
        this.signal = this.pins.orange[0];
        this.signal?.setListener(this.onSignalChange.bind(this)); // this is done to preserve the "this" context, since listener will be called inside Pin.ts
    }

    private onSignalChange(state: PinState) {
        const currentCycle = AVRRunner.getInstance().cpu.cycles;

        if (state === PinState.High) {
            this.risingEdgeCycle = currentCycle;
        } else if (state === PinState.Low && this.risingEdgeCycle !== undefined) {
            this.fallingEdgeCycle = currentCycle;
            const pulseWidthCycles = this.fallingEdgeCycle - this.risingEdgeCycle;
            const pulseWidthMs = this.cyclesToMs(pulseWidthCycles);
            const angle = Math.round(this.msToAngle(pulseWidthMs));
            
            if (this.previousAngle !== angle) {
                this.renderHorn(angle);
            }
            
            this.previousAngle = angle;
        }
    }
    
    private renderHorn(angle: number) {
        const horn = this.element.querySelector<HTMLElement>(".horn");
        const transformValue = `translate(91.467 59.773) rotate(${angle}) translate(-91.467 -59.773)`;
        horn.setAttribute('transform', transformValue);
    }

    private cyclesToMs(cycles: number) {
        return (cycles * 1_000) / (AVRRunner.getInstance().MHZ / 1000); // Use 1000 scaling factor for finer precision
    }

    private msToAngle(ms: number) {
        const minPulse = 544; // these are according to Servo.h specs for min and max pulse lengths
        const maxPulse = 2400; 
        const minAngle = 0;
        const maxAngle = 180;

        // Use precise bounds checking
        if (ms <= minPulse) return minAngle;
        if (ms >= maxPulse) return maxAngle;

        // Map to angle
        return ((ms - minPulse) / (maxPulse - minPulse)) * (maxAngle - minAngle) + minAngle;
    }
}
