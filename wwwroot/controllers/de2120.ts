import {Controller} from "@controllers/controller";
import {USART} from "../boards/board";

export class DE2120 extends Controller {
    private _encodedValue: number;
    private _usart: USART | null = null;
    private _rxBuffer: string = "";

    override update(state: Record<string, any>) {
        if (state.encodedvalue !== undefined) {
            this.setEncodedValue(Number(state.encodedvalue));
            this.scan();
        }
        console.log("update triggered");
    }

    setEncodedValue = (encodedValue: number) => {
        this._encodedValue = encodedValue;
    }

    scan() {
        if (this._usart === null) {
            console.warn("DE2120: scan() called but _usart is null");
            return;
        }
        console.log("DE2120: scan() called, sending value:", this._encodedValue);
        const payload = `${this._encodedValue}\r\n`;

        for (const char of payload) {
            this._usart.writeByte(char.charCodeAt(0), false);
        }
    }

    setup() {
        const txdInterfaces = this.pins["txd"];
        if (txdInterfaces && txdInterfaces.length > 0) {
            this._usart = txdInterfaces[0].usart ?? null;
        }

        if (this._usart) {
            this._usart.onByteTransmit = (byte: number) => {
                console.log(`DE2120: Received byte from USART: ${byte}`);
                this.handleIncomingByte(byte);
            };
        } else {
            console.warn("DE2120: no USART interface found on component pins.");
        }

        this._encodedValue = 0;
    }

    private handleIncomingByte(byte: number) {
        const char = String.fromCharCode(byte);
        this._rxBuffer += char;

        if (char === '.') {
            console.log(`DE2120: Received command from Arduino: ${this._rxBuffer}`);

            if (this._usart) {
                this._usart.writeByte(0x06, false);
            }

            this._rxBuffer = "";
        }
    }
}