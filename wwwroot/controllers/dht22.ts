import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class DHT22 extends Controller {

    private temperature: number;
    private humidity: number;
    setup() {
    }
}