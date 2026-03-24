import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class NPK extends Controller {

    private _nitrogen: number = 0;
    private _phosphorus: number = 0;
    private _potassium: number = 0;

    override update(state: Record<string, any>) {
        if (state.nitrogen !== undefined) {
            this._nitrogen = Math.max(0, Math.min(1024, state.nitrogen));
            console.log("[NPK] Nitrogen updated to:", this._nitrogen, "ppm");
        }
        if (state.phosphorus !== undefined) {
            this._phosphorus = Math.max(0, Math.min(1024, state.phosphorus));
            console.log("[NPK] Phosphorus updated to:", this._phosphorus, "ppm");
        }
        if (state.potassium !== undefined) {
            this._potassium = Math.max(0, Math.min(1024, state.potassium));
            console.log("[NPK] Potassium updated to:", this._potassium, "ppm");
        }
    }

    setup() {
        console.log("[NPK] Setup complete - N:", this._nitrogen, "P:", this._phosphorus, "K:", this._potassium);
        this.scheduleResponses();
    }

    private scheduleResponses() {
        const scheduleNext = () => {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                this.checkAndSendPacket();
                scheduleNext();
            }, 500000); // Check every ~500k cycles
        };
        scheduleNext();
    }

    private checkAndSendPacket() {
        // RE = Receiver Enable (LOW = enabled)
        // DE = Driver Enable (HIGH = enabled)
        const reEnabled = this.pins.RE[0].digital.state === PinState.Low;
        const deEnabled = this.pins.DE[0].digital.state === PinState.High;

        if (reEnabled && deEnabled) {
            const response = this.buildPacket();
            this.sendToUART(response);
        }
    }

    private sendToUART(bytes: number[]) {
        const uart = AVRRunner.getInstance().board.usarts[0];
        if (!uart) {
            console.error("[NPK] UART not available");
            return;
        }

        let delayCounter = 0;
        for (const byte of bytes) {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                uart.writeByte(byte, true);
                console.log(`[NPK] Sent byte: 0x${byte.toString(16).padStart(2, '0')}`);
            }, delayCounter);
            delayCounter += 2000; // Space out byte transmission
        }
    }

    private buildPacket(): number[] {
        // Modbus RTU response: Slave ID, Function code, byte count, then data
        const nHigh = (this._nitrogen >> 8) & 0xFF;
        const nLow = this._nitrogen & 0xFF;
        const pHigh = (this._phosphorus >> 8) & 0xFF;
        const pLow = this._phosphorus & 0xFF;
        const kHigh = (this._potassium >> 8) & 0xFF;
        const kLow = this._potassium & 0xFF;

        // Simplified Modbus response (CRC omitted for simulation)
        const response = [
            0x01,      // Slave ID
            0x03,      // Function code (read holding registers)
            0x06,      // Byte count
            nHigh, nLow,
            pHigh, pLow,
            kHigh, kLow
        ];

        console.log("[NPK] Sending packet:", response.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
        return response;
    }
}