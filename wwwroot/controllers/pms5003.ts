import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class PMS5003 extends Controller {
    private _pm1_0: number = 0;
    private _pm2_5: number = 0;
    private _pm10: number = 0;

    override update(state: Record<string, any>) {
        if (state.pm1_0 !== undefined) {
            this._pm1_0 = Math.max(0, Math.min(1000, state.pm1_0));
        }
        if (state.pm2_5 !== undefined) {
            this._pm2_5 = Math.max(0, Math.min(1000, state.pm2_5));
        }
        if (state.pm10 !== undefined) {
            this._pm10 = Math.max(0, Math.min(1000, state.pm10));
        }

        console.log(`[PMS5003] PM1.0: ${this._pm1_0}, PM2.5: ${this._pm2_5}, PM10: ${this._pm10}`);
    }

    setup() {
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (txdPin && txdPin.digital) {
            txdPin.digital.state = PinState.High;
        }

        AVRRunner.getInstance().board.cpu.addClockEvent(
            () => this.sendSerialPMS(),
            1000000
        );
    }

    private sendSerialPMS() {
        const runner = AVRRunner.getInstance();
        const txdPin = this.pins.txd ? this.pins.txd[0] : null;
        if (!txdPin) {
            console.error("[PMS5003] No TXD pin connected to Arduino");
            return;
        }

        const packet = this.buildPMS5003Packet();

        const cyclesPerBit = 1667; // 104.16us per bit @ 9600 baud * 16MHz clock = ~1667 cycles
        const cyclesPerByte = cyclesPerBit * 10; // 1 start, 8 data, 1 stop bit
        let baseCycles = 0;

        for (let i = 0; i < packet.length; i++) {
            const byte = packet[i];

            // 1. Start bit (LOW)
            runner.board.cpu.addClockEvent(() => {
                txdPin.digital.state = PinState.Low;
            }, baseCycles);

            // 2. 8 Data bits (LSB first)
            for (let bit = 0; bit < 8; bit++) {
                const bitVal = (byte >> bit) & 1;
                runner.board.cpu.addClockEvent(() => {
                    txdPin.digital.state = bitVal ? PinState.High : PinState.Low;
                }, baseCycles + (bit + 1) * cyclesPerBit);
            }

            // 3. Stop bit (HIGH)
            runner.board.cpu.addClockEvent(() => {
                txdPin.digital.state = PinState.High;
            }, baseCycles + 9 * cyclesPerBit);

            baseCycles += cyclesPerByte;
        }

        // Schedule next transmission in 1 second
        runner.board.cpu.addClockEvent(
            () => this.sendSerialPMS(),
            16000000
        );
    }

    private buildPMS5003Packet(): number[] {
        const packet = new Array(32).fill(0);
        packet[0] = 0x42;
        packet[1] = 0x4D;
        
        // Frame length is 28 bytes (0x001C)
        packet[2] = 0x00;
        packet[3] = 0x1C;

        // PM1.0 standard
        packet[4] = (this._pm1_0 >> 8) & 0xFF;
        packet[5] = this._pm1_0 & 0xFF;

        // PM2.5 standard
        packet[6] = (this._pm2_5 >> 8) & 0xFF;
        packet[7] = this._pm2_5 & 0xFF;

        // PM10 standard
        packet[8] = (this._pm10 >> 8) & 0xFF;
        packet[9] = this._pm10 & 0xFF;

        // Fill environment values (bytes 10 to 15) with standard values
        packet[10] = packet[4];
        packet[11] = packet[5];
        packet[12] = packet[6];
        packet[13] = packet[7];
        packet[14] = packet[8];
        packet[15] = packet[9];

        // Bytes 16 to 29 can remain 0 as placeholders for particle counts

        // Calculate checksum over bytes 0 to 29
        let sum = 0;
        for (let i = 0; i < 30; i++) {
            sum += packet[i];
        }

        packet[30] = (sum >> 8) & 0xFF;
        packet[31] = sum & 0xFF;

        return packet;
    }
}