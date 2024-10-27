import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";

export class MAX6675 extends Controller {

    setup() {
        AVRRunner.getInstance().spi.onByte = this.spiCallback;
    }

    reset() {
    }

    private nextByteIsHigh = false;
    
    spiCallback = (byte: number) => {
        let _temperature:number = 0;
        this.component.invokeMethodAsync("GetMax6675Temperature").then(v => _temperature = Math.round(v / 0.25) << 3, () => _temperature = 80 << 3).finally(() => this.dispatchSpi(_temperature));
    }
    dispatchSpi = (temperature:number) => {
        let byteToSend:number;
        if(!this.nextByteIsHigh) {
            byteToSend= (temperature >> 8) & 0xFF;
        }else{
            byteToSend= temperature & 0xFF; 
        }
        this.nextByteIsHigh = !this.nextByteIsHigh;
        AVRRunner.getInstance().cpu.addClockEvent(() => AVRRunner.getInstance().spi.completeTransfer(byteToSend), AVRRunner.getInstance().spi.transferCycles);
    }
}