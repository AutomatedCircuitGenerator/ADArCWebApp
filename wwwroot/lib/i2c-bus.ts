/**
 * I2CBus
 * Part of AVR8js
 *
 * Copyright (C) 2019, Uri Shaked
 */
import { AVRTWI, TWIEventHandler } from './avr8js/index';
export interface I2CController {
    i2cConnect(addr: number, write: boolean): boolean;
    i2cReadByte(acked: boolean): number;
    i2cWriteByte(value: number): boolean;
    i2cDisconnect(): void;
}

export class I2CBus implements TWIEventHandler {
    readonly controllers: { [key: number]: I2CController } = {};
    private activeController: I2CController | null = null;
    private writeMode = false;

    constructor(private twi: AVRTWI) {
        twi.eventHandler = this;
    }

    registerController(addr: number, device: I2CController) {
        this.controllers[addr] = device;
    }

    start(): void {
        this.twi.completeStart();
    }

    stop(): void {
        if (this.activeController) {
            this.activeController.i2cDisconnect();
            this.activeController = null;
        }
        this.twi.completeStop();
    }

    connectToSlave(addr: number, write: boolean): void {
        let result = false;
        const device = this.controllers[addr];
        if (device) {
            result = device.i2cConnect(addr, write);
            if (result) {
                this.activeController = device;
                this.writeMode = write;
            }
        }
        this.twi.completeConnect(result);
    }

    writeByte(value: number): void {
        if (this.activeController && this.writeMode) {
            this.twi.completeWrite(this.activeController.i2cWriteByte(value));
        } else {
            this.twi.completeWrite(false);
        }
    }

    readByte(ack: boolean): void {
        if (this.activeController && !this.writeMode) {
            this.twi.completeRead(this.activeController.i2cReadByte(ack));
        } else {
            this.twi.completeRead(0xff);
        }
    }
}