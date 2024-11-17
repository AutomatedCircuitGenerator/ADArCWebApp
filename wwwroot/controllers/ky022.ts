import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";


//NEC ir receiver
export class KY022 extends Controller {
    private address: number;
    private invAddress: number;
    private command: number;
    private invCommand: number;

    private inSimulation: boolean;
    //todo make sure to but this false
    private inTransfer: boolean;
    // LSB is first
    // a 9ms leading pulse burst (16 times the pulse burst length used for a logical data bit)
    // a 4.5ms space
    // the 8-bit address for the receiving device
    // the 8-bit logical inverse of the address
    // the 8-bit command
    // the 8-bit logical inverse of the command
    // a final 562.5µs pulse burst to signify the end of message transmission.

    setup() {
        //default shtuff
        this.setNecAddress(0);
        this.setNecCommand(0);
        this.inSimulation = true;
    }

    setNecAddress(address: number) {
        this.address = address & 0xFF;
        this.invAddress = (~address) & 0xFF;
        if (!this.inSimulation) return;
        // hope they don't click again this button within 68 ms. could have some semaphore or async retry to always send data
        // but yeaaaaaa no.
        if (this.inTransfer) return;
        this.inTransfer = true;
        this.sendNecFrame();
    }

    setNecCommand(command: number) {
        this.command = command & 0xFF;
        this.invCommand = (~command) & 0xFF;
        if (!this.inSimulation) return;
        // hope they don't click again this button within 68 ms. could have some semaphore or async retry to always send data
        // but yeaaaaaa no.
        if (this.inTransfer) return;
        this.inTransfer = true;
        this.sendNecFrame();
    }

    sendNecFrame() {
        //start preamble
        this.pins.digital_out[0].setState(true);
        AVRRunner.getInstance().cpu.addClockEvent(() => this.endPreamble(), AVRRunner.getInstance().usToCycles(9000));
    }

    endPreamble() {
        this.pins.digital_out[0].setState(false);
        (async () => {
            await this.sleep(AVRRunner.getInstance().usToCycles(4500));
        })();


        const frame = this.encodeNECFrame();
        AVRRunner.getInstance().cpu.addClockEvent(() => this.startDataTransfer(frame), 0);//check if 1 works better
    }

    startDataTransfer(frame: string[]) {
        for (const bit in frame) {
            if (bit === "1") {
                this.pins.digital_out[0].setState(true);
                AVRRunner.getInstance().cpu.addClockEvent(() => this.pins.digital[0].setstart(object[0]), 562.5);//check if 1 works better
                (async () => {
                    await this.sleep(AVRRunner.getInstance().usToCycles(1687.5 + 562.5));
                })();
            } else {
                this.pins.digital_out[0].setState(true);
                AVRRunner.getInstance().cpu.addClockEvent(() => this.startDataTransfer(frame), 562.5);//check if 1 works better
                (async () => {
                    await this.sleep(AVRRunner.getInstance().usToCycles(562.5 + 562.5));
                })();
            }
        }
    }

    encodeNECFrame() {
        // Create the data portion of the nec frame. does not include information for preamble and end
        let frame: string[] = [];

        this.encodeBinary(frame, this.address);
        this.encodeBinary(frame, this.invAddress);

        this.encodeBinary(frame, this.command);
        this.encodeBinary(frame, this.invCommand);

        return frame;
    }

    encodeBinary(frame: string[], byte: number) {
        for (let i = 7; i >= 0; i--) {
            const bit = (byte >> i) & 1;
            if (bit === 1) {
                frame.push("1");
            } else {
                frame.push("0");
            }
        }
    }
}