/**
 * a set of instructions for changing the pinstates of the arduino
 * 
 */
export class TimingPacket {
    public readonly originCycle: number;
    public readonly instructions: PinInstruction[];

    //I am fairly certain that this is skipped when deserializing from json, ignoring the sort.
    public constructor(originCycle: number, instructions: PinInstruction[]) {
        this.originCycle = originCycle;
        this.instructions = instructions.sort((a, b) => a.cyclesSinceOrigin - b.cyclesSinceOrigin);
    }

    /**
     * Sorts the instructions of a timing packet by invoking the constructor.
     * @param other the timingPacket to fix
     * @returns a fixed timing packet.
     */
    public static fix(other: TimingPacket): TimingPacket{
        return new TimingPacket(other.originCycle, other.instructions);
    }
}

/**
 * A representation of one instruction to the arduino. includes which pin to change, what to change it to, and when.
 */
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