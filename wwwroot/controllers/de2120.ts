import {Controller} from "@controllers/controller";
import {USART} from "../boards/board";

export class DE2120 extends Controller {
    private _encodedValue: number;
    private _usart: USART | null = null;

    override update(state: Record<string, any>) {
        if (state.encodedvalue !== undefined) {
            this.setEncodedValue(Number(state.encodedvalue));
            this.scan();
        }
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
        console.log("DE2120: txd interfaces count:", txdInterfaces?.length);
        if (txdInterfaces && txdInterfaces.length > 0) {
            const iface = txdInterfaces[0];
            console.log("DE2120: interface keys:", Object.keys(iface));
            console.log("DE2120: usart:", iface.usart);
            this._usart = iface.usart ?? null;
        }
        if (this._usart === null) {
            console.warn("DE2120: no USART interface found on txd pin.");
        }
        this._encodedValue = 0;
    }
}