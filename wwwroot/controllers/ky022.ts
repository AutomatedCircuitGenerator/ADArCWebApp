import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {CPU, Digital} from "../boards/board";

const ADDRESS = 0x10;

//NEC ir receiver
//https://techdocs.altium.com/display/FPGA/NEC+Infrared+Transmission+Protocol
export class KY022 extends Controller {
    private signal: Digital;
    private cpu: CPU;
    private counter: number;
    
    setup() {
        this.signal = this.pins.digital_out[0].digital;
        this.cpu = AVRRunner.getInstance().board.cpu;
        this.signal.state = true;
    }
    
    setCommand(command: number) {
        this.counter = 0;
        this.pulse(9);
        this.space(4.5);
        
        this.writeByte(ADDRESS);
        this.writeByte(this.invert(ADDRESS));
        this.writeByte(command);
        this.writeByte(this.invert(command));
        
        this.pulse(0.5625);
    }
    
    private writeByte(byte: number) {
        for (let i = 7; i >= 0; i--) {
            const bit = ((byte >> i) & 1) === 1;
            this.writeBit(bit);
        }
    }
    
    private writeBit(bit: boolean) {
        this.pulse(0.5625);
        
        if (bit) {
            this.space(1.6875);
        } else {
            this.space(0.5625);
        }
    }
    
    private pulse(ms: number) {
        if (this.counter === 0) {
            this.signal.state = false;
        } else {
            this.cpu.addClockEvent(() => {
                this.signal.state = false;
            }, this.counter);
        }
        this.counter += this.msToCycles(ms);
        this.cpu.addClockEvent(() => {
            this.signal.state = true;
        }, this.counter);
    }
    
    private space(ms: number) {
        this.counter += this.msToCycles(ms);
    }
    
    private invert(byte: number) {
        return ~byte & 0xFF;
    }
    
    private msToCycles(ms: number) {
        return ms * (this.cpu.frequency / 1000);
    }
}