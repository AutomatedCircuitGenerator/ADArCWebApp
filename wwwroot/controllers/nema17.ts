import {Controller} from "@controllers/controller";
import {PinState} from "@lib/avr8js";
import {AVRRunner} from "@lib/execute";

//https://cookierobotics.com/042/
// When Orange is high, Pink is low. Orange is North
// When Yellow is high, Blue is low. Yellow is North
enum ProngState {
    Low = 0,
    High = 1,
}

interface Prong {
    state: ProngState;
}

enum Coil {
    A = 0,
    B = 1,
    C = 2,
    D = 3
}

class StepperMotor {
    // Prongs are 
    // Initialize 32 prongs, all set to Low initially. Note that one is offset into the next rotation
    prongs: Prong[] = Array.from({length: 32}, () => ({
        state: ProngState.Low,
    }));
    private prongAngles: number[] = Array.from([this.prongs.length], (_, index) => index * 11.40625)

    headAngle: number;

    //Make sure to call for every single coil on every single 
    setCoilState(coil: Coil, state: ProngState) {
        for (let step = coil; step < this.prongs.length; step += 4) {
            this.prongs[step].state = state;
        }
        this.adjustHead();
    }

    getCoilState(coil: Coil) {
        return this.prongs[coil].state.valueOf()
    }

    private adjustHead() {
        // at and in between two prongs is a valid state, giving us 365/64 = 5.703125 degree increments to move our 
        // pointing. Not worrying about microstepping since this is uln2003 driver

        //if there are >= three active we can just skip adjusting, were at an in between step
        if (this.prongs.filter(prong => prong.state === ProngState.High).length < 16) {
            return;
        }

    }
}

export class NEMA17 extends Controller {
    // each step is 11.25deg in full step mode
    // 5.625 in half step

    // The degree the north part of the rotor is facing. starts at 0, 
    // private motor = new StepperMotor();

    private animationFrameId: number | null = null;

    setup() {
        // this.angle = 0;
        this.pins.in1[0].digital.addListener((state) => this.aListener(state));
        this.pins.in2[0].digital.addListener((state) => this.bListener(state));
        this.pins.in3[0].digital.addListener((state) => this.cListener(state));
        this.pins.in4[0].digital.addListener((state) => this.dListener(state));

        // console.log(`pin index 1: ${this.pinIndices.in1[0].valueOf()}`);
        // console.log(`pin index 2: ${this.pinIndices.in2[0].valueOf()}`);
        // console.log(`pin index 3: ${this.pinIndices.in3[0].valueOf()}`);
        // console.log(`pin index 4: ${this.pinIndices.in4[0].valueOf()}`);

        this.animationFrameId = null;
    }

    cleanup() {
        // this.angle = 0;
        // renderSvg();
        const animationElem: SVGAnimationElement = this.element.querySelector("#_28byj-shaft-rotateAnim")
        const svgElem: SVGSVGElement = this.element.querySelector("#_28byj");
        animationElem.endElement()
        svgElem.pauseAnimations()
    }


    private randWaitAmount = 16000000; //1 second
    private lastSpinState: boolean = false;
    private first: boolean = true;
    private wasPrevFirst: boolean = false

    private setSpinning(isSpinning: boolean) {
        const animationElem: SVGAnimationElement = this.element.querySelector("#_28byj-shaft-rotateAnim")
        const svgElem: SVGSVGElement = this.element.querySelector("#_28byj");
        if (this.first) {
            animationElem.beginElement()
            this.first = false;
            this.wasPrevFirst = true;
        } else {
            if (!this.wasPrevFirst && isSpinning == this.lastSpinState) {
                //if the previous call was the first call, wasprev will be false and break out
                return
            }
            this.wasPrevFirst = false;
            if (isSpinning) {
                svgElem.unpauseAnimations()
                //the code simply doesnt call us for some time, which signals we should stop. no way to handle thise except calling the functino again with false
                AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                    this.setSpinning(false)
                }, this.randWaitAmount);
            } else {
                svgElem.pauseAnimations()
            }
        }
        this.lastSpinState = isSpinning
    }

    aListener(state: PinState) {
        this.setSpinning(true)
    }

    bListener(state: PinState) {
        this.setSpinning(true)
    }

    cListener(state: PinState) {
        this.setSpinning(true)
    }

    dListener(state: PinState) {
        this.setSpinning(true)
    }
}