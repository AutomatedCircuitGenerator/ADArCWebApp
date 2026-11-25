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
        const display = this.element?.querySelector<HTMLElement>("#ledDisplay") || this.element?.querySelector<HTMLElement>("#ledOn");
        if (display) display.style.display = "none";
    }

    setColor(color: string) {
        if (!this.element) {
            return;
        }
        const _color: string = this.lightColors[color] ? this.lightColors[color] : "red";
        const ledColor = this.element.querySelector<HTMLElement>("#ledColor");
        if (ledColor) ledColor.style.fill = _color;
        const ledBrightness = this.element.querySelector<HTMLElement>("#ledColorBrightness");
        if (ledBrightness) ledBrightness.style.fill = _color;
    }


    private toggleLed(state: PinState) {
        const display = this.element?.querySelector<HTMLElement>("#ledDisplay") || this.element?.querySelector<HTMLElement>("#ledOn");
        if (display) {
            if (state == PinState.Low) {
                display.style.display = "none";
            } else if (state == PinState.High) {
                display.style.display = "inherit";
            }
        }
    }
}