import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export class SEN0129 extends Controller {

    private _co2 = 400; // starting CO2 ppm value

    override update(state: Record<string, any>) {
        if (state.co2 !== undefined) {
            this._co2 = state.co2;
        }
    }

    private readingScheduled = false;

    setup() {
        if (this.readingScheduled) return;
        this.readingScheduled = true;

        const updateReading = () => {
            console.log(`[CO2 Sensor] CO2: ${this._co2} ppm`);
            AVRRunner.getInstance().board.cpu.addClockEvent(() => updateReading(), 500000);
        };
        updateReading();
    }

}
