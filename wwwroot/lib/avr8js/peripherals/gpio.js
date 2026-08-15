"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVRIOPort = exports.PinOverrideMode = exports.PinState = exports.portLConfig = exports.portKConfig = exports.portJConfig = exports.portHConfig = exports.portGConfig = exports.portFConfig = exports.portEConfig = exports.portDConfig = exports.portCConfig = exports.portBConfig = exports.portAConfig = exports.PCINT2 = exports.PCINT1 = exports.PCINT0 = exports.INT5 = exports.INT4 = exports.INT1 = exports.INT0 = void 0;
exports.INT0 = {
    EICR: 0x69,
    EIMSK: 0x3d,
    EIFR: 0x3c,
    index: 0,
    iscOffset: 0,
    interrupt: 2,
};
exports.INT1 = {
    EICR: 0x69,
    EIMSK: 0x3d,
    EIFR: 0x3c,
    index: 1,
    iscOffset: 2,
    interrupt: 4,
};
exports.INT4 = {
    EICR: 0x6a,
    EIMSK: 0x3d,
    EIFR: 0x3c,
    index: 4,
    iscOffset: 0,
    interrupt: 10,
};
exports.INT5 = {
    EICR: 0x6a,
    EIMSK: 0x3d,
    EIFR: 0x3c,
    index: 5,
    iscOffset: 2,
    interrupt: 12,
};
exports.PCINT0 = {
    PCIE: 0,
    PCICR: 0x68,
    PCIFR: 0x3b,
    PCMSK: 0x6b,
    pinChangeInterrupt: 6,
    mask: 0xff,
    offset: 0,
};
exports.PCINT1 = {
    PCIE: 1,
    PCICR: 0x68,
    PCIFR: 0x3b,
    PCMSK: 0x6c,
    pinChangeInterrupt: 8,
    mask: 0xff,
    offset: 0,
};
exports.PCINT2 = {
    PCIE: 2,
    PCICR: 0x68,
    PCIFR: 0x3b,
    PCMSK: 0x6d,
    pinChangeInterrupt: 10,
    mask: 0xff,
    offset: 0,
};
exports.portAConfig = {
    PIN: 0x20,
    DDR: 0x21,
    PORT: 0x22,
    externalInterrupts: [],
};
exports.portBConfig = {
    PIN: 0x23,
    DDR: 0x24,
    PORT: 0x25,
    pinChange: exports.PCINT0,
    externalInterrupts: [],
};
exports.portCConfig = {
    PIN: 0x26,
    DDR: 0x27,
    PORT: 0x28,
    pinChange: exports.PCINT1,
    externalInterrupts: [],
};
exports.portDConfig = {
    PIN: 0x29,
    DDR: 0x2a,
    PORT: 0x2b,
    pinChange: exports.PCINT2,
    externalInterrupts: [null, null, exports.INT0, exports.INT1],
};
exports.portEConfig = {
    PIN: 0x2c,
    DDR: 0x2d,
    PORT: 0x2e,
    externalInterrupts: [null, null, null, null, exports.INT4, exports.INT5],
};
exports.portFConfig = {
    PIN: 0x2f,
    DDR: 0x30,
    PORT: 0x31,
    externalInterrupts: [],
};
exports.portGConfig = {
    PIN: 0x32,
    DDR: 0x33,
    PORT: 0x34,
    externalInterrupts: [],
};
exports.portHConfig = {
    PIN: 0x100,
    DDR: 0x101,
    PORT: 0x102,
    externalInterrupts: [],
};
exports.portJConfig = {
    PIN: 0x103,
    DDR: 0x104,
    PORT: 0x105,
    externalInterrupts: [],
};
exports.portKConfig = {
    PIN: 0x106,
    DDR: 0x107,
    PORT: 0x108,
    externalInterrupts: [],
};
exports.portLConfig = {
    PIN: 0x109,
    DDR: 0x10a,
    PORT: 0x10b,
    externalInterrupts: [],
};
var PinState;
(function (PinState) {
    PinState[PinState["Low"] = 0] = "Low";
    PinState[PinState["High"] = 1] = "High";
    PinState[PinState["Input"] = 2] = "Input";
    PinState[PinState["InputPullUp"] = 3] = "InputPullUp";
})(PinState || (exports.PinState = PinState = {}));
var PinOverrideMode;
(function (PinOverrideMode) {
    PinOverrideMode[PinOverrideMode["None"] = 0] = "None";
    PinOverrideMode[PinOverrideMode["Enable"] = 1] = "Enable";
    PinOverrideMode[PinOverrideMode["Set"] = 2] = "Set";
    PinOverrideMode[PinOverrideMode["Clear"] = 3] = "Clear";
    PinOverrideMode[PinOverrideMode["Toggle"] = 4] = "Toggle";
})(PinOverrideMode || (exports.PinOverrideMode = PinOverrideMode = {}));
var InterruptMode;
(function (InterruptMode) {
    InterruptMode[InterruptMode["LowLevel"] = 0] = "LowLevel";
    InterruptMode[InterruptMode["Change"] = 1] = "Change";
    InterruptMode[InterruptMode["FallingEdge"] = 2] = "FallingEdge";
    InterruptMode[InterruptMode["RisingEdge"] = 3] = "RisingEdge";
})(InterruptMode || (InterruptMode = {}));
class AVRIOPort {
    constructor(cpu, portConfig) {
        var _a, _b;
        var _c, _d;
        this.cpu = cpu;
        this.portConfig = portConfig;
        this.externalClockListeners = [];
        this.listeners = [];
        this.pinValue = 0;
        this.overrideMask = 0xff;
        this.overrideValue = 0;
        this.lastValue = 0;
        this.lastDdr = 0;
        this.lastPin = 0;
        this.openCollector = 0;
        cpu.gpioPorts.add(this);
        cpu.gpioByPort[portConfig.PORT] = this;
        cpu.writeHooks[portConfig.DDR] = (value) => {
            const portValue = cpu.data[portConfig.PORT];
            cpu.data[portConfig.DDR] = value;
            this.writeGpio(portValue, value);
            this.updatePinRegister(value);
            return true;
        };
        cpu.writeHooks[portConfig.PORT] = (value) => {
            const ddrMask = cpu.data[portConfig.DDR];
            cpu.data[portConfig.PORT] = value;
            this.writeGpio(value, ddrMask);
            this.updatePinRegister(ddrMask);
            return true;
        };
        cpu.writeHooks[portConfig.PIN] = (value, oldValue, addr, mask) => {
            const oldPortValue = cpu.data[portConfig.PORT];
            const ddrMask = cpu.data[portConfig.DDR];
            const portValue = oldPortValue ^ (value & mask);
            cpu.data[portConfig.PORT] = portValue;
            this.writeGpio(portValue, ddrMask);
            this.updatePinRegister(ddrMask);
            return true;
        };
        const { externalInterrupts } = portConfig;
        this.externalInts = externalInterrupts.map((externalConfig) => externalConfig
            ? {
                address: externalConfig.interrupt,
                flagRegister: externalConfig.EIFR,
                flagMask: 1 << externalConfig.index,
                enableRegister: externalConfig.EIMSK,
                enableMask: 1 << externalConfig.index,
            }
            : null);
        const EICR = new Set(externalInterrupts.map((item) => item === null || item === void 0 ? void 0 : item.EICR));
        for (const EICRx of EICR) {
            this.attachInterruptHook(EICRx || 0);
        }
        const EIMSK = (_c = (_a = externalInterrupts.find((item) => item && item.EIMSK)) === null || _a === void 0 ? void 0 : _a.EIMSK) !== null && _c !== void 0 ? _c : 0;
        this.attachInterruptHook(EIMSK, 'mask');
        const EIFR = (_d = (_b = externalInterrupts.find((item) => item && item.EIFR)) === null || _b === void 0 ? void 0 : _b.EIFR) !== null && _d !== void 0 ? _d : 0;
        this.attachInterruptHook(EIFR, 'flag');
        const { pinChange } = portConfig;
        this.PCINT = pinChange
            ? {
                address: pinChange.pinChangeInterrupt,
                flagRegister: pinChange.PCIFR,
                flagMask: 1 << pinChange.PCIE,
                enableRegister: pinChange.PCICR,
                enableMask: 1 << pinChange.PCIE,
            }
            : null;
        if (pinChange) {
            const { PCIFR, PCMSK } = pinChange;
            cpu.writeHooks[PCIFR] = (value) => {
                for (const gpio of this.cpu.gpioPorts) {
                    const { PCINT } = gpio;
                    if (PCINT) {
                        cpu.clearInterruptByFlag(PCINT, value);
                    }
                }
                return true;
            };
            cpu.writeHooks[PCMSK] = (value) => {
                cpu.data[PCMSK] = value;
                for (const gpio of this.cpu.gpioPorts) {
                    const { PCINT } = gpio;
                    if (PCINT) {
                        cpu.updateInterruptEnable(PCINT, value);
                    }
                }
                return true;
            };
        }
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    removeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }
    pinState(index) {
        const ddr = this.cpu.data[this.portConfig.DDR];
        const port = this.cpu.data[this.portConfig.PORT];
        const bitMask = 1 << index;
        const openState = port & bitMask ? PinState.InputPullUp : PinState.Input;
        const highValue = this.openCollector & bitMask ? openState : PinState.High;
        if (ddr & bitMask) {
            return this.lastValue & bitMask ? highValue : PinState.Low;
        }
        else {
            return openState;
        }
    }
    setPin(index, value) {
        const bitMask = 1 << index;
        this.pinValue &= ~bitMask;
        if (value) {
            this.pinValue |= bitMask;
        }
        this.updatePinRegister(this.cpu.data[this.portConfig.DDR]);
    }
    timerOverridePin(pin, mode) {
        const { cpu, portConfig } = this;
        const pinMask = 1 << pin;
        if (mode === PinOverrideMode.None) {
            this.overrideMask |= pinMask;
            this.overrideValue &= ~pinMask;
        }
        else {
            this.overrideMask &= ~pinMask;
            switch (mode) {
                case PinOverrideMode.Enable:
                    this.overrideValue &= ~pinMask;
                    this.overrideValue |= cpu.data[portConfig.PORT] & pinMask;
                    break;
                case PinOverrideMode.Set:
                    this.overrideValue |= pinMask;
                    break;
                case PinOverrideMode.Clear:
                    this.overrideValue &= ~pinMask;
                    break;
                case PinOverrideMode.Toggle:
                    this.overrideValue ^= pinMask;
                    break;
            }
        }
        const ddrMask = cpu.data[portConfig.DDR];
        this.writeGpio(cpu.data[portConfig.PORT], ddrMask);
        this.updatePinRegister(ddrMask);
    }
    updatePinRegister(ddr) {
        var _a, _b;
        const newPin = (this.pinValue & ~ddr) | (this.lastValue & ddr);
        this.cpu.data[this.portConfig.PIN] = newPin;
        if (this.lastPin !== newPin) {
            for (let index = 0; index < 8; index++) {
                if ((newPin & (1 << index)) !== (this.lastPin & (1 << index))) {
                    const value = !!(newPin & (1 << index));
                    this.toggleInterrupt(index, value);
                    (_b = (_a = this.externalClockListeners)[index]) === null || _b === void 0 ? void 0 : _b.call(_a, value);
                }
            }
            this.lastPin = newPin;
        }
    }
    toggleInterrupt(pin, risingEdge) {
        const { cpu, portConfig, externalInts, PCINT } = this;
        const { externalInterrupts, pinChange } = portConfig;
        const externalConfig = externalInterrupts[pin];
        const external = externalInts[pin];
        if (external && externalConfig) {
            const { EIMSK, index, EICR, iscOffset } = externalConfig;
            if (cpu.data[EIMSK] & (1 << index)) {
                const configuration = (cpu.data[EICR] >> iscOffset) & 0x3;
                let generateInterrupt = false;
                external.constant = false;
                switch (configuration) {
                    case InterruptMode.LowLevel:
                        generateInterrupt = !risingEdge;
                        external.constant = true;
                        break;
                    case InterruptMode.Change:
                        generateInterrupt = true;
                        break;
                    case InterruptMode.FallingEdge:
                        generateInterrupt = !risingEdge;
                        break;
                    case InterruptMode.RisingEdge:
                        generateInterrupt = risingEdge;
                        break;
                }
                if (generateInterrupt) {
                    cpu.setInterruptFlag(external);
                }
                else if (external.constant) {
                    cpu.clearInterrupt(external, true);
                }
            }
        }
        if (pinChange && PCINT && pinChange.mask & (1 << pin)) {
            const { PCMSK } = pinChange;
            if (cpu.data[PCMSK] & (1 << (pin + pinChange.offset))) {
                cpu.setInterruptFlag(PCINT);
            }
        }
    }
    attachInterruptHook(register, registerType = 'other') {
        if (!register) {
            return;
        }
        const { cpu } = this;
        cpu.writeHooks[register] = (value) => {
            if (registerType !== 'flag') {
                cpu.data[register] = value;
            }
            for (const gpio of cpu.gpioPorts) {
                for (const external of gpio.externalInts) {
                    if (external && registerType === 'mask') {
                        cpu.updateInterruptEnable(external, value);
                    }
                    if (external && !external.constant && registerType === 'flag') {
                        cpu.clearInterruptByFlag(external, value);
                    }
                }
                gpio.checkExternalInterrupts();
            }
            return true;
        };
    }
    checkExternalInterrupts() {
        const { cpu } = this;
        const { externalInterrupts } = this.portConfig;
        for (let pin = 0; pin < 8; pin++) {
            const external = externalInterrupts[pin];
            if (!external) {
                continue;
            }
            const pinValue = !!(this.lastPin & (1 << pin));
            const { EIFR, EIMSK, index, EICR, iscOffset, interrupt } = external;
            if (!(cpu.data[EIMSK] & (1 << index)) || pinValue) {
                continue;
            }
            const configuration = (cpu.data[EICR] >> iscOffset) & 0x3;
            if (configuration === InterruptMode.LowLevel) {
                cpu.queueInterrupt({
                    address: interrupt,
                    flagRegister: EIFR,
                    flagMask: 1 << index,
                    enableRegister: EIMSK,
                    enableMask: 1 << index,
                    constant: true,
                });
            }
        }
    }
    writeGpio(value, ddr) {
        const newValue = (((value & this.overrideMask) | this.overrideValue) & ddr) | (value & ~ddr);
        const prevValue = this.lastValue;
        if (newValue !== prevValue || ddr !== this.lastDdr) {
            this.lastValue = newValue;
            this.lastDdr = ddr;
            for (const listener of this.listeners) {
                listener(newValue, prevValue);
            }
        }
    }
}
exports.AVRIOPort = AVRIOPort;
//# sourceMappingURL=gpio.js.map