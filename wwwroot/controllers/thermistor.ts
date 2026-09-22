import {Controller} from "./controller";

export class Thermistor extends Controller {
    
    private Temperature: number = 35;
    private referenceResistance = 10000.0;
    private nominalTemperature = 25.0;
    private betaCoefficient = 3950.0;
    private seriesResistor = 10000.0;
    
    private isInSimulation: boolean = false;

    override update(state: Record<string, any>) {
        this.setTemperature(state.Temperature);
    }

    setTemperature(temperature: number) {
        //this should be done somewhere else, but done here as last defence to not bork things
        if (temperature < 30) {
            this.Temperature = 30;
        } else if (temperature > 120) {
            this.Temperature = 120;
        } else {
            this.Temperature = temperature;
        }
        if (this.isInSimulation) {
            this.temperatureToVoltage(temperature);
        }
    }

    setup() {
        this.isInSimulation = true;
        this.temperatureToVoltage(this.Temperature);
    }

    // See: https://docs.wokwi.com/parts/wokwi-photoresistor-sensor/
    temperatureToVoltage(lux: number) {
        
        let tempK = this.Temperature + 273.15;
        
        let thermistorResistance = Math.pow(10, ( (this.betaCoefficient / tempK) 
        - (this.betaCoefficient / (this.nominalTemperature + 273.15))));
        
        let voltage = this.seriesResistor * 5.0 / (thermistorResistance + this.seriesResistor)
        
        let analogValue = voltage * (1023.0 / 5.0);
        
        this.pins.analog_out[0].analog.voltage = analogValue;
    }
}