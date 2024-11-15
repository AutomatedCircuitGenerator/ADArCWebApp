import {TimingPacket} from "./TimingPacket";
import {loadHex} from "./compile-util";
import {Controller} from "@controllers/controller";
import {Board, BoardConstructor, CPU} from "../boards/board";
import {ArduinoUno} from "../boards/arduino-uno/arduino-uno";

export enum BoardType {
    ArduinoUno,
    ArduinoMega,
}

/**
 *
 * This is mostly taken from the examples provided on the avr8js github
 * In general, it provides utilities related to working with the Arduino CPU.
 */
export class AVRRunner {
    private static _instance: AVRRunner | null = null;
    boardConstructor: BoardConstructor = ArduinoUno;
    board: Board;

    public instructions: TimingPacket[] = [];
    public pausedOn: number[] = [];

    private stopped = false;

    // list of component controllers
    private controllers: Controller[] = [];

    // singleton, so constructor is private
    private constructor() {
    }

    // get the one and only global copy of AVRRunner
    static getInstance() {
        if (!AVRRunner._instance) {
            AVRRunner._instance = new AVRRunner();
        }
        return AVRRunner._instance;
    }

    addController(controller: Controller) {
        this.controllers.push(controller);
    }

    removeController(controller: Controller) {
        this.controllers = this.controllers.filter(c => c !== controller);
    }

    async loadProgram(hex: string) {
        const program = new Uint16Array(0x8000);
        loadHex(hex, new Uint8Array(program.buffer));
        this.board = new this.boardConstructor(program);
        
        for (const controller of this.controllers) {
            controller.init();
        }
    }

    async execute(callback: (cpu: CPU) => void) {
        this.stopped = false;
        for (; ;) {
            if (this.pausedOn.length == 0) {//do not tick if waiting for a response. Essentially stops arduino time
                //do instruction and update cycles
                this.board.cpu.clock();
            } else {
                //release thread while waiting for instructions
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            //proceed with standard cpu loop
            if (this.board.cpu.cycles % 50000 === 0) {
                callback(this.board.cpu);
                await new Promise(resolve => setTimeout(resolve, 0));
                if (this.stopped) {
                    break;
                }
            }
        }
    }

    stop() {
        this.stopped = true;

        for (const controller of this.controllers) {
            controller.cleanup();
        }
    }
}
