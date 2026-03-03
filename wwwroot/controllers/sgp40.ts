import { Controller } from "./controller";

export class SGP40 extends Controller {

    private _vocIndex: number = 0;
    private _temperature: number = 25.0;
    private _humidity: number = 50.0;
    
    override update(state: Record<string, any>) {

        if (state.vocIndex !== undefined) {
            this._vocIndex = Math.max(0, Math.round(state.vocIndex));
        }

        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }

        if (state.humidity !== undefined) {
            this._humidity = state.humidity;
        }

        // Push values to Razor UI
        this.component.invokeMethodAsync("UpdateState", {
            vocIndex: this._vocIndex,
            temperature: this._temperature,
            humidity: this._humidity
        });
    }
    
    override setup(): void {
        // nothing to wire up
    }

    override cleanup(): void {
        // nothing to clean
    }
}