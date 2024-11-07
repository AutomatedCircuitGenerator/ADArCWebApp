import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";

export class KY008 extends Controller {

    setup() {
        this.pins.digital_in[0].setListener(this.toggleLaser);
    }

    toggleLaser = (state: PinState) => {
        const beam = this.element.querySelector<HTMLElement>("#laser-beam");
        beam.style.fill = state  === PinState.High ? "url(#a)" : "none";
    }
}