import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { I2CController } from "@lib/i2c-bus";

export class AMG8833 extends Controller implements I2CController {

    private _temperature: number = 25.0;
    private _pixels: number[][] = [];
    private readIndex = 0;

    override update(state: Record<string, any>) {
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
            console.log("[AMG8833] Temperature updated to:", this._temperature, "°C");
            this.generatePixelGrid();
        }
    }

    setup() {
        const twi = AVRRunner.getInstance().board.twis[0];
        if (twi) {
            twi.registerController(0x69, this);
        }
        this.generatePixelGrid();
    }

    private generatePixelGrid() {
        this._pixels = [];
        for (let row = 0; row < 8; row++) {
            const pixelRow: number[] = [];
            for (let col = 0; col < 8; col++) {
                const distFromCenter = Math.sqrt(
                    Math.pow(row, 2) + Math.pow(col, 2)
                );
                const variation = distFromCenter * 0.5;
                const pixelTemp = this._temperature - variation;
                pixelRow.push(Math.max(-40, Math.min(80, pixelTemp)));
            }
            this._pixels.push(pixelRow);
        }
    }

    i2cConnect(addr: number, write: boolean): boolean {
        this.readIndex = 0;
        return true;
    }

    i2cDisconnect(): void {
        this.readIndex = 0;
    }

    i2cReadByte(acked: boolean): number {
        if (this.readIndex >= 128) {
            return 0xFF;
        }

        const pixelIndex = Math.floor(this.readIndex / 2);
        const row = Math.floor(pixelIndex / 8);
        const col = pixelIndex % 8;
        const temp = this._pixels[row][col];

        // Convert temperature to 12-bit signed value
        let rawValue = Math.round((temp) * 4);
        rawValue = rawValue & 0xFFF; // Keep only 12 bits

        let byteToReturn = 0;
        if (this.readIndex % 2 === 0) {
            // MSB
            byteToReturn = (rawValue >> 8) & 0xFF;
        } else {
            // LSB - only lower 8 bits
            byteToReturn = rawValue & 0xFF;
        }

        this.readIndex++;
        console.log(`[AMG8833] Read byte index ${this.readIndex - 1}: 0x${byteToReturn.toString(16)}, temp: ${temp}°C, raw: 0x${rawValue.toString(16)}`);
        return byteToReturn;
    }

    i2cWriteByte(value: number): boolean {
        return true;
    }
}