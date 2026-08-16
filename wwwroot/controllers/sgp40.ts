import { Controller } from "./controller";
import { I2CController } from "@lib/i2c-bus";
import { AVRRunner } from "@lib/execute";

export class SGP40 extends Controller implements I2CController {

    private _vocIndex: number = 0;
    private _temperature: number = 25.0;
    private _humidity: number = 50.0;

    private writeBuffer: number[] = [];
    private readBuffer: number[] = [];
    private readIndex: number = 0;
    
    override update(state: Record<string, any>) {

        if (state.vocIndex !== undefined) {
            this._vocIndex = Math.max(0, Math.round(state.vocIndex));
        }

        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }

        if (state.humidity !== undefined) {
            this._humidity = state.humidity;
        }

        // Push values to Razor UI
        this.component.invokeMethodAsync("UpdateState", {
            vocIndex: this._vocIndex,
            temperature: this._temperature,
            humidity: this._humidity
        });
    }
    
    override setup(): void {
        AVRRunner.getInstance().board.twis[0].registerController(0x59, this);
        this.writeBuffer = [];
        this.readBuffer = [];
        this.readIndex = 0;
    }

    override cleanup(): void {
        AVRRunner.getInstance().board.twis[0].unregisterController(0x59);
    }

    i2cConnect(addr: number, write: boolean): boolean {
        if (write) {
            this.writeBuffer = [];
        } else {
            // Master starts a read transaction.
            // Prepare read buffer based on the preceding command written
            const command = this.writeBuffer.length >= 2 
                ? (this.writeBuffer[0] << 8) | this.writeBuffer[1] 
                : 0;

            if (command === 0x280e) { // Self-test command
                this.readBuffer = [0xD4, 0x00, 0xC2]; // Success code + dummy CRC
            } else {
                // Default: measure raw VOC ticks
                const ticks = Math.max(15000, Math.min(45000, 35000 - (this._vocIndex - 100) * 50));
                this.readBuffer = [(ticks >> 8) & 0xFF, ticks & 0xFF, 0x55]; // high, low, dummy CRC
            }
            this.readIndex = 0;
        }
        return true;
    }

    i2cDisconnect(): void {
    }

    i2cReadByte(acked: boolean): number {
        const byte = this.readIndex < this.readBuffer.length 
            ? this.readBuffer[this.readIndex] 
            : 0xFF;
        if (acked) {
            this.readIndex++;
        } else {
            this.readIndex = 0;
        }
        return byte;
    }

    i2cWriteByte(value: number): boolean {
        this.writeBuffer.push(value);
        return true;
    }
}
