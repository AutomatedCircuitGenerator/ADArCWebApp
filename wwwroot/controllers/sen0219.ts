import { Controller } from "@controllers/controller";
import { AVRRunner } from "@lib/execute";

export class SEN0219 extends Controller {

    private _co2: number = 400; // default starting CO2 ppm
    private inSimulation: boolean = false;

    override update(state: Record<string, any>) {
        if (state.co2 !== undefined) {
            this.setCO2(state.co2);
        }
    }

    setCO2(co2: number) {
        // Clamp to realistic range
        if (co2 < 0) co2 = 0;
        if (co2 > 5000) co2 = 5000;

        this._co2 = co2;

        if (!this.inSimulation) return;

        // Convert ppm to voltage (0–5V)
        const voltage = this._co2 * 5 / 5000;

        // Write to analog_out pin
        const analogPin = this.pins?.analog_out?.[0]?.analog;
        if (analogPin) {
            analogPin.voltage = voltage;
        }
    }

    setup() {
        if (this.inSimulation) return;
        this.inSimulation = true;

        // Initialize output voltage
        const initial = this._co2 * 5 / 5000;
        const analogPin = this.pins?.analog_out?.[0]?.analog;
        if (analogPin) {
            analogPin.voltage = initial;
        }

        // Optional periodic debug logging
        const updateReading = () => {
            console.log(`[CO2 Sensor] CO2: ${this._co2} ppm`);
            AVRRunner.getInstance()
                .board
                .cpu
                .addClockEvent(() => updateReading(), 500000);
        };

        updateReading();
    }
}
