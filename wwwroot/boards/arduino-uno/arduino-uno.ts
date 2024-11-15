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
} from "../board";
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

const MHZ = 16e6;

export class ArduinoUno implements Board {
    cpu: CPU;
    spis: SPI[];
    timers: Timer[];
    twis: TWI[];
    usarts: USART[];

    pins: Interfaces[];

    constructor(program: Uint16Array) {
        const avrCPU = new AVRCPU(program);
        const adc = new AVRADC(avrCPU, adcConfig);
        const portB = new AVRIOPort(avrCPU, portBConfig);
        const portC = new AVRIOPort(avrCPU, portCConfig);
        const portD = new AVRIOPort(avrCPU, portDConfig);

        this.cpu = new ArduinoUnoCPU(avrCPU);
        this.spis = [new ArduinoUnoSPI(new AVRSPI(avrCPU, spiConfig, MHZ))];
        this.timers = [new ArduinoUnoTimer(new AVRTimer(avrCPU, timer0Config)),
            new ArduinoUnoTimer(new AVRTimer(avrCPU, timer1Config)),
            new ArduinoUnoTimer(new AVRTimer(avrCPU, timer2Config))];
        this.twis = [new ArduinoUnoTWI(new AVRTWI(avrCPU, twiConfig, MHZ))];
        this.usarts = [new ArduinoUnoUSART(new AVRUSART(avrCPU, usart0Config, MHZ))];

        this.pins = [
            {digital: new ArduinoUnoDigital(portD, 0), usart: this.usarts[0]},  // Pin 0 (RX)
            {digital: new ArduinoUnoDigital(portD, 1), usart: this.usarts[0]},  // Pin 1 (TX)
            {digital: new ArduinoUnoDigital(portD, 2)},  // Pin 2
            {digital: new ArduinoUnoDigital(portD, 3)},  // Pin 3
            {digital: new ArduinoUnoDigital(portD, 4)},  // Pin 4
            {digital: new ArduinoUnoDigital(portD, 5)},  // Pin 5
            {digital: new ArduinoUnoDigital(portD, 6)},  // Pin 6
            {digital: new ArduinoUnoDigital(portD, 7)},  // Pin 7
            {digital: new ArduinoUnoDigital(portB, 0)},  // Pin 8
            {digital: new ArduinoUnoDigital(portB, 1)},  // Pin 9
            {digital: new ArduinoUnoDigital(portB, 2)},  // Pin 10
            {digital: new ArduinoUnoDigital(portB, 3)},  // Pin 11
            {digital: new ArduinoUnoDigital(portB, 4)},  // Pin 12
            {digital: new ArduinoUnoDigital(portB, 5)},  // Pin 13
            {analog: new ArduinoUnoAnalog(adc, 0), digital: new ArduinoUnoDigital(portC, 0)},  // Pin A0 / Pin 14
            {analog: new ArduinoUnoAnalog(adc, 1), digital: new ArduinoUnoDigital(portC, 1)},  // Pin A1 / Pin 15
            {analog: new ArduinoUnoAnalog(adc, 2), digital: new ArduinoUnoDigital(portC, 2)},  // Pin A2 / Pin 16
            {analog: new ArduinoUnoAnalog(adc, 3), digital: new ArduinoUnoDigital(portC, 3)},  // Pin A3 / Pin 17
            {analog: new ArduinoUnoAnalog(adc, 4), digital: new ArduinoUnoDigital(portC, 4), twi: this.twis[0]},  // Pin A4 / Pin 18 (SDA)
            {analog: new ArduinoUnoAnalog(adc, 5), digital: new ArduinoUnoDigital(portC, 5), twi: this.twis[0]},  // Pin A5 / Pin 19 (SCL)
        ];
    }
}

export class ArduinoUnoCPU implements CPU {
    private readonly cpu: AVRCPU;

    constructor(cpu: AVRCPU) {
        this.cpu = cpu;
    }

    clock(): void {
        avrInstruction(this.cpu);
        this.cpu.tick();
    }

    get cycles(): number {
        return this.cpu.cycles;
    }

    get frequency(): number {
        return MHZ;
    }

    addClockEvent(callback: ClockEvent, cycles: number): void {
        this.cpu.addClockEvent(callback, cycles);
    }
}

export class ArduinoUnoSPI implements SPI {
    private spi: AVRSPI;

    constructor(spi: AVRSPI) {
        this.spi = spi;
    }

    addListener(listener: SPIByteTransferCallback): void {
        this.spi.addListener(listener);
    }

    removeListener(listener: SPIByteTransferCallback): void {
        this.spi.removeListener(listener);
    }

    completeTransfer(receivedByte: number): void {
        this.spi.completeTransfer(receivedByte);
    }

    get transferCycles(): number {
        return this.spi.transferCycles;
    }
}

export class ArduinoUnoTimer implements Timer {
    private timer: AVRTimer;

    constructor(timer: AVRTimer) {
        this.timer = timer;
    }
}

export class ArduinoUnoTWI implements TWI {
    private twi: AVRTWI;

    constructor(twi: AVRTWI) {
        this.twi = twi;
    }

    registerController(addr: number, device: I2CController): void {
        this.twi.eventHandler.registerController(addr, device);
    }
}

export class ArduinoUnoUSART implements USART {
    private usart: AVRUSART;

    constructor(usart: AVRUSART) {
        this.usart = usart;
    }

    set onByteTransmit(listener: ByteTransmitListener) {
        this.usart.onByteTransmit = listener;
    }
}

export class ArduinoUnoDigital implements Digital {
    private port: AVRIOPort;
    private readonly index: number;
    private previousState: PinState;

    get state(): PinState {
        return this.port.pinState(this.index);
    }

    addListener(listener: PinListener): void {
        this.port.addListener(() => {
            let state = this.port.pinState(this.index);

            if (state !== this.previousState) {
                listener(state);
            }

            this.previousState = state;
        });
    }

    set state(state: boolean) {
        this.port.setPin(this.index, state);
    }

    constructor(port: AVRIOPort, index: number) {
        this.port = port;
        this.index = index;
    }
}

export class ArduinoUnoAnalog implements Analog {
    private adc: AVRADC;
    private readonly channel: number;

    get voltage(): number {
        return this.adc.channelValues[this.channel];
    }

    set voltage(voltage: number) {
        this.adc.channelValues[this.channel] = voltage;
    }

    constructor(adc: AVRADC, channel: number) {
        this.adc = adc;
        this.channel = channel;
    }
}