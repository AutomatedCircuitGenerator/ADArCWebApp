import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export class HCSR501 extends Controller {
    private isMotionDetected: boolean;
    setIsMotionDetected = (isMotionDetected: number) => {
        this.isMotionDetected = isMotionDetected > 0;
    }

    setup() {
    }

    cleanup() {
    }

}