"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LED = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
class LED extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.lightColors = {
            "red": "#ff8080",
            "green": "#80ff80",
            "blue": "#8080ff",
            "yellow": "#ffff80",
            "orange": "#ffcf80",
            "white": "#ffffff",
            "purple": "#ff80ff"
        };
    }
    update(state) {
        this.setColor(state.color);
    }
    setup() {
        this.pins.anode[0].digital.addListener((state) => this.toggleLed(state));
    }
    cleanup() {
        const display = this.element?.querySelector("#ledDisplay") || this.element?.querySelector("#ledOn");
        if (display) display.style.display = "none";
    }
    setColor(color) {
        if (!this.element) {
            return;
        }
        const _color = this.lightColors[color] ? this.lightColors[color] : "red";
        const ledColor = this.element.querySelector("#ledColor");
        if (ledColor) ledColor.style.fill = _color;
        const ledBrightness = this.element.querySelector("#ledColorBrightness");
        if (ledBrightness) ledBrightness.style.fill = _color;
    }
    toggleLed(state) {
        const display = this.element?.querySelector("#ledDisplay") || this.element?.querySelector("#ledOn");
        if (display) {
            if (state == avr8js_1.PinState.Low) {
                display.style.display = "none";
            }
            else if (state == avr8js_1.PinState.High) {
                display.style.display = "inherit";
            }
        }
    }
}
exports.LED = LED;
//# sourceMappingURL=led.js.map