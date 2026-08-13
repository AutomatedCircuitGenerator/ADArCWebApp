import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class J305B extends Controller {

    private _cpm: number = 15;
    private pulseIntervalCycles = 0;
    private lastPulseTime = 0;

    override update(state: Record<string, any>) {
        if (state.cpm !== undefined) {
            this._cpm = Math.max(0, state.cpm);
            console.log("[J305B] CPM updated to:", this._cpm);
            this.recalculateInterval();
            // Force next pulse to be scheduled fresh
            this.lastPulseTime = AVRRunner.getInstance().board.cpu.cycles;
        }
    }

    setup() {
        console.log("[J305B] Setup complete, CPM:", this._cpm);
        this.recalculateInterval();
        this.lastPulseTime = AVRRunner.getInstance().board.cpu.cycles;
        this.scheduleNextPulse();
    }

    private recalculateInterval() {
        if (this._cpm <= 0) {
            this.pulseIntervalCycles = 0;
            return;
        }

        const pulsesPerSecond = this._cpm / 60.0;
        const secondsPerPulse = 1.0 / pulsesPerSecond;
        this.pulseIntervalCycles = Math.floor(secondsPerPulse * AVRRunner.getInstance().board.cpu.frequency);
    }

    private scheduleNextPulse() {
        if (this.pulseIntervalCycles <= 0) {
            console.log("[J305B] CPM is 0, no pulses scheduled");
            return;
        }

        AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            // Check if CPM changed and reschedule
            const currentCycles = AVRRunner.getInstance().board.cpu.cycles;
            if (currentCycles - this.lastPulseTime > this.pulseIntervalCycles * 1.5) {
                // CPM was updated, restart scheduling
                this.lastPulseTime = currentCycles;
                this.scheduleNextPulse();
                return;
            }

            this.emitPulse();
            this.lastPulseTime = AVRRunner.getInstance().board.cpu.cycles;
            this.scheduleNextPulse();
        }, this.pulseIntervalCycles);
    }

    private emitPulse() {
        const vin = this.pins.vin[0].digital;

        // Send RISING pulse for interrupt detection
        vin.state = 0;

        AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            vin.state = 1;

            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                vin.state = 0;
            }, 100);
        }, 50);
    }
}