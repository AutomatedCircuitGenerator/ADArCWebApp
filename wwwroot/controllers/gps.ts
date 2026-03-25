import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class GPS extends Controller {

    private _latitude: number = 20.0;
    private _longitude: number = 40.0;

    override update(state: Record<string, any>) {
        if (typeof state.latitude === "number") {
            this._latitude = state.latitude;
        }

        if (typeof state.longitude === "number") {
            this._longitude = state.longitude;
        }
    }

    setup() {
        AVRRunner.getInstance().board.cpu.addClockEvent(
            () => this.writeToPins(),
            1000
        );
    }

    private writeToPins() {
        // Latitude → RXD
        this.pins["rxd"]?.forEach(pin => {
            if (pin.analog) {
                pin.analog.voltage = this._latitude;
            }
        });

        // Longitude → TXD
        this.pins["txd"]?.forEach(pin => {
            if (pin.analog) {
                pin.analog.voltage = this._longitude;
            }
        });
    }
}