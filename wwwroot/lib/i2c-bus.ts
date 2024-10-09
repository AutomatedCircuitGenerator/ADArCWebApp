/**
 * I2CBus
 * Part of AVR8js
 *
 * Copyright (C) 2019, Uri Shaked
 */
import { AVRTWI, TWIEventHandler } from './avr8js/index';
import {DotNetObjectReference} from "@type-declarations/dotnet";
export interface I2CDevice {
    i2cConnect(addr: number, write: boolean): boolean;
    i2cReadByte(acked: boolean): number;
    i2cWriteByte(value: number): boolean;
    i2cDisconnect(): void;
    setStateReference(state: DotNetObjectReference): void;
}

export class I2CBus implements TWIEventHandler {
    private static _instance: I2CBus | null = null;
    
    readonly devices: { [key: number]: I2CDevice } = {};
    private activeDevice: I2CDevice | null = null;
    private writeMode = false;
    private twi: AVRTWI;
    
    private constructor() {}
    
    static getInstance() {
        if (!I2CBus._instance) {
            I2CBus._instance = new I2CBus();
        }
        return I2CBus._instance;
    }
    
    setTWI(twi: AVRTWI) {
        this.twi = twi;
    }

    registerDevice(addr: number, device: I2CDevice) {
        this.devices[addr] = device;
    }

    start(): void {
        this.twi.completeStart();
    }

    stop(): void {
        if (this.activeDevice) {
            this.activeDevice.i2cDisconnect();
            this.activeDevice = null;
        }
        this.twi.completeStop();
    }

    connectToSlave(addr: number, write: boolean): void {
        let result = false;
        const device = this.devices[addr];
        if (device) {
            result = device.i2cConnect(addr, write);
            if (result) {
                this.activeDevice = device;
                this.writeMode = write;
            }
        }
        this.twi.completeConnect(result);
    }

    writeByte(value: number): void {
        if (this.activeDevice && this.writeMode) {
            this.twi.completeWrite(this.activeDevice.i2cWriteByte(value));
        } else {
            this.twi.completeWrite(false);
        }
    }

    readByte(ack: boolean): void {
        if (this.activeDevice && !this.writeMode) {
            this.twi.completeRead(this.activeDevice.i2cReadByte(ack));
        } else {
            this.twi.completeRead(0xff);
        }
    }
}