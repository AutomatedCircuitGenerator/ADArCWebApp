import {Controller} from "@controllers/controller";
import {Digital} from "../boards/board";
import {PinState} from "@lib/avr8js";

export class HX711 extends Controller {
    private clock?: Digital;
    private data?: Digital;
    private weight = 100;
    private bitIndex = 23;
    
    setup(): void {
        this.data = this.pins.dat[0].digital;
        this.clock = this.pins.clk[0].digital;
        this.bitIndex = 23;
        
        this.clock.addListener((state: PinState) => this.handleClock(state))
    }
    
    setWeight(weight: number) {
        this.weight = weight;
    }
    private handleClock(state: PinState) {
        if (state === PinState.Low) {
            this.data.state = ((this.weight >> this.bitIndex) & 1) === 1;
            this.bitIndex--;

            if (this.bitIndex < 0) {
                this.bitIndex = 24;
            }

        }
    }
}