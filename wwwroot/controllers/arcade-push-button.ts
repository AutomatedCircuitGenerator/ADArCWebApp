import {Controller} from "./controller";
import {Interfaces} from "../boards/board";
export class ArcadePushButton extends Controller {
    private digitalOut: Interfaces;
    private isPushed: boolean = false;
    
    setup(): void {
        this.digitalOut = this.pins.digital_out[0];
        this.digitalOut.digital.state = this.isPushed;
    }
    
    override update(state: Record<string, any>) {
        this.setPushed(state.pushed === "Pushed");
    }

    setPushed(pushed: boolean) {
        this.isPushed = pushed;
        const surface = this.element.querySelector<HTMLElement>(".surface");

        if (surface) {
            surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
        }

        this.digitalOut.digital.state = pushed;
    }

}