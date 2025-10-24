import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export class SEN0114 extends Controller {
    private humidity: number = 512;

    setup() {
        this.pins.analog_out[0].analog.voltage = this.humidityToVoltage(this.humidity);
    }

    override update(state: Record<string, any>) {
        this.setHumidity(state.humidity);
    }

    setHumidity(humidity: number) {
        // Convert to 0–5V
        this.humidity = this.humidityToVoltage(humidity)

        this.pins.analog_out[0].analog.voltage = this.humidity;
    }
    humidityToVoltage(humidity: number) {
        if (humidity < 0)
            humidity = 0;
        else if (humidity > 1024)
            humidity = 1024;
        
        return humidity * 5 / 1024;
    }
    
        
}