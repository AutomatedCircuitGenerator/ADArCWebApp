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
    readonly controllers: { [key: number]: I2CController[] } = {};
    private activeController: I2CController | null = null;
    private writeMode = false;

    constructor(private twi: AVRTWI) {
        twi.eventHandler = this;
    }

    registerController(addr: number, device: I2CController) {
        if(!this.controllers[addr]){
            this.controllers[addr]=[];
        }
        this.controllers[addr].push(device);
    }

    unregisterController(addr:number, device:I2CController){
        const list=this.controllers[addr];
        if(!list) return;
        this.controllers[addr]=list.filter(d=>d!==device);
        if(this.controllers[addr].length==0){
            delete this.controllers[addr];
        }
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
        const list=this.controllers[addr];
        if(list){
            for(const device of list){
                if(device.i2cConnect(addr,write)){
                    this.activeController=device;
                    this.writeMode=write;
                    result=true;
                    break;
                }
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