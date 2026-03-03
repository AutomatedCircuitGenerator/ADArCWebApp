import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class MAX31856 extends Controller {
    private temperature: number = 35;

    override setup() {
        const spi = AVRRunner.getInstance().board.spis[0];
        if (spi) {
            spi.addListener(this.spiCallback);
            console.log("MAX31856 SPI listener attached");
        }

        console.log("MAX31856 setup called");
    }

    override update(state: Record<string, any>) {
        if (state.temperature != null) {
            this.temperature = state.temperature;
        }
    }

    private transferIndex = 0;
    private activeSession = false;

    private spiCallback = (byte: number) => {
        const spi = AVRRunner.getInstance().board.spis[0];
        if (!spi || !this.pins.cs?.[0]) return;

        const csState = this.pins.cs[0].digital.state ?? PinState.High;

        // Detect start of SPI transaction
        if (csState === PinState.Low && !this.activeSession) {
            this.activeSession = true;
            this.transferIndex = 0;
        }

        // Detect end of SPI transaction
        if (csState !== PinState.Low && this.activeSession) {
            this.activeSession = false;
            this.transferIndex = 0;
            return;
        }

        // Ignore if not active
        if (!this.activeSession) return;

        const raw = Math.round(this.temperature / 0.25);

        let byteToSend = 0;
        switch (this.transferIndex) {
            case 0:
                byteToSend = 0; // Config dummy byte
                break;
            case 1:
                byteToSend = (raw >> 8) & 0xff; // MSB
                break;
            case 2:
                byteToSend = raw & 0xff; // LSB
                break;
            default:
                byteToSend = 0;
        }

        this.transferIndex++;
        spi.completeTransfer(byteToSend);
    };
}