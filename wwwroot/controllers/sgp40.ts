import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class SGP40 extends Controller {

    private _vocIndex: number = 0;
    private _temperature: number = 25;   // defaults used by Arduino code
    private _humidity: number = 50;

    /**
     * Called whenever environmental data is updated from C#.
     * Example incoming JSON:
     *  { "vocIndex": 43, "temperature": 24.7, "humidity": 48.2 }
     */
    override update(state: Record<string, any>) {

        if (state.vocIndex !== undefined) {
            this._vocIndex = state.vocIndex;
        }
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }
        if (state.humidity !== undefined) {
            this._humidity = state.humidity;
        }

        // Send updated values back into the Razor component UI
        this.component.invokeMethodAsync("UpdateState", {
            vocIndex: this._vocIndex,
            temperature: this._temperature,
            humidity: this._humidity
        });
    }

    /**
     * Called before simulation starts.
     * SGP40 uses only I²C; no pin listeners needed.
     */
    override setup(): void {
        // No pin watchers needed — SGP40 communicates over I²C only
        this._vocIndex = 0;
    }

    /** Optional cleanup */
    override cleanup(): void {
        // Nothing to clean
    }
}
