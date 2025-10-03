import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export class SRVPH extends Controller {
    
    private ph: number = 7.0;

    override update(state: Record<string, any>) {
        this.setph(state.ph);
    }

    setph(ph: number) {
        this.ph = ph
        this.pins.ADC[0].analog.voltage = this.phToVoltage(this.ph);
    }

    setup() {
        this.pins.ADC[0].analog.voltage = this.phToVoltage(this.ph);
    }

    /**
     * Converts from ph to voltage, 
     * following formula from https://files.atlas-scientific.com/Surveyor-pH-datasheet.pdf
     * @param ph
     */
    phToVoltage(ph: number) {
        return (ph - 15.509)/(-5.6548) 
    }
}