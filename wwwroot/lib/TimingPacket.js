"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinInstruction = exports.TimingPacket = void 0;
class TimingPacket {
    constructor(originCycle, instructions) {
        this.originCycle = originCycle;
        this.instructions = instructions.sort((a, b) => a.cyclesSinceOrigin - b.cyclesSinceOrigin);
    }
    static fix(other) {
        return new TimingPacket(other.originCycle, other.instructions);
    }
}
exports.TimingPacket = TimingPacket;
class PinInstruction {
    constructor(isOn, pin, cumulUsSinceOriginCycle, cyclesSinceOrigin) {
        this.isOn = isOn;
        this.pin = pin;
        this.cumulUsSinceOriginCycle = cumulUsSinceOriginCycle;
        this.cyclesSinceOrigin = cyclesSinceOrigin;
    }
}
exports.PinInstruction = PinInstruction;
//# sourceMappingURL=TimingPacket.js.map