import {Controller} from "./controller";
import {PinState} from "@lib/avr8js";

export class MPS20N0040D extends Controller {

    private pressure = 0;
    private offset = 0; // bipolar 24-bit baseline at 0V (zero pressure)
    private scale = 200;

    private adcValue = 0;
    private pulseCount = 0;
    private shifting = false;

    override update(state: Record<string, any>) {
        if (state.pressure !== undefined) {
            this.pressure = state.pressure;
            console.log("MPS20N0040D pressure updated to:", this.pressure);
            if (!this.shifting) {
                this.computeADC();
            }
        }
        if (state.scale !== undefined) {
            this.scale = state.scale;
            console.log("MPS20N0040D scale updated to:", this.scale);
            if (!this.shifting) {
                this.computeADC();
            }
        }
    }

    setup() {
        if (!this.pins?.sck?.[0] || !this.pins?.dout?.[0]) {
            console.error("Pins not initialized:", this.pins);
            return;
        }

        const sck = this.pins.sck[0].digital;
        const dout = this.pins.dout[0].digital;

        // Start with DOUT HIGH (not ready)
        dout.state = PinState.High;

        // Listen to SCK clock pulses - on RISING edge, shift next bit
        sck.addListener((state: PinState) => {
            if (state === PinState.High) {
                this.pulseCount++;
                this.clockTick();
            }
        });

        console.log("MPS20N0040D setup complete");

        setTimeout(() => {
            this.shifting = false;   // reset
            this.computeADC();       // force correct value
        }, 1000);
    }

    private computeADC() {
        // Convert pressure to 24-bit ADC value
        let value = Math.floor(this.offset + this.pressure * this.scale);

        // Convert to 24-bit unsigned representation
        value = ((value % 0x1000000) + 0x1000000) % 0x1000000;

        this.adcValue = value;
        this.shifting = true;
        this.pulseCount = 0;

        // Signal data is ready by pulling DOUT LOW
        this.pins.dout[0].digital.state = PinState.Low;

        console.log("MPS20N0040D ADC computed:", value, "from pressure:", this.pressure, "raw bits:", value.toString(2).padStart(24, '0'));
    }

    private clockTick() {
        const dout = this.pins.dout[0].digital;

        if (this.pulseCount <= 24) {
            // Extract the current bit (MSB first)
            const bit = (this.adcValue >> (24 - this.pulseCount)) & 1;
            dout.state = bit === 1 ? PinState.High : PinState.Low;
        } else if (this.pulseCount === 25) {
            // 25th pulse is complete. Stop shifting.
            this.shifting = false;
            dout.state = PinState.High; // Release DOUT (HIGH = not ready)
            
            // Schedule next conversion ready in 50ms
            setTimeout(() => {
                this.computeADC();
            }, 50);
        }
    }
}
