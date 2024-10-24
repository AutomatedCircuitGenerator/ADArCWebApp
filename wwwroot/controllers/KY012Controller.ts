import { Controller } from "@controllers/controller";
import { DotNetObjectReference } from "@type-declarations/dotnet";
import { AVRRunner } from "@lib/execute";
import { GPIOListener } from "@lib/avr8js/peripherals/gpio";

/**
 * Controller for KY-012 Active Piezo-Buzzer
 * Specifications:
 * - Operating Voltage: ≥3.3V
 * - Frequency: 2.5kHz (self-generating)
 * - Type: Active (no PWM needed)
 */
export class KY012Controller extends Controller {
    setup() {
        // Get all pins mapped to the Signal ("S") identifier
        const pins = this.pins["S"];
        
        // Ensure we have valid pin connections
        if (!pins || pins.length === 0) return;

        // Get the first (and should be only) pin connected to the signal
        const signalPin = pins[0];

        const runner = AVRRunner.getInstance();

        // Define GPIO listener function
        const handlePortChange: GPIOListener = (newValue: number, oldValue: number) => {
            // Check the specific pin's state in the port value
            const pinMask = 1 << (signalPin % 8); // Get the bit mask for our pin
            const pinHigh = (newValue & pinMask) !== 0;
            
            if (pinHigh) {
                this.component.invokeMethodAsync("PlayBuzzerSound");
            } else {
                this.component.invokeMethodAsync("StopBuzzerSound");
            }
        };

        // Add appropriate port listener based on pin number
        if (signalPin < 8) {
            runner.portD.addListener(handlePortChange);
        } else if (signalPin < 14) {
            runner.portB.addListener(handlePortChange);
        } else {
            runner.portC.addListener(handlePortChange);
        }
    }

    reset() {
        // Ensure buzzer is off when simulation resets
        this.component.invokeMethodAsync("StopBuzzerSound");
    }
}