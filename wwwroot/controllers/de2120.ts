import { Controller } from "@controllers/controller";
import { Digital, USART } from "../boards/board";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class DE2120 extends Controller {
    private static readonly CYCLES_PER_BIT = 1667; // 104.16us @ 9600 baud, 16MHz

    private encodedValue: number = 0;
    private serialMode: string = "SoftwareSerial";
    private _isSetup: boolean = false;
    private _usart: USART | null = null;
    private _rxdUsart: USART | null = null;
    private _txdDigital: Digital | null = null;
    private _rxdDigital: Digital | null = null;
    private _rxBuffer: string = "";
    private _rxSampling: boolean = false;
    private _txNextCycle: number = 0;

    override update(state: Record<string, any>) {
        if (typeof state.serialmode === "string") {
            this.serialMode = state.serialmode;
        }

        if (state.encodedvalue !== undefined) {
            const nextVal = Number(state.encodedvalue);
            const changed = nextVal !== this.encodedValue;
            this.encodedValue = nextVal;
            if (this._isSetup && changed) {
                this.sendPayload(`${this.encodedValue}\r\n`);
            }
        }
    }

    setup() {
        this._isSetup = true;
        this._rxBuffer = "";
        this._rxSampling = false;
        this._txNextCycle = 0;

        const txdPin = this.pins["txd"]?.[0];
        const rxdPin = this.pins["rxd"]?.[0];

        this._usart = txdPin?.usart ?? null;
        this._rxdUsart = rxdPin?.usart ?? null;
        this._txdDigital = txdPin?.digital ?? null;
        this._rxdDigital = rxdPin?.digital ?? null;

        if (this._txdDigital) {
            this._txdDigital.state = PinState.High;
        }

        // Hardware UART handshake listener
        if (this._rxdUsart) {
            this._rxdUsart.onByteTransmit = (byte: number) => {
                this.handleIncomingByte(byte);
            };
        }

        // SoftwareSerial (digital pin) handshake listener for SparkFun DE2120 begin()
        if (this._rxdDigital) {
            this._rxdDigital.addListener((state: PinState) => {
                if (state === PinState.Low && !this._rxSampling) {
                    this.sampleSoftwareSerialByte();
                }
            });
        }

        // If a non-zero barcode was preconfigured before starting simulation, emit it after begin()
        if (this.encodedValue !== 0) {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                this.sendPayload(`${this.encodedValue}\r\n`);
            }, 8000000);
        }
    }

    override cleanup() {
        this._isSetup = false;
        this._rxBuffer = "";
        this._rxSampling = false;
        this._txNextCycle = 0;
        if (this._txdDigital) {
            this._txdDigital.state = PinState.High;
        }
    }

    private handleIncomingByte(byte: number) {
        const char = String.fromCharCode(byte);
        this._rxBuffer += char;
        if (this._rxBuffer.length > 64) {
            this._rxBuffer = this._rxBuffer.slice(-64);
        }

        if (char === ".") {
            this.sendPayload("\x06");
            this._rxBuffer = "";
        }
    }

    private sampleSoftwareSerialByte() {
        if (!this._rxdDigital) return;
        this._rxSampling = true;
        const cpu = AVRRunner.getInstance().board.cpu;
        let received = 0;

        for (let bit = 0; bit < 8; bit++) {
            const delay = Math.round((bit + 1.5) * DE2120.CYCLES_PER_BIT);
            cpu.addClockEvent(() => {
                if (!this._isSetup || !this._rxdDigital) return;
                if (this._rxdDigital.state === PinState.High) {
                    received |= 1 << bit;
                }
            }, delay);
        }

        cpu.addClockEvent(() => {
            this._rxSampling = false;
            if (this._isSetup) {
                this.handleIncomingByte(received);
            }
        }, 9 * DE2120.CYCLES_PER_BIT);
    }

    private sendPayload(payload: string) {
        if (!this._isSetup) return;

        if (this._usart && (this.serialMode === "Hardware Serial" || !this._txdDigital)) {
            for (const char of payload) {
                this._usart.writeByte(char.charCodeAt(0), false);
            }
            return;
        }

        if (!this._txdDigital) return;

        const cpu = AVRRunner.getInstance().board.cpu;
        const txd = this._txdDigital;
        const cyclesPerBit = DE2120.CYCLES_PER_BIT;
        const cyclesPerChar = cyclesPerBit * 10;

        let startOffset = Math.max(0, this._txNextCycle - cpu.cycles);
        for (let i = 0; i < payload.length; i++) {
            const byte = payload.charCodeAt(i);
            const charStart = startOffset;

            cpu.addClockEvent(() => {
                if (this._isSetup) txd.state = PinState.Low;
            }, charStart);

            for (let bit = 0; bit < 8; bit++) {
                const bitVal = (byte >> bit) & 1;
                cpu.addClockEvent(() => {
                    if (this._isSetup) txd.state = bitVal ? PinState.High : PinState.Low;
                }, charStart + (bit + 1) * cyclesPerBit);
            }

            cpu.addClockEvent(() => {
                if (this._isSetup) txd.state = PinState.High;
            }, charStart + 9 * cyclesPerBit);

            startOffset += cyclesPerChar;
        }

        this._txNextCycle = cpu.cycles + startOffset;
    }
}
