import {PinInstruction, TimingPacket} from "./TimingPacket";
import {
    avrInstruction,
    AVRTimer,
    CPU,
    AVRIOPort,
    portBConfig,
    portCConfig,
    portDConfig,
    AVRUSART,
    usart0Config,
    AVRTWI,
    twiConfig,
    AVRADC,
    adcConfig,
    AVRSPI,
    spiConfig,
    timer2Config,
    timer1Config,
    portAConfig,
    portEConfig,
    portFConfig,
    portGConfig,
    portHConfig,
    portJConfig,
    portKConfig, portLConfig
} from "./avr8js/index";
import {loadHex} from "./compile-util";
import {Controller} from "@controllers/controller";
import {timer0Config} from "@lib/avr8js/peripherals/timer-atmega2560";

export enum Board {
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

    board = Board.ArduinoUno;

    program = new Uint16Array(this.board == Board.ArduinoUno ? 0x8000 : 0x40000);
    cpu: CPU;
    timer0: AVRTimer;
    timer1: AVRTimer;
    timer2: AVRTimer;
    portA: AVRIOPort;
    portB: AVRIOPort;
    portC: AVRIOPort;
    portD: AVRIOPort;
    portE: AVRIOPort;
    portF: AVRIOPort;
    portG: AVRIOPort;
    portH: AVRIOPort;
    portJ: AVRIOPort;
    portK: AVRIOPort;
    portL: AVRIOPort;
    usart: AVRUSART;
    twi: AVRTWI;
    spi: AVRSPI;
    adc: AVRADC;
    MHZ = 16e6;

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
        loadHex(hex, new Uint8Array(this.program.buffer));
        this.cpu = this.board == Board.ArduinoUno ? new CPU(this.program) : new CPU(this.program, 0x2200);
        this.timer0 = new AVRTimer(this.cpu, timer0Config);
        // this.timer1 = new AVRTimer(this.cpu, timer1Config);
        // this.timer2 = new AVRTimer(this.cpu, timer2Config);
        this.portA = new AVRIOPort(this.cpu, portAConfig);
        this.portB = new AVRIOPort(this.cpu, portBConfig);
        this.portC = new AVRIOPort(this.cpu, portCConfig);
        this.portD = new AVRIOPort(this.cpu, portDConfig);
        this.portE = new AVRIOPort(this.cpu, portEConfig);
        this.portF = new AVRIOPort(this.cpu, portFConfig);
        this.portG = new AVRIOPort(this.cpu, portGConfig);
        this.portH = new AVRIOPort(this.cpu, portHConfig);
        this.portJ = new AVRIOPort(this.cpu, portJConfig);
        this.portK = new AVRIOPort(this.cpu, portKConfig);
        this.portL = new AVRIOPort(this.cpu, portLConfig);
        
        for (const controller of this.controllers) {
            controller.init();
        }
    }

    async execute(callback: (cpu: CPU) => void) {
        this.stopped = false;
        for (; ;) {
            if (this.pausedOn.length == 0) {//do not tick if waiting for a response. Essentially stops arduino time
                //do instruction and update cycles
                avrInstruction(this.cpu);
                this.cpu.tick();
            } else {
                //release thread while waiting for instructions
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            let markDel: TimingPacket[] = [];//setup deletion list

            //check each active instruction and see if their next instruction can be executed.
            this.instructions.forEach(t => {
                var next = t.instructions[0];//get next instruction. 
                if (this.cpu.cycles >= t.originCycle + next.cyclesSinceOrigin) {

                    t.instructions.shift();//removes 'next' (first element)
                    if (t.instructions.length === 0) {
                        markDel.push(t);            //if packet empty(no instructions left), mark it for deletion
                    }                               //(avoids concurrent modification exception)

                    //modify pins
                    if (next.pin < 8) {
                        this.portD.setPin(next.pin, next.isOn);
                    } else if (next.pin < 14) {
                        this.portB.setPin(next.pin - 8, next.isOn);
                        //console.log("theoretical state of 13: " + this.portB.pinState(5));
                        //console.log("Execution cycle: " + this.cpu.cycles + " set to: " + next.isOn);
                    } else if (next.pin < 20) {
                        this.portC.setPin(next.pin - 14, next.isOn);
                    }
                }
            });
            //finish removal of empty packets, do not check empty timing packets
            this.instructions = this.instructions.filter(i => !markDel.includes(i));

            //proceed with standard cpu loop
            if (this.cpu.cycles % 50000 === 0) {
                callback(this.cpu);
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
