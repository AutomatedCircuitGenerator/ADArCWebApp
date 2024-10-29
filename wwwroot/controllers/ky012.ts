// ky012.ts
import { Controller } from "@controllers/controller";
import { PinState } from "@lib/avr8js";

/**
 * Controller for KY-012 Active Buzzer
 * Uses Web Audio API to generate a 2.5kHz square wave tone
 *
 * Web Audio API Chain:
 * OscillatorNode (tone generator) -> GainNode (volume control) -> AudioContext.destination (speakers)
 */
export class ky012 extends Controller {
    // === Audio System Components ===
    private audioContext: AudioContext | null = null; // Main audio context - manages all audio operations
    private oscillator: OscillatorNode | null = null; // Oscillator - generates the actual tone, Square wave type creates buzzer-like sound (maybe)
    private gainNode: GainNode | null = null; // Gain node - controls volume to avoid being too loud
    private readonly BUZZER_FREQUENCY = 2500; // Buzzer frequency from datasheet (2.5kHz)
    private isActive = false; // Tracks if buzzer is currently making sound

    /**
     * Called when component is initialized
     * Sets up audio system and pin listeners
     */
    setup() {
        // Initialize audio system (lazy init because browsers require user interaction)
        this.initAudio();

        // Get the signal pin that controls the buzzer
        const signalPins = this.pins["S"];
        if (!signalPins?.length) {
            console.warn("KY-012: Signal pin not connected");
            return;
        }

        // Listen for pin state changes
        signalPins[0].setListener(this.handleStateChange.bind(this));
    }

    /**
     * Initializes Web Audio API components
     * Creates AudioContext and GainNode for volume control
     */
    private initAudio() {
        try {
            // Create main audio context
            this.audioContext = new AudioContext();

            // Create and configure volume control
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 0.1;  // Set to 10% volume

            // Connect volume control to speakers
            this.gainNode.connect(this.audioContext.destination);
        } catch (err) {
            console.error("KY-012: Failed to initialize audio", err);
        }
    }

    /**
     * Handles changes in pin state
     * HIGH = Start buzzer, LOW = Stop buzzer
     */
    private handleStateChange(state: PinState): void {
        switch (state) {
            case PinState.High:  // Pin is HIGH (ON)
                if (!this.isActive) {
                    this.startBuzzer();
                }
                break;
            case PinState.Low:   // Pin is LOW (OFF)
                if (this.isActive) {
                    this.stopBuzzer();
                }
                break;
            default:             // Handle any other states (INPUT or UNKNOWN)
                if (this.isActive) {
                    this.stopBuzzer();
                }
        }
    }

    /**
     * Starts the buzzer sound
     * Creates and configures oscillator to generate 2.5kHz square wave
     */
    private startBuzzer(): void {
        try {
            // Re-initialize audio if needed
            if (!this.audioContext || this.audioContext.state === 'closed') {
                this.initAudio();
            }

            // Create tone generator
            this.oscillator = this.audioContext.createOscillator();

            // Configure for buzzer-like sound
            this.oscillator.type = 'square';  // Square wave sounds like a buzzer

            // Set frequency to 2.5kHz (from datasheet)
            this.oscillator.frequency.setValueAtTime(
                this.BUZZER_FREQUENCY,
                this.audioContext.currentTime
            );

            // Connect oscillator to volume control
            this.oscillator.connect(this.gainNode);

            // Start making sound
            this.oscillator.start();
            this.isActive = true;

        } catch (err) {
            console.error("KY-012: Failed to start buzzer", err);
        }
    }

    /**
     * Stops the buzzer sound
     * Cleans up oscillator and updates state
     */
    private stopBuzzer(): void {
        if (!this.isActive) return;

        try {
            if (this.oscillator) {
                // Stop and disconnect the oscillator
                this.oscillator.stop();
                this.oscillator.disconnect();
                this.oscillator = null;
            }
            this.isActive = false;
        } catch (err) {
            console.error("KY-012: Failed to stop buzzer", err);
        }
    }

    /**
     * Called when simulation resets
     * Cleans up all audio resources
     */
    reset() {
        // Stop any active sound
        this.stopBuzzer();

        // Clean up audio context and nodes
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.gainNode = null;
        }
    }
}