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
            console.log("[NPK] Nitrogen:", this._nitrogen, "ppm");
        }
        if (state.phosphorus !== undefined) {
            this._phosphorus = Math.max(0, Math.min(1024, state.phosphorus));
            console.log("[NPK] Phosphorus:", this._phosphorus, "ppm");
        }
        if (state.potassium !== undefined) {
            this._potassium = Math.max(0, Math.min(1024, state.potassium));
            console.log("[NPK] Potassium:", this._potassium, "ppm");
        }
    }

    setup() {
        console.log("[NPK] Setup complete");
        this.scheduleDataSending();
    }

    private scheduleDataSending() {
        const sendData = () => {
            this.checkAndSendData();
            AVRRunner.getInstance().board.cpu.addClockEvent(sendData, 1000000);
        };
        AVRRunner.getInstance().board.cpu.addClockEvent(sendData, 1000000);
    }

    private checkAndSendData() {
        // Check if MCU is ready to receive (DE high = transmit mode, RE low = receive mode)
        const dePin = this.pins.DE[0].digital.state;
        const rePin = this.pins.RE[0].digital.state;

        // If DE is HIGH and RE is LOW, sensor should transmit
        if (dePin === PinState.High && rePin === PinState.Low) {
            this.sendModbusResponse();
        }
    }

    private sendModbusResponse() {
        const uart = AVRRunner.getInstance().board.usarts[0];
        if (!uart) {
            console.error("[NPK] UART not available");
            return;
        }

        const packet = this.buildModbusPacket();
        console.log("[NPK] Sending packet:", packet.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));

        const usToCycles = (us: number) => AVRRunner.getInstance().usToCycles(us);
        let cumulativeCycles = 0;

        for (let i = 0; i < packet.length; i++) {
            const byte = packet[i];

            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                uart.writeByte(byte, true);
            }, cumulativeCycles);

            cumulativeCycles += usToCycles(1200); // 1200us between each byte
        }
    }

    private buildModbusPacket(): number[] {
        // Modbus RTU response format for NPK sensor
        // Slave ID (1) | Function Code (3) | Byte Count (6) | Data (6) | CRC (2)

        const nHigh = (this._nitrogen >> 8) & 0xFF;
        const nLow = this._nitrogen & 0xFF;
        const pHigh = (this._phosphorus >> 8) & 0xFF;
        const pLow = this._phosphorus & 0xFF;
        const kHigh = (this._potassium >> 8) & 0xFF;
        const kLow = this._potassium & 0xFF;

        const packet = [
            0x01,        // Slave ID
            0x03,        // Function Code (Read Holding Registers)
            0x06,        // Byte Count
            nHigh, nLow,
            pHigh, pLow,
            kHigh, kLow,
            0x00, 0x00   // CRC placeholder (not validated in simulation)
        ];

        return packet;
    }
}