"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoUno = void 0;
const avr8js_1 = require("@lib/avr8js");
const arduino_1 = require("../arduino");
class ArduinoUno {
    constructor(program) {
        const avrCPU = new avr8js_1.CPU(program);
        const adc = new avr8js_1.AVRADC(avrCPU, avr8js_1.adcConfig);
        const portB = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portBConfig);
        const portC = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portCConfig);
        const portD = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portDConfig);
        this.cpu = new arduino_1.ArduinoCPU(avrCPU);
        this.spis = [new arduino_1.ArduinoSPI(new avr8js_1.AVRSPI(avrCPU, avr8js_1.spiConfig, arduino_1.MHZ))];
        this.timers = [new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, avr8js_1.timer0Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, avr8js_1.timer1Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, avr8js_1.timer2Config))];
        this.twis = [new arduino_1.ArduinoTWI(new avr8js_1.AVRTWI(avrCPU, avr8js_1.twiConfig, arduino_1.MHZ))];
        this.usarts = [new arduino_1.ArduinoUSART(new avr8js_1.AVRUSART(avrCPU, avr8js_1.usart0Config, arduino_1.MHZ))];
        this.pins = [
            { digital: new arduino_1.ArduinoDigital(portD, 0), usart: this.usarts[0] },
            { digital: new arduino_1.ArduinoDigital(portD, 1), usart: this.usarts[0] },
            { digital: new arduino_1.ArduinoDigital(portD, 2) },
            { digital: new arduino_1.ArduinoDigital(portD, 3), timer: this.timers[2] },
            { digital: new arduino_1.ArduinoDigital(portD, 4) },
            { digital: new arduino_1.ArduinoDigital(portD, 5), timer: this.timers[0] },
            { digital: new arduino_1.ArduinoDigital(portD, 6), timer: this.timers[0] },
            { digital: new arduino_1.ArduinoDigital(portD, 7) },
            { digital: new arduino_1.ArduinoDigital(portB, 0) },
            { digital: new arduino_1.ArduinoDigital(portB, 1), timer: this.timers[1] },
            { digital: new arduino_1.ArduinoDigital(portB, 2), timer: this.timers[1] },
            { digital: new arduino_1.ArduinoDigital(portB, 3), timer: this.timers[2] },
            { digital: new arduino_1.ArduinoDigital(portB, 4) },
            { digital: new arduino_1.ArduinoDigital(portB, 5) },
            { analog: new arduino_1.ArduinoAnalog(adc, 0), digital: new arduino_1.ArduinoDigital(portC, 0) },
            { analog: new arduino_1.ArduinoAnalog(adc, 1), digital: new arduino_1.ArduinoDigital(portC, 1) },
            { analog: new arduino_1.ArduinoAnalog(adc, 2), digital: new arduino_1.ArduinoDigital(portC, 2) },
            { analog: new arduino_1.ArduinoAnalog(adc, 3), digital: new arduino_1.ArduinoDigital(portC, 3) },
            { analog: new arduino_1.ArduinoAnalog(adc, 4), digital: new arduino_1.ArduinoDigital(portC, 4), twi: this.twis[0] },
            { analog: new arduino_1.ArduinoAnalog(adc, 5), digital: new arduino_1.ArduinoDigital(portC, 5), twi: this.twis[0] },
        ];
    }
}
exports.ArduinoUno = ArduinoUno;
ArduinoUno.FLASH = 0x8000;
//# sourceMappingURL=arduino-uno.js.map