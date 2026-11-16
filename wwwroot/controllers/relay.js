"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RELAY = void 0;
const controller_1 = require("./controller");
const avr8js_1 = require("@lib/avr8js");
class RELAY extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.isRelayOn = false;
    }
    setup() {
        this.relayPin = this.pins['IN'][0];
        if (this.relayPin.digital) {
            this.relayPin.digital.state = avr8js_1.PinState.High;
        }
        if (this.relayPin.digital) {
            this.relayPin.digital.addListener((state) => {
                this.onPinStateChanged(state);
            });
        }
        this.updateRelayDisplay();
    }
    cleanup() {
        this.setRelayState(false);
    }
    update(state) {
        if (state.isOn !== undefined) {
            this.setRelayState(state.isOn);
        }
    }
    onPinStateChanged(pinState) {
        this.isRelayOn = pinState === avr8js_1.PinState.Low;
        this.updateRelayDisplay();
    }
    setRelayState(shouldBeOn) {
        if (this.relayPin.digital) {
            this.relayPin.digital.state = shouldBeOn ? avr8js_1.PinState.Low : avr8js_1.PinState.High;
            this.isRelayOn = shouldBeOn;
            this.updateRelayDisplay();
        }
    }
    updateRelayDisplay() {
        const element = this.element;
        if (element) {
            if (this.isRelayOn) {
                element.classList.add('relay-on');
                element.classList.remove('relay-off');
            }
            else {
                element.classList.add('relay-off');
                element.classList.remove('relay-on');
            }
        }
    }
    toggleRelay() {
        this.setRelayState(!this.isRelayOn);
    }
}
exports.RELAY = RELAY;
//# sourceMappingURL=relay.js.map