import { Controller } from './controller';
import { AVRRunner } from '@lib/execute';
import { Interfaces } from '../boards/board';
import {PinState} from "@lib/avr8js";

export class RELAY extends Controller {
    private relayPin: Interfaces;
    private isRelayOn: boolean = false;

    setup(): void {
        // Get the relay control pin (IN pin)
        this.relayPin = this.pins['IN'][0];

        // Initialize relay to OFF state (HIGH = inactive)
        if (this.relayPin.digital) {
            this.relayPin.digital.state = true; // HIGH = OFF
        }

        // Listen for changes to the pin from Arduino code
        if (this.relayPin.digital) {
            this.relayPin.digital.addListener((state) => {
                this.onPinStateChanged(state);
            });
        }

        this.updateRelayDisplay();
    }

    cleanup(): void {
        // Turn relay OFF when simulation ends
        this.setRelayState(false);
    }

    update(state: Record<string, any>): void {
        // Handle relay state updates from C#
        if (state.isOn !== undefined) {
            this.setRelayState(state.isOn);
        }
    }

    /**
     * Called when the Arduino code writes to the relay pin
     */
    private onPinStateChanged(pinState: PinState): void {
        // pinState: true = HIGH (OFF), false = LOW (ON)
        // because relay uses active-low logic
        this.isRelayOn = !pinState;
        this.updateRelayDisplay();
    }

    /**
     * Sets the relay to ON (LOW) or OFF (HIGH)
     * Note: Most relay modules use active-low logic
     */
    private setRelayState(shouldBeOn: boolean): void {
        if (this.relayPin.digital) {
            // LOW = relay ON, HIGH = relay OFF
            this.relayPin.digital.state = !shouldBeOn;
            this.isRelayOn = shouldBeOn;
            this.updateRelayDisplay();
        }
    }

    /**
     * Updates the visual representation of the relay state
     */
    private updateRelayDisplay(): void {
        const element = this.element;
        if (element) {
            if (this.isRelayOn) {
                element.classList.add('relay-on');
                element.classList.remove('relay-off');
            } else {
                element.classList.add('relay-off');
                element.classList.remove('relay-on');
            }
        }
    }

    // Public method if other components need to trigger the relay
    public toggleRelay(): void {
        this.setRelayState(!this.isRelayOn);
    }
}