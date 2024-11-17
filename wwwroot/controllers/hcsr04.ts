import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class HCSR04 extends Controller {
    private distance: number = 20;//cm

    setDistance(distance: number) {
        this.distance = distance;
    }

    setup() {
        console.log(JSON.stringify(this.pins.trigger));
        this.pins.trigger[0].setListener(this.trigger.bind(this));
    }

    trigger(state: PinState) {
        // Doing a very small delay after receiving the rising edge of the trigger pulse. In reality this delay is 
        // around 10 us + chirp delay
        if (state === PinState.High) {
            setTimeout(() => this.echo(), 1);
        }
    }

    echo() {
        // Echo pin stays high for about 58 us per cm to the target
        this.pins.echo[0].setState(true);
        AVRRunner.getInstance().cpu.addClockEvent(() => {
            this.pins.echo[0].setState(false);
        }, this.distance * AVRRunner.getInstance().usToCycles(58.4));
    }
}