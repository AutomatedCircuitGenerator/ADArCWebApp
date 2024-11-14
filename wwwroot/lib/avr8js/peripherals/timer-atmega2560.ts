import {AVRTimerConfig, portBConfig, portDConfig, portGConfig} from "@lib/avr8js";

/** These are differnet for some devices (e.g. ATtiny85) */
const defaultTimerBits = {
    // TIFR bits
    TOV: 1,
    OCFA: 2,
    OCFB: 4,
    OCFC: 0, // Unused

    // TIMSK bits
    TOIE: 1,
    OCIEA: 2,
    OCIEB: 4,
    OCIEC: 0, // Unused
};

const timer01Dividers = {
    0: 0,
    1: 1,
    2: 8,
    3: 64,
    4: 256,
    5: 1024,
    6: 0, // External clock - see ExternalClockMode
    7: 0, // Ditto
};

export const timer0Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCRA: 0x47,
    OCRB: 0x48,
    OCRC: 0,
    TCCRA: 0x44,
    TCCRB: 0x45,
    TCCRC: 0, // not available
    TCNT: 0x46,
    TIFR: 0x35,
    TIMSK: 0x6E,
    bits: 8,
    captureInterrupt: 0, // not available
    compAInterrupt: 0x2A,
    compBInterrupt: 0x2C,
    compCInterrupt: 0, // not available
    compPinA: 7,
    compPinB: 5,
    compPinC: 0, // not available
    compPortA: portBConfig.PORT,
    compPortB: portGConfig.PORT,
    compPortC: 0, // not available
    dividers: timer01Dividers,
    externalClockPin: 7,
    externalClockPort: portDConfig.PORT,
    ovfInterrupt: 0x2E,
    ...defaultTimerBits
}

export const timer1Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCFA: 0,
    OCFB: 0,
    OCFC: 0,
    OCIEA: 0,
    OCIEB: 0,
    OCIEC: 0,
    OCRA: 0,
    OCRB: 0,
    OCRC: 0,
    TCCRA: 0,
    TCCRB: 0,
    TCCRC: 0,
    TCNT: 0,
    TIFR: 0x35,
    TIMSK: 0x6E,
    TOIE: 0,
    TOV: 0,
    bits: undefined,
    captureInterrupt: 0,
    compAInterrupt: 0,
    compBInterrupt: 0,
    compCInterrupt: 0,
    compPinA: 0,
    compPinB: 0,
    compPinC: 0,
    compPortA: 0,
    compPortB: 0,
    compPortC: 0,
    dividers: undefined,
    externalClockPin: 0,
    externalClockPort: 0,
    ovfInterrupt: 0
}

export const timer2Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCFA: 0,
    OCFB: 0,
    OCFC: 0,
    OCIEA: 0,
    OCIEB: 0,
    OCIEC: 0,
    OCRA: 0,
    OCRB: 0,
    OCRC: 0,
    TCCRA: 0,
    TCCRB: 0,
    TCCRC: 0,
    TCNT: 0,
    TIFR: 0x35,
    TIMSK: 0x6E,
    TOIE: 0,
    TOV: 0,
    bits: undefined,
    captureInterrupt: 0,
    compAInterrupt: 0,
    compBInterrupt: 0,
    compCInterrupt: 0,
    compPinA: 0,
    compPinB: 0,
    compPinC: 0,
    compPortA: 0,
    compPortB: 0,
    compPortC: 0,
    dividers: undefined,
    externalClockPin: 0,
    externalClockPort: 0,
    ovfInterrupt: 0
}

export const timer3Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCFA: 0,
    OCFB: 0,
    OCFC: 0,
    OCIEA: 0,
    OCIEB: 0,
    OCIEC: 0,
    OCRA: 0,
    OCRB: 0,
    OCRC: 0,
    TCCRA: 0,
    TCCRB: 0,
    TCCRC: 0,
    TCNT: 0,
    TIFR: 0x35,
    TIMSK: 0x6E,
    TOIE: 0,
    TOV: 0,
    bits: undefined,
    captureInterrupt: 0,
    compAInterrupt: 0,
    compBInterrupt: 0,
    compCInterrupt: 0,
    compPinA: 0,
    compPinB: 0,
    compPinC: 0,
    compPortA: 0,
    compPortB: 0,
    compPortC: 0,
    dividers: undefined,
    externalClockPin: 0,
    externalClockPort: 0,
    ovfInterrupt: 0
}

export const timer4Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCFA: 0,
    OCFB: 0,
    OCFC: 0,
    OCIEA: 0,
    OCIEB: 0,
    OCIEC: 0,
    OCRA: 0,
    OCRB: 0,
    OCRC: 0,
    TCCRA: 0,
    TCCRB: 0,
    TCCRC: 0,
    TCNT: 0,
    TIFR: 0x35,
    TIMSK: 0x6E,
    TOIE: 0,
    TOV: 0,
    bits: undefined,
    captureInterrupt: 0,
    compAInterrupt: 0,
    compBInterrupt: 0,
    compCInterrupt: 0,
    compPinA: 0,
    compPinB: 0,
    compPinC: 0,
    compPortA: 0,
    compPortB: 0,
    compPortC: 0,
    dividers: undefined,
    externalClockPin: 0,
    externalClockPort: 0,
    ovfInterrupt: 0
}

export const timer5Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCFA: 0,
    OCFB: 0,
    OCFC: 0,
    OCIEA: 0,
    OCIEB: 0,
    OCIEC: 0,
    OCRA: 0,
    OCRB: 0,
    OCRC: 0,
    TCCRA: 0,
    TCCRB: 0,
    TCCRC: 0,
    TCNT: 0,
    TIFR: 0x35,
    TIMSK: 0x6E,
    TOIE: 0,
    TOV: 0,
    bits: undefined,
    captureInterrupt: 0,
    compAInterrupt: 0,
    compBInterrupt: 0,
    compCInterrupt: 0,
    compPinA: 0,
    compPinB: 0,
    compPinC: 0,
    compPortA: 0,
    compPortB: 0,
    compPortC: 0,
    dividers: undefined,
    externalClockPin: 0,
    externalClockPort: 0,
    ovfInterrupt: 0
}