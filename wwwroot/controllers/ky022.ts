// ky022.ts
import { Controller } from "@controllers/controller";
import { Pin } from "@controllers/pin";
import { PinState } from "@lib/avr8js";

/**
 * Controller for KY-022 Infrared Receiver
 * Simulates an IR receiver detecting signals from a remote control
 * When an IR signal is detected, the digital_out pin is pulled LOW
 */
export class KY022 extends Controller {
    // === Component State Tracking ===
    private DATPin: Pin; // The digital_out pin of the KY-022, which outputs IR detection status
    private isReceiving: boolean = false; // Tracks if the receiver is actively detecting an IR signal
    private pulseTimeoutId: number | null = null; // ID for pulse timeout to simulate IR pulse duration

    /**
     * Called when component is initialized
     */
    setup(): void {
        this.DATPin = this.pins["pin3"][0]; // Links digital_out pin to physical pin, (pin3 on KY-022)
        this.cleanup(); // Ensure clean initial state
    }

    /**
     * Simulates receiving an IR signal
     * Sets signal pin to LOW when IR signal is detected, then resets to HIGH after pulse duration
     */
    setSignal(signal: number) {
        const hasSignal = signal > 0; // Boolean indicating if an IR signal is present

        if (hasSignal === this.isReceiving) return;

        this.isReceiving = hasSignal; // Update current receiving state

        if (hasSignal) {
            // Pull pin LOW to indicate IR detection (active-low logic)
            this.DATPin.setState(false);

            // Clear any active timeout to ensure only one pulse is active
            if (this.pulseTimeoutId !== null) {
                clearTimeout(this.pulseTimeoutId);
            }

            // Set a timeout to simulate the duration of the IR pulse
            this.pulseTimeoutId = setTimeout(() => {
                // Return pin to HIGH after pulse duration
                this.DATPin.setState(true);
                this.isReceiving = false; // Reset receiving state after pulse ends
                this.pulseTimeoutId = null; // Clear timeout ID for next pulse
            }, 1000); // Duration of 100ms for the simulated pulse
        }
    }

    /**
     * Cleans up the component state, such as clearing timeouts
     * Resets signal pin to HIGH and stops any active signal detection
     */
    override cleanup() {
        // Clear active pulse timeout if it exists
        if (this.pulseTimeoutId !== null) {
            clearTimeout(this.pulseTimeoutId);
            this.pulseTimeoutId = null;
        }

        // Reset pin to HIGH (no IR signal detected)
        if (this.DATPin) {
            this.DATPin.setState(true);
        }

        this.isReceiving = false;
    }
}