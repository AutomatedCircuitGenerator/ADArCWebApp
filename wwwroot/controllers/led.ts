import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";

export class LED extends Controller {

    private color: string = "#ff8080";

    private lightColors: { [key: string]: string } = {
        "red": "#ff8080",
        "green": "#80ff80",
        "blue": "#8080ff",
        "yellow": "#ffff80",
        "orange": "#ffcf80",
        "white": "#ffffff",
        "purple": "#ff80ff"
    }


    setup() {
        this.pins.anode[0].digital.addListener((state) => this.toggleLed(state));
    }
    
    cleanup() {
        this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "none";
    }

    setColor(color: string) {
        this.color = this.lightColors[color];
    }


    private toggleLed(state: PinState) {
        this.element.querySelector<HTMLElement>("#ledColor").style.fill = this.color;
        this.element.querySelector<HTMLElement>("#ledColorBrightness").style.fill = this.color;
        if (state == PinState.Low) {
            this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "none";
        } else if (state == PinState.High || state === PinState.InputPullUp) {
            this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "";
        }
    }
}