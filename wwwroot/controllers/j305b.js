"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.J305B = void 0;
const controller_1 = require("./controller");
const execute_1 = require("@lib/execute");
class J305B extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this._cpm = 15;
        this.pulseIntervalCycles = 0;
        this.lastPulseTime = 0;
    }
    update(state) {
        if (state.cpm !== undefined) {
            this._cpm = Math.max(0, state.cpm);
            console.log("[J305B] CPM updated to:", this._cpm);
            this.recalculateInterval();
            this.lastPulseTime = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        }
    }
    setup() {
        console.log("[J305B] Setup complete, CPM:", this._cpm);
        this.recalculateInterval();
        this.lastPulseTime = execute_1.AVRRunner.getInstance().board.cpu.cycles;
        this.scheduleNextPulse();
    }
    recalculateInterval() {
        if (this._cpm <= 0) {
            this.pulseIntervalCycles = 0;
            return;
        }
        const pulsesPerSecond = this._cpm / 60.0;
        const secondsPerPulse = 1.0 / pulsesPerSecond;
        this.pulseIntervalCycles = Math.floor(secondsPerPulse * execute_1.AVRRunner.getInstance().board.cpu.frequency);
    }
    scheduleNextPulse() {
        if (this.pulseIntervalCycles <= 0) {
            console.log("[J305B] CPM is 0, no pulses scheduled");
            return;
        }
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            const currentCycles = execute_1.AVRRunner.getInstance().board.cpu.cycles;
            if (currentCycles - this.lastPulseTime > this.pulseIntervalCycles * 1.5) {
                this.lastPulseTime = currentCycles;
                this.scheduleNextPulse();
                return;
            }
            this.emitPulse();
            this.lastPulseTime = execute_1.AVRRunner.getInstance().board.cpu.cycles;
            this.scheduleNextPulse();
        }, this.pulseIntervalCycles);
    }
    emitPulse() {
        const vin = this.pins.vin[0].digital;
        vin.state = 0;
        execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
            vin.state = 1;
            execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                vin.state = 0;
            }, 100);
        }, 50);
    }
}
exports.J305B = J305B;
//# sourceMappingURL=j305b.js.map