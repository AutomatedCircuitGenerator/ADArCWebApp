"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVRClock = exports.clockConfig = void 0;
const CLKPCE = 128;
exports.clockConfig = {
    CLKPR: 0x61,
};
const prescalers = [
    1, 2, 4, 8, 16, 32, 64, 128, 256,
    2, 4, 8, 16, 32, 64, 128,
];
class AVRClock {
    constructor(cpu, baseFreqHz, config = exports.clockConfig) {
        this.cpu = cpu;
        this.baseFreqHz = baseFreqHz;
        this.config = config;
        this.clockEnabledCycles = 0;
        this.prescalerValue = 1;
        this.cyclesDelta = 0;
        this.cpu.writeHooks[this.config.CLKPR] = (clkpr) => {
            if ((!this.clockEnabledCycles || this.clockEnabledCycles < cpu.cycles) && clkpr === CLKPCE) {
                this.clockEnabledCycles = this.cpu.cycles + 4;
            }
            else if (this.clockEnabledCycles && this.clockEnabledCycles >= cpu.cycles) {
                this.clockEnabledCycles = 0;
                const index = clkpr & 0xf;
                const oldPrescaler = this.prescalerValue;
                this.prescalerValue = prescalers[index];
                this.cpu.data[this.config.CLKPR] = index;
                if (oldPrescaler !== this.prescalerValue) {
                    this.cyclesDelta =
                        (cpu.cycles + this.cyclesDelta) * (oldPrescaler / this.prescalerValue) - cpu.cycles;
                }
            }
            return true;
        };
    }
    get frequency() {
        return this.baseFreqHz / this.prescalerValue;
    }
    get prescaler() {
        return this.prescalerValue;
    }
    get timeNanos() {
        return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e9;
    }
    get timeMicros() {
        return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e6;
    }
    get timeMillis() {
        return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e3;
    }
}
exports.AVRClock = AVRClock;
//# sourceMappingURL=clock.js.map