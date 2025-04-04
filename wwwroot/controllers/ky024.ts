import {Controller} from "./controller";

export class KY024 extends Controller {
    private gauss: number = 0; // Magnetic field strength in gauss
    private isInSimulation: boolean = false;
    private isMagneticFieldDetected: boolean = false;

    override update(state: Record<string, any>) {
        this.setGauss(state.gauss);
        this.setIsMagneticFieldDetected(Math.abs(state.gauss) > Number.EPSILON);
    }

    setGauss(gauss: number) {
        // Limit gauss input range
        if (gauss < -1000) {
            this.gauss = -1000;
        } else if (gauss > 1000) {
            this.gauss = 1000;
        } else {
            this.gauss = gauss;
        }
        if (this.isInSimulation) {
            this.gaussToVoltage(this.gauss);
        }
    }

    setIsMagneticFieldDetected(isMagneticFieldDetected: boolean) {
        // Simulate magnetic field detection with a digital output
        this.isMagneticFieldDetected = isMagneticFieldDetected;
        if (this.isInSimulation) {
            this.pins.digital_out[0].digital.state = this.isMagneticFieldDetected;
        }
    }

    setup() {
        this.isInSimulation = true;
        this.gaussToVoltage(this.gauss);
    }

    gaussToVoltage(gauss: number) {
        // Convert gauss to voltage based on mapping from -1000 (1.0V) to 1000 (4.0V)
        const V_OUT = 1.0 + ((gauss + 1000) / 2000) * 3.0;
        this.pins.analog_out[0].analog.voltage = V_OUT;
    }
}