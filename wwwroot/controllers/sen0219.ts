import { Controller } from "@controllers/controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class SEN0219 extends Controller {

    private _co2: number = 550; // default starting CO2 ppm
    private inSimulation: boolean = false;
    private cycleActive: boolean = false;

    override update(state: Record<string, any>) {
        if (state.co2 !== undefined) {
            this.setCO2(state.co2);
        }
    }

    setCO2(co2: number) {
        // Clamp to realistic range
        if (co2 < 400) co2 = 400;
        if (co2 > 5000) co2 = 5000;

        this._co2 = co2;
    }

    setup() {
        if (this.inSimulation) return;
        this.inSimulation = true;

        // Start the PWM cycle generation
        this.startPWMCycle();
    }

    private startPWMCycle() {
        this.cycleActive = true;
        this.cycleEvent();
    }

    private cycleEvent() {
        if (!this.inSimulation || !this.cycleActive) return;

        // Calculate tHigh and tLow based on current CO2 ppm
        // tHigh = (co2Ppm / 5.0) + 2.0 (ms)
        const tHighMs = (this._co2 / 5.0) + 2.0;
        const tCycleMs = 1004.0;
        const tLowMs = tCycleMs - tHighMs;

        const runner = AVRRunner.getInstance();
        if (!runner || !runner.board || !runner.board.cpu) {
            // If simulator is not fully initialized, retry in a bit
            setTimeout(() => this.cycleEvent(), 100);
            return;
        }

        const cpu = runner.board.cpu;
        const freq = cpu.frequency; // e.g. 16000000 (16MHz)

        const tHighCycles = (tHighMs / 1000.0) * freq;
        const tLowCycles = (tLowMs / 1000.0) * freq;

        const pin = this.pins?.analog_out?.[0]?.digital;
        if (!pin) {
            // Pin not connected/available yet, retry
            setTimeout(() => this.cycleEvent(), 100);
            return;
        }

        // Set HIGH
        pin.state = PinState.High;

        // Schedule LOW
        cpu.addClockEvent(() => {
            pin.state = PinState.Low;
            
            // Schedule the next cycle
            cpu.addClockEvent(() => {
                this.cycleEvent();
            }, tLowCycles);
            
        }, tHighCycles);
    }
}
