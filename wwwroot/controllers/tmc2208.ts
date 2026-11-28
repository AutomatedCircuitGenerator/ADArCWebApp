import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";

export class TMC2208 extends Controller {
    private angle = 0;
    private stepHigh = false;
    private directionHigh = false;
    private enabled = false;
    private animationFrame: number | null = null;

    setup() {
        this.cleanup();
        this.angle = 0;
        this.stepHigh = this.pins.step[0]?.digital.state === PinState.High;
        this.directionHigh = this.pins.dir[0]?.digital.state === PinState.High;
        this.enabled = this.pins.en[0]?.digital.state === PinState.Low;
        this.render();

        this.pins.dir[0]?.digital.addListener(state => {
            this.directionHigh = state === PinState.High;
        });
        this.pins.en[0]?.digital.addListener(state => {
            this.enabled = state === PinState.Low;
        });
        this.pins.step[0]?.digital.addListener(state => this.onStep(state));
    }

    cleanup() {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.enabled = false;
        this.stepHigh = false;
        this.angle = 0;
        this.render();
    }

    private onStep(state: PinState) {
        const high = state === PinState.High;
        if (high && !this.stepHigh && this.enabled) {
            // MS1/MS2 are low. UART example selects the same 1/8 step mode.
            this.angle = (this.angle + (this.directionHigh ? -1 : 1) * 1.8 / 8) % 360;
            if (this.animationFrame === null) {
                this.animationFrame = requestAnimationFrame(() => {
                    this.animationFrame = null;
                    this.render();
                });
            }
        }
        this.stepHigh = high;
    }

    private render() {
        this.element?.querySelector("#tmc2208-shaft")
            ?.setAttribute("transform", `rotate(${this.angle} 314 106)`);
    }
}
