import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class DHT11 extends Controller {

    private _temperature: number = 22; // default matches Razor component
    private _humidity: number = 50;    // default matches Razor component

    override update(state: Record<string, any>) {
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }
        if (state.humidity !== undefined) {
            this._humidity = state.humidity;
        }
    }

    setup() {
        // Listen for MCU starting the handshake on the data pin
        const dataPin = this.pins.digital_out[0].digital;
        dataPin.addListener(this.dataListener);
    }

    /**
     * Detects the DHT11 "start" signal:
     * MCU pulls DATA LOW for 18ms, then releases HIGH.
     */
    private dataListener = () => {
        const dataPin = this.pins.digital_out[0].digital;

        if (dataPin.state === PinState.Low) {
            // Wait for rising edge
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                if (dataPin.state === PinState.High) {
                    this.startTransmission();
                }
            }, 500); // small polling delay
        }
    };

    /**
     * Sends the full DHT11 transmission:
     * - 80µs LOW
     * - 80µs HIGH
     * - 40 bits (humidity int, humidity dec, temp int, temp dec, checksum)
     */
    private startTransmission() {
        const board = AVRRunner.getInstance().board;
        const dataPin = this.pins.digital_out[0].digital;

        // Pull LOW for 80µs
        board.cpu.addClockEvent(() => {
            dataPin.state = Boolean(PinState.Low);
        }, 1);

        // HIGH for 80µs
        board.cpu.addClockEvent(() => {
            dataPin.state = Boolean(PinState.High);
        }, 80);

        // Send the 40 data bits
        board.cpu.addClockEvent(() => {
            this.sendData();
        }, 160);
    }

    /**
     * Builds and sends the DHT11 40-bit payload.
     */
    private sendData() {
        const board = AVRRunner.getInstance().board;
        const dataPin = this.pins.digital_out[0].digital;

        const humInt = Math.round(this._humidity);
        const humDec = 0;
        const tempInt = Math.round(this._temperature);
        const tempDec = 0;
        const checksum = (humInt + humDec + tempInt + tempDec) & 0xFF;

        const bits = [
            ...this.byteToBits(humInt),
            ...this.byteToBits(humDec),
            ...this.byteToBits(tempInt),
            ...this.byteToBits(tempDec),
            ...this.byteToBits(checksum)
        ];

        let time = 0;

        bits.forEach(bit => {
            // Always LOW for ~50µs
            board.cpu.addClockEvent(() => {
                dataPin.state = Boolean(PinState.Low);
            }, time);
            time += 50;

            // HIGH timing encodes the bit: 26µs = 0, 70µs = 1
            const highTime = bit === 1 ? 70 : 26;

            board.cpu.addClockEvent(() => {
                dataPin.state = Boolean(PinState.High);
            }, time);

            time += highTime;
        });

        // Release line at the end
        board.cpu.addClockEvent(() => {
            dataPin.state = Boolean(PinState.High);
        }, time + 50);
    }

    private byteToBits(byte: number): number[] {
        const bits: number[] = [];
        for (let i = 7; i >= 0; i--) {
            bits.push((byte >> i) & 1);
        }
        return bits;
    }
}
