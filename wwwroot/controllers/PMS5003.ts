import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class PMS5003 extends Controller {
    private pm25: number = 42.0;   // default value
    private pm10: number = 84.0;   // default value

    override update(state: Record<string, any>) {
        // Update internal state from Razor component or other sources
        if (state.pm25 !== undefined) this.pm25 = state.pm25;
        if (state.pm10 !== undefined) this.pm10 = state.pm10;
    }

    setup() {
        this.startStreaming();
    }

    private startStreaming() {
        const cpu = AVRRunner.getInstance().board.cpu;

        // Schedule repeated readings every ~200ms (matches codeForGen delay)
        cpu.addClockEvent(() => {
            this.printReading();
            this.startStreaming();  // Reschedule for next update
        }, 200_000); // 200ms equivalent
    }

    private printReading() {
        const usart0 = AVRRunner.getInstance().board.usarts[0];

        // Add small random fluctuation to simulate real sensor
        const pm25Fluct = this.pm25 + Math.floor(Math.random() * 5) - 2; // ±2
        const pm10Fluct = this.pm10 + Math.floor(Math.random() * 9) - 4; // ±4

        const text = `[PMS5003] PM2.5: ${pm25Fluct} µg/m3, PM10: ${pm10Fluct} µg/m3\n`;

        // Write each character to USART
        for (const c of text) {
            usart0.writeByte(c.charCodeAt(0), true);
        }
    }
}
