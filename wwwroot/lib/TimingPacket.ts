export class TimingPacket {
    public readonly originCycle: number;
    public readonly instructions: PinInstruction[];

    public constructor(originCycle: number, instructions: PinInstruction[]) {
        this.originCycle = originCycle;
        this.instructions = instructions;
    }
}

export class PinInstruction {
    public readonly IsOn: boolean;
    public readonly pin: number;
    public readonly cumulUsSinceOriginCycle: number;
    public readonly cyclesSinceOrigin: number;

    public constructor(IsOn: boolean, pin: number, cumulUsSinceOriginCycle: number, cyclesSinceOrigin: number) {
        this.IsOn = IsOn;
        this.pin = pin;
        this.cumulUsSinceOriginCycle = cumulUsSinceOriginCycle;
        this.cyclesSinceOrigin = cyclesSinceOrigin;
    }
}