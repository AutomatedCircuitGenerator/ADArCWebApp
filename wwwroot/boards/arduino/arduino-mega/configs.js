"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adcConfig = exports.twiConfig = exports.usart3Config = exports.usart2Config = exports.usart1Config = exports.usart0Config = exports.timer5Config = exports.timer4Config = exports.timer3Config = exports.timer2Config = exports.timer1Config = exports.timer0Config = exports.spiConfig = void 0;
const avr8js_1 = require("@lib/avr8js");
exports.spiConfig = Object.assign(Object.assign({}, avr8js_1.spiConfig), { spiInterrupt: 0x30 });
const defaultTimerBits = {
    TOV: 1,
    OCFA: 2,
    OCFB: 4,
    OCFC: 0,
    TOIE: 1,
    OCIEA: 2,
    OCIEB: 4,
    OCIEC: 0,
};
const timer01Dividers = {
    0: 0,
    1: 1,
    2: 8,
    3: 64,
    4: 256,
    5: 1024,
    6: 0,
    7: 0,
};
exports.timer0Config = Object.assign({ ICR: 0, OCRA: 0x47, OCRB: 0x48, OCRC: 0, TCCRA: 0x44, TCCRB: 0x45, TCCRC: 0, TCNT: 0x46, TIFR: 0x35, TIMSK: 0x6E, bits: 8, captureInterrupt: 0, compAInterrupt: 0x2A, compBInterrupt: 0x2C, compCInterrupt: 0, compPinA: 7, compPinB: 5, compPinC: 0, compPortA: avr8js_1.portBConfig.PORT, compPortB: avr8js_1.portGConfig.PORT, compPortC: 0, dividers: timer01Dividers, externalClockPin: 7, externalClockPort: avr8js_1.portDConfig.PORT, ovfInterrupt: 0x2E }, defaultTimerBits);
exports.timer1Config = Object.assign({ ICR: 0x86, OCRA: 0x88, OCRB: 0x8A, OCRC: 0x8C, TCCRA: 0x80, TCCRB: 0x81, TCCRC: 0x82, TCNT: 0x84, TIFR: 0x36, TIMSK: 0x6F, bits: 16, captureInterrupt: 0x20, compAInterrupt: 0x22, compBInterrupt: 0x24, compCInterrupt: 0x26, compPinA: 5, compPinB: 6, compPinC: 7, compPortA: avr8js_1.portBConfig.PORT, compPortB: avr8js_1.portBConfig.PORT, compPortC: avr8js_1.portBConfig.PORT, dividers: timer01Dividers, externalClockPin: 6, externalClockPort: avr8js_1.portDConfig.PORT, ovfInterrupt: 0x28 }, defaultTimerBits);
exports.timer2Config = Object.assign({ ICR: 0, OCRA: 0xB3, OCRB: 0xB4, OCRC: 0, TCCRA: 0xB0, TCCRB: 0xB1, TCCRC: 0, TCNT: 0xB2, TIFR: 0x37, TIMSK: 0x70, bits: 8, captureInterrupt: 0, compAInterrupt: 0x1A, compBInterrupt: 0x1C, compCInterrupt: 0x1E, compPinA: 4, compPinB: 6, compPinC: 0, compPortA: avr8js_1.portBConfig.PORT, compPortB: avr8js_1.portHConfig.PORT, compPortC: 0, dividers: {
        0: 0,
        1: 1,
        2: 8,
        3: 32,
        4: 64,
        5: 128,
        6: 256,
        7: 1024,
    }, externalClockPin: 0, externalClockPort: 0, ovfInterrupt: 0x12 }, defaultTimerBits);
exports.timer3Config = Object.assign({ ICR: 0x96, OCRA: 0x98, OCRB: 0x9A, OCRC: 0x9C, TCCRA: 0x90, TCCRB: 0x91, TCCRC: 0x92, TCNT: 0x94, TIFR: 0x38, TIMSK: 0x71, bits: 16, captureInterrupt: 0x3E, compAInterrupt: 0x40, compBInterrupt: 0x42, compCInterrupt: 0x44, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_1.portEConfig.PORT, compPortB: avr8js_1.portEConfig.PORT, compPortC: avr8js_1.portEConfig.PORT, dividers: timer01Dividers, externalClockPin: 6, externalClockPort: avr8js_1.portEConfig.PORT, ovfInterrupt: 0x46 }, defaultTimerBits);
exports.timer4Config = Object.assign({ ICR: 0xA6, OCRA: 0xA8, OCRB: 0xAB, OCRC: 0xAC, TCCRA: 0xA0, TCCRB: 0xA1, TCCRC: 0xA2, TCNT: 0xA4, TIFR: 0x39, TIMSK: 0x72, bits: 16, captureInterrupt: 0x52, compAInterrupt: 0x54, compBInterrupt: 0x56, compCInterrupt: 0x58, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_1.portHConfig.PORT, compPortB: avr8js_1.portHConfig.PORT, compPortC: avr8js_1.portHConfig.PORT, dividers: timer01Dividers, externalClockPin: 7, externalClockPort: avr8js_1.portHConfig.PORT, ovfInterrupt: 0x5A }, defaultTimerBits);
exports.timer5Config = Object.assign({ ICR: 0x126, OCRA: 0x128, OCRB: 0x12A, OCRC: 0x12C, TCCRA: 0x120, TCCRB: 0x121, TCCRC: 0x122, TCNT: 0x124, TIFR: 0x3A, TIMSK: 0x73, bits: 16, captureInterrupt: 0x5C, compAInterrupt: 0x5E, compBInterrupt: 0x60, compCInterrupt: 0x62, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_1.portLConfig.PORT, compPortB: avr8js_1.portLConfig.PORT, compPortC: avr8js_1.portLConfig.PORT, dividers: timer01Dividers, externalClockPin: 2, externalClockPort: avr8js_1.portLConfig.PORT, ovfInterrupt: 0x64 }, defaultTimerBits);
exports.usart0Config = {
    rxCompleteInterrupt: 0x32,
    dataRegisterEmptyInterrupt: 0x34,
    txCompleteInterrupt: 0x36,
    UCSRA: 0xc0,
    UCSRB: 0xc1,
    UCSRC: 0xc2,
    UBRRL: 0xc4,
    UBRRH: 0xc5,
    UDR: 0xc6,
};
exports.usart1Config = {
    rxCompleteInterrupt: 0x48,
    dataRegisterEmptyInterrupt: 0x4A,
    txCompleteInterrupt: 0x4C,
    UCSRA: 0xc8,
    UCSRB: 0xc9,
    UCSRC: 0xca,
    UBRRL: 0xcc,
    UBRRH: 0xcd,
    UDR: 0xce,
};
exports.usart2Config = {
    rxCompleteInterrupt: 0x66,
    dataRegisterEmptyInterrupt: 0x68,
    txCompleteInterrupt: 0x6A,
    UCSRA: 0xD0,
    UCSRB: 0xD1,
    UCSRC: 0xD2,
    UBRRL: 0xD4,
    UBRRH: 0xD5,
    UDR: 0xD6,
};
exports.usart3Config = {
    rxCompleteInterrupt: 0x6C,
    dataRegisterEmptyInterrupt: 0x6E,
    txCompleteInterrupt: 0x70,
    UCSRA: 0x130,
    UCSRB: 0x131,
    UCSRC: 0x132,
    UBRRL: 0x134,
    UBRRH: 0x135,
    UDR: 0x136,
};
exports.twiConfig = {
    twiInterrupt: 0x4E,
    TWBR: 0xb8,
    TWSR: 0xb9,
    TWAR: 0xba,
    TWDR: 0xbb,
    TWCR: 0xbc,
    TWAMR: 0xbd,
};
exports.adcConfig = {
    ADMUX: 0x7c,
    ADCSRA: 0x7a,
    ADCSRB: 0x7b,
    ADCL: 0x78,
    ADCH: 0x79,
    DIDR0: 0x7e,
    adcInterrupt: 0x3a,
    numChannels: 16,
    muxInputMask: 0xf,
    muxChannels: avr8js_1.atmega328Channels,
    adcReferences: [
        avr8js_1.ADCReference.AREF,
        avr8js_1.ADCReference.AVCC,
        avr8js_1.ADCReference.Reserved,
        avr8js_1.ADCReference.Internal1V1,
    ],
};
//# sourceMappingURL=configs.js.map