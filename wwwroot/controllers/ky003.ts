import {Controller} from "@controllers/controller";

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
            isFieldDetected ? this.pins.digital_out[0].digital.state = true : this.pins.digital_out[0].digital.state = false;
    }
}