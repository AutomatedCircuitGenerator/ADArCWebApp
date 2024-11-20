import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class MAX6675 extends Controller {

    private _temperature: number;

    setTemperature = (temperature: number) => {
        this._temperature = temperature
    }

    setup() {
        AVRRunner.getInstance().board.spis[0].addListener(this.spiCallback);
    }

    private get shouldReadSPI(): boolean {
        return this.pins.cs[0].digital.state == PinState.Low;
    }

    private nextByteIsHigh = false;

    spiCallback = (byte: number) => {
        if (!this.shouldReadSPI) {
            return;
        }
        if (this._temperature == undefined) {
            console.log("Undefined\n")
        }
        let temperature = Math.round((this._temperature / 0.25) << 3);
        let byteToSend: number;
        if (!this.nextByteIsHigh) {
            byteToSend = (temperature >> 8) & 0xFF;
        } else {
            byteToSend = temperature & 0xFF;
        }
        this.nextByteIsHigh = !this.nextByteIsHigh;
        AVRRunner.getInstance().board.cpu.addClockEvent(() => AVRRunner.getInstance().board.spis[0].completeTransfer(byteToSend), AVRRunner.getInstance().board.spis[0].transferCycles);
    }
}