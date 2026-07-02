import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class Vl53l0x extends Controller {

    private registers = new Uint8Array(256);

    private currentRegister = 0;

    private expectingRegisterAddress = true;

    private address = 0x29;

    constructor(...)

    override update(state: Record<string, any>) {
        this.setTemperature(state.temperature);
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