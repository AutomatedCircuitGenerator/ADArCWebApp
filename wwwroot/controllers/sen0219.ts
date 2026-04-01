import { Controller } from "@controllers/controller";
import { AVRRunner } from "@lib/execute";

export class SEN0219 extends Controller {

    private _co2: number = 400; // default starting CO2 ppm
    private inSimulation: boolean = false;

    override update(state: Record<string, any>) {
        if (state.co2 !== undefined) {
            this.setCO2(state.co2);
        }
    }

    setCO2(co2: number) {
        // Clamp to realistic range
        if (co2 < 0) co2 = 0;
        if (co2 > 5000) co2 = 5000;

        this._co2 = co2;

        if (!this.inSimulation) return;

        // Convert ppm to voltage (0–5V)
        const voltage = this._co2 * 5 / 5000;

        // Write to analog_out pin
        const analogPin = this.pins?.analog_out?.[0]?.analog;
        if (analogPin) {
            analogPin.voltage = voltage;
        }
    }

    setup() {
        if (this.inSimulation) return;
        this.inSimulation = true;

        // Initialize output voltage
        const initial = this._co2 * 5 / 5000;
        const analogPin = this.pins?.analog_out?.[0]?.analog;
        if (analogPin) {
            analogPin.voltage = initial;
        }

        // Schedule periodic serial output
        this.scheduleSerialOutput();
    }

    private scheduleSerialOutput() {
        const sendOutput = () => {
            this.sendSerialOutput();
            AVRRunner.getInstance().board.cpu.addClockEvent(sendOutput, 500000);
        };
        AVRRunner.getInstance().board.cpu.addClockEvent(sendOutput, 500000);
    }

    private sendSerialOutput() {
        const uart = AVRRunner.getInstance().board.usarts[0];
        if (!uart) {
            console.error("[CO2 Sensor] UART not available");
            return;
        }

        const message = `co2 = ${this._co2}\n`;
        const usToCycles = (us: number) => AVRRunner.getInstance().usToCycles(us);
        let cumulativeCycles = 0;

        for (let i = 0; i < message.length; i++) {
            const byte = message.charCodeAt(i);

            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                uart.writeByte(byte, true);
            }, cumulativeCycles);

            cumulativeCycles += usToCycles(1200);
        }

        console.log(`[CO2 Sensor] CO2: ${this._co2} ppm`);
    }
}