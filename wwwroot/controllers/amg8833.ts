import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { PinState } from "@lib/avr8js";

export class AMG8833 extends Controller {

    private _pixels: number[][] = [];   // 8x8 grid

    override update(state: Record<string, any>) {
        // Expecting: state.pixels = [[... 8 numbers ...], ... 8 rows ...]
        if (state.pixels) {
            this.setPixels(state.pixels);
        }
    }

    setPixels = (pixels: number[][]) => {
        this._pixels = pixels;
    }

    setup() {
        AVRRunner.getInstance().board.spis[0].addListener(this.spiCallback);
    }

    private get shouldReadSPI(): boolean {
        // identical style to MAX6675
        return this.pins.cs[0].digital.state == PinState.Low;
    }

    private nextByteIsHigh = false;
    private currentRow = 0;
    private currentCol = 0;

    spiCallback = (byte: number) => {
        if (!this.shouldReadSPI) {
            return;
        }

        if (!this._pixels || this._pixels.length === 0) {
            console.log("Undefined AMG8833 pixel grid\n");
            return;
        }

        // Read current pixel
        const rawPixel = this._pixels[this.currentRow][this.currentCol];

        // For consistency with MAX6675 shifting:
        // Send each pixel as a 16-bit value (high byte then low byte)
        const pixelValue = Math.round(rawPixel * 10); // arbitrary scaling

        let byteToSend: number;

        if (!this.nextByteIsHigh) {
            byteToSend = (pixelValue >> 8) & 0xFF;
        } else {
            byteToSend = pixelValue & 0xFF;

            // After sending low byte, move to next pixel
            this.currentCol++;
            if (this.currentCol >= 8) {
                this.currentCol = 0;
                this.currentRow++;
                if (this.currentRow >= 8) {
                    this.currentRow = 0;
                }
            }
        }

        this.nextByteIsHigh = !this.nextByteIsHigh;

        AVRRunner
            .getInstance()
            .board
            .cpu
            .addClockEvent(
                () => AVRRunner.getInstance().board.spis[0].completeTransfer(byteToSend),
                AVRRunner.getInstance().board.spis[0].transferCycles
            );
    }
}
