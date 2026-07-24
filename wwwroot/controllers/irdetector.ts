import { Controller } from "./controller";
import { PinState } from "@lib/avr8js";
import {Interfaces} from "../boards/board";

export class IRDETECTOR extends Controller {

    private digitalOut: Interfaces;
    private threshold = 15;  // abstract threshold, Datasheet: Detection Range 2~30 cm
    private distance = 20;
    private obstacleDetected = false;

    override update(state: Record<string, any>) {
        if (state.distance !== undefined) {
            this.distance = state.distance;
        }

        if (state.threshold !== undefined) {
            this.threshold = state.threshold;
        }

        this.evaluateObstacle();
        this.updateOutput();
    }

    setup() {
        this.digitalOut = this.pins.out[0];
        this.setPowerLed(true);
        this.evaluateObstacle();
        this.updateOutput();
    }

    cleanup() {
        this.setPowerLed(false);
        this.setDetectLed(false);
    }

    private evaluateObstacle() {
        this.obstacleDetected = this.distance <= this.threshold;
    }

    private updateOutput() {
        this.digitalOut.digital.state = this.obstacleDetected ? PinState.Low : PinState.High;
        this.setDetectLed(this.obstacleDetected);
    }

    private setPowerLed(on: boolean) {
        const display = on ? "inherit" : "none";
        this.element.querySelector<HTMLElement>("#powerLED")!.style.display = display;
        this.element.querySelector<HTMLElement>("#powerGlow")!.style.display = display;
    }

    private setDetectLed(on: boolean) {
        const display = on ? "inherit" : "none";
        this.element.querySelector<HTMLElement>("#detectLED")!.style.display = display;
        this.element.querySelector<HTMLElement>("#detectGlow")!.style.display = display;
    }
}