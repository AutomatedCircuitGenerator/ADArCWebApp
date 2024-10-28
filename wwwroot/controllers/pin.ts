import {AVRIOPort, PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

export type PinListener = (state: PinState) => void;

export enum Port {
    B = "B",
    C = "C",
    D = "D",
    Null = "Null",
}

export class Pin {
    private readonly index: number;
    private readonly port: Port;
    private state: PinState
    private listener: PinListener = () => {};

    private get portMap(): Record<Port, null | AVRIOPort> {
        return {
            [Port.B]: AVRRunner.getInstance().portB,
            [Port.C]: AVRRunner.getInstance().portC,
            [Port.D]: AVRRunner.getInstance().portD,
            [Port.Null]: null,
        };
    }
    
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
    }
    
    getState() {
        return this.state;
    }
    
    setListener(listener: PinListener) {
        this.listener = listener;
    }
}