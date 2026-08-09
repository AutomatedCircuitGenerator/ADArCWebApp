import { Controller } from "./controller";
import { Digital } from "../boards/board";
import { PinState } from "@lib/avr8js";

export class TRANSCEIVER extends Controller {
    private mode: number = 0; // 0 = receive, 1 = transmit

    setup() {
        console.log("[Transceiver] Setup complete - Mode: receive");

        // Initialize pin state
        const csnPin = this.pins.csn[0].digital as Digital;

        // Use the correct PinState enum/object
        csnPin.state = PinState.Low; // default = receive
    }

    setMode(modeValue: number) {
        this.mode = modeValue;

        const csnPin = this.pins.csn[0].digital as Digital;

        // Controller OWNS csn pin
        csnPin.state = modeValue === 1 ? PinState.High : PinState.Low; // HIGH = transmit

        console.log(
            "[Transceiver] Mode changed to:",
            modeValue === 1 ? "transmit" : "receive"
        );
    }
}