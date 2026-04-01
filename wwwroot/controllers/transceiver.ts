import { Controller } from "./controller";

export class TRANSCEIVER extends Controller {

    private mode: number = 0; // 0 = receive, 1 = transmit

    setup() {
        console.log("[Transceiver] Setup complete - Mode: receive");

        // Initialize pin state
        const csnPin = this.pins.csn[0].digital;
        csnPin.state = false; // default = receive
    }

    // ✅ THIS FIXES YOUR ERROR
    setMode(modeValue: number) {
        this.mode = modeValue;

        const csnPin = this.pins.csn[0].digital;

        // Controller OWNS csn pin
        csnPin.state = (modeValue === 1); // HIGH = transmit

        console.log(
            "[Transceiver] Mode changed to:",
            modeValue === 1 ? "transmit" : "receive"
        );
    }
}