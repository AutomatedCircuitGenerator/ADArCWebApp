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
        this.element.querySelector("#ledDisplay").style.display = "none";
    }
    setColor(color) {
        if (!this.element) {
            return;
        }
        const _color = this.lightColors[color] ? this.lightColors[color] : "red";
        this.element.querySelector("#ledColor").style.fill = _color;
        this.element.querySelector("#ledColorBrightness").style.fill = _color;
    }
    toggleLed(state) {
        if (state == avr8js_1.PinState.Low) {
            this.element.querySelector("#ledDisplay").style.display = "none";
        }
        else if (state == avr8js_1.PinState.High) {
            this.element.querySelector("#ledDisplay").style.display = "inherit";
        }
    }
}
exports.LED = LED;
//# sourceMappingURL=led.js.map