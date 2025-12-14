import { Controller } from "./controller";
import { PinState } from "@lib/avr8js";

export class MPS20N0040D extends Controller {

    private pressure = 0;
    private offset = 8388608;
    private scale = 100000;

    private adcValue = 0;
    private bitIndex = 0;
    private shifting = false;

    override update(state: Record<string, any>) {
        if (state.pressure !== undefined) this.pressure = state.pressure;
        if (state.offset !== undefined) this.offset = state.offset;
        if (state.scale !== undefined) this.scale = state.scale;

        this.computeADC();
    }

    setup() {
        const sck = this.pins.SCK[0].digital;
        const dout = this.pins.DOUT[0].digital;

        dout.state = Boolean(PinState.Low);

        sck.addListener(() => {
            if (sck.state === PinState.High) {
                this.clockTick();
            }
        });

        this.computeADC();
    }

    private computeADC() {
        let value = Math.floor(this.offset + this.pressure * this.scale);

        // Clamp to 24-bit
        value = Math.max(0, Math.min(0xFFFFFF, value));

        this.adcValue = value;
        this.bitIndex = 23;
        this.shifting = true;

        // Data ready → pull DOUT low
        this.pins.DOUT[0].digital.state = Boolean(PinState.Low);
    }

    private clockTick() {
        const dout = this.pins.DOUT[0].digital;

        if (!this.shifting) return;

        const bit = (this.adcValue >> this.bitIndex) & 1;
        dout.state = false; // LOW

        this.bitIndex--;

        if (this.bitIndex < 0) {
            this.shifting = false;

            // After 24 bits, DOUT goes high (not ready)
            dout.state = Boolean(PinState.High);
        }
    }
}
