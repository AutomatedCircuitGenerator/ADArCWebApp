"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVRSPI = exports.spiConfig = void 0;
const SPCR_SPIE = 0x80;
const SPCR_SPE = 0x40;
const SPCR_DORD = 0x20;
const SPCR_MSTR = 0x10;
const SPCR_CPOL = 0x8;
const SPCR_CPHA = 0x4;
const SPCR_SPR1 = 0x2;
const SPCR_SPR0 = 0x1;
const SPSR_SPR_MASK = SPCR_SPR1 | SPCR_SPR0;
const SPSR_SPIF = 0x80;
const SPSR_WCOL = 0x40;
const SPSR_SPI2X = 0x1;
exports.spiConfig = {
    spiInterrupt: 0x22,
    SPCR: 0x4c,
    SPSR: 0x4d,
    SPDR: 0x4e,
};
const bitsPerByte = 8;
class AVRSPI {
    constructor(cpu, config, freqHz) {
        this.cpu = cpu;
        this.config = config;
        this.freqHz = freqHz;
        this.onTransfer = () => 0;
        this.onByte = (value) => {
            this.listeners.forEach((onByteFn) => onByteFn(value));
        };
        this.transmissionActive = false;
        this.listeners = [];
        this.SPI = {
            address: this.config.spiInterrupt,
            flagRegister: this.config.SPSR,
            flagMask: SPSR_SPIF,
            enableRegister: this.config.SPCR,
            enableMask: SPCR_SPIE,
        };
        const { SPCR, SPSR, SPDR } = config;
        cpu.writeHooks[SPDR] = (value) => {
            if (!(cpu.data[SPCR] & SPCR_SPE)) {
                return;
            }
            if (this.transmissionActive) {
                cpu.data[SPSR] |= SPSR_WCOL;
                return true;
            }
            cpu.data[SPSR] &= ~SPSR_WCOL;
            this.cpu.clearInterrupt(this.SPI);
            this.transmissionActive = true;
            this.onByte(value);
            return true;
        };
        cpu.writeHooks[SPCR] = (value) => {
            this.cpu.updateInterruptEnable(this.SPI, value);
        };
        cpu.writeHooks[SPSR] = (value) => {
            this.cpu.data[SPSR] = value;
            this.cpu.clearInterruptByFlag(this.SPI, value);
        };
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    removeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }
    reset() {
        this.transmissionActive = false;
    }
    completeTransfer(receivedByte) {
        const { SPDR } = this.config;
        this.cpu.data[SPDR] = receivedByte;
        this.cpu.setInterruptFlag(this.SPI);
        this.transmissionActive = false;
    }
    get isMaster() {
        return this.cpu.data[this.config.SPCR] & SPCR_MSTR ? true : false;
    }
    get dataOrder() {
        return this.cpu.data[this.config.SPCR] & SPCR_DORD ? 'lsbFirst' : 'msbFirst';
    }
    get spiMode() {
        const CPHA = this.cpu.data[this.config.SPCR] & SPCR_CPHA;
        const CPOL = this.cpu.data[this.config.SPCR] & SPCR_CPOL;
        return ((CPHA ? 2 : 0) | (CPOL ? 1 : 0));
    }
    get clockDivider() {
        const base = this.cpu.data[this.config.SPSR] & SPSR_SPI2X ? 2 : 4;
        switch (this.cpu.data[this.config.SPCR] & SPSR_SPR_MASK) {
            case 0b00:
                return base;
            case 0b01:
                return base * 4;
            case 0b10:
                return base * 16;
            case 0b11:
                return base * 32;
        }
        throw new Error('Invalid divider value!');
    }
    get transferCycles() {
        return this.clockDivider * bitsPerByte;
    }
    get spiFrequency() {
        return this.freqHz / this.clockDivider;
    }
}
exports.AVRSPI = AVRSPI;
//# sourceMappingURL=spi.js.map