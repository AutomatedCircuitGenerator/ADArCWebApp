import {Controller} from "@controllers/controller";

export class KY003 extends Controller {
    private inSimulation: boolean;

    setup() {
        this.inSimulation = true
    }

    setFieldDetected(isFieldDetected: boolean) {
        if (!this.inSimulation) return;
        isFieldDetected ? this.pins.digital_out[0].setState(true) : this.pins.digital_out[0].setState(false);
    }
}