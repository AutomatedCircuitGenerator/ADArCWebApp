﻿import {PinState} from "@lib/avr8js";
import {I2CController} from "@lib/i2c-bus";
import {SPIByteTransferCallback} from "@lib/avr8js/peripherals/spi";
import {u8} from "@lib/avr8js/types";

export type PinListener = (state: PinState) => void;
export type ClockEvent = () => void;
export type ByteTransmitListener = (value: u8) => void;

export interface Board {
    cpu: CPU;
    timers: Timer[];
    usarts: USART[];
    twis: TWI[];
    spis: SPI[];
    pins: Interfaces[];
}

export type Interfaces = {
    digital?: Digital,
    analog?: Analog,
    usart?: USART,
    spi?: SPI,
    twi?: TWI,
    timer?: Timer,
}

export interface BoardConstructor {
    new(program: Uint16Array): Board;

    readonly FLASH: number;
}

export interface CPU {
    get frequency(): number;

    get cycles(): number;

    clock: () => void;
    addClockEvent: (callback: ClockEvent, cycles: number) => void;
}

export interface Timer {
    // Returns the number of cycles per pwm period. Value of 0 indicates a pwm mode that hasnt been implimented yet
    getPwmPeriod(): number;
}

export interface Digital {
    get state(): PinState;

    set state(state: boolean);

    addListener(listener: PinListener): void;
}

export interface Analog {
    get voltage(): number;

    set voltage(voltage: number);
}

export interface USART {
    set onByteTransmit(listener: ByteTransmitListener);

    writeByte(value: number, immediate: boolean): boolean;
}

export interface TWI {
    registerController(addr: number, device: I2CController): void;
}

export interface SPI {
    addListener(listener: SPIByteTransferCallback): void;

    removeListener(listener: SPIByteTransferCallback): void;

    completeTransfer(receivedByte: number): void;

    get transferCycles(): number;
}

export interface ADC {
    get channelValues(): number[];
}

