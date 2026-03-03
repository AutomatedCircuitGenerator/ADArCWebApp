import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class GP2Y1014AU0F extends Controller {

    private dustdensity: number = 0;

    override update(state: Record<string, any>) {
        if (state.dustdensity !== undefined) {
            this.dustdensity = state.dustdensity;
            console.log("Dust density updated to:", this.dustdensity);
        }
    }

    setup() {
        if (this.pins.led && this.pins.led[0]) {
            this.pins.led[0].digital.addListener((state: PinState) => {
                console.log("LED state changed to:", state === PinState.Low ? "LOW" : "HIGH");

                // When LED goes LOW, sample and update the vout voltage
                if (state === PinState.Low) {
                    this.updateVoutVoltage();
                }
            });
        }
    }

    private updateVoutVoltage = (): void => {
        console.log("Sampling dust at density:", this.dustdensity);

        if (!this.pins.vout || !this.pins.vout[0]) {
            console.log("VOUT pin not found!");
            return;
        }

        // Convert dust density to voltage (0-1000 ug/m3 = 0-5V)
        let voltage = (this.dustdensity / 1000.0) * 5.0;
        voltage = Math.max(0, Math.min(5.0, voltage)); // Clamp to 0-5V

        console.log("Setting vout voltage to:", voltage, "V");
        this.pins.vout[0].analog.voltage = voltage;
    };
}