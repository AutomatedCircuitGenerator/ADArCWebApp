import {Controller} from "./controller";
import {PinState} from "@lib/avr8js";

export class MPS20N0040D extends Controller {

    private pressure = 0;
    private offset = 8388608;
    private scale = 100000;

    private adcValue = 0;
    private bitIndex = 23;
    private shifting = false;

    override update(state: Record<string, any>) {
        if (state.pressure !== undefined) {
            this.pressure = state.pressure;
            console.log("MPS20N0040D pressure updated to:", this.pressure);
            this.computeADC();
        }
        if (state.offset !== undefined) {
            this.offset = state.offset;
            console.log("MPS20N0040D offset updated to:", this.offset);
            this.computeADC();
        }
        if (state.scale !== undefined) {
            this.scale = state.scale;
            console.log("MPS20N0040D scale updated to:", this.scale);
            this.computeADC(); 
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
                this.clockTick();
            }
        });

        console.log("MPS20N0040D setup complete");
        console.log("SCK pin object:", sck); // debugging

        setTimeout(() => {
            this.shifting = false;   // reset
            this.computeADC();       // force correct value
        }, 1000);
    }

    private computeADC() {
        
        // Convert pressure to 24-bit ADC value
        let value = Math.floor(this.offset + this.pressure * this.scale);

        // Clamp to 24-bit unsigned
        value = Math.max(0, Math.min(0xFFFFFF, value));

        this.adcValue = value;
        this.bitIndex = 23;
        this.shifting = true;

        // Signal data is ready by pulling DOUT LOW
        this.pins.dout[0].digital.state = PinState.Low;

        console.log("MPS20N0040D ADC computed:", value, "from pressure:", this.pressure, "raw bits:", value.toString(2).padStart(24, '0'));
    }

    private clockTick() {
        if (!this.shifting) {
            return;
        }

        const dout = this.pins.dout[0].digital;

        // Extract the current bit (MSB first)
        const bit = (this.adcValue >> this.bitIndex) & 1;

        console.log("Sending bit:", bit); // debugging

        // Set DOUT to the bit value AFTER clock goes high
        dout.state = bit === 1 ? PinState.High : PinState.Low;

        this.bitIndex--;

        // After 24 bits, stop shifting and release DOUT (HIGH)
        if (this.bitIndex < 0) {
            this.shifting = false;
            dout.state = PinState.High; // Release DOUT (HIGH = not ready)
            console.log("Transmission complete");
        }
    }
}