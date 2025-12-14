import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class GP2Y1014AU0F extends Controller {

    private _dustdensity: number = 0;

    override update(state: Record<string, any>) {
        if (state.dustdensity !== undefined) {
            this._dustdensity = state.dustdensity;
        }
    }

    setup() {
        // Nothing to attach; analog read is passive
    }

    /**
     * Called when MCU reads analog value from VOUT
     */
    readAnalog = (): number => {
        // LED must be LOW to sample
        if (this.pins.LED[0].digital.state !== PinState.Low) {
            return 0;
        }

        // Convert dust density to voltage (inverse of Arduino formula)
        let voltage = (this._dustdensity * 5.0 / 1000.0) + 0.9;
        voltage = Math.max(0, Math.min(5.0, voltage));

        // Convert voltage to ADC value (0–1023)
        return Math.round((voltage / 5.0) * 1023);
    };
}
