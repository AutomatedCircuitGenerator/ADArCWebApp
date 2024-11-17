import {Controller} from "./controller";
import {Interfaces} from "../boards/board";
export class ArcadePushButton extends Controller {
    private digitalOut: Interfaces;
    setup(): void {
        this.digitalOut = this.pins.digital_out[0];
    }
    setPushed(pushed: boolean) {
        const surface = this.element.querySelector<HTMLElement>(".surface");

        if (surface) {
            surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
        }

        this.digitalOut.digital.state = pushed;
    }

}