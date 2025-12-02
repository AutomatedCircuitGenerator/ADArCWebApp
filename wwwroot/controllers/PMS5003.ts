import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class PMS5003 extends Controller {
    private pm25: number = 42.0;   // arbitrary default value
    private pm10: number = 84.0;   // arbitrary default value

    override update(state: Record<string, any>) {
        if (state.pm25 !== undefined) this.pm25 = state.pm25;
        if (state.pm10 !== undefined) this.pm10 = state.pm10;
    }

    setup() {
        this.scheduleNextReading();
    }

    private scheduleNextReading() {
        const cpu = AVRRunner.getInstance().board.cpu;

        cpu.addClockEvent(() => {
            this.printReading();
            this.scheduleNextReading();
        }, 200_000); // ~200ms
    }

    private printReading() {
        const usart0 = AVRRunner.getInstance().board.usarts[0];
        const text =
            `[PMS5003] PM2.5: ${this.pm25} µg/m3, PM10: ${this.pm10} µg/m3\n`;

        for (const c of text) {
            usart0.writeByte(c.charCodeAt(0), true);
        }
    }
}
