"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEN0114 = void 0;
const controller_1 = require("@controllers/controller");
class SEN0114 extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.humidity = 512;
    }
    setup() {
        this.pins.analog_out[0].analog.voltage = this.humidityToVoltage(this.humidity);
    }
    update(state) {
        this.setHumidity(state.humidity);
    }
    setHumidity(humidity) {
        this.humidity = this.humidityToVoltage(humidity);
        this.pins.analog_out[0].analog.voltage = this.humidity;
    }
    humidityToVoltage(humidity) {
        if (humidity < 0)
            humidity = 0;
        else if (humidity > 1024)
            humidity = 1024;
        return humidity * 5 / 1023;
    }
}
exports.SEN0114 = SEN0114;
//# sourceMappingURL=sen0114.js.map