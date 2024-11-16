import {
    AVRTimerConfig,
    portBConfig,
    portDConfig, portEConfig,
    portGConfig,
    portHConfig, portLConfig,
    spiConfig as unoSpiConfig
} from "@lib/avr8js";
import {USARTConfig} from "@lib/avr8js/peripherals/usart";

export const spiConfig = {
    ...unoSpiConfig,
    spiInterrupt: 0x30,
}

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
    ICR: 0x86, 
    OCRA: 0x88,
    OCRB: 0x8A,
    OCRC: 0x8C,
    TCCRA: 0x80,
    TCCRB: 0x81,
    TCCRC: 0x82, 
    TCNT: 0x84,
    TIFR: 0x36,
    TIMSK: 0x6F,
    bits: 16,
    captureInterrupt: 0x20, 
    compAInterrupt: 0x22,
    compBInterrupt: 0x24,
    compCInterrupt: 0x26, 
    compPinA: 5,
    compPinB: 6,
    compPinC: 7, 
    compPortA: portBConfig.PORT,
    compPortB: portBConfig.PORT,
    compPortC: portBConfig.PORT,
    dividers: timer01Dividers,
    externalClockPin: 6,
    externalClockPort: portDConfig.PORT,
    ovfInterrupt: 0x28,
    ...defaultTimerBits
}

export const timer2Config: AVRTimerConfig = {
    ICR: 0, // not available
    OCRA: 0xB3,
    OCRB: 0xB4,
    OCRC: 0, // not available
    TCCRA: 0xB0,
    TCCRB: 0xB1,
    TCCRC: 0, // not available
    TCNT: 0xB2,
    TIFR: 0x37,
    TIMSK: 0x70,
    bits: 8,
    captureInterrupt: 0, // not available
    compAInterrupt: 0x1A,
    compBInterrupt: 0x1C,
    compCInterrupt: 0x1E,
    compPinA: 4,
    compPinB: 6,
    compPinC: 0, // not available
    compPortA: portBConfig.PORT,
    compPortB: portHConfig.PORT,
    compPortC: 0, // not available
    dividers: {
        0: 0,
        1: 1,
        2: 8,
        3: 32,
        4: 64,
        5: 128,
        6: 256,
        7: 1024,
    },
    externalClockPin: 0, // not available
    externalClockPort: 0, // not available
    ovfInterrupt: 0x12,
    ...defaultTimerBits
}

export const timer3Config: AVRTimerConfig = {
    ICR: 0x96,
    OCRA: 0x98,
    OCRB: 0x9A,
    OCRC: 0x9C,
    TCCRA: 0x90,
    TCCRB: 0x91,
    TCCRC: 0x92,
    TCNT: 0x94,
    TIFR: 0x38,
    TIMSK: 0x71,
    bits: 16,
    captureInterrupt: 0x3E,
    compAInterrupt: 0x40,
    compBInterrupt: 0x42,
    compCInterrupt: 0x44,
    compPinA: 3,
    compPinB: 4,
    compPinC: 5,
    compPortA: portEConfig.PORT,
    compPortB: portEConfig.PORT,
    compPortC: portEConfig.PORT,
    dividers: timer01Dividers,
    externalClockPin: 6,
    externalClockPort: portEConfig.PORT,
    ovfInterrupt: 0x46,
    ...defaultTimerBits
}

export const timer4Config: AVRTimerConfig = {
    ICR: 0xA6,
    OCRA: 0xA8,
    OCRB: 0xAB,
    OCRC: 0xAC,
    TCCRA: 0xA0,
    TCCRB: 0xA1,
    TCCRC: 0xA2,
    TCNT: 0xA4,
    TIFR: 0x39,
    TIMSK: 0x72,
    bits: 16,
    captureInterrupt: 0x52,
    compAInterrupt: 0x54,
    compBInterrupt: 0x56,
    compCInterrupt: 0x58,
    compPinA: 3,
    compPinB: 4,
    compPinC: 5,
    compPortA: portHConfig.PORT,
    compPortB: portHConfig.PORT,
    compPortC: portHConfig.PORT,
    dividers: timer01Dividers,
    externalClockPin: 7,
    externalClockPort: portHConfig.PORT,
    ovfInterrupt: 0x5A,
    ...defaultTimerBits
}

export const timer5Config: AVRTimerConfig = {
    ICR: 0x126,
    OCRA: 0x128,
    OCRB: 0x12A,
    OCRC: 0x12C,
    TCCRA: 0x120,
    TCCRB: 0x121,
    TCCRC: 0x122,
    TCNT: 0x124,
    TIFR: 0x3A,
    TIMSK: 0x73,
    bits: 16,
    captureInterrupt: 0x5C,
    compAInterrupt: 0x5E,
    compBInterrupt: 0x60,
    compCInterrupt: 0x62,
    compPinA: 3,
    compPinB: 4,
    compPinC: 5,
    compPortA: portLConfig.PORT,
    compPortB: portLConfig.PORT,
    compPortC: portLConfig.PORT,
    dividers: timer01Dividers,
    externalClockPin: 2,
    externalClockPort: portLConfig.PORT,
    ovfInterrupt: 0x64,
    ...defaultTimerBits
}

export const usart0Config: USARTConfig = {
    rxCompleteInterrupt: 0x32,
    dataRegisterEmptyInterrupt: 0x34,
    txCompleteInterrupt: 0x36,
    UCSRA: 0xc0,
    UCSRB: 0xc1,
    UCSRC: 0xc2,
    UBRRL: 0xc4,
    UBRRH: 0xc5,
    UDR: 0xc6,
}