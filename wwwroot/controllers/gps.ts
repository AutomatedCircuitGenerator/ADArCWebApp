import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class GPS extends Controller {

    private _latitude: number = 0.0;
    private _longitude: number = 0.0;

    override update(state: Record<string, any>) {
        if (typeof state.latitude === "number") {
            this._latitude = state.latitude;
        }

        if (typeof state.longitude === "number") {
            this._longitude = state.longitude;
        }
    }

    setup() {
        // Print once per second (matches Arduino loop delay)
        AVRRunner.getInstance().board.cpu.addClockEvent(
            () => this.tick(),
            1000
        );
    }

    private tick() {
        console.log(
            `[GPS] Latitude: ${this._latitude.toFixed(6)}, Longitude: ${this._longitude.toFixed(6)}`
        );
    }
}