export class TimingPacket {
    public readonly originCycle: number;
    public readonly instructions: PinInstruction[];

    public constructor(originCycle: number, instructions: PinInstruction[]) {
        this.originCycle = originCycle;
        this.instructions = instructions.sort((a, b) => a.cyclesSinceOrigin - b.cyclesSinceOrigin);
    }

    public static fix(other: TimingPacket): TimingPacket{
        return new TimingPacket(other.originCycle, other.instructions);
    }
}

export class PinInstruction {
    public readonly isOn: boolean;
    public readonly pin: number;
    public readonly cumulUsSinceOriginCycle: number;
    public readonly cyclesSinceOrigin: number;

    public constructor(isOn: boolean, pin: number, cumulUsSinceOriginCycle: number, cyclesSinceOrigin: number) {
        this.isOn = isOn;
        this.pin = pin;
        this.cumulUsSinceOriginCycle = cumulUsSinceOriginCycle;
        this.cyclesSinceOrigin = cyclesSinceOrigin;
    }
}