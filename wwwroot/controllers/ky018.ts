import {Controller} from "./controller";

export class KY018 extends Controller {
    //if using this part as adc example, be aware that you can mess with the onAdcRead callback if you have a more 
    // complicated part
    private lux: number = 100;
    private GAMMA = .7;
    private RL10 = 50000;
    private R_FIXED = 10000;
    private isInSimulation: boolean = false;

    setLux(lux: number) {
        //this should be done somewhere else, but done here as last defence to not bork things
        if (lux < .1) {
            this.lux = .1;
        } else if (lux > 100000) {
            this.lux = 100000;
        } else {
            this.lux = lux;
        }
        if (this.isInSimulation) {
            this.luxToVoltage(lux);
        }
    }

    setup() {
        this.isInSimulation = true;
        this.luxToVoltage(this.lux);
    }

    // See: https://docs.wokwi.com/parts/wokwi-photoresistor-sensor/
    luxToVoltage(lux: number) {
        //V_out = V_in * [(R_photo)/(R_photo+R_fixed)]
        //V_out = 5 * [(R_photo)/(R_photo+10,000)]
        // Where R_photo = (R_10 * 10^Gamma)/lux^Gamma
        // R_10 and Gamma are properties of the LDR on the ky018. Honestly, these are just good guesses without knowing the SKU
        const R_PHOTO = (this.RL10 * Math.pow(10, this.GAMMA)) / Math.pow(lux, this.GAMMA);
        const V_OUT = 5 * (R_PHOTO / (R_PHOTO + this.R_FIXED));
        this.pins.analog_out[0].analog.setVoltage(V_OUT);
    }
}
