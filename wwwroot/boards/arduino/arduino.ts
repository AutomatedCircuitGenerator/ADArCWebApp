import {
    AVRADC,
    avrInstruction,
    AVRIOPort,
    AVRSPI,
    AVRTimer,
    AVRTWI,
    AVRUSART,
    CPU as AVRCPU,
    PinState
} from "@lib/avr8js";
import {TimerMode} from "@lib/avr8js/peripherals/timer";
import {SPIByteTransferCallback} from "@lib/avr8js/peripherals/spi";
import {I2CController} from "@lib/i2c-bus";
import {Analog, ByteTransmitListener, ClockEvent, CPU, Digital, PinListener, SPI, Timer, TWI, USART} from "../board";

export const MHZ = 16e6;

export class ArduinoCPU implements CPU {
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

export class ArduinoSPI implements SPI {
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

export class ArduinoTimer implements Timer {
    private timer: AVRTimer;

    constructor(timer: AVRTimer) {
        this.timer = timer;
    }

    getPwmPeriod(): number {
        const {timer} = this;
        const timerMode = timer.getTimerMode();
        let period = 0;

        if (timerMode === TimerMode.FastPWM) {
            period = ((timer.TOP + 1) * timer.getDivider());
        } else if (timerMode === TimerMode.PWMPhaseCorrect) {
            period = (2 * (timer.TOP + 1) * timer.getDivider());
        }
        return period;
    }
}

export class ArduinoTWI implements TWI {
    private twi: AVRTWI;

    constructor(twi: AVRTWI) {
        this.twi = twi;
    }

    registerController(addr: number, device: I2CController): void {
        this.twi.eventHandler.registerController(addr, device);
    }
}

export class ArduinoUSART implements USART {
    private usart: AVRUSART;

    constructor(usart: AVRUSART) {
        this.usart = usart;
    }

    set onByteTransmit(listener: ByteTransmitListener) {
        this.usart.onByteTransmit = listener;
    }

    writeByte(value: number, immediate: boolean = false): boolean {
        return this.usart.writeByte(value, immediate);
    }
}

export class ArduinoDigital implements Digital {
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

export class ArduinoAnalog implements Analog {
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