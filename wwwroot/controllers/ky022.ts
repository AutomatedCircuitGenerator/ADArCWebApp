import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";


//NEC ir receiver
//https://techdocs.altium.com/display/FPGA/NEC+Infrared+Transmission+Protocol
export class KY022 extends Controller {
    private address: number;
    private invAddress: number;
    private command: number;
    private invCommand: number;

    private inSimulation: boolean = false;
    //todo make sure to but this false
    private inTransfer: boolean = false;
    // LSB is first
    // a 9ms leading pulse burst (16 times the pulse burst length used for a logical data bit)
    // a 4.5ms space
    // the 8-bit address for the receiving device
    // the 8-bit logical inverse of the address
    // the 8-bit command
    // the 8-bit logical inverse of the command
    // a final 562.5µs pulse burst to signify the end of message transmission.

    setup() {
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
        const frame: { state: boolean, us: number }[] = this.encodeNecFrame();
        let count: number = 0;
        for (const packet of frame) {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                console.log("previous state:", this.pins.digital_out[0].digital.state);
                console.log("desired state:", packet.state);
                this.pins.digital_out[0].digital.state = packet.state;
                console.log("current state:", this.pins.digital_out[0].digital.state);
                console.log("current cycle:", AVRRunner.getInstance().board.cpu.cycles);
            }, AVRRunner.getInstance().usToCycles(packet.us));
            count += packet.us;
        }
        this.inTransfer = false;
    }

    encodeNecFrame() {
        let frame: { state: boolean, us: number }[] = [];

        // NEC preamble
        frame.push({state: true, us: 9000});
        frame.push({state: false, us: 4500});
        this.packNecFrame(frame, this.address);
        this.packNecFrame(frame, this.invAddress);

        this.packNecFrame(frame, this.command);
        this.packNecFrame(frame, this.invCommand);
        // NEC end transmission
        frame.push({state: true, us: 565.5});
        frame.push({state: false, us: 0});

        return frame;
    }

    /**
     * push bits from `byte` in LSB ordering into passed-in `frame`
     * @param frame - continuous data frame
     * @param byte - number to pack into frame
     */
    packNecFrame(frame: { state: boolean, us: number }[], byte: number) {
        for (let i = 7; i >= 0; i--) {
            const bit = (byte >> i) & 1;
            if (bit === 1) {
                frame.push({state: true, us: 565.5});
                frame.push({state: false, us: 1687.5});
            } else {
                frame.push({state: true, us: 565.5});
                frame.push({state: false, us: 565.5});
            }
        }
    }
}