// ky022.ts
import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";
import { Pin } from "@controllers/pin";

/*
 * Controller for KY-022 IR Receiver
 * Simulates receiving IR codes by manually triggering them in the code.
 */
export class KY022 extends Controller {
    private DATPin: Pin;  // Pin to receive simulated IR signal (active low)
    private lastCode: number = 0;  // Stores the last received IR code to prevent duplicate processing

    // Static dictionary of IR codes representing buttons on the remote
    private static readonly CODES = {
        VOL_UP: 0xE0E0E01F,
        VOL_DOWN: 0xE0E0D02F,
        NUM_1: 0xE0E020DF,
        NUM_2: 0xE0E0A05F,
        NUM_3: 0xE0E0609F,
        NUM_4: 0xE0E010EF,
        NUM_5: 0xE0E0906F,
        NUM_6: 0xE0E050AF
    };

    /**
     * Initializes the component by assigning the DAT pin and clearing any previous state.
     */
    setup(): void {
        this.DATPin = this.pins["DAT"][0];  // Assigns the pin for data signal
        this.cleanup();  // Resets the component state
    }

    /**
     * Simulates receiving an IR code.
     * @param code - The IR code to simulate
     */
    simulateCode(code: number) {
        if (this.lastCode === code) {
            return; // Ignore repeated codes to prevent duplicate processing
        }

        this.lastCode = code;  // Update lastCode to the current code
        this.component.invokeMethodAsync('SetProperty', 'lastCode', code);  // Update property for external access

        // Set DAT pin to LOW (active) to simulate IR signal detection
        this.DATPin.setState(false);
        this.component.invokeMethodAsync('SetProperty', 'signal', 1);

        // Reset signal to HIGH after ~45ms to simulate a standard IR protocol pulse duration
        setTimeout(() => {
            this.DATPin.setState(true);  // Set DAT pin back to HIGH (idle)
            this.component.invokeMethodAsync('SetProperty', 'signal', 0);
            this.lastCode = 0;  // Clear lastCode after processing
            this.component.invokeMethodAsync('SetProperty', 'lastCode', 0);  // Update property
        }, 45);
    }

    /**
     * Resets the component state.
     */
    cleanup() {
        this.lastCode = 0;  // Reset lastCode
        if (this.DATPin) {
            this.DATPin.setState(true);  // Set DAT pin to HIGH (idle)
        }
        this.component.invokeMethodAsync('SetProperty', 'signal', 0);  // Reset signal property
        this.component.invokeMethodAsync('SetProperty', 'lastCode', 0);  // Reset lastCode property
    }

    /**
     * Simulates pressing a button by triggering the corresponding IR code.
     */
    simulateButton(button: keyof typeof KY022.CODES) {
        this.simulateCode(KY022.CODES[button]);  // Call simulateCode with the button’s associated IR code
    }
}