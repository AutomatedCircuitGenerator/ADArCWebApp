import {Controller} from "@controllers/controller";
export class SEN0189 extends Controller {
    
    private turbidity: number = 0;
    private inSimulation: boolean;

    override update(state: Record<string, any>) {
        this.setturbidity(state.turbidity);
    }
    
    setturbidity(turbidity: number) {
        
        // Clamp turbidity, sensor's range is only 0-3000
        if (turbidity < 0)
            this.turbidity = 0;
        else if (turbidity > 3000)
            this.turbidity = 3000;
        else
            this.turbidity = turbidity;

        if (!this.inSimulation) {
            return; 
        }

        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }

    setup() {
        this.inSimulation = true;
        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }
    
    turbidityToVoltage(turbidity: number){
        let discriminant = (5742.3 * 5742.3) -
            (4 * -1120.4 * (4352.9 - turbidity));

        if (discriminant < 0) {
            return 0;
        }

        let sqrtDisc = Math.sqrt(discriminant);

        let v1 = (-5742.3 + sqrtDisc) / (2 * -1120.4);
        let v2 = (-5742.3 - sqrtDisc) / (2 * -1120.4);

        // choose the voltage in a valid range (adjust if needed)
        let voltage = Math.max(v1, v2);
        return voltage;
    }
}
