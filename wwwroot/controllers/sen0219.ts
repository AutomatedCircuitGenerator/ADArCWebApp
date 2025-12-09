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
        // Optional clamping if needed
        if (co2 < 0) co2 = 0;
        if (co2 > 5000) co2 = 5000;

        this._co2 = co2;

        if (!this.inSimulation) return;

        // Update analog_out pin voltage proportionally (0–5V)
        // Assuming 0 ppm -> 0V, 5000 ppm -> 5V
        const voltage = this._co2 * 5 / 5000;
        if (this.pins?.analog_out?.[0]?.analog) {
            this.pins.analog_out[0].analog.voltage = voltage;
        }
    }

    setup() {
        if (this.inSimulation) return;
        this.inSimulation = true;

        // Initialize the pin voltage
        if (this.pins?.analog_out?.[0]?.analog) {
            this.pins.analog_out[0].analog.voltage = this._co2 * 5 / 5000;
        }

        // Optional: schedule repeated logging or simulation events
        const updateReading = () => {
            console.log(`[CO2 Sensor] CO2: ${this._co2} ppm`);
            AVRRunner.getInstance().board.cpu.addClockEvent(() => updateReading(), 500000);
        };
        updateReading();
    }
}
