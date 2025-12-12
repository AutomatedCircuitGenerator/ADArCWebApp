import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class GPS extends Controller {

    private _latitude: number = 0;
    private _longitude: number = 0;

    override update(state: Record<string, any>) {
        if (state.latitude !== undefined) {
            this._latitude = state.latitude;
        }
        if (state.longitude !== undefined) {
            this._longitude = state.longitude;
        }
    }

    setup() {
        // Simulate periodic GPS updates
        AVRRunner.getInstance().board.cpu.addClockEvent(() => this.pushGPSData(), 1000);
    }

    private pushGPSData() {
        console.log(`GPS Data -> Latitude: ${this._latitude}, Longitude: ${this._longitude}`);
    }

    setLatitude(latitude: number) {
        this._latitude = latitude;
    }

    setLongitude(longitude: number) {
        this._longitude = longitude;
    }
}
