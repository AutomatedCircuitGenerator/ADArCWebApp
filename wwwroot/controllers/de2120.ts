import {Controller} from "@controllers/controller";
import {USART} from "../boards/board";

// todo: find out why libraries aren't importing

export class DE2120 extends Controller {
    private _encodedValue: number;
    private _usart: USART | null = null;

    override update(state: Record<string, any>) {
        if (state.encodedvalue !== undefined) {
            this.setEncodedValue(Number(state.encodedvalue));
        }
    }

    setEncodedValue = (encodedValue: number) => {
        this._encodedValue = encodedValue;
    }

    scan() {
        // outputs the decoded barcode data as an ascii string followed by CR+LF.
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
        if (this._usart === null) {
            console.warn("DE2120: no USART interface found on txd pin.");
        }

        const rxdInterfaces = this.pins["rxd"];
        if (rxdInterfaces && rxdInterfaces.length > 0) {
            const rxUsart = rxdInterfaces[0].usart;
            if (rxUsart) {
                rxUsart.onByteTransmit = (value) => {
                    // Reserved for future host→scanner command handling (e.g. trigger, config).
                };
            }
        }

        this._encodedValue = 0;
    }
}