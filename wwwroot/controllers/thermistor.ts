import {Controller} from "./controller";

export class Thermistor extends Controller {
    
    private Temperature: number = 70;
    private referenceResistance = 10000.0;
    private nominalTemperature = 25.0;
    private betaCoefficient = 3950.0;
    private seriesResistor = 10000.0;
    
    private isInSimulation: boolean = false;

    override update(state: Record<string, any>) {
        if (state.temperature !== undefined) {
            this.setTemperature(Number(state.temperature));
        }
    }

    setTemperature(temperature: number) {
        if (Number.isNaN(temperature)) return;
        this.Temperature = Math.min(150, Math.max(-50, temperature));
        if (this.isInSimulation) {
            this.temperatureToVoltage(this.Temperature);
        }
    }

    setup() {
        this.isInSimulation = true;
        this.temperatureToVoltage(this.Temperature);
    }

    temperatureToVoltage(temperature: number) {
        this.Temperature = temperature;
        let tempK = this.Temperature + 273.15;
        
        let thermistorResistance = this.referenceResistance * Math.exp((this.betaCoefficient / tempK) 
        - (this.betaCoefficient / (this.nominalTemperature + 273.15)));
        
        let voltage = this.seriesResistor * 5.0 / (thermistorResistance + this.seriesResistor);
        
        if (this.pins.sig?.[0]?.analog) {
            this.pins.sig[0].analog.voltage = voltage;
        }
    }
}