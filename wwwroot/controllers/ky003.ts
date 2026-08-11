import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";

export class KY003 extends Controller {
    private isFieldDetected = false;

    setup() {
        this.setFieldDetected(this.isFieldDetected);
    }
    
    override update(state: Record<string, any>) {
        this.setFieldDetected(state.magfield === "Detected");
    }

    setFieldDetected(isFieldDetected: boolean) {
        this.isFieldDetected = isFieldDetected;
        if (this.pins.digital_out)
            this.pins.digital_out[0].digital.state = isFieldDetected ? PinState.High : PinState.Low;
    }
}