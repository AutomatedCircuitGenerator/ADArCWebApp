"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEN0189 = void 0;
const controller_1 = require("@controllers/controller");
class SEN0189 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.turbidity = 0;
    }
    update(state) {
        this.setturbidity(state.turbidity);
    }
    setturbidity(turbidity) {
        if (turbidity < 0)
            this.turbidity = 0;
        else if (turbidity > 3000)
            this.turbidity = 3000;
        else
            this.turbidity = turbidity;
        if (!this.inSimulation) {
            return;
        }
        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }
    setup() {
        this.inSimulation = true;
        this.pins.analog_out[0].analog.voltage = this.turbidityToVoltage(this.turbidity);
    }
    turbidityToVoltage(turbidity) {
        let a = -1120.4;
        let b = 5742.3;
        let c = -4352.9 - turbidity;
        let discriminant = (b * b) - (4 * a * c);
        if (discriminant < 0) {
            return 0;
        }
        let sqrtDisc = Math.sqrt(discriminant);
        let v1 = (-b + sqrtDisc) / (2 * a);
        let v2 = (-b - sqrtDisc) / (2 * a);
        let voltage = Math.max(v1, v2);
        if (voltage < 0)
            voltage = 0;
        if (voltage > 5)
            voltage = 5;
        return voltage;
    }
}
exports.SEN0189 = SEN0189;
//# sourceMappingURL=sen0189.js.map