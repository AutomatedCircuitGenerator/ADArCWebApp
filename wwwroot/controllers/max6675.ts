import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {AVRIOPort} from "@lib/avr8js";

export class MAX6675 extends Controller {

    private _temperature: number;
    private _csPort: number;
    setTemperature = (temperature: number) => {
        this._temperature = temperature
    }

    setup() {
        AVRRunner.getInstance().spi.addListener(this.spiCallback);
        this._csPort = this.pins["cs"][0].relativePort;
        MAX6675.item2toAVRIOPort(this.pins["cs"][0].portRegion).addListener(this.csCallback)
    }

    reset() {
    }

    private shouldReadSPI:boolean = false;
    csCallback = (oldValue: number, value: number) => {
        let pinState = value & this._csPort;
        if (pinState === 0){
            this.shouldReadSPI = true;
        } else if ((oldValue & this._csPort) === 0 && (value & this._csPort) > 0){
            this.shouldReadSPI = false;
        }
    }

    private nextByteIsHigh = false;
    spiCallback = (byte: number) => {
        if(!this.shouldReadSPI){
            return;
        }
        if (this._temperature == undefined) {
            console.log("Undefined\n")
        }
        let temperature = Math.round(this._temperature / 0.25) << 3);
        let byteToSend: number;
        if (!this.nextByteIsHigh) {
            byteToSend = (temperature >> 8) & 0xFF;
        } else {
            byteToSend = temperature & 0xFF;
        }
        this.nextByteIsHigh = !this.nextByteIsHigh;
        AVRRunner.getInstance().cpu.addClockEvent(() => AVRRunner.getInstance().spi.completeTransfer(byteToSend), AVRRunner.getInstance().spi.transferCycles);

    }
}