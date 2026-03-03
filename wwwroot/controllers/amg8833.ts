import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";
import { I2CController } from "@lib/i2c-bus";

export class AMG8833 extends Controller implements I2CController {

    private _pixels: number[][] = [];
    private _temperature: number = 25;
    private _i2cAddress: number = 0x69;

    private _currentRegister: number = 0x00;
    private _byteIndex: number = 0;
    private _writeMode: boolean = false;

    override update(state: Record<string, any>) {
        if (state.pixels && Array.isArray(state.pixels)) {
            this.setPixels(state.pixels);
        }
        if (state.temperature !== undefined) {
            this._temperature = state.temperature;
        }
    }

    setPixels = (pixels: number[][]): void => {
        if (pixels.length === 8 && pixels.every(row => Array.isArray(row) && row.length === 8)) {
            this._pixels = pixels;
        } else {
            console.warn("Invalid pixel grid: expected 8x8 array");
        }
    }

    getPixels = (): number[][] => {
        return this._pixels;
    }

    getTemperature = (): number => {
        return this._temperature;
    }

    setup() {
        const board = AVRRunner.getInstance().board;
        if (board.twis && board.twis.length > 0) {
            board.twis[0].registerController(this._i2cAddress, this);
            console.log(`AMG8833 registered at I2C address 0x${this._i2cAddress.toString(16)}`);
        } else {
            console.error("TWI/I2C bus not available on this board");
        }
    }

    i2cConnect(addr: number, write: boolean): boolean {
        this._writeMode = write;
        this._byteIndex = 0;
        console.log(`AMG8833: I2C ${write ? 'write' : 'read'} connection at 0x${addr.toString(16)}`);
        return true;
    }

    i2cReadByte(acked: boolean): number {
        if (!this._pixels || this._pixels.length === 0) {
            console.warn("AMG8833: No pixel data available, returning 0xFF");
            return 0xFF;
        }

        const pixelIndex = Math.floor(this._byteIndex / 2);
        const byteInPixel = this._byteIndex % 2;

        if (pixelIndex >= 64) {
            this._byteIndex = 0;
            return 0x00;
        }

        const row = Math.floor(pixelIndex / 8);
        const col = pixelIndex % 8;
        const pixelTemp = this._pixels[row][col];

        const tempValue = Math.max(0, Math.min(4095, Math.round((pixelTemp / 80) * 4095)));

        let byteToReturn: number;
        if (byteInPixel === 0) {
            byteToReturn = (tempValue >> 4) & 0xFF;
        } else {
            byteToReturn = ((tempValue & 0x0F) << 4) | 0x0F;
        }

        this._byteIndex++;

        if (!acked) {
            this._byteIndex = 0;
        }

        return byteToReturn;
    }

    i2cWriteByte(value: number): boolean {
        if (this._byteIndex === 0) {
            this._currentRegister = value;
            console.log(`AMG8833: Register 0x${value.toString(16)} selected`);
        } else {
            console.log(`AMG8833: Write data 0x${value.toString(16)} to register 0x${this._currentRegister.toString(16)}`);
        }

        this._byteIndex++;
        return true;
    }

    i2cDisconnect(): void {
        this._byteIndex = 0;
        console.log("AMG8833: I2C transaction ended");
    }
}
