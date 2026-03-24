import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";
import { CPU, Digital } from "../boards/board";

export class DHT11 extends Controller {

    private temperature: number = 22;
    private humidity: number = 50;
    private signal: Digital;
    private cpu: CPU;
    private lastFallingEdge: number | null = null;

    setup() {
        this.signal = this.pins.digital_out[0].digital;
        this.cpu = AVRRunner.getInstance().board.cpu;
        this.signal.addListener(this.handleSignalChange.bind(this));
        console.log("[DHT11] Setup complete, listening on digital_out");
    }

    private handleSignalChange(state: PinState) {
        const now = this.cpu.cycles / this.cpu.frequency * 1_000_000;

        if (state === PinState.Low) {
            this.lastFallingEdge = now;
            console.log("[DHT11] MCU pulled line LOW, waiting for 1ms...");
        }

        if (state === PinState.Input && this.lastFallingEdge !== null) {
            const durationUs = now - this.lastFallingEdge;
            console.log(`[DHT11] Line released, duration: ${durationUs}us`);
            if (durationUs >= 1000) {
                console.log("[DHT11] Start signal detected! Sending ACK and data...");
                this.lastFallingEdge = null;
                this.sendAckAndData();
            }
        }
    }

    override update(state: Record<string, any>) {
        if (state.humidity !== undefined) {
            this.humidity = Math.min(100, Math.max(0, state.humidity));
            console.log("[DHT11] Humidity:", this.humidity);
        }
        if (state.temperature !== undefined) {
            this.temperature = Math.min(60, Math.max(-20, state.temperature));
            console.log("[DHT11] Temperature:", this.temperature);
        }
    }

    private sendAckAndData() {
        let counter = 0;
        const dataBytes = this.valuesToDigitalSignal();
        console.log("[DHT11] Sending data bytes:", dataBytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));

        const usToCycles = (us: number) => AVRRunner.getInstance().usToCycles(us);

        const schedule = (callback: () => void, us: number) => {
            const cycles = counter + usToCycles(us);
            this.cpu.addClockEvent(callback, counter);
            counter = cycles;
        };

        schedule(() => {}, 250);

        // ACK: 50us LOW, 80us HIGH
        schedule(() => this.signal.state = (PinState.Low), 50);
        schedule(() => this.signal.state = (PinState.High), 80);

        // 40-bit data
        for (let i = 0; i < 40; i++) {
            const byte = dataBytes[Math.floor(i / 8)];
            const bit = (byte >> (7 - (i % 8))) & 1;

            schedule(() => this.signal.state = (PinState.Low), 50);
            schedule(() => this.signal.state = (PinState.High), bit ? 70 : 26);
        }

        schedule(() => this.signal.state = (PinState.Low), 0);
        schedule(() => this.signal.state = (PinState.Input), 0);
        console.log("[DHT11] Data transmission complete");
    }

    private valuesToDigitalSignal(): number[] {
        const humInt = Math.round(this.humidity);
        const humDec = 0;
        let tempInt = Math.round(this.temperature);
        const tempDec = 0;

        // Handle negative temperatures with sign bit
        let tempHigh: number;
        let tempLow: number;

        if (tempInt < 0) {
            tempInt = -tempInt;
            tempHigh = ((tempInt >> 8) | 0x80) & 0xFF; // Set sign bit and mask to 8-bit
        } else {
            tempHigh = (tempInt >> 8) & 0x7F; // Clear sign bit and mask to 8-bit
        }

        tempLow = tempInt & 0xFF;

        const checksum = (humInt + humDec + tempHigh + tempLow) & 0xFF;

        return [
            humInt & 0xFF,
            humDec & 0xFF,
            tempHigh,
            tempLow,
            checksum
        ];
    }
}