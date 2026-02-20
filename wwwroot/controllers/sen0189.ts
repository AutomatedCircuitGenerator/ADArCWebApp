import {Controller} from "@controllers/controller";
export class SEN0189 extends Controller {
    
    private turbidity: number = 0;
    private inSimulation: boolean;

    override update(state: Record<string, any>) {
        this.setturbidity(state.turbidity);
        console.log("STATE RECEIVED:", state);
    }
    
    setturbidity(turbidity: number) {

        console.log("SET TURBIDITY CALLED:", turbidity);
        
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

        console.log("SETTING VOLTAGE:", this.turbidityToVoltage(this.turbidity));
        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }

    setup() {
        this.inSimulation = true;
        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }
    
    turbidityToVoltage(turbidity: number){
        let a = -1120.4;
        let b = 5742.3;
        let c = -4352.9 - turbidity;

        let discriminant = (b * b) - (4 * a * c);

        if (discriminant < 0) {
            return 0;
        }

        let sqrtDisc = Math.sqrt(discriminant);

        let v1 = (-b + sqrtDisc) / (2 * a);
        let v2 = (-b - sqrtDisc) / (2 * a);

        // choose the larger (physical) root
        let voltage = Math.max(v1, v2);

        // clamp to Arduino range
        if (voltage < 0) voltage = 0;
        if (voltage > 5) voltage = 5;

        return voltage;
    }
}
