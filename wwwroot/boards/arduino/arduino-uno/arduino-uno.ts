import {
    ADC,
    Analog,
    Board,
    ByteTransmitListener,
    ClockEvent,
    CPU,
    Digital, Interfaces,
    PinListener,
    SPI,
    Timer,
    TWI,
    USART
} from "../../board";
import {
    adcConfig,
    ADCConfig,
    AVRADC,
    avrInstruction, AVRIOPort,
    AVRSPI,
    AVRTimer, AVRTWI, AVRUSART,
    CPU as AVRCPU, PinState, portBConfig, portCConfig, portDConfig,
    spiConfig,
    SPIConfig, timer0Config, timer1Config, timer2Config, twiConfig, usart0Config
} from "@lib/avr8js";
import {SPIByteTransferCallback} from "@lib/avr8js/peripherals/spi";
import {I2CController} from "@lib/i2c-bus";
import {
    ArduinoAnalog,
    ArduinoCPU,
    ArduinoDigital,
    ArduinoSPI,
    ArduinoTimer,
    ArduinoTWI,
    ArduinoUSART,
    MHZ
} from "../arduino";

export class ArduinoUno implements Board {
    cpu: CPU;
    spis: SPI[];
    timers: Timer[];
    twis: TWI[];
    usarts: USART[];

    pins: Interfaces[];

    static readonly FLASH = 0x8000;

    constructor(program: Uint16Array) {
        const avrCPU = new AVRCPU(program);
        const adc = new AVRADC(avrCPU, adcConfig);
        const portB = new AVRIOPort(avrCPU, portBConfig);
        const portC = new AVRIOPort(avrCPU, portCConfig);
        const portD = new AVRIOPort(avrCPU, portDConfig);

        this.cpu = new ArduinoCPU(avrCPU);
        this.spis = [new ArduinoSPI(new AVRSPI(avrCPU, spiConfig, MHZ))];
        this.timers = [new ArduinoTimer(new AVRTimer(avrCPU, timer0Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer1Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer2Config))];
        this.twis = [new ArduinoTWI(new AVRTWI(avrCPU, twiConfig, MHZ))];
        this.usarts = [new ArduinoUSART(new AVRUSART(avrCPU, usart0Config, MHZ))];

        this.pins = [
            {digital: new ArduinoDigital(portD, 0), usart: this.usarts[0]},  // Pin 0 (RX)
            {digital: new ArduinoDigital(portD, 1), usart: this.usarts[0]},  // Pin 1 (TX)
            {digital: new ArduinoDigital(portD, 2)},  // Pin 2
            {digital: new ArduinoDigital(portD, 3), timer: this.timers[2]},  // Pin 3
            {digital: new ArduinoDigital(portD, 4)},  // Pin 4
            {digital: new ArduinoDigital(portD, 5), timer: this.timers[0]},  // Pin 5
            {digital: new ArduinoDigital(portD, 6), timer: this.timers[0]},  // Pin 6
            {digital: new ArduinoDigital(portD, 7)},  // Pin 7
            {digital: new ArduinoDigital(portB, 0)},  // Pin 8
            {digital: new ArduinoDigital(portB, 1), timer: this.timers[1]},  // Pin 9
            {digital: new ArduinoDigital(portB, 2), timer: this.timers[1]},  // Pin 10
            {digital: new ArduinoDigital(portB, 3), timer: this.timers[2]},  // Pin 11
            {digital: new ArduinoDigital(portB, 4)},  // Pin 12
            {digital: new ArduinoDigital(portB, 5)},  // Pin 13
            {analog: new ArduinoAnalog(adc, 0), digital: new ArduinoDigital(portC, 0)},  // Pin A0 / Pin 14
            {analog: new ArduinoAnalog(adc, 1), digital: new ArduinoDigital(portC, 1)},  // Pin A1 / Pin 15
            {analog: new ArduinoAnalog(adc, 2), digital: new ArduinoDigital(portC, 2)},  // Pin A2 / Pin 16
            {analog: new ArduinoAnalog(adc, 3), digital: new ArduinoDigital(portC, 3)},  // Pin A3 / Pin 17
            {analog: new ArduinoAnalog(adc, 4), digital: new ArduinoDigital(portC, 4), twi: this.twis[0]},  // Pin A4 / Pin 18 (SDA)
            {analog: new ArduinoAnalog(adc, 5), digital: new ArduinoDigital(portC, 5), twi: this.twis[0]},  // Pin A5 / Pin 19 (SCL)
        ];
    }
}