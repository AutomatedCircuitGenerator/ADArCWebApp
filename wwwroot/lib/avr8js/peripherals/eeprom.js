"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVREEPROM = exports.eepromConfig = exports.EEPROMMemoryBackend = void 0;
class EEPROMMemoryBackend {
    constructor(size) {
        this.memory = new Uint8Array(size);
        this.memory.fill(0xff);
    }
    readMemory(addr) {
        return this.memory[addr];
    }
    writeMemory(addr, value) {
        this.memory[addr] &= value;
    }
    eraseMemory(addr) {
        this.memory[addr] = 0xff;
    }
}
exports.EEPROMMemoryBackend = EEPROMMemoryBackend;
exports.eepromConfig = {
    eepromReadyInterrupt: 0x2c,
    EECR: 0x3f,
    EEDR: 0x40,
    EEARL: 0x41,
    EEARH: 0x42,
    eraseCycles: 28800,
    writeCycles: 28800,
};
const EERE = 1 << 0;
const EEPE = 1 << 1;
const EEMPE = 1 << 2;
const EERIE = 1 << 3;
const EEPM0 = 1 << 4;
const EEPM1 = 1 << 5;
const EECR_WRITE_MASK = EEPE | EEMPE | EERIE | EEPM0 | EEPM1;
class AVREEPROM {
    constructor(cpu, backend, config = exports.eepromConfig) {
        this.cpu = cpu;
        this.backend = backend;
        this.config = config;
        this.writeEnabledCycles = 0;
        this.writeCompleteCycles = 0;
        this.EER = {
            address: this.config.eepromReadyInterrupt,
            flagRegister: this.config.EECR,
            flagMask: EEPE,
            enableRegister: this.config.EECR,
            enableMask: EERIE,
            constant: true,
            inverseFlag: true,
        };
        this.cpu.writeHooks[this.config.EECR] = (eecr) => {
            const { EEARH, EEARL, EECR, EEDR } = this.config;
            const addr = (this.cpu.data[EEARH] << 8) | this.cpu.data[EEARL];
            this.cpu.data[EECR] = (this.cpu.data[EECR] & ~EECR_WRITE_MASK) | (eecr & EECR_WRITE_MASK);
            this.cpu.updateInterruptEnable(this.EER, eecr);
            if (eecr & EERE) {
                this.cpu.clearInterrupt(this.EER);
            }
            if (eecr & EEMPE) {
                const eempeCycles = 4;
                this.writeEnabledCycles = this.cpu.cycles + eempeCycles;
                this.cpu.addClockEvent(() => {
                    this.cpu.data[EECR] &= ~EEMPE;
                }, eempeCycles);
            }
            if (eecr & EERE) {
                this.cpu.data[EEDR] = this.backend.readMemory(addr);
                this.cpu.cycles += 4;
                return true;
            }
            if (eecr & EEPE) {
                if (this.cpu.cycles >= this.writeEnabledCycles) {
                    this.cpu.data[EECR] &= ~EEPE;
                    return true;
                }
                if (this.cpu.cycles < this.writeCompleteCycles) {
                    return true;
                }
                const eedr = this.cpu.data[EEDR];
                this.writeCompleteCycles = this.cpu.cycles;
                if (!(eecr & EEPM1)) {
                    this.backend.eraseMemory(addr);
                    this.writeCompleteCycles += this.config.eraseCycles;
                }
                if (!(eecr & EEPM0)) {
                    this.backend.writeMemory(addr, eedr);
                    this.writeCompleteCycles += this.config.writeCycles;
                }
                this.cpu.data[EECR] |= EEPE;
                this.cpu.addClockEvent(() => {
                    this.cpu.setInterruptFlag(this.EER);
                }, this.writeCompleteCycles - this.cpu.cycles);
                this.cpu.cycles += 2;
            }
            return true;
        };
    }
}
exports.AVREEPROM = AVREEPROM;
//# sourceMappingURL=eeprom.js.map