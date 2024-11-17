import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

export class HCSR501 extends Controller {
    private isMotionDetected: boolean;
    private isInTimeWindow: boolean;
    //false is do not retrigger timeout. true means retrigger timeout
    private triggerMode: boolean;
    private timeDelaySeconds: number;
    private motionTimeoutId: number;
    private isInSimulation: boolean = false;

    setIsMotionDetected = (isMotionDetected: number) => {
        this.isMotionDetected = isMotionDetected > 0;
        if (this.isInSimulation && this.isMotionDetected) {
            this.detectMotion();
        }
    }
    //trigger mode of 0 starts a timer that will always expire in `timedelayseconds`. Timer mode of 1 will reset the time
    //out time and "retrigger" the timer to extend it by timedeelay seconds
    setTriggerMode = (triggerMode: number) => {
        this.triggerMode = triggerMode > 0;
        //The commented out code is probably needed to make the simulation continue cleanly if the trigger mode and delay secs
        //are messed with during a time window...
        // this.cleanup()
    }
    setTimeDelaySeconds = (timeDelaySeconds: number) => {
        this.timeDelaySeconds = timeDelaySeconds;
        // this.cleanup()
    }

    setup() {
        clearTimeout(this.motionTimeoutId);
        // this.triggerMode = false;
        this.isInTimeWindow = false;
        // this.isMotionDetected = false;
        this.isInSimulation = true;
        console.log("setup");
    }


    override cleanup() {
        clearTimeout(this.motionTimeoutId);
    }

    detectMotion() {
        if (this.triggerMode) {
            if (!this.isInTimeWindow) {
                //if we are starting a new time window. Easy to think of this as just the other mode
                this.pins.digital_out[0].setState(true);
                this.isInTimeWindow = true;
                this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].setState(false);
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                    //not sure if this matters
                }, this.timeDelaySeconds * 1000)
            } else {
                //if we are in the previous time window and get triggered again
                clearTimeout(this.motionTimeoutId);
                this.motionTimeoutId = this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].setState(false);
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                    //not sure if this matters
                }, this.timeDelaySeconds * 1000);
            }
        } else {
            //works
            if (this.isInTimeWindow) {
                return
            } else {
                this.isInTimeWindow = true;
                this.pins.digital_out[0].setState(true);
                this.motionTimeoutId = setTimeout(() => {
                    this.pins.digital_out[0].setState(false);
                    this.isMotionDetected = false;
                    this.isInTimeWindow = false;
                    this.motionTimeoutId = 0;
                    //not sure if this matters
                }, this.timeDelaySeconds * 1000)
            }
        }
    }
}