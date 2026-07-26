import { Controller } from "./controller";
import { PinState } from "@lib/avr8js";
import {Interfaces} from "../boards/board";

export class IRDETECTOR extends Controller {

    private digitalOut: Interfaces;
    private thresholdLow = 2;  // Detection Range 2~30 cm
    private thresholdHigh = 30;
    private distance = 20;
    private obstacleDetected = false;

    override update(state: Record<string, any>) {
        if (state.distance !== undefined) {
            this.distance = state.distance;
        }

        if (state.thresholdLow !== undefined) {
            this.thresholdLow = state.thresholdLow;
        }

        if (state.thresholdHigh !== undefined) {
            this.thresholdHigh = state.thresholdHigh;
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
        this.obstacleDetected = this.distance >= this.thresholdLow && this.distance <= this.thresholdHigh;
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