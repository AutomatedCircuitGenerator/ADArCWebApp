import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";
import {CPU, Digital} from "../boards/board";

export class DHT22 extends Controller {
    
    private temperature: number = 20;
    private humidity: number = 40;
    private signal: Digital;
    private cpu: CPU;
    private lastFallingEdge: number | null = null;

    setup() {
        this.signal = this.pins.signal[0].digital;
        this.cpu = AVRRunner.getInstance().board.cpu;

        this.signal.addListener(this.handleSignalChange.bind(this));
    }
    
    private handleSignalChange(state: PinState) {
        const now = this.cpu.cycles / this.cpu.frequency * 1_000_000; // us

        if (state === PinState.Low)
            this.lastFallingEdge = now;
        
        if (state === PinState.Input && this.lastFallingEdge !== null) {
            const durationUs = now - this.lastFallingEdge;
            if (durationUs >= 1000) {  // 1 ms = DHT22 start signal
                this.lastFallingEdge = null;
                this.sendAckAndData();
            }
        }
    }

    override update(state: Record<string, any>) {
        this.humidity = Math.min(100, Math.max(0, state.humidity));
        this.temperature = Math.min(80, Math.max(-40, state.temperature));
    }

    /**
     * Sends the DHT22 response sequence.
     *
     * This method emulates the exact DHT22 wire protocol timing:
     *
     * 1. Initial delay to allow the MCU to release the line
     * 2. Sensor ACK:
     *    - 80 us LOW
     *    - 80 us HIGH
     * 3. 40 data bits:
     *    - Each bit starts with a 50 us LOW pulse
     *    - Followed by:
     *        • ~27 us HIGH for a logical 0
     *        • ~70 us HIGH for a logical 1
     *
     * Timing is implemented using a cumulative cycle counter rather than absolute
     * timestamps. Each scheduled event is delayed by the total duration of all
     * previous events, ensuring pulses are emitted sequentially with accurate timing.
     *
     * NOTE:
     * The final LOW -> HIGH transitions at the end are intentional. Without them,
     * the last HIGH pulse would never terminate, causing the DHT driver to measure
     * an excessively long HIGH duration and interpret it as a timeout.
     */
    private sendAckAndData() {
        let counter = 0;
        const dataBytes = this.valuesToDigitalSignal();

        const usToCycles = (us: number) => AVRRunner.getInstance().usToCycles(us);

        /**
         * Schedule a callback to run after the previous event’s duration, and delay the next event by the specified amount.
         *
         * Each call to schedule adds a callback to the CPU’s clock event queue.
         * The us parameter specifies when the next event should occur after this one, in microseconds.
         * Internally, the function accumulates the total cycles in counter so that
         * each callback executes sequentially, preserving the timing of the DHT22 pulse sequence.
         *
         * @param callback The function to execute.
         * @param us How long after this event to execute the next callback, in microseconds.
         */
        const schedule = (callback: () => void, us: number) => {
            const cycles = counter + usToCycles(us);
            this.cpu.addClockEvent(callback, counter);
            counter = cycles;
        };

        // Short initial delay
        schedule(() => {}, 250);

        // ACK sequence: 80us LOW, 80us HIGH
        schedule(() => this.signal.state = PinState.Low, 80); 
        schedule(() => this.signal.state = PinState.High, 80);  
        
        
        // 40-bit data sequence
        for (let i = 0; i < 40; i++) {
            const byte = dataBytes[Math.floor(i / 8)];
            const bit = (byte >> (7 - (i % 8))) & 1;
            
            // 50 us LOW for every bit
            schedule(() => this.signal.state = PinState.Low, 50);

            // HIGH duration encodes the bit: 27 us = 0, 70 µs = 1
            schedule(() => this.signal.state = PinState.High, bit ? 70 : 27);
        }
        
        // Briefly set to LOW to end transmission
        schedule(() => this.signal.state = PinState.Low, 0);
        
        // Return to idle state (HIGH)
        schedule(() => this.signal.state = PinState.Input, 0);
    }

    /**
     * Converts the temperature and humidity values into DHT22 5-byte format
     */
    private valuesToDigitalSignal(): number[] {
        const hum = Math.round(this.humidity * 10); // 0.1% units
        let temp = Math.round(this.temperature * 10); // 0.1°C units

        let tempHigh: number;
        let tempLow: number;

        if (temp < 0) {
            temp = -temp;
            tempHigh = ((temp >> 8) & 0x7F) | 0x80; // sign bit
        } else {
            tempHigh = (temp >> 8) & 0x7F;
        }

        tempLow = temp & 0xFF;

        return [
            (hum >> 8) & 0xFF,
            hum & 0xFF,
            tempHigh,
            tempLow,
            ((hum >> 8) + (hum & 0xFF) + tempHigh + tempLow) & 0xFF, // checksum
        ];
    }
}
