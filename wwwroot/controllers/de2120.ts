import { Controller } from "@controllers/controller";
import { USART } from "../boards/board";

export class DE2120 extends Controller {

    private encodedValue: number = 0;
    private _usart: USART | null = null;

    override update(state: Record<string, any>) {
        if (state.encodedvalue !== undefined) {
            this.encodedValue = Number(state.encodedvalue);
            this.sendToPin();
        }
        console.log("DE2120: update triggered with value", this.encodedValue);
    }

    setup() {
        const txdInterfaces = this.pins["txd"];
        if (txdInterfaces && txdInterfaces.length > 0) {
            this._usart = txdInterfaces[0].usart ?? null;
        }

        if (!this._usart) {
            console.warn("DE2120: no USART interface found on txd pin.");
        }
    }

    private sendToPin() {
        if (!this._usart) return;

        const payload = `${this.encodedValue}\r\n`;
        for (const char of payload) {
            this._usart.writeByte(char.charCodeAt(0), false);
        }

        console.log("DE2120: sent to txd pin:", this.encodedValue);
    }
}