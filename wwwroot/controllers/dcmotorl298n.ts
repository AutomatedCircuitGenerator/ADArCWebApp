import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {Digital} from "../boards/board";
import {AVRRunner} from "@lib/execute";

enum MotorDirection {
    OFF,
    FORWARD,
    REVERSE
}

export class DCMotorL298N extends Controller {


    private motorDirection: MotorDirection = MotorDirection.OFF;
    //| in1 | in2 |  state   |
    // |-----|-----|----------|
    // |   0 |   0 | off      |
    // |   1 |   0 | forward  |
    // |   0 |   1 | backward |
    // |   1 |   1 | off      |
    private signal:Digital;
    private risingEdgeCycle: number;
    private fallingEdgeCycle: number;
    private previousAngle: number;
    private signalState: PinState;
    setup() {
        this.pins.in1[0].digital.addListener(this.in1Listener)
        this.pins.in2[0].digital.addListener(this.in2Listener)
        this.signal = this.pins.ena[0].digital;
        this.signalState = this.signal.state;
        this.signal.addListener(this.onSignalChange.bind(this));
    }

    private in1Listener(state: PinState) {
        this.setMotorDirection();
    }
    private in2Listener(state: PinState) {
        this.setMotorDirection();
    }

    private setMotorDirection() {
        const in1 = this.pins.in1[0].digital.state;
        const in2 = this.pins.in2[0].digital.state;
        if (in1 === in2) {
            this.motorDirection = MotorDirection.OFF;
        } else if (in1) {
            this.motorDirection = MotorDirection.FORWARD;
        } else {
            this.motorDirection = MotorDirection.REVERSE;
        }
    }

    private onSignalChange(state: PinState) {
        this.signalState = state;
        
    }

    private cyclesToMs(cycles: number) {
        return (cycles * 1_000) / (AVRRunner.getInstance().board.cpu.frequency / 1000); // Use 1000 scaling factor for finer precision
    }
}