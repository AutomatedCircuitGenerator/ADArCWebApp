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
    private readonly index: number; // Pin # on Arduino
    private readonly port: Port;    // Which port (B,C,D) on Arduino
    private state: PinState         // Current pin state
    private listener: PinListener = () => {};  

    // Gets AVR port pin belongs to
    private get portMap(): Record<Port, null | AVRIOPort> {
        return {
            [Port.B]: AVRRunner.getInstance().portB, // Digital Pins 8-13
            [Port.C]: AVRRunner.getInstance().portC, // Analog Pins
            [Port.D]: AVRRunner.getInstance().portD, // Digital Pins 0-7
            [Port.Null]: null,
        };
    }
    
    constructor(index: number, port: Port) {
        this.index = index;
        this.port = port;
    }
    
    // Called when pin state changes
    setup() {
        // Get initial state
        this.state = this.portMap[this.port]?.pinState(this.index);
        
        // Add listener for changes
        this.portMap[this.port]?.addListener(() => {
            let state = this.portMap[this.port].pinState(this.index);

            if (state !== this.state) {
                this.listener(state); // Call listener if state changed
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