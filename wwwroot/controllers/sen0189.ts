import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
//import {PinState} from "@lib/avr8js";

export class SEN0189 extends Controller {
    setup() {
        AVRRunner.getInstance();
    }
}