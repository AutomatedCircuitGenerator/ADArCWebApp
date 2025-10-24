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
        
        this.signal.addListener((state: PinState) => {
            
            
            const now = this.cpu.cycles / this.cpu.frequency * 1_000_000; // us
            console.log(state + " " + now);
            
            if (state === PinState.Low)
                this.lastFallingEdge = now;

            if (state === PinState.Input && this.lastFallingEdge !== null) {
                const durationUs = now - this.lastFallingEdge;
                if (durationUs >= 1000) {  // 1 ms = DHT22 start signal
                    console.log("DHT start handshake detected, LOW duration = " + Math.round(durationUs) + " us");
                    this.lastFallingEdge = null;
                    
                    this.sendAckAndData();
                }
            }
        });
    }

    override update(state: Record<string, any>) {
        this.humidity = state.humidity;
        this.temperature = state.temperature;
    }
    private sendAckAndData() { 
        console.log("Sending ACK and data...");
        let counter = 0;
        console.log("Encoding DHT22:", this.humidity, this.temperature);
        const dataBytes = this.valuesToDigitalSignal();
        console.log("DHT22 bytes:", dataBytes);

        const usToCycles = (us: number) => AVRRunner.getInstance().usToCycles(us);

        const schedule = (callback: () => void, us: number) => {
            const cycles = counter + usToCycles(us);
            // console.log("Callback: " + callback.toString() + " in " + counter + " cycles");             
            this.cpu.addClockEvent(callback, counter);
            counter = cycles;
        };
        
        schedule(() => {}, 250);
        // ACK sequence
        schedule(() => this.signal.state = false, 80); // 80 us LOW
        schedule(() => this.signal.state = true, 80);  // 80 us HIGH
        
        
        // 40-bit data sequence
        for (let i = 0; i < 40; i++) {
            const byte = dataBytes[Math.floor(i / 8)];
            const bit = (byte >> (7 - (i % 8))) & 1;
            console.log("Sending bit " + bit + " (" + (i + 1) + "/" + 40 + ")");
            
            // For each bit: 50 us LOW
            schedule(() => this.signal.state = false, 50);

            // HIGH duration: 26–28 us = 0, 70 µs = 1
            schedule(() => this.signal.state = true, bit === 1 ? 70 : 27);
        }
        
        // schedule(() => this.signal.state = true, 0);
    }

    private valuesToDigitalSignal(): number[] {
        const hum = Math.round(this.humidity * 10); // 0.1% units
        let temp = Math.round(this.temperature * 10); // 0.1C units

        let tempHigh = (temp >> 8) & 0x7F; // 7 bits for positive temperature
        if (temp < 0) {
            tempHigh |= 0x80; // sign bit
            temp = -temp;
        }
        const tempLow = temp & 0xFF;

        return [
            (hum >> 8) & 0xFF,
            hum & 0xFF,
            tempHigh,
            tempLow,
            ((hum >> 8) + (hum & 0xFF) + tempHigh + tempLow) & 0xFF
        ];
    }   
}
