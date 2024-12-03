import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {Digital} from "../boards/board";
import {AVRRunner} from "@lib/execute";

enum MotorDirection {
    OFF,
    FORWARD,
    REVERSE
}

export class DCMotorL298N extends Controller {


    //| in1 | in2 |  state   |
    // |-----|-----|----------|
    // |   0 |   0 | off      |
    // |   1 |   0 | forward  |
    // |   0 |   1 | backward |
    // |   1 |   1 | off      |
    private motorDirection: MotorDirection;
    private dutyCycle: number;
    private previousFallingEdgeCycle: number;
    private period: number;
    private lastPinState: PinState;
    private previousRisingEdgeCycle: number;
    private isFirstRisingEdge: boolean;
    private isPeriodCreated: boolean;


    private animationFrameId: number | null = null;

    setup() {
        this.motorDirection = MotorDirection.OFF;
        // this.signal;
        this.dutyCycle = 0;
        this.previousFallingEdgeCycle = 0;
        this.period = 0;
        this.lastPinState = PinState.Input;
        this.previousRisingEdgeCycle = 0;
        this.isFirstRisingEdge = true;
        this.isPeriodCreated = false;

        this.animationFrameId = null;

        this.pins.in1[0].digital.addListener(this.in1Listener.bind(this));
        this.pins.in2[0].digital.addListener(this.in2Listener.bind(this))
        this.pins.ena[0].digital.addListener(this.onSignalChange.bind(this));
    }

    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.dutyCycle = 0;
        this.renderSvg();
    }

    private in1Listener(state: PinState) {
        this.setMotorDirection();
    }

    private in2Listener(state: PinState) {
        this.setMotorDirection();
    }

    private setMotorDirection() {
        const in1 = this.pins.in1[0].digital.state;
        const in2 = this.pins.in2[0].digital.state;
        if (in1 === in2) {
            this.motorDirection = MotorDirection.OFF;
        } else if (in1) {
            this.motorDirection = MotorDirection.FORWARD;
        } else {
            this.motorDirection = MotorDirection.REVERSE;
        }
    }


    private watchDog(lastState: PinState, lastStateCycle: number) {
        if (lastState === PinState.High && this.previousFallingEdgeCycle <= lastStateCycle) {
            this.dutyCycle = 1;
        } else if (lastState === PinState.Low && this.previousRisingEdgeCycle <= lastStateCycle) {
            this.dutyCycle = 0;
        }
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    private onSignalChange(state: PinState) {
        if (!this.isPeriodCreated) {
            this.period = this.pins.ena[0].timer.getPwmPeriod();
            console.log("period")
            this.isPeriodCreated = true;
        }
        const currentCycle = AVRRunner.getInstance().board.cpu.cycles;
        if (state === PinState.High) {
            this.previousRisingEdgeCycle = currentCycle;

            if (this.isFirstRisingEdge) {
                this.dutyCycle = 0;
                this.isFirstRisingEdge = false;
            } else {
                this.dutyCycle = Math.max((this.period - (currentCycle - this.previousFallingEdgeCycle)) / this.period, 0);
            }
            // want watch dog to run before next cycle so states dont get corrupted
            AVRRunner.getInstance().board.cpu.addClockEvent(() => this.watchDog(state, currentCycle), this.period - 3);

        } else if (state === PinState.Low) {
            if (this.lastPinState === PinState.High) {
                this.previousFallingEdgeCycle = currentCycle;
                this.dutyCycle = Math.min((currentCycle - this.previousRisingEdgeCycle) / this.period, 1)
                AVRRunner.getInstance().board.cpu.addClockEvent(() => this.watchDog(state, currentCycle), this.period - 3);
            }
        }

        this.lastPinState = state;

        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.renderSvg.bind(this));
        }
    }

    private renderSvg() {
        //for now, just going to do a shaking animation. can try to remake svg later to show shaft
        let dcMotor = this.element.querySelector("#shakeAnimation");
        if (!dcMotor) {
            const dcMotorGroup = this.element.querySelector("#dcMotorGroup")
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
            dcMotor.remove()
            this.animationFrameId = null;
            return;
        }
        //lerp for now
        const speed = (1 - (0.1 + this.dutyCycle * (1 - .1))) + 0.1;

        dcMotor.setAttribute("dur", `${speed}s`);
        dcMotor.setAttribute("repeatCount", "indefinite");
        this.animationFrameId = null;
    }
}
