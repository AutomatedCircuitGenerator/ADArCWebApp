import { Controller } from "./controller";

export class PMS5003 extends Controller {
    private _pm1_0: number = 0;
    private _pm2_5: number = 0;
    private _pm10: number = 0;

    override update(state: Record<string, any>) {
        if (state.pm1_0 !== undefined) {
            this._pm1_0 = Math.max(0, Math.min(1000, state.pm1_0));
        }
        if (state.pm2_5 !== undefined) {
            this._pm2_5 = Math.max(0, Math.min(1000, state.pm2_5));
        }
        if (state.pm10 !== undefined) {
            this._pm10 = Math.max(0, Math.min(1000, state.pm10));
        }

        this.updatePins();
        console.log(`[PMS5003] PM1.0: ${this._pm1_0}, PM2.5: ${this._pm2_5}, PM10: ${this._pm10}`);
    }

    setup() {
        this.updatePins();
    }

    private updatePins() {
        // Convert ppm (0-1000) to voltage (0-5V)
        const voltage1_0 = (this._pm1_0 / 1000) * 5;
        const voltage2_5 = (this._pm2_5 / 1000) * 5;

        const txdPin = this.pins?.txd?.[0]?.analog;
        const rxdPin = this.pins?.rxd?.[0]?.analog;

        if (txdPin) txdPin.voltage = voltage1_0;
        if (rxdPin) rxdPin.voltage = voltage2_5;
    }
}