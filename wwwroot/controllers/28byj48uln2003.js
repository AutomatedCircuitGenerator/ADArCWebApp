"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._28BYJ48ULN2003 = void 0;
const controller_1 = require("@controllers/controller");
const execute_1 = require("@lib/execute");
var ProngState;
(function (ProngState) {
    ProngState[ProngState["Low"] = 0] = "Low";
    ProngState[ProngState["High"] = 1] = "High";
})(ProngState || (ProngState = {}));
var Coil;
(function (Coil) {
    Coil[Coil["A"] = 0] = "A";
    Coil[Coil["B"] = 1] = "B";
    Coil[Coil["C"] = 2] = "C";
    Coil[Coil["D"] = 3] = "D";
})(Coil || (Coil = {}));
class StepperMotor {
    constructor() {
        this.prongs = Array.from({ length: 32 }, () => ({
            state: ProngState.Low,
        }));
        this.prongAngles = Array.from([this.prongs.length], (_, index) => index * 11.40625);
    }
    setCoilState(coil, state) {
        for (let step = coil; step < this.prongs.length; step += 4) {
            this.prongs[step].state = state;
        }
        this.adjustHead();
    }
    getCoilState(coil) {
        return this.prongs[coil].state.valueOf();
    }
    adjustHead() {
        if (this.prongs.filter(prong => prong.state === ProngState.High).length < 16) {
            return;
        }
    }
}
class _28BYJ48ULN2003 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.animationFrameId = null;
        this.randWaitAmount = 16000000;
        this.lastSpinState = false;
        this.first = true;
        this.wasPrevFirst = false;
    }
    setup() {
        this.pins.in1[0].digital.addListener((state) => this.aListener(state));
        this.pins.in2[0].digital.addListener((state) => this.bListener(state));
        this.pins.in3[0].digital.addListener((state) => this.cListener(state));
        this.pins.in4[0].digital.addListener((state) => this.dListener(state));
        this.animationFrameId = null;
    }
    cleanup() {
        const animationElem = this.element.querySelector("#_28byj-shaft-rotateAnim");
        const svgElem = this.element.querySelector("#_28byj");
        animationElem.endElement();
        svgElem.pauseAnimations();
    }
    setSpinning(isSpinning) {
        const animationElem = this.element.querySelector("#_28byj-shaft-rotateAnim");
        const svgElem = this.element.querySelector("#_28byj");
        if (this.first) {
            animationElem.beginElement();
            this.first = false;
            this.wasPrevFirst = true;
        }
        else {
            if (!this.wasPrevFirst && isSpinning == this.lastSpinState) {
                return;
            }
            this.wasPrevFirst = false;
            if (isSpinning) {
                svgElem.unpauseAnimations();
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                    this.setSpinning(false);
                }, this.randWaitAmount);
            }
            else {
                svgElem.pauseAnimations();
            }
        }
        this.lastSpinState = isSpinning;
    }
    aListener(state) {
        this.setSpinning(true);
    }
    bListener(state) {
        this.setSpinning(true);
    }
    cListener(state) {
        this.setSpinning(true);
    }
    dListener(state) {
        this.setSpinning(true);
    }
}
exports._28BYJ48ULN2003 = _28BYJ48ULN2003;
//# sourceMappingURL=28byj48uln2003.js.map