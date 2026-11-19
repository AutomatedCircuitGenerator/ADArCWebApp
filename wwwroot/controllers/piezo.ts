import { Controller } from "@controllers/controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";
import { CPU } from "../boards/board";

// Uses Arduino CPU cycles to detect the frequency and Web Audio API to generate the sound
export class Piezo extends Controller {
    // === Arduino CPU ===
    private cpu: CPU;
    private lastRiseCycle: number | null = null;
    private previousState: PinState | null = null;
    
    // === Audio System ===
    private audioContext: AudioContext | null = null;
    private oscillator: OscillatorNode | null = null;
    private gainNode: GainNode | null = null;
    private isActive = false;
    private currentFrequency = 0;
    
    // === Silence Detection ===
    private lastSignalTime = 0;
    private silenceTimer: ReturnType<typeof setInterval> | null = null;
    
     // Initialize the controller and pin listener
    setup(): void {
        this.cpu = AVRRunner.getInstance().board.cpu;
        
        const signalPins = this.pins["sig"];
        
        if (!signalPins?.length) {
            console.warn("Piezo: Signal pin not connected");
            return;
        }
        
        this.initAudio();
        
        signalPins[0].digital.addListener(this.handleStateChange.bind(this));
        
        this.silenceTimer = setInterval(() => {
            if (
                this.isActive &&
                performance.now() - this.lastSignalTime > 55
            ) {
                this.stopBuzzer();
                this.lastRiseCycle = null;
            }
        }, 20);
        
        console.log("Piezo: Setup complete");
    }
    
    // Initialize the Web Audio API
    private initAudio(): void {
        try {
            this.audioContext = new AudioContext();
           
            // Volume control
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 0;
            this.gainNode.connect(this.audioContext.destination);
            
            // Tone generator
            this.oscillator = this.audioContext.createOscillator();
            this.oscillator.type = "square";
            this.oscillator.frequency.value = 1000;
            this.oscillator.connect(this.gainNode);
            this.oscillator.start();
            
        } catch (err) {
            console.error("Piezo: Audio initialization failed", err);
        }
    }
    
    // Detect the frequency of the Arduino square wave
    private handleStateChange(state: PinState): void {
        // Stop buzzer if the pin is configured as input, which might cause the pin floating
        if (state !== PinState.High && state !== PinState.Low) {
            this.stopBuzzer();
            this.previousState = state;
            this.lastRiseCycle = null;
            return;
        }
        
        // Ignore repeated notifications of the same state
        if (state === this.previousState) return;
        this.previousState = state;
        this.lastSignalTime = performance.now();
        
        // Only measure rising edges (LOW -> HIGH)
        if (state !== PinState.High) return;
        
        // Read simulated CPU cycles
        const currentCycle = this.cpu.cycles;
        
        if (this.lastRiseCycle !== null) {
            // Calculate cycles between two rising edges
            const periodCycles = currentCycle - this.lastRiseCycle;
            
            if (periodCycles > 0) {
                // Calculate actual signal frequency
                const frequency = this.cpu.frequency / periodCycles;
                // Accept reasonable audible frequencies
                if (frequency >= 80 && frequency <= 10000) 
                {
                    this.startBuzzer(frequency);
                }
            }
        }
        
        // Save this rising edge for the next measurement
        this.lastRiseCycle = currentCycle;
    }
    
    // Start the Piezo buzzer at the detected frequency
    private startBuzzer(frequency: number): void {
        if (!this.audioContext || !this.oscillator || !this.gainNode) return;
        
        // Resume audio if the browser suspended it
        if (this.audioContext.state === "suspended") {
            void this.audioContext.resume().catch(err => {
                console.warn("Piezo: Audio could not resume", err);
            });
        }
        
        const now = this.audioContext.currentTime;
        
        // Update oscillator when the pitch changes
        if (
            !this.isActive ||
            Math.abs(frequency - this.currentFrequency) > 10
        ) {
            this.oscillator.frequency.setTargetAtTime(
                frequency, now, 0.003
            );
            this.currentFrequency = frequency;
        }
        
        // Turn on the sound
        if (!this.isActive) {
            this.gainNode.gain.setTargetAtTime(
                0.05, now, 0.004
            );
            this.isActive = true;
        }
    }

    // Stop the buzzer by muting the oscillator
    private stopBuzzer(): void {
        if (!this.isActive) return;
        
        if (this.audioContext && this.gainNode) {
            this.gainNode.gain.setTargetAtTime(
                0,
                this.audioContext.currentTime,
                0.004
            );
        }
        
        this.isActive = false;
        this.currentFrequency = 0;
    }

    // Clean up when the simulation stops
    override cleanup(): void {

        // Stop the silence timer
        if (this.silenceTimer !== null) {
            clearInterval(this.silenceTimer);
            this.silenceTimer = null;
        }
        
        this.stopBuzzer();
        
        // Stop the oscillator
        try {
            this.oscillator?.stop();
        } catch (err) {
            console.warn("Piezo: Could not stop oscillator", err);
        }
        
        this.oscillator?.disconnect();
        this.gainNode?.disconnect();
        
        // Release the audio context
        if (this.audioContext &&
            this.audioContext.state !== "closed") {
            void this.audioContext.close();
        }
        
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        this.isActive = false;
        this.currentFrequency = 0;
        this.lastRiseCycle = null;
        this.previousState = null;
    }
}
