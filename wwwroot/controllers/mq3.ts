import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export class MQ3 extends Controller {
    private alcohol: number;
    private inSimulation: boolean;

    setAlcohol(alcohol: number) {
        if (alcohol < 0) {
            this.alcohol = 0;
        } else if (alcohol > 1024) {
            this.alcohol = 5;
        } else {
            this.alcohol = alcohol * 5 / 1024;
        }
        if (!this.inSimulation) {
            return;
        }
        this.pins.analog_out[0].analog.voltage = this.alcohol;
    }

    setup() {
        this.inSimulation = true;
    }
}