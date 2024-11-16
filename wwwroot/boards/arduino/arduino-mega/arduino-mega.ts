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
    CPU as AVRCPU, PinState, portBConfig, portCConfig, portDConfig, portKConfig,
    spiConfig as unoSpiConfig,
    portJConfig, portHConfig, portEConfig, portFConfig, portGConfig, portLConfig, portAConfig
} from "@lib/avr8js";
import {SPIByteTransferCallback} from "@lib/avr8js/peripherals/spi";
import {I2CController} from "@lib/i2c-bus";
import {
    spiConfig,
    timer0Config,
    timer1Config,
    timer2Config,
    timer3Config,
    timer4Config,
    timer5Config, twiConfig,
    usart0Config, usart1Config, usart2Config, usart3Config
} from "./configs";
import {
    ArduinoCPU,
    ArduinoDigital,
    ArduinoSPI,
    ArduinoTimer,
    ArduinoTWI,
    ArduinoUSART, MHZ
} from "../arduino";

export class ArduinoMega implements Board {
    cpu: CPU;
    spis: SPI[];
    timers: Timer[];
    twis: TWI[];
    usarts: USART[];

    pins: Interfaces[];

    static readonly FLASH = 0x40000;

    constructor(program: Uint16Array) {
        const avrCPU = new AVRCPU(program, 0x2200);
        // const adc = new AVRADC(avrCPU, adcConfig);
        const portA = new AVRIOPort(avrCPU, portAConfig);
        const portB = new AVRIOPort(avrCPU, portBConfig);
        const portC = new AVRIOPort(avrCPU, portCConfig);
        const portD = new AVRIOPort(avrCPU, portDConfig);
        const portE = new AVRIOPort(avrCPU, portEConfig);
        const portF = new AVRIOPort(avrCPU, portFConfig);
        const portG = new AVRIOPort(avrCPU, portGConfig);
        const portH = new AVRIOPort(avrCPU, portHConfig);
        const portJ = new AVRIOPort(avrCPU, portJConfig);
        const portK = new AVRIOPort(avrCPU, portKConfig);
        const portL = new AVRIOPort(avrCPU, portLConfig);

        this.cpu = new ArduinoCPU(avrCPU);
        // this.spis = [new ArduinoSPI(new AVRSPI(avrCPU, spiConfig, MHZ))];
        this.timers = [
            new ArduinoTimer(new AVRTimer(avrCPU, timer0Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer1Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer2Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer3Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer4Config)),
            new ArduinoTimer(new AVRTimer(avrCPU, timer5Config))
        ];
        this.twis = [new ArduinoTWI(new AVRTWI(avrCPU, twiConfig, MHZ))];
        this.usarts = [
            new ArduinoUSART(new AVRUSART(avrCPU, usart0Config, MHZ)),
            new ArduinoUSART(new AVRUSART(avrCPU, usart1Config, MHZ)),
            new ArduinoUSART(new AVRUSART(avrCPU, usart2Config, MHZ)),
            new ArduinoUSART(new AVRUSART(avrCPU, usart3Config, MHZ)),
        ];

        this.pins = [
            {digital: new ArduinoDigital(portE, 0)},  // Pin 0
            {digital: new ArduinoDigital(portE, 1)},  // Pin 1
            {digital: new ArduinoDigital(portE, 4)},  // Pin 2
            {digital: new ArduinoDigital(portE, 5)},  // Pin 3
            {digital: new ArduinoDigital(portG, 5)},  // Pin 4
            {digital: new ArduinoDigital(portE, 3)},  // Pin 5
            {digital: new ArduinoDigital(portH, 3)},  // Pin 6
            {digital: new ArduinoDigital(portH, 4)},  // Pin 7
            {digital: new ArduinoDigital(portH, 5)},  // Pin 8
            {digital: new ArduinoDigital(portH, 6)},  // Pin 9
            {digital: new ArduinoDigital(portB, 4)},  // Pin 10
            {digital: new ArduinoDigital(portB, 5)},  // Pin 11
            {digital: new ArduinoDigital(portB, 6)},  // Pin 12
            {digital: new ArduinoDigital(portB, 7)},  // Pin 13
            {digital: new ArduinoDigital(portJ, 1)},  // Pin 14
            {digital: new ArduinoDigital(portJ, 0)},  // Pin 15
            {digital: new ArduinoDigital(portH, 1)},  // Pin 16
            {digital: new ArduinoDigital(portH, 0)},  // Pin 17
            {digital: new ArduinoDigital(portD, 3)},  // Pin 18
            {digital: new ArduinoDigital(portD, 2)},  // Pin 19
            {digital: new ArduinoDigital(portD, 1)},  // Pin 20
            {digital: new ArduinoDigital(portD, 0)},  // Pin 21
            {digital: new ArduinoDigital(portA, 0)},  // Pin 22
            {digital: new ArduinoDigital(portA, 1)},  // Pin 23
            {digital: new ArduinoDigital(portA, 2)},  // Pin 24
            {digital: new ArduinoDigital(portA, 3)},  // Pin 25
            {digital: new ArduinoDigital(portA, 4)},  // Pin 26
            {digital: new ArduinoDigital(portA, 5)},  // Pin 27
            {digital: new ArduinoDigital(portA, 6)},  // Pin 28
            {digital: new ArduinoDigital(portA, 7)},  // Pin 29
            {digital: new ArduinoDigital(portC, 7)},  // Pin 30
            {digital: new ArduinoDigital(portC, 6)},  // Pin 31
            {digital: new ArduinoDigital(portC, 5)},  // Pin 32
            {digital: new ArduinoDigital(portC, 4)},  // Pin 33
            {digital: new ArduinoDigital(portC, 3)},  // Pin 34
            {digital: new ArduinoDigital(portC, 2)},  // Pin 35
            {digital: new ArduinoDigital(portC, 1)},  // Pin 36
            {digital: new ArduinoDigital(portC, 0)},  // Pin 37
            {digital: new ArduinoDigital(portD, 7)},  // Pin 38
            {digital: new ArduinoDigital(portG, 2)},  // Pin 39
            {digital: new ArduinoDigital(portG, 1)},  // Pin 40
            {digital: new ArduinoDigital(portG, 0)},  // Pin 41
            {digital: new ArduinoDigital(portL, 7)},  // Pin 42
            {digital: new ArduinoDigital(portL, 6)},  // Pin 43
            {digital: new ArduinoDigital(portL, 5)},  // Pin 44
            {digital: new ArduinoDigital(portL, 4)},  // Pin 45
            {digital: new ArduinoDigital(portL, 3)},  // Pin 46
            {digital: new ArduinoDigital(portL, 2)},  // Pin 47
            {digital: new ArduinoDigital(portL, 1)},  // Pin 48
            {digital: new ArduinoDigital(portL, 0)},  // Pin 49
            {digital: new ArduinoDigital(portB, 3)},  // Pin 50
            {digital: new ArduinoDigital(portB, 2)},  // Pin 51
            {digital: new ArduinoDigital(portB, 1)},  // Pin 52
            {digital: new ArduinoDigital(portB, 0)},  // Pin 53
            {digital: new ArduinoDigital(portF, 0)},  // Pin 54
            {digital: new ArduinoDigital(portF, 1)},  // Pin 55
            {digital: new ArduinoDigital(portF, 2)},  // Pin 56
            {digital: new ArduinoDigital(portF, 3)},  // Pin 57
            {digital: new ArduinoDigital(portF, 4)},  // Pin 58
            {digital: new ArduinoDigital(portF, 5)},  // Pin 59
            {digital: new ArduinoDigital(portF, 6)},  // Pin 60
            {digital: new ArduinoDigital(portF, 7)},  // Pin 61
            {digital: new ArduinoDigital(portK, 0)},  // Pin 62
            {digital: new ArduinoDigital(portK, 1)},  // Pin 63
            {digital: new ArduinoDigital(portK, 2)},  // Pin 64
            {digital: new ArduinoDigital(portK, 3)},  // Pin 65
            {digital: new ArduinoDigital(portK, 4)},  // Pin 66
            {digital: new ArduinoDigital(portK, 5)},  // Pin 67
            {digital: new ArduinoDigital(portK, 6)},  // Pin 68
            {digital: new ArduinoDigital(portK, 7)},  // Pin 69
        ];
    }
}