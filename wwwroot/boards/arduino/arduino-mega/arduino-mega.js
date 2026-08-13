"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoMega = void 0;
const avr8js_1 = require("@lib/avr8js");
const configs_1 = require("./configs");
const arduino_1 = require("../arduino");
class ArduinoMega {
    constructor(program) {
        const avrCPU = new avr8js_1.CPU(program, 0x2200);
        const adc = new avr8js_1.AVRADC(avrCPU, configs_1.adcConfig);
        const portA = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portAConfig);
        const megaPortBConfig = Object.assign(Object.assign({}, avr8js_1.portBConfig), { pinChange: {
                PCIE: 0,
                PCICR: 0x68,
                PCIFR: 0x3b,
                PCMSK: 0x6b,
                pinChangeInterrupt: 18,
                mask: 0xff,
                offset: 0,
            } });
        const portB = new avr8js_1.AVRIOPort(avrCPU, megaPortBConfig);
        const portC = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portCConfig);
        const portD = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portDConfig);
        const portE = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portEConfig);
        const portF = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portFConfig);
        const portG = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portGConfig);
        const portH = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portHConfig);
        const megaPortJConfig = Object.assign(Object.assign({}, avr8js_1.portJConfig), { pinChange: {
                PCIE: 1,
                PCICR: 0x68,
                PCIFR: 0x3b,
                PCMSK: 0x6c,
                pinChangeInterrupt: 20,
                mask: 0xff,
                offset: 8,
            } });
        const portJ = new avr8js_1.AVRIOPort(avrCPU, megaPortJConfig);
        const megaPortKConfig = Object.assign(Object.assign({}, avr8js_1.portKConfig), { pinChange: {
                PCIE: 2,
                PCICR: 0x68,
                PCIFR: 0x3b,
                PCMSK: 0x6d,
                pinChangeInterrupt: 22,
                mask: 0xff,
                offset: 16,
            } });
        const portK = new avr8js_1.AVRIOPort(avrCPU, megaPortKConfig);
        const portL = new avr8js_1.AVRIOPort(avrCPU, avr8js_1.portLConfig);
        this.cpu = new arduino_1.ArduinoCPU(avrCPU);
        this.spis = [new arduino_1.ArduinoSPI(new avr8js_1.AVRSPI(avrCPU, configs_1.spiConfig, arduino_1.MHZ))];
        this.timers = [
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer0Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer1Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer2Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer3Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer4Config)),
            new arduino_1.ArduinoTimer(new avr8js_1.AVRTimer(avrCPU, configs_1.timer5Config))
        ];
        this.twis = [new arduino_1.ArduinoTWI(new avr8js_1.AVRTWI(avrCPU, configs_1.twiConfig, arduino_1.MHZ))];
        this.usarts = [
            new arduino_1.ArduinoUSART(new avr8js_1.AVRUSART(avrCPU, configs_1.usart0Config, arduino_1.MHZ)),
            new arduino_1.ArduinoUSART(new avr8js_1.AVRUSART(avrCPU, configs_1.usart1Config, arduino_1.MHZ)),
            new arduino_1.ArduinoUSART(new avr8js_1.AVRUSART(avrCPU, configs_1.usart2Config, arduino_1.MHZ)),
            new arduino_1.ArduinoUSART(new avr8js_1.AVRUSART(avrCPU, configs_1.usart3Config, arduino_1.MHZ)),
        ];
        this.pins = [
            { digital: new arduino_1.ArduinoDigital(portE, 0), usart: this.usarts[0] },
            { digital: new arduino_1.ArduinoDigital(portE, 1), usart: this.usarts[0] },
            { digital: new arduino_1.ArduinoDigital(portE, 4), timer: this.timers[3] },
            { digital: new arduino_1.ArduinoDigital(portE, 5), timer: this.timers[3] },
            { digital: new arduino_1.ArduinoDigital(portG, 5), timer: this.timers[0] },
            { digital: new arduino_1.ArduinoDigital(portE, 3), timer: this.timers[3] },
            { digital: new arduino_1.ArduinoDigital(portH, 3), timer: this.timers[4] },
            { digital: new arduino_1.ArduinoDigital(portH, 4), timer: this.timers[4] },
            { digital: new arduino_1.ArduinoDigital(portH, 5), timer: this.timers[4] },
            { digital: new arduino_1.ArduinoDigital(portH, 6), timer: this.timers[2] },
            { digital: new arduino_1.ArduinoDigital(portB, 4), timer: this.timers[2] },
            { digital: new arduino_1.ArduinoDigital(portB, 5), timer: this.timers[1] },
            { digital: new arduino_1.ArduinoDigital(portB, 6), timer: this.timers[1] },
            { digital: new arduino_1.ArduinoDigital(portB, 7), timer: this.timers[0] },
            { digital: new arduino_1.ArduinoDigital(portJ, 1), usart: this.usarts[3] },
            { digital: new arduino_1.ArduinoDigital(portJ, 0), usart: this.usarts[3] },
            { digital: new arduino_1.ArduinoDigital(portH, 1), usart: this.usarts[2] },
            { digital: new arduino_1.ArduinoDigital(portH, 0), usart: this.usarts[2] },
            { digital: new arduino_1.ArduinoDigital(portD, 3), usart: this.usarts[1] },
            { digital: new arduino_1.ArduinoDigital(portD, 2), usart: this.usarts[1] },
            { digital: new arduino_1.ArduinoDigital(portD, 1), twi: this.twis[0] },
            { digital: new arduino_1.ArduinoDigital(portD, 0), twi: this.twis[0] },
            { digital: new arduino_1.ArduinoDigital(portA, 0) },
            { digital: new arduino_1.ArduinoDigital(portA, 1) },
            { digital: new arduino_1.ArduinoDigital(portA, 2) },
            { digital: new arduino_1.ArduinoDigital(portA, 3) },
            { digital: new arduino_1.ArduinoDigital(portA, 4) },
            { digital: new arduino_1.ArduinoDigital(portA, 5) },
            { digital: new arduino_1.ArduinoDigital(portA, 6) },
            { digital: new arduino_1.ArduinoDigital(portA, 7) },
            { digital: new arduino_1.ArduinoDigital(portC, 7) },
            { digital: new arduino_1.ArduinoDigital(portC, 6) },
            { digital: new arduino_1.ArduinoDigital(portC, 5) },
            { digital: new arduino_1.ArduinoDigital(portC, 4) },
            { digital: new arduino_1.ArduinoDigital(portC, 3) },
            { digital: new arduino_1.ArduinoDigital(portC, 2) },
            { digital: new arduino_1.ArduinoDigital(portC, 1) },
            { digital: new arduino_1.ArduinoDigital(portC, 0) },
            { digital: new arduino_1.ArduinoDigital(portD, 7) },
            { digital: new arduino_1.ArduinoDigital(portG, 2) },
            { digital: new arduino_1.ArduinoDigital(portG, 1) },
            { digital: new arduino_1.ArduinoDigital(portG, 0) },
            { digital: new arduino_1.ArduinoDigital(portL, 7) },
            { digital: new arduino_1.ArduinoDigital(portL, 6) },
            { digital: new arduino_1.ArduinoDigital(portL, 5), timer: this.timers[5] },
            { digital: new arduino_1.ArduinoDigital(portL, 4), timer: this.timers[5] },
            { digital: new arduino_1.ArduinoDigital(portL, 3), timer: this.timers[5] },
            { digital: new arduino_1.ArduinoDigital(portL, 2) },
            { digital: new arduino_1.ArduinoDigital(portL, 1) },
            { digital: new arduino_1.ArduinoDigital(portL, 0) },
            { digital: new arduino_1.ArduinoDigital(portB, 3), spi: this.spis[0] },
            { digital: new arduino_1.ArduinoDigital(portB, 2), spi: this.spis[0] },
            { digital: new arduino_1.ArduinoDigital(portB, 1), spi: this.spis[0] },
            { digital: new arduino_1.ArduinoDigital(portB, 0), spi: this.spis[0] },
            { digital: new arduino_1.ArduinoDigital(portF, 0), analog: new arduino_1.ArduinoAnalog(adc, 0) },
            { digital: new arduino_1.ArduinoDigital(portF, 1), analog: new arduino_1.ArduinoAnalog(adc, 1) },
            { digital: new arduino_1.ArduinoDigital(portF, 2), analog: new arduino_1.ArduinoAnalog(adc, 2) },
            { digital: new arduino_1.ArduinoDigital(portF, 3), analog: new arduino_1.ArduinoAnalog(adc, 3) },
            { digital: new arduino_1.ArduinoDigital(portF, 4), analog: new arduino_1.ArduinoAnalog(adc, 4) },
            { digital: new arduino_1.ArduinoDigital(portF, 5), analog: new arduino_1.ArduinoAnalog(adc, 5) },
            { digital: new arduino_1.ArduinoDigital(portF, 6), analog: new arduino_1.ArduinoAnalog(adc, 6) },
            { digital: new arduino_1.ArduinoDigital(portF, 7), analog: new arduino_1.ArduinoAnalog(adc, 7) },
            { digital: new arduino_1.ArduinoDigital(portK, 0), analog: new arduino_1.ArduinoAnalog(adc, 8) },
            { digital: new arduino_1.ArduinoDigital(portK, 1), analog: new arduino_1.ArduinoAnalog(adc, 9) },
            { digital: new arduino_1.ArduinoDigital(portK, 2), analog: new arduino_1.ArduinoAnalog(adc, 10) },
            { digital: new arduino_1.ArduinoDigital(portK, 3), analog: new arduino_1.ArduinoAnalog(adc, 11) },
            { digital: new arduino_1.ArduinoDigital(portK, 4), analog: new arduino_1.ArduinoAnalog(adc, 12) },
            { digital: new arduino_1.ArduinoDigital(portK, 5), analog: new arduino_1.ArduinoAnalog(adc, 13) },
            { digital: new arduino_1.ArduinoDigital(portK, 6), analog: new arduino_1.ArduinoAnalog(adc, 14) },
            { digital: new arduino_1.ArduinoDigital(portK, 7), analog: new arduino_1.ArduinoAnalog(adc, 15) },
        ];
    }
}
exports.ArduinoMega = ArduinoMega;
ArduinoMega.FLASH = 0x40000;
//# sourceMappingURL=arduino-mega.js.map