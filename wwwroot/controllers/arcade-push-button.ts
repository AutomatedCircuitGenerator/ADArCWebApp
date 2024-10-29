import {Controller} from "./controller";
import {Pin} from "@controllers/pin";

export class ArcadePushButton extends Controller {
    private digitalOut: Pin;
    setup(): void {
        this.digitalOut = this.pins.digital_out[0];
    }
    setPushed(pushed: boolean) {
        const surface = this.element.querySelector<HTMLElement>(".surface");

        if (surface) {
            surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
        }

        this.digitalOut.setState(pushed);
    }

}