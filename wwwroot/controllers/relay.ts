import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js"

export class RELAY extends Controller {
    setup() {
        AVRRunner.getInstance();
    }
}
