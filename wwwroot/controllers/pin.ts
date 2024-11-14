import {AVRADC, AVRIOPort, PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export type PinListener = (state: PinState) => void;

export enum Port {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    J = "J",
    K = "K",
    L = "L",
    Null = "Null",
}

export class Pin {
    private readonly index: number;
    private readonly port: Port;
    private state: PinState;
    private isAnalog: boolean | AVRADC;
    private listener: PinListener = () => {
    };

    private get portMap(): Record<Port, null | AVRIOPort> {
        return {
            [Port.A]: AVRRunner.getInstance().portA,
            [Port.B]: AVRRunner.getInstance().portB,
            [Port.C]: AVRRunner.getInstance().portC,
            [Port.D]: AVRRunner.getInstance().portD,
            [Port.E]: AVRRunner.getInstance().portE,
            [Port.F]: AVRRunner.getInstance().portF,
            [Port.G]: AVRRunner.getInstance().portG,
            [Port.H]: AVRRunner.getInstance().portH,
            [Port.J]: AVRRunner.getInstance().portJ,
            [Port.K]: AVRRunner.getInstance().portK,
            [Port.L]: AVRRunner.getInstance().portL,
            [Port.Null]: null,
        };
    }

    // index is relative to the port
    constructor(index: number, port: Port) {
        this.index = index;
        this.port = port;
    }

    setup() {
        this.state = this.portMap[this.port]?.pinState(this.index);
        this.portMap[this.port]?.addListener(() => {
            let state = this.portMap[this.port].pinState(this.index);

            if (state !== this.state) {
                this.listener(state);
            }

            this.state = state;
        });
        this.isAnalog = this.port == Port.C;
    }

    getState() {
        return this.state;
    }

    setState(state: boolean) {
        this.portMap[this.port].setPin(this.index, state);
    }

    getAdcVoltage() {
        if (!this.isAnalog) {
            throw new Error("Tried to get analog voltage on a non analog port!");
        }
        return AVRRunner.getInstance().adc.channelValues[this.index];
    }

    setAdcVoltage(voltage: number) {
        if (!this.isAnalog) {
            throw new Error("Tried to set analog voltage on a non analog port!");
        }
        AVRRunner.getInstance().adc.channelValues[this.index] = voltage;
    }

    setListener(listener: PinListener) {
        this.listener = listener;
    }
}