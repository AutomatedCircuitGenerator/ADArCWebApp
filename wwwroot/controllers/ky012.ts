// ky012.ts
import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";

/**
 * KY-012 Active Piezo-Buzzer Controller
 * Specifications:
 * - Operating Voltage: ≥3.3V
 * - Fixed Frequency: 2.5kHz (self-generating, no PWM needed)
 * - Maximum Current: 30mA @ 5V DC
 * - Sound Output: 85dB @ 10cm
 *
 * Pin Configuration:
 * - S: Signal pin (HIGH = ON, LOW = OFF)
 * - V+: Not Connected
 * - GND: Ground
 */
export class KY012 extends Controller {
    private isActive = false;  // Tracks buzzer state

    setup() {
        const signalPins = this.pins["S"];

        // Add safety check for pin connection
        if (!signalPins?.length) {
            console.warn("KY-012: Signal pin not connected");
            return;
        }

        // Bind the handler to maintain 'this' context
        signalPins[0].setListener(this.handleStateChange.bind(this));
    }

    reset() {
        // Stop buzzer and reset state when simulation resets
        this.stopBuzzer();
    }

    /**
     * Handles changes in the signal pin state
     * @param state Current state of the signal pin
     */
    private handleStateChange(state: PinState): void {
        switch (state) {
            case PinState.High:
                if (!this.isActive) {
                    this.startBuzzer();
                }
                break;
            case PinState.Low:
                if (this.isActive) {
                    this.stopBuzzer();
                }
                break;
            case PinState.Input:
                // Pin is in input mode - should be in output mode
                console.warn("KY-012: Signal pin is in INPUT mode");
                this.stopBuzzer();
                break;
            case PinState.InputPullUp:
                // Pin state is unknown - stop for safety
                console.warn("KY-012: Signal pin state unknown");
                this.stopBuzzer();
                break;
        }
    }

    /**
     * Starts the buzzer and updates state
     */
    private startBuzzer(): void {
        this.isActive = true;
        this.component.invokeMethodAsync("PlayBuzzerSound")
            .catch(err => {
                console.error("KY-012: Failed to start buzzer", err);
                this.isActive = false;
            });
    }

    /**
     * Stops the buzzer and updates state
     */
    private stopBuzzer(): void {
        if (!this.isActive) return;

        this.isActive = false;
        this.component.invokeMethodAsync("StopBuzzerSound")
            .catch(err => console.error("KY-012: Failed to stop buzzer", err));
    }
}
