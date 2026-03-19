import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class MAX31856 extends Controller {
    private _temperature: number = -20;
    private byteCount = 0; // 0, 1, 2, then back to 0

    override update(state: Record<string, any>) {
        if (state.temperature != null) {

            // hard code max and min boundaries
            if (state.temperature > 350) {
                state.temperature = 350;
            }
            else if (state.temperature < -200) {
                state.temperature = -200;
            }
            
            this._temperature = state.temperature;
            
            console.log("MAX31856 temperature updated to:", this._temperature);
        }
    }

    override setup() {
        const spi = AVRRunner.getInstance().board.spis[0];
        if (spi) {
            spi.addListener(this.spiCallback);
            console.log("MAX31856 SPI listener attached");
        }
    }

    private get shouldReadSPI(): boolean {
        return this.pins.cs[0].digital.state === PinState.Low;
    }

    private spiCallback = (byte: number) => {
        if (!this.shouldReadSPI) {
            this.byteCount = 0; // Reset when CS is HIGH
            return;
        }

        if (this._temperature === undefined) {
            console.log("Temperature undefined");
            return;
        }

        // Convert temperature to raw value (0.25°C per LSB)
        const raw = Math.round(this._temperature / 0.25);

        let byteToSend = 0;

        switch (this.byteCount) {
            case 0:
                byteToSend = 0; // Config dummy byte
                console.log("SPI byte 0 - sending config dummy: 0");
                break;
            case 1:
                byteToSend = (raw >> 8) & 0xFF; // MSB
                console.log("SPI byte 1 - sending MSB:", byteToSend, "for temp:", this._temperature);
                break;
            case 2:
                byteToSend = raw & 0xFF; // LSB
                console.log("SPI byte 2 - sending LSB:", byteToSend, "for temp:", this._temperature);
                break;
        }

        this.byteCount = (this.byteCount + 1) % 3; // Cycle: 0 → 1 → 2 → 0

        // Schedule the response on the next SPI clock cycle
        const spi = AVRRunner.getInstance().board.spis[0];
        AVRRunner.getInstance().board.cpu.addClockEvent(
            () => spi.completeTransfer(byteToSend),
            spi.transferCycles
        );
    };
}