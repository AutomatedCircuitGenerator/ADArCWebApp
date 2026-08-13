"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCMotorL298N = void 0;
const controller_1 = require("@controllers/controller");
const avr8js_1 = require("@lib/avr8js");
const execute_1 = require("@lib/execute");
var MotorDirection;
(function (MotorDirection) {
    MotorDirection[MotorDirection["OFF"] = 0] = "OFF";
    MotorDirection[MotorDirection["FORWARD"] = 1] = "FORWARD";
    MotorDirection[MotorDirection["REVERSE"] = 2] = "REVERSE";
})(MotorDirection || (MotorDirection = {}));
class DCMotorL298N extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.animationFrameId = null;
    }
    setup() {
        this.motorDirection = MotorDirection.OFF;
        this.dutyCycle = 0;
        this.previousFallingEdgeCycle = 0;
        this.period = 0;
        this.lastPinState = avr8js_1.PinState.Input;
        this.previousRisingEdgeCycle = 0;
        this.isFirstRisingEdge = true;
        this.isPeriodCreated = false;
        this.animationFrameId = null;
        this.pins.in1[0].digital.addListener(this.in1Listener.bind(this));
        this.pins.in2[0].digital.addListener(this.in2Listener.bind(this));
        this.pins.ena[0].digital.addListener(this.onSignalChange.bind(this));
    }
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.dutyCycle = 0;
        this.renderSvg();
    }
    in1Listener(state) {
        this.setMotorDirection();
    }
    in2Listener(state) {
        this.setMotorDirection();
    }
    setMotorDirection() {
        const in1 = this.pins.in1[0].digital.state;
        const in2 = this.pins.in2[0].digital.state;
        if (in1 === in2) {
            this.motorDirection = MotorDirection.OFF;
        }
        else if (in1) {
            this.motorDirection = MotorDirection.FORWARD;
        }
        else {
            this.motorDirection = MotorDirection.REVERSE;
        }
    }
    watchDog(lastState, lastStateCycle) {
        if (lastState === avr8js_1.PinState.High && this.previousFallingEdgeCycle <= lastStateCycle) {
            this.dutyCycle = 1;
        }
        else if (lastState === avr8js_1.PinState.Low && this.previousRisingEdgeCycle <= lastStateCycle) {
            this.dutyCycle = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    onSignalChange(state) {
        if (!this.isPeriodCreated) {
            this.period = this.pins.ena[0].timer.getPwmPeriod();
            console.log("period");
            this.isPeriodCreated = true;
        }
        const currentCycle = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        if (state === avr8js_1.PinState.High) {
            this.previousRisingEdgeCycle = currentCycle;
            if (this.isFirstRisingEdge) {
                this.dutyCycle = 0;
                this.isFirstRisingEdge = false;
            }
            else {
                this.dutyCycle = Math.max((this.period - (currentCycle - this.previousFallingEdgeCycle)) / this.period, 0);
            }
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.watchDog(state, currentCycle), this.period - 3);
        }
        else if (state === avr8js_1.PinState.Low) {
            if (this.lastPinState === avr8js_1.PinState.High) {
                this.previousFallingEdgeCycle = currentCycle;
                this.dutyCycle = Math.min((currentCycle - this.previousRisingEdgeCycle) / this.period, 1);
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => this.watchDog(state, currentCycle), this.period - 3);
            }
        }
        this.lastPinState = state;
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }
    renderSvg() {
        let dcMotor = this.element.querySelector("#shakeAnimation");
        if (!dcMotor) {
            const dcMotorGroup = this.element.querySelector("#dcMotorGroup");
            const animateTransform = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
            animateTransform.setAttribute('id', 'shakeAnimation');
            animateTransform.setAttribute('attributeName', 'transform');
            animateTransform.setAttribute('type', 'translate');
            animateTransform.setAttribute('additive', 'sum');
            animateTransform.setAttribute('from', '0 0');
            animateTransform.setAttribute('to', '0 5');
            animateTransform.setAttribute('dur', '0s');
            animateTransform.setAttribute('repeatCount', '0');
            animateTransform.setAttribute('keyTimes', '0;0.5;1');
            animateTransform.setAttribute('values', '0 0; 0 5; 0 0');
            dcMotorGroup.appendChild(animateTransform);
            dcMotor = this.element.querySelector("#shakeAnimation");
        }
        if (this.dutyCycle === 0 || this.motorDirection === MotorDirection.OFF) {
            dcMotor.remove();
            this.animationFrameId = null;
            return;
        }
        const speed = (1 - (0.1 + this.dutyCycle * (1 - .1))) + 0.1;
        dcMotor.setAttribute("dur", `${speed}s`);
        dcMotor.setAttribute("repeatCount", "indefinite");
        this.animationFrameId = null;
    }
}
exports.DCMotorL298N = DCMotorL298N;
//# sourceMappingURL=dcmotorl298n.js.map