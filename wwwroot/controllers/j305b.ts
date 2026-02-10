import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class J305B extends Controller {

    private _cpm: number = 10;          // counts per minute
    private pulseIntervalCycles = 0;   // CPU cycles between pulses

    override update(state: Record<string, any>) {
        if (state.cpm !== undefined) {
            this._cpm = state.cpm;
            this.recalculateInterval();
        }
    }

    setup() {
        this.recalculateInterval();
        this.scheduleNextPulse();
    }

    private recalculateInterval() {
        if (this._cpm <= 0) {
            this.pulseIntervalCycles = 0;
            return;
        }

        const pulsesPerSecond = this._cpm / 60.0;
        const secondsPerPulse = 1.0 / pulsesPerSecond;

        this.pulseIntervalCycles =
            Math.floor(secondsPerPulse * AVRRunner.getInstance().board.cpu.frequency);
    }

    private scheduleNextPulse() {
        if (this.pulseIntervalCycles <= 0) {
            return;
        }

        AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            this.emitPulse();
            this.scheduleNextPulse();
        }, this.pulseIntervalCycles);
    }

    private emitPulse() {
        const vin = this.pins.VIN[0].digital;

        // Generate a short HIGH pulse
        vin.state = Boolean(PinState.High);

        AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            vin.state = Boolean(PinState.Low);
        }, 100); // very short pulse width
    }
}
