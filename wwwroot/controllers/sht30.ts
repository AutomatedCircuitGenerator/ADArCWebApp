import {Controller} from "./controller";

export class SHT30 extends Controller {
    private humidity: number; // relative humidity, [0, 1]
    private temperature: number;
    
    setup() {
    }
    
    override update(state: Record<string, any>) {
        this.setHumidity(state.humidity);
        this.setTemperature(state.temperature);
    }
    
    setHumidity(humidity: number) {
    //     todo
    }
    
    setTemperature(temperature: number) {
        this.temperature = temperature;
        
    //     todo
    }
    
}