// KY012Controller.ts
import { Controller } from "@controllers/controller";
import { DotNetObjectReference } from "@type-declarations/dotnet";
import { AVRRunner } from "@lib/execute";
import { GPIOListener } from "@lib/avr8js/peripherals/gpio";

 /// <summary>
 /// Controller for KY-012 Active Piezo-Buzzer
 /// Specifications:
 /// Operating Voltage: ≥3.3V
 /// Fixed Frequency: 2.5kHz (self-generating)
 /// Maximum Current: 30mA at 5V DC
 /// Sound Output: 85dB @ 10cm
 /// <summary>

export class KY012Controller extends Controller {
    // Track buzzer state to avoid redundant method calls
    private isPlaying = false;
    
    // Minimum voltage required for operation based on datasheet
    private readonly MINIMUM_VOLTAGE = 3.3;

    setup() {
        // Get all pins mapped to the Signal ("S") identifier
        const pins = this.pins["S"];
        
        // Ensure we have valid pin connections
        if (!pins || pins.length === 0) {
            console.warn("KY-012: No signal pin connected");
            return;
        }

        // Get the first (and should be only) pin connected to the signal
        const signalPin = pins[0];

        // Get instance of AVR simulator
        const runner = AVRRunner.getInstance();

        // Define GPIO listener function that will be called when pin state changes
        const handlePortChange: GPIOListener = (newValue: number, oldValue: number) => {
            // Calculate bit mask for our specific pin within the port
            const pinMask = 1 << (signalPin % 8);
            
            // Check if our specific pin is HIGH by masking the port value
            const pinHigh = (newValue & pinMask) !== 0;
            
            if (pinHigh && !this.isPlaying) {
                // Pin went from LOW to HIGH
                this.isPlaying = true;
                this.component.invokeMethodAsync("PlayBuzzerSound");
            } else if (!pinHigh && this.isPlaying) {
                // Pin went from HIGH to LOW
                this.isPlaying = false;
                this.component.invokeMethodAsync("StopBuzzerSound");
            }
        };

        // Add appropriate port listener based on pin number
        // Arduino Uno port mapping:
        // - Pins 0-7: Port D
        // - Pins 8-13: Port B
        // - Pins A0-A5: Port C
        if (signalPin < 8) {
            runner.portD.addListener(handlePortChange);
        } else if (signalPin < 14) {
            runner.portB.addListener(handlePortChange);
        } else {
            runner.portC.addListener(handlePortChange);
        }
    }

    // Called before each simulation run to reset state
    reset() {
        // Ensure buzzer is off when simulation resets
        this.isPlaying = false;
        this.component.invokeMethodAsync("StopBuzzerSound");
    }
}