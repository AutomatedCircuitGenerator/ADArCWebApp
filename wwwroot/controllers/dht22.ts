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

            const now = this.cpu.cycles / this.cpu.frequency * 1_000_000; // µs

            if (state === PinState.Low) {
                // Falling edge
                this.lastFallingEdge = now;
            }

            if (state === PinState.High && this.lastFallingEdge !== null) {
                const durationUs = now - this.lastFallingEdge;
                if (durationUs >= 1000) {  // 1 ms = DHT22 start signal
                    console.log("DHT start handshake detected, LOW duration = ${durationUs} µs");
                    this.lastFallingEdge = null;
                    
                    this.sendAckAndData();
                }
            }
        });
    }

    private sendAckAndData() { 
        console.log("Sending ACK and data...");
    }
}
