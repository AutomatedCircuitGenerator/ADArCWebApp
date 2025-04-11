import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";

export class LED extends Controller {

    private lightColors: { [key: string]: string } = {
        "red": "#ff8080",
        "green": "#80ff80",
        "blue": "#8080ff",
        "yellow": "#ffff80",
        "orange": "#ffcf80",
        "white": "#ffffff",
        "purple": "#ff80ff"
    }

    override update(state: Record<string, any>) {
        this.setColor(state.color);
    }

    setup() {
        this.pins.anode[0].digital.addListener((state) => this.toggleLed(state));
    }

    cleanup() {
        this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "none";
    }

    setColor(color: string) {
        if (!this.element) {
            return;
        }
        const _color: string = this.lightColors[color] ? this.lightColors[color] : "red";
        this.element.querySelector<HTMLElement>("#ledColor").style.fill = _color;
        this.element.querySelector<HTMLElement>("#ledColorBrightness").style.fill = _color;
    }


    private toggleLed(state: PinState) {
        if (state == PinState.Low) {
            this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "none";
        } else if (state == PinState.High) {
            this.element.querySelector<HTMLElement>("#ledDisplay").style.display = "inherit";
        }
    }
}