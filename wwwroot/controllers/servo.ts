import {Controller} from "@controllers/controller";
import {Pin} from "./pin";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export class Servo extends Controller {
    private signal?: Pin;
    private risingEdgeCycle?: number;
    private fallingEdgeCycle?: number;
    
    setup(): void {
        this.signal = this.pins.orange[0];
        this.signal?.setListener(this.onSignalChange);
    }
    
    private onSignalChange(state: PinState) {
        const previousState = this.signal?.getState();
        
        if (previousState === PinState.Low && state == PinState.High) {
            this.risingEdgeCycle = AVRRunner.getInstance().cpu.cycles;
        } else if (previousState === PinState.High && state == PinState.Low) {
            this.fallingEdgeCycle = AVRRunner.getInstance().cpu.cycles;
        }
        
        
    }
}