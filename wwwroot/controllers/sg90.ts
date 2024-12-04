import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";
import {Digital} from "../boards/board";

export class SG90 extends Controller {
    private signal?: Digital;
    private risingEdgeCycle?: number;
    private fallingEdgeCycle?: number;
    private previousAngle?: number;
    
    private hornAngle:number|null;
    private animationFrameId:number|null;

    setup(): void {
        this.fallingEdgeCycle = undefined;
        this.risingEdgeCycle = undefined;
        this.animationFrameId = null;
        this.signal = this.pins.orange[0].digital;
        this.signal?.addListener(this.onSignalChange.bind(this)); // this is done to preserve the "this" context, since listener will be called inside Pin.ts
    }
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.hornAngle= null;
    }

    private onSignalChange(state: PinState) {
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;

        if (state === PinState.High) {
            this.risingEdgeCycle = currentCycle;
        } else if (state === PinState.Low && this.risingEdgeCycle !== undefined) {
            this.fallingEdgeCycle = currentCycle;
            const pulseWidthCycles = this.fallingEdgeCycle - this.risingEdgeCycle;
            const pulseWidthMs = this.cyclesToMs(pulseWidthCycles);
            const angle = Math.round(this.msToAngle(pulseWidthMs));

            if (this.previousAngle !== angle) {
                this.hornAngle = angle;
                if (!this.animationFrameId) {
                    this.animationFrameId = requestAnimationFrame(this.renderHorn.bind(this));
                }
            }

            this.previousAngle = angle;
        }
    }

    private renderHorn() {
        const horn = this.element.querySelector<HTMLElement>(".horn");
        const transformValue = `translate(91.467 59.773) rotate(${this.hornAngle}) translate(-91.467 -59.773)`;
        horn.setAttribute('transform', transformValue);
        this.animationFrameId = null;
    }

    private cyclesToMs(cycles: number) {
        return (cycles * 1_000) / (AVRRunner.getInstance().board.cpu.frequency / 1000); // Use 1000 scaling factor for finer precision
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
