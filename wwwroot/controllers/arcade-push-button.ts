import {Controller} from "./controller";
import {Interfaces} from "../boards/board";
import {PinState} from "@lib/avr8js";
export class ArcadePushButton extends Controller {
    private digitalOut: Interfaces;
    private isPushed: boolean = false;
    
    setup(): void {
        this.digitalOut = this.pins.digital_out[0];
        this.digitalOut.digital.state = this.isPushed ? PinState.High : PinState.Low;
    }
    
    override update(state: Record<string, any>) {
        this.setPushed(state.pushed === "Pushed");
    }

    setPushed(pushed: boolean) {
        this.isPushed = pushed;
        
        if (!this.element) {
            return;
        }
        
        const surface = this.element.querySelector<HTMLElement>(".surface");

        if (surface) {
            surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
        }

        this.digitalOut.digital.state = pushed ? PinState.High : PinState.Low;;
    }

}