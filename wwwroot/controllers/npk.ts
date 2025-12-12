import {Controller} from "./controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class NPK extends Controller {

    private _n: number = 0;
    private _p: number = 0;
    private _k: number = 0;

    override update(state: Record<string, any>) {
        if (state.nitrogen !== undefined)  this._n = state.nitrogen;
        if (state.phosphorus !== undefined) this._p = state.phosphorus;
        if (state.potassium !== undefined)  this._k = state.potassium;
    }

    setup() {
        // Periodically simulate sending a Modbus-style response
        AVRRunner.getInstance().board.cpu.addClockEvent(() => this.sendPacket(), 500000);
    }

    private sendPacket() {
        // RO line is incoming to MCU — must check if receiver enabled
        const reEnabled = this.pins.RE[0].digital.state == PinState.Low;
        const deDisabled = this.pins.DE[0].digital.state == PinState.Low;

        if (!reEnabled || !deDisabled) {
            return; // Receiver not active
        }

        const response = this.buildPacket();
        const uart = AVRRunner.getInstance().board.usarts[0];

        for (const byte of response) {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                uart?.writeByte(byte,true);
            }, 2000);
        }
    }

    private buildPacket(): number[] {
        // Modbus response: ID 0x01, function 0x03, byte count 0x06, then N,P,K (2 bytes each)
        return [
            0x01, 0x03, 0x06,
            (this._n >> 8) & 0xFF, this._n & 0xFF,
            (this._p >> 8) & 0xFF, this._p & 0xFF,
            (this._k >> 8) & 0xFF, this._k & 0xFF,
            0x00, 0x00 // CRC placeholder (not needed for simulation)
        ];
    }
}
