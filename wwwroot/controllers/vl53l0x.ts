import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class Vl53l0x extends Controller {

    private registers = new Uint8Array(256);

    private currentRegister = 0;

    private expectingRegisterAddress = true;

    private address = 0x29;

    

    setup() {
    }

    private get shouldReadSPI(): boolean {
        return this.pins.cs[0].digital.state == PinState.Low;
    }

    private nextByteIsHigh = false;

    
}