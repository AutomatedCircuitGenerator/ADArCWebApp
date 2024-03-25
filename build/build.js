var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("lib/TimingPacket", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PinInstruction = exports.TimingPacket = void 0;
    class TimingPacket {
        constructor(originCycle, instructions) {
            this.originCycle = originCycle;
            this.instructions = instructions.sort((a, b) => a.cyclesSinceOrigin - b.cyclesSinceOrigin);
        }
        static fix(other) {
            return new TimingPacket(other.originCycle, other.instructions);
        }
    }
    exports.TimingPacket = TimingPacket;
    class PinInstruction {
        constructor(isOn, pin, cumulUsSinceOriginCycle, cyclesSinceOrigin) {
            this.isOn = isOn;
            this.pin = pin;
            this.cumulUsSinceOriginCycle = cumulUsSinceOriginCycle;
            this.cyclesSinceOrigin = cyclesSinceOrigin;
        }
    }
    exports.PinInstruction = PinInstruction;
});
define("lib/compile-util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildHex = exports.loadHex = void 0;
    function loadHex(source, target) {
        for (const line of source.split('\n')) {
            if (line[0] === ':' && line.substr(7, 2) === '00') {
                const bytes = parseInt(line.substr(1, 2), 16);
                const addr = parseInt(line.substr(3, 4), 16);
                for (let i = 0; i < bytes; i++) {
                    target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
                }
            }
        }
    }
    exports.loadHex = loadHex;
    const url = 'https://hexi.wokwi.com';
    function buildHex(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(url + '/build', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sketch: source })
            });
            return (yield resp.json());
        });
    }
    exports.buildHex = buildHex;
});
define("lib/avr8js/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("lib/avr8js/peripherals/gpio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRIOPort = exports.PinOverrideMode = exports.PinState = exports.portLConfig = exports.portKConfig = exports.portJConfig = exports.portHConfig = exports.portGConfig = exports.portFConfig = exports.portEConfig = exports.portDConfig = exports.portCConfig = exports.portBConfig = exports.portAConfig = exports.PCINT2 = exports.PCINT1 = exports.PCINT0 = exports.INT1 = exports.INT0 = void 0;
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
        externalInterrupts: [],
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
            var _a, _b, _c, _d;
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
            const EIMSK = (_b = (_a = externalInterrupts.find((item) => item && item.EIMSK)) === null || _a === void 0 ? void 0 : _a.EIMSK) !== null && _b !== void 0 ? _b : 0;
            this.attachInterruptHook(EIMSK, 'mask');
            const EIFR = (_d = (_c = externalInterrupts.find((item) => item && item.EIFR)) === null || _c === void 0 ? void 0 : _c.EIFR) !== null && _d !== void 0 ? _d : 0;
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
});
define("lib/avr8js/cpu/interrupt", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avrInterrupt = void 0;
    function avrInterrupt(cpu, addr) {
        const sp = cpu.dataView.getUint16(93, true);
        cpu.data[sp] = cpu.pc & 0xff;
        cpu.data[sp - 1] = (cpu.pc >> 8) & 0xff;
        if (cpu.pc22Bits) {
            cpu.data[sp - 2] = (cpu.pc >> 16) & 0xff;
        }
        cpu.dataView.setUint16(93, sp - (cpu.pc22Bits ? 3 : 2), true);
        cpu.data[95] &= 0x7f;
        cpu.cycles += 2;
        cpu.pc = addr;
    }
    exports.avrInterrupt = avrInterrupt;
});
define("lib/avr8js/cpu/cpu", ["require", "exports", "lib/avr8js/cpu/interrupt"], function (require, exports, interrupt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CPU = void 0;
    const registerSpace = 0x100;
    const MAX_INTERRUPTS = 128;
    class CPU {
        constructor(progMem, sramBytes = 8192) {
            this.progMem = progMem;
            this.sramBytes = sramBytes;
            this.data = new Uint8Array(this.sramBytes + registerSpace);
            this.data16 = new Uint16Array(this.data.buffer);
            this.dataView = new DataView(this.data.buffer);
            this.progBytes = new Uint8Array(this.progMem.buffer);
            this.readHooks = [];
            this.writeHooks = [];
            this.pendingInterrupts = new Array(MAX_INTERRUPTS);
            this.nextClockEvent = null;
            this.clockEventPool = [];
            this.pc22Bits = this.progBytes.length > 0x20000;
            this.gpioPorts = new Set();
            this.gpioByPort = [];
            this.onWatchdogReset = () => {
            };
            this.pc = 0;
            this.cycles = 0;
            this.nextInterrupt = -1;
            this.maxInterrupt = 0;
            this.reset();
        }
        reset() {
            this.SP = this.data.length - 1;
            this.pc = 0;
            this.pendingInterrupts.fill(null);
            this.nextInterrupt = -1;
            this.nextClockEvent = null;
        }
        readData(addr) {
            if (addr >= 32 && this.readHooks[addr]) {
                return this.readHooks[addr](addr);
            }
            return this.data[addr];
        }
        writeData(addr, value, mask = 0xff) {
            const hook = this.writeHooks[addr];
            if (hook) {
                if (hook(value, this.data[addr], addr, mask)) {
                    return;
                }
            }
            this.data[addr] = value;
        }
        get SP() {
            return this.dataView.getUint16(93, true);
        }
        set SP(value) {
            this.dataView.setUint16(93, value, true);
        }
        get SREG() {
            return this.data[95];
        }
        get interruptsEnabled() {
            return this.SREG & 0x80 ? true : false;
        }
        setInterruptFlag(interrupt) {
            const { flagRegister, flagMask, enableRegister, enableMask } = interrupt;
            if (interrupt.inverseFlag) {
                this.data[flagRegister] &= ~flagMask;
            }
            else {
                this.data[flagRegister] |= flagMask;
            }
            if (this.data[enableRegister] & enableMask) {
                this.queueInterrupt(interrupt);
            }
        }
        updateInterruptEnable(interrupt, registerValue) {
            const { enableMask, flagRegister, flagMask, inverseFlag } = interrupt;
            if (registerValue & enableMask) {
                const bitSet = this.data[flagRegister] & flagMask;
                if (inverseFlag ? !bitSet : bitSet) {
                    this.queueInterrupt(interrupt);
                }
            }
            else {
                this.clearInterrupt(interrupt, false);
            }
        }
        queueInterrupt(interrupt) {
            const { address } = interrupt;
            this.pendingInterrupts[address] = interrupt;
            if (this.nextInterrupt === -1 || this.nextInterrupt > address) {
                this.nextInterrupt = address;
            }
            if (address > this.maxInterrupt) {
                this.maxInterrupt = address;
            }
        }
        clearInterrupt({ address, flagRegister, flagMask }, clearFlag = true) {
            if (clearFlag) {
                this.data[flagRegister] &= ~flagMask;
            }
            const { pendingInterrupts, maxInterrupt } = this;
            if (!pendingInterrupts[address]) {
                return;
            }
            pendingInterrupts[address] = null;
            if (this.nextInterrupt === address) {
                this.nextInterrupt = -1;
                for (let i = address + 1; i <= maxInterrupt; i++) {
                    if (pendingInterrupts[i]) {
                        this.nextInterrupt = i;
                        break;
                    }
                }
            }
        }
        clearInterruptByFlag(interrupt, registerValue) {
            const { flagRegister, flagMask } = interrupt;
            if (registerValue & flagMask) {
                this.data[flagRegister] &= ~flagMask;
                this.clearInterrupt(interrupt);
            }
        }
        addClockEvent(callback, cycles) {
            const { clockEventPool } = this;
            cycles = this.cycles + Math.max(1, cycles);
            const maybeEntry = clockEventPool.pop();
            const entry = maybeEntry !== null && maybeEntry !== void 0 ? maybeEntry : { cycles, callback, next: null };
            entry.cycles = cycles;
            entry.callback = callback;
            let { nextClockEvent: clockEvent } = this;
            let lastItem = null;
            while (clockEvent && clockEvent.cycles < cycles) {
                lastItem = clockEvent;
                clockEvent = clockEvent.next;
            }
            if (lastItem) {
                lastItem.next = entry;
                entry.next = clockEvent;
            }
            else {
                this.nextClockEvent = entry;
                entry.next = clockEvent;
            }
            return callback;
        }
        updateClockEvent(callback, cycles) {
            if (this.clearClockEvent(callback)) {
                this.addClockEvent(callback, cycles);
                return true;
            }
            return false;
        }
        clearClockEvent(callback) {
            let { nextClockEvent: clockEvent } = this;
            if (!clockEvent) {
                return false;
            }
            const { clockEventPool } = this;
            let lastItem = null;
            while (clockEvent) {
                if (clockEvent.callback === callback) {
                    if (lastItem) {
                        lastItem.next = clockEvent.next;
                    }
                    else {
                        this.nextClockEvent = clockEvent.next;
                    }
                    if (clockEventPool.length < 10) {
                        clockEventPool.push(clockEvent);
                    }
                    return true;
                }
                lastItem = clockEvent;
                clockEvent = clockEvent.next;
            }
            return false;
        }
        tick() {
            const { nextClockEvent } = this;
            if (nextClockEvent && nextClockEvent.cycles <= this.cycles) {
                nextClockEvent.callback();
                this.nextClockEvent = nextClockEvent.next;
                if (this.clockEventPool.length < 10) {
                    this.clockEventPool.push(nextClockEvent);
                }
            }
            const { nextInterrupt } = this;
            if (this.interruptsEnabled && nextInterrupt >= 0) {
                const interrupt = this.pendingInterrupts[nextInterrupt];
                (0, interrupt_1.avrInterrupt)(this, interrupt.address);
                if (!interrupt.constant) {
                    this.clearInterrupt(interrupt);
                }
            }
        }
    }
    exports.CPU = CPU;
});
define("lib/avr8js/cpu/instruction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avrInstruction = void 0;
    function isTwoWordInstruction(opcode) {
        return ((opcode & 0xfe0f) === 0x9000 ||
            (opcode & 0xfe0f) === 0x9200 ||
            (opcode & 0xfe0e) === 0x940e ||
            (opcode & 0xfe0e) === 0x940c);
    }
    function avrInstruction(cpu) {
        const opcode = cpu.progMem[cpu.pc];
        if ((opcode & 0xfc00) === 0x1c00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const sum = d + r + (cpu.data[95] & 1);
            const R = sum & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (R ^ r) & (d ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= sum & 256 ? 1 : 0;
            sreg |= 1 & ((d & r) | (r & ~R) | (~R & d)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0xc00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = (d + r) & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (R ^ r) & (R ^ d) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= (d + r) & 256 ? 1 : 0;
            sreg |= 1 & ((d & r) | (r & ~R) | (~R & d)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff00) === 0x9600) {
            const addr = 2 * ((opcode & 0x30) >> 4) + 24;
            const value = cpu.dataView.getUint16(addr, true);
            const R = (value + ((opcode & 0xf) | ((opcode & 0xc0) >> 2))) & 0xffff;
            cpu.dataView.setUint16(addr, R, true);
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= 0x8000 & R ? 4 : 0;
            sreg |= ~value & R & 0x8000 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= ~R & value & 0x8000 ? 1 : 0;
            cpu.data[95] = sreg;
            cpu.cycles++;
        }
        else if ((opcode & 0xfc00) === 0x2000) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] & cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x7000) {
            const R = cpu.data[((opcode & 0xf0) >> 4) + 16] & ((opcode & 0xf) | ((opcode & 0xf00) >> 4));
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0f) === 0x9405) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = (value >>> 1) | (128 & value);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= value & 1;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff8f) === 0x9488) {
            cpu.data[95] &= ~(1 << ((opcode & 0x70) >> 4));
        }
        else if ((opcode & 0xfe08) === 0xf800) {
            const b = opcode & 7;
            const d = (opcode & 0x1f0) >> 4;
            cpu.data[d] = (~(1 << b) & cpu.data[d]) | (((cpu.data[95] >> 6) & 1) << b);
        }
        else if ((opcode & 0xfc00) === 0xf400) {
            if (!(cpu.data[95] & (1 << (opcode & 7)))) {
                cpu.pc = cpu.pc + (((opcode & 0x1f8) >> 3) - (opcode & 0x200 ? 0x40 : 0));
                cpu.cycles++;
            }
        }
        else if ((opcode & 0xfc00) === 0xf000) {
            if (cpu.data[95] & (1 << (opcode & 7))) {
                cpu.pc = cpu.pc + (((opcode & 0x1f8) >> 3) - (opcode & 0x200 ? 0x40 : 0));
                cpu.cycles++;
            }
        }
        else if ((opcode & 0xff8f) === 0x9408) {
            cpu.data[95] |= 1 << ((opcode & 0x70) >> 4);
        }
        else if ((opcode & 0xfe08) === 0xfa00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const b = opcode & 7;
            cpu.data[95] = (cpu.data[95] & 0xbf) | ((d >> b) & 1 ? 0x40 : 0);
        }
        else if ((opcode & 0xfe0e) === 0x940e) {
            const k = cpu.progMem[cpu.pc + 1] | ((opcode & 1) << 16) | ((opcode & 0x1f0) << 13);
            const ret = cpu.pc + 2;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = 255 & ret;
            cpu.data[sp - 1] = (ret >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (ret >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc = k - 1;
            cpu.cycles += pc22Bits ? 4 : 3;
        }
        else if ((opcode & 0xff00) === 0x9800) {
            const A = opcode & 0xf8;
            const b = opcode & 7;
            const R = cpu.readData((A >> 3) + 32);
            const mask = 1 << b;
            cpu.writeData((A >> 3) + 32, R & ~mask, mask);
        }
        else if ((opcode & 0xfe0f) === 0x9400) {
            const d = (opcode & 0x1f0) >> 4;
            const R = 255 - cpu.data[d];
            cpu.data[d] = R;
            let sreg = (cpu.data[95] & 0xe1) | 1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x1400) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = val1 - val2;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 0 !== ((val1 ^ val2) & (val1 ^ R) & 128) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x400) {
            const arg1 = cpu.data[(opcode & 0x1f0) >> 4];
            const arg2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            let sreg = cpu.data[95];
            const r = arg1 - arg2 - (sreg & 1);
            sreg = (sreg & 0xc0) | (!r && (sreg >> 1) & 1 ? 2 : 0) | (arg2 + (sreg & 1) > arg1 ? 1 : 0);
            sreg |= 128 & r ? 4 : 0;
            sreg |= (arg1 ^ arg2) & (arg1 ^ r) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~arg1 & arg2) | (arg2 & r) | (r & ~arg1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x3000) {
            const arg1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const arg2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            const r = arg1 - arg2;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= (arg1 ^ arg2) & (arg1 ^ r) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= arg2 > arg1 ? 1 : 0;
            sreg |= 1 & ((~arg1 & arg2) | (arg2 & r) | (r & ~arg1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x1000) {
            if (cpu.data[(opcode & 0x1f0) >> 4] === cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)]) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.pc += skipSize;
                cpu.cycles += skipSize;
            }
        }
        else if ((opcode & 0xfe0f) === 0x940a) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = value - 1;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 128 === value ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if (opcode === 0x9519) {
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const eind = cpu.data[0x5c];
            cpu.data[sp] = retAddr & 255;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            cpu.data[sp - 2] = (retAddr >> 16) & 255;
            cpu.dataView.setUint16(93, sp - 3, true);
            cpu.pc = ((eind << 16) | cpu.dataView.getUint16(30, true)) - 1;
            cpu.cycles += 3;
        }
        else if (opcode === 0x9419) {
            const eind = cpu.data[0x5c];
            cpu.pc = ((eind << 16) | cpu.dataView.getUint16(30, true)) - 1;
            cpu.cycles++;
        }
        else if (opcode === 0x95d8) {
            const rampz = cpu.data[0x5b];
            cpu.data[0] = cpu.progBytes[(rampz << 16) | cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9006) {
            const rampz = cpu.data[0x5b];
            cpu.data[(opcode & 0x1f0) >> 4] =
                cpu.progBytes[(rampz << 16) | cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9007) {
            const rampz = cpu.data[0x5b];
            const i = cpu.dataView.getUint16(30, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[(rampz << 16) | i];
            cpu.dataView.setUint16(30, i + 1, true);
            if (i === 0xffff) {
                cpu.data[0x5b] = (rampz + 1) % (cpu.progBytes.length >> 16);
            }
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfc00) === 0x2400) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] ^ cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff88) === 0x308) {
            const v1 = cpu.data[((opcode & 0x70) >> 4) + 16];
            const v2 = cpu.data[(opcode & 7) + 16];
            const R = (v1 * v2) << 1;
            cpu.dataView.setUint16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x380) {
            const v1 = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16);
            const v2 = cpu.dataView.getInt8((opcode & 7) + 16);
            const R = (v1 * v2) << 1;
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x388) {
            const v1 = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16);
            const v2 = cpu.data[(opcode & 7) + 16];
            const R = (v1 * v2) << 1;
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 2 : 0) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if (opcode === 0x9509) {
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = retAddr & 255;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (retAddr >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc = cpu.dataView.getUint16(30, true) - 1;
            cpu.cycles += pc22Bits ? 3 : 2;
        }
        else if (opcode === 0x9409) {
            cpu.pc = cpu.dataView.getUint16(30, true) - 1;
            cpu.cycles++;
        }
        else if ((opcode & 0xf800) === 0xb000) {
            const i = cpu.readData(((opcode & 0xf) | ((opcode & 0x600) >> 5)) + 32);
            cpu.data[(opcode & 0x1f0) >> 4] = i;
        }
        else if ((opcode & 0xfe0f) === 0x9403) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = (d + 1) & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = r;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= 127 === d ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0e) === 0x940c) {
            cpu.pc = (cpu.progMem[cpu.pc + 1] | ((opcode & 1) << 16) | ((opcode & 0x1f0) << 13)) - 1;
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9206) {
            const r = (opcode & 0x1f0) >> 4;
            const clear = cpu.data[r];
            const value = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), value & (255 - clear));
            cpu.data[r] = value;
        }
        else if ((opcode & 0xfe0f) === 0x9205) {
            const r = (opcode & 0x1f0) >> 4;
            const set = cpu.data[r];
            const value = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), value | set);
            cpu.data[r] = value;
        }
        else if ((opcode & 0xfe0f) === 0x9207) {
            const r = cpu.data[(opcode & 0x1f0) >> 4];
            const R = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), r ^ R);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
        }
        else if ((opcode & 0xf000) === 0xe000) {
            cpu.data[((opcode & 0xf0) >> 4) + 16] = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
        }
        else if ((opcode & 0xfe0f) === 0x9000) {
            cpu.cycles++;
            const value = cpu.readData(cpu.progMem[cpu.pc + 1]);
            cpu.data[(opcode & 0x1f0) >> 4] = value;
            cpu.pc++;
        }
        else if ((opcode & 0xfe0f) === 0x900c) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(26, true));
        }
        else if ((opcode & 0xfe0f) === 0x900d) {
            const x = cpu.dataView.getUint16(26, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(x);
            cpu.dataView.setUint16(26, x + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x900e) {
            const x = cpu.dataView.getUint16(26, true) - 1;
            cpu.dataView.setUint16(26, x, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(x);
        }
        else if ((opcode & 0xfe0f) === 0x8008) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(28, true));
        }
        else if ((opcode & 0xfe0f) === 0x9009) {
            const y = cpu.dataView.getUint16(28, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(y);
            cpu.dataView.setUint16(28, y + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x900a) {
            const y = cpu.dataView.getUint16(28, true) - 1;
            cpu.dataView.setUint16(28, y, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(y);
        }
        else if ((opcode & 0xd208) === 0x8008 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(28, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)));
        }
        else if ((opcode & 0xfe0f) === 0x8000) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(30, true));
        }
        else if ((opcode & 0xfe0f) === 0x9001) {
            const z = cpu.dataView.getUint16(30, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(z);
            cpu.dataView.setUint16(30, z + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x9002) {
            const z = cpu.dataView.getUint16(30, true) - 1;
            cpu.dataView.setUint16(30, z, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(z);
        }
        else if ((opcode & 0xd208) === 0x8000 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(30, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)));
        }
        else if (opcode === 0x95c8) {
            cpu.data[0] = cpu.progBytes[cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9004) {
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9005) {
            const i = cpu.dataView.getUint16(30, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[i];
            cpu.dataView.setUint16(30, i + 1, true);
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9406) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = value >>> 1;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= value & 1;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x2c00) {
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
        }
        else if ((opcode & 0xff00) === 0x100) {
            const r2 = 2 * (opcode & 0xf);
            const d2 = 2 * ((opcode & 0xf0) >> 4);
            cpu.data[d2] = cpu.data[r2];
            cpu.data[d2 + 1] = cpu.data[r2 + 1];
        }
        else if ((opcode & 0xfc00) === 0x9c00) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] * cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.dataView.setUint16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff00) === 0x200) {
            const R = cpu.dataView.getInt8(((opcode & 0xf0) >> 4) + 16) * cpu.dataView.getInt8((opcode & 0xf) + 16);
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x300) {
            const R = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16) * cpu.data[(opcode & 7) + 16];
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9401) {
            const d = (opcode & 0x1f0) >> 4;
            const value = cpu.data[d];
            const R = 0 - value;
            cpu.data[d] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 128 === R ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= R ? 1 : 0;
            sreg |= 1 & (R | value) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if (opcode === 0) {
        }
        else if ((opcode & 0xfc00) === 0x2800) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] | cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x6000) {
            const R = cpu.data[((opcode & 0xf0) >> 4) + 16] | ((opcode & 0xf) | ((opcode & 0xf00) >> 4));
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf800) === 0xb800) {
            cpu.writeData(((opcode & 0xf) | ((opcode & 0x600) >> 5)) + 32, cpu.data[(opcode & 0x1f0) >> 4]);
        }
        else if ((opcode & 0xfe0f) === 0x900f) {
            const value = cpu.dataView.getUint16(93, true) + 1;
            cpu.dataView.setUint16(93, value, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.data[value];
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920f) {
            const value = cpu.dataView.getUint16(93, true);
            cpu.data[value] = cpu.data[(opcode & 0x1f0) >> 4];
            cpu.dataView.setUint16(93, value - 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xf000) === 0xd000) {
            const k = (opcode & 0x7ff) - (opcode & 0x800 ? 0x800 : 0);
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = 255 & retAddr;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (retAddr >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc += k;
            cpu.cycles += pc22Bits ? 3 : 2;
        }
        else if (opcode === 0x9508) {
            const { pc22Bits } = cpu;
            const i = cpu.dataView.getUint16(93, true) + (pc22Bits ? 3 : 2);
            cpu.dataView.setUint16(93, i, true);
            cpu.pc = (cpu.data[i - 1] << 8) + cpu.data[i] - 1;
            if (pc22Bits) {
                cpu.pc |= cpu.data[i - 2] << 16;
            }
            cpu.cycles += pc22Bits ? 4 : 3;
        }
        else if (opcode === 0x9518) {
            const { pc22Bits } = cpu;
            const i = cpu.dataView.getUint16(93, true) + (pc22Bits ? 3 : 2);
            cpu.dataView.setUint16(93, i, true);
            cpu.pc = (cpu.data[i - 1] << 8) + cpu.data[i] - 1;
            if (pc22Bits) {
                cpu.pc |= cpu.data[i - 2] << 16;
            }
            cpu.cycles += pc22Bits ? 4 : 3;
            cpu.data[95] |= 0x80;
        }
        else if ((opcode & 0xf000) === 0xc000) {
            cpu.pc = cpu.pc + ((opcode & 0x7ff) - (opcode & 0x800 ? 0x800 : 0));
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9407) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = (d >>> 1) | ((cpu.data[95] & 1) << 7);
            cpu.data[(opcode & 0x1f0) >> 4] = r;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= 1 & d ? 1 : 0;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x800) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            let sreg = cpu.data[95];
            const R = val1 - val2 - (sreg & 1);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            sreg = (sreg & 0xc0) | (!R && (sreg >> 1) & 1 ? 2 : 0) | (val2 + (sreg & 1) > val1 ? 1 : 0);
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x4000) {
            const val1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const val2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            let sreg = cpu.data[95];
            const R = val1 - val2 - (sreg & 1);
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            sreg = (sreg & 0xc0) | (!R && (sreg >> 1) & 1 ? 2 : 0) | (val2 + (sreg & 1) > val1 ? 1 : 0);
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff00) === 0x9a00) {
            const target = ((opcode & 0xf8) >> 3) + 32;
            const mask = 1 << (opcode & 7);
            cpu.writeData(target, cpu.readData(target) | mask, mask);
            cpu.cycles++;
        }
        else if ((opcode & 0xff00) === 0x9900) {
            const value = cpu.readData(((opcode & 0xf8) >> 3) + 32);
            if (!(value & (1 << (opcode & 7)))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xff00) === 0x9b00) {
            const value = cpu.readData(((opcode & 0xf8) >> 3) + 32);
            if (value & (1 << (opcode & 7))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xff00) === 0x9700) {
            const i = 2 * ((opcode & 0x30) >> 4) + 24;
            const a = cpu.dataView.getUint16(i, true);
            const l = (opcode & 0xf) | ((opcode & 0xc0) >> 2);
            const R = a - l;
            cpu.dataView.setUint16(i, R, true);
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 0x8000 & R ? 4 : 0;
            sreg |= a & ~R & 0x8000 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= l > a ? 1 : 0;
            sreg |= 1 & ((~a & l) | (l & R) | (R & ~a)) ? 0x20 : 0;
            cpu.data[95] = sreg;
            cpu.cycles++;
        }
        else if ((opcode & 0xfe08) === 0xfc00) {
            if (!(cpu.data[(opcode & 0x1f0) >> 4] & (1 << (opcode & 7)))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xfe08) === 0xfe00) {
            if (cpu.data[(opcode & 0x1f0) >> 4] & (1 << (opcode & 7))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if (opcode === 0x9588) {
        }
        else if (opcode === 0x95e8) {
        }
        else if (opcode === 0x95f8) {
        }
        else if ((opcode & 0xfe0f) === 0x9200) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const addr = cpu.progMem[cpu.pc + 1];
            cpu.writeData(addr, value);
            cpu.pc++;
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920c) {
            cpu.writeData(cpu.dataView.getUint16(26, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920d) {
            const x = cpu.dataView.getUint16(26, true);
            cpu.writeData(x, cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.dataView.setUint16(26, x + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920e) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const x = cpu.dataView.getUint16(26, true) - 1;
            cpu.dataView.setUint16(26, x, true);
            cpu.writeData(x, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x8208) {
            cpu.writeData(cpu.dataView.getUint16(28, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9209) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const y = cpu.dataView.getUint16(28, true);
            cpu.writeData(y, i);
            cpu.dataView.setUint16(28, y + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920a) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const y = cpu.dataView.getUint16(28, true) - 1;
            cpu.dataView.setUint16(28, y, true);
            cpu.writeData(y, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xd208) === 0x8208 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.writeData(cpu.dataView.getUint16(28, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x8200) {
            cpu.writeData(cpu.dataView.getUint16(30, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9201) {
            const z = cpu.dataView.getUint16(30, true);
            cpu.writeData(z, cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.dataView.setUint16(30, z + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9202) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const z = cpu.dataView.getUint16(30, true) - 1;
            cpu.dataView.setUint16(30, z, true);
            cpu.writeData(z, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xd208) === 0x8200 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.writeData(cpu.dataView.getUint16(30, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfc00) === 0x1800) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = val1 - val2;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x5000) {
            const val1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const val2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            const R = val1 - val2;
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0f) === 0x9402) {
            const d = (opcode & 0x1f0) >> 4;
            const i = cpu.data[d];
            cpu.data[d] = ((15 & i) << 4) | ((240 & i) >>> 4);
        }
        else if (opcode === 0x95a8) {
            cpu.onWatchdogReset();
        }
        else if ((opcode & 0xfe0f) === 0x9204) {
            const r = (opcode & 0x1f0) >> 4;
            const val1 = cpu.data[r];
            const val2 = cpu.data[cpu.dataView.getUint16(30, true)];
            cpu.data[cpu.dataView.getUint16(30, true)] = val1;
            cpu.data[r] = val2;
        }
        cpu.pc = (cpu.pc + 1) % cpu.progMem.length;
        cpu.cycles++;
    }
    exports.avrInstruction = avrInstruction;
});
define("lib/avr8js/peripherals/adc", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRADC = exports.adcConfig = exports.atmega328Channels = exports.ADCMuxInputType = exports.ADCReference = void 0;
    var ADCReference;
    (function (ADCReference) {
        ADCReference[ADCReference["AVCC"] = 0] = "AVCC";
        ADCReference[ADCReference["AREF"] = 1] = "AREF";
        ADCReference[ADCReference["Internal1V1"] = 2] = "Internal1V1";
        ADCReference[ADCReference["Internal2V56"] = 3] = "Internal2V56";
        ADCReference[ADCReference["Reserved"] = 4] = "Reserved";
    })(ADCReference || (exports.ADCReference = ADCReference = {}));
    var ADCMuxInputType;
    (function (ADCMuxInputType) {
        ADCMuxInputType[ADCMuxInputType["SingleEnded"] = 0] = "SingleEnded";
        ADCMuxInputType[ADCMuxInputType["Differential"] = 1] = "Differential";
        ADCMuxInputType[ADCMuxInputType["Constant"] = 2] = "Constant";
        ADCMuxInputType[ADCMuxInputType["Temperature"] = 3] = "Temperature";
    })(ADCMuxInputType || (exports.ADCMuxInputType = ADCMuxInputType = {}));
    exports.atmega328Channels = {
        0: { type: ADCMuxInputType.SingleEnded, channel: 0 },
        1: { type: ADCMuxInputType.SingleEnded, channel: 1 },
        2: { type: ADCMuxInputType.SingleEnded, channel: 2 },
        3: { type: ADCMuxInputType.SingleEnded, channel: 3 },
        4: { type: ADCMuxInputType.SingleEnded, channel: 4 },
        5: { type: ADCMuxInputType.SingleEnded, channel: 5 },
        6: { type: ADCMuxInputType.SingleEnded, channel: 6 },
        7: { type: ADCMuxInputType.SingleEnded, channel: 7 },
        8: { type: ADCMuxInputType.Temperature },
        14: { type: ADCMuxInputType.Constant, voltage: 1.1 },
        15: { type: ADCMuxInputType.Constant, voltage: 0 },
    };
    const fallbackMuxInput = {
        type: ADCMuxInputType.Constant,
        voltage: 0,
    };
    exports.adcConfig = {
        ADMUX: 0x7c,
        ADCSRA: 0x7a,
        ADCSRB: 0x7b,
        ADCL: 0x78,
        ADCH: 0x79,
        DIDR0: 0x7e,
        adcInterrupt: 0x2a,
        numChannels: 8,
        muxInputMask: 0xf,
        muxChannels: exports.atmega328Channels,
        adcReferences: [
            ADCReference.AREF,
            ADCReference.AVCC,
            ADCReference.Reserved,
            ADCReference.Internal1V1,
        ],
    };
    const ADPS_MASK = 0x7;
    const ADIE = 0x8;
    const ADIF = 0x10;
    const ADSC = 0x40;
    const ADEN = 0x80;
    const MUX_MASK = 0x1f;
    const ADLAR = 0x20;
    const MUX5 = 0x8;
    const REFS2 = 0x8;
    const REFS_MASK = 0x3;
    const REFS_SHIFT = 6;
    class AVRADC {
        constructor(cpu, config) {
            this.cpu = cpu;
            this.config = config;
            this.channelValues = new Array(this.config.numChannels);
            this.avcc = 5;
            this.aref = 5;
            this.onADCRead = (input) => {
                var _a;
                let voltage = 0;
                switch (input.type) {
                    case ADCMuxInputType.Constant:
                        voltage = input.voltage;
                        break;
                    case ADCMuxInputType.SingleEnded:
                        voltage = (_a = this.channelValues[input.channel]) !== null && _a !== void 0 ? _a : 0;
                        break;
                    case ADCMuxInputType.Differential:
                        voltage =
                            input.gain *
                                ((this.channelValues[input.positiveChannel] || 0) -
                                    (this.channelValues[input.negativeChannel] || 0));
                        break;
                    case ADCMuxInputType.Temperature:
                        voltage = 0.378125;
                        break;
                }
                const rawValue = (voltage / this.referenceVoltage) * 1024;
                const result = Math.min(Math.max(Math.floor(rawValue), 0), 1023);
                this.cpu.addClockEvent(() => this.completeADCRead(result), this.sampleCycles);
            };
            this.converting = false;
            this.conversionCycles = 25;
            this.ADC = {
                address: this.config.adcInterrupt,
                flagRegister: this.config.ADCSRA,
                flagMask: ADIF,
                enableRegister: this.config.ADCSRA,
                enableMask: ADIE,
            };
            cpu.writeHooks[config.ADCSRA] = (value, oldValue) => {
                var _a;
                if (value & ADEN && !(oldValue && ADEN)) {
                    this.conversionCycles = 25;
                }
                cpu.data[config.ADCSRA] = value;
                cpu.updateInterruptEnable(this.ADC, value);
                if (!this.converting && value & ADSC) {
                    if (!(value & ADEN)) {
                        this.cpu.addClockEvent(() => this.completeADCRead(0), this.sampleCycles);
                        return true;
                    }
                    let channel = this.cpu.data[this.config.ADMUX] & MUX_MASK;
                    if (cpu.data[config.ADCSRB] & MUX5) {
                        channel |= 0x20;
                    }
                    channel &= config.muxInputMask;
                    const muxInput = (_a = config.muxChannels[channel]) !== null && _a !== void 0 ? _a : fallbackMuxInput;
                    this.converting = true;
                    this.onADCRead(muxInput);
                    return true;
                }
            };
        }
        completeADCRead(value) {
            const { ADCL, ADCH, ADMUX, ADCSRA } = this.config;
            this.converting = false;
            this.conversionCycles = 13;
            if (this.cpu.data[ADMUX] & ADLAR) {
                this.cpu.data[ADCL] = (value << 6) & 0xff;
                this.cpu.data[ADCH] = value >> 2;
            }
            else {
                this.cpu.data[ADCL] = value & 0xff;
                this.cpu.data[ADCH] = (value >> 8) & 0x3;
            }
            this.cpu.data[ADCSRA] &= ~ADSC;
            this.cpu.setInterruptFlag(this.ADC);
        }
        get prescaler() {
            const { ADCSRA } = this.config;
            const adcsra = this.cpu.data[ADCSRA];
            const adps = adcsra & ADPS_MASK;
            switch (adps) {
                case 0:
                case 1:
                    return 2;
                case 2:
                    return 4;
                case 3:
                    return 8;
                case 4:
                    return 16;
                case 5:
                    return 32;
                case 6:
                    return 64;
                case 7:
                default:
                    return 128;
            }
        }
        get referenceVoltageType() {
            var _a;
            const { ADMUX, adcReferences } = this.config;
            let refs = (this.cpu.data[ADMUX] >> REFS_SHIFT) & REFS_MASK;
            if (adcReferences.length > 4 && this.cpu.data[ADMUX] & REFS2) {
                refs |= 0x4;
            }
            return (_a = adcReferences[refs]) !== null && _a !== void 0 ? _a : ADCReference.Reserved;
        }
        get referenceVoltage() {
            switch (this.referenceVoltageType) {
                case ADCReference.AVCC:
                    return this.avcc;
                case ADCReference.AREF:
                    return this.aref;
                case ADCReference.Internal1V1:
                    return 1.1;
                case ADCReference.Internal2V56:
                    return 2.56;
                default:
                    return this.avcc;
            }
        }
        get sampleCycles() {
            return this.conversionCycles * this.prescaler;
        }
    }
    exports.AVRADC = AVRADC;
});
define("lib/avr8js/peripherals/clock", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRClock = exports.clockConfig = void 0;
    const CLKPCE = 128;
    exports.clockConfig = {
        CLKPR: 0x61,
    };
    const prescalers = [
        1, 2, 4, 8, 16, 32, 64, 128, 256,
        2, 4, 8, 16, 32, 64, 128,
    ];
    class AVRClock {
        constructor(cpu, baseFreqHz, config = exports.clockConfig) {
            this.cpu = cpu;
            this.baseFreqHz = baseFreqHz;
            this.config = config;
            this.clockEnabledCycles = 0;
            this.prescalerValue = 1;
            this.cyclesDelta = 0;
            this.cpu.writeHooks[this.config.CLKPR] = (clkpr) => {
                if ((!this.clockEnabledCycles || this.clockEnabledCycles < cpu.cycles) && clkpr === CLKPCE) {
                    this.clockEnabledCycles = this.cpu.cycles + 4;
                }
                else if (this.clockEnabledCycles && this.clockEnabledCycles >= cpu.cycles) {
                    this.clockEnabledCycles = 0;
                    const index = clkpr & 0xf;
                    const oldPrescaler = this.prescalerValue;
                    this.prescalerValue = prescalers[index];
                    this.cpu.data[this.config.CLKPR] = index;
                    if (oldPrescaler !== this.prescalerValue) {
                        this.cyclesDelta =
                            (cpu.cycles + this.cyclesDelta) * (oldPrescaler / this.prescalerValue) - cpu.cycles;
                    }
                }
                return true;
            };
        }
        get frequency() {
            return this.baseFreqHz / this.prescalerValue;
        }
        get prescaler() {
            return this.prescalerValue;
        }
        get timeNanos() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e9;
        }
        get timeMicros() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e6;
        }
        get timeMillis() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e3;
        }
    }
    exports.AVRClock = AVRClock;
});
define("lib/avr8js/peripherals/eeprom", ["require", "exports"], function (require, exports) {
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
});
define("lib/avr8js/peripherals/spi", ["require", "exports"], function (require, exports) {
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
                const valueIn = this.onTransfer(value);
                this.cpu.addClockEvent(() => this.completeTransfer(valueIn), this.transferCycles);
            };
            this.transmissionActive = false;
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
});
define("lib/avr8js/peripherals/timer", ["require", "exports", "lib/avr8js/peripherals/gpio"], function (require, exports, gpio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRTimer = exports.timer2Config = exports.timer1Config = exports.timer0Config = void 0;
    const timer01Dividers = {
        0: 0,
        1: 1,
        2: 8,
        3: 64,
        4: 256,
        5: 1024,
        6: 0,
        7: 0,
    };
    var ExternalClockMode;
    (function (ExternalClockMode) {
        ExternalClockMode[ExternalClockMode["FallingEdge"] = 6] = "FallingEdge";
        ExternalClockMode[ExternalClockMode["RisingEdge"] = 7] = "RisingEdge";
    })(ExternalClockMode || (ExternalClockMode = {}));
    const defaultTimerBits = {
        TOV: 1,
        OCFA: 2,
        OCFB: 4,
        OCFC: 0,
        TOIE: 1,
        OCIEA: 2,
        OCIEB: 4,
        OCIEC: 0,
    };
    exports.timer0Config = Object.assign({ bits: 8, captureInterrupt: 0, compAInterrupt: 0x1c, compBInterrupt: 0x1e, compCInterrupt: 0, ovfInterrupt: 0x20, TIFR: 0x35, OCRA: 0x47, OCRB: 0x48, OCRC: 0, ICR: 0, TCNT: 0x46, TCCRA: 0x44, TCCRB: 0x45, TCCRC: 0, TIMSK: 0x6e, dividers: timer01Dividers, compPortA: gpio_1.portDConfig.PORT, compPinA: 6, compPortB: gpio_1.portDConfig.PORT, compPinB: 5, compPortC: 0, compPinC: 0, externalClockPort: gpio_1.portDConfig.PORT, externalClockPin: 4 }, defaultTimerBits);
    exports.timer1Config = Object.assign({ bits: 16, captureInterrupt: 0x14, compAInterrupt: 0x16, compBInterrupt: 0x18, compCInterrupt: 0, ovfInterrupt: 0x1a, TIFR: 0x36, OCRA: 0x88, OCRB: 0x8a, OCRC: 0, ICR: 0x86, TCNT: 0x84, TCCRA: 0x80, TCCRB: 0x81, TCCRC: 0x82, TIMSK: 0x6f, dividers: timer01Dividers, compPortA: gpio_1.portBConfig.PORT, compPinA: 1, compPortB: gpio_1.portBConfig.PORT, compPinB: 2, compPortC: 0, compPinC: 0, externalClockPort: gpio_1.portDConfig.PORT, externalClockPin: 5 }, defaultTimerBits);
    exports.timer2Config = Object.assign({ bits: 8, captureInterrupt: 0, compAInterrupt: 0x0e, compBInterrupt: 0x10, compCInterrupt: 0, ovfInterrupt: 0x12, TIFR: 0x37, OCRA: 0xb3, OCRB: 0xb4, OCRC: 0, ICR: 0, TCNT: 0xb2, TCCRA: 0xb0, TCCRB: 0xb1, TCCRC: 0, TIMSK: 0x70, dividers: {
            0: 0,
            1: 1,
            2: 8,
            3: 32,
            4: 64,
            5: 128,
            6: 256,
            7: 1024,
        }, compPortA: gpio_1.portBConfig.PORT, compPinA: 3, compPortB: gpio_1.portDConfig.PORT, compPinB: 3, compPortC: 0, compPinC: 0, externalClockPort: 0, externalClockPin: 0 }, defaultTimerBits);
    var TimerMode;
    (function (TimerMode) {
        TimerMode[TimerMode["Normal"] = 0] = "Normal";
        TimerMode[TimerMode["PWMPhaseCorrect"] = 1] = "PWMPhaseCorrect";
        TimerMode[TimerMode["CTC"] = 2] = "CTC";
        TimerMode[TimerMode["FastPWM"] = 3] = "FastPWM";
        TimerMode[TimerMode["PWMPhaseFrequencyCorrect"] = 4] = "PWMPhaseFrequencyCorrect";
        TimerMode[TimerMode["Reserved"] = 5] = "Reserved";
    })(TimerMode || (TimerMode = {}));
    var TOVUpdateMode;
    (function (TOVUpdateMode) {
        TOVUpdateMode[TOVUpdateMode["Max"] = 0] = "Max";
        TOVUpdateMode[TOVUpdateMode["Top"] = 1] = "Top";
        TOVUpdateMode[TOVUpdateMode["Bottom"] = 2] = "Bottom";
    })(TOVUpdateMode || (TOVUpdateMode = {}));
    var OCRUpdateMode;
    (function (OCRUpdateMode) {
        OCRUpdateMode[OCRUpdateMode["Immediate"] = 0] = "Immediate";
        OCRUpdateMode[OCRUpdateMode["Top"] = 1] = "Top";
        OCRUpdateMode[OCRUpdateMode["Bottom"] = 2] = "Bottom";
    })(OCRUpdateMode || (OCRUpdateMode = {}));
    const TopOCRA = 1;
    const TopICR = 2;
    const OCToggle = 1;
    const { Normal, PWMPhaseCorrect, CTC, FastPWM, Reserved, PWMPhaseFrequencyCorrect } = TimerMode;
    const wgmModes8Bit = [
        [Normal, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, 0xff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [CTC, TopOCRA, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, 0xff, OCRUpdateMode.Bottom, TOVUpdateMode.Max, 0],
        [Reserved, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, TopOCRA, OCRUpdateMode.Top, TOVUpdateMode.Bottom, OCToggle],
        [Reserved, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
    ];
    const wgmModes16Bit = [
        [Normal, 0xffff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, 0x00ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, 0x01ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, 0x03ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [CTC, TopOCRA, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, 0x00ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [FastPWM, 0x01ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [FastPWM, 0x03ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [PWMPhaseFrequencyCorrect, TopICR, OCRUpdateMode.Bottom, TOVUpdateMode.Bottom, 0],
        [PWMPhaseFrequencyCorrect, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Bottom, OCToggle],
        [PWMPhaseCorrect, TopICR, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, TopOCRA, OCRUpdateMode.Top, TOVUpdateMode.Bottom, OCToggle],
        [CTC, TopICR, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [Reserved, 0xffff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, TopICR, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
        [FastPWM, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
    ];
    function compToOverride(comp) {
        switch (comp) {
            case 1:
                return gpio_1.PinOverrideMode.Toggle;
            case 2:
                return gpio_1.PinOverrideMode.Clear;
            case 3:
                return gpio_1.PinOverrideMode.Set;
            default:
                return gpio_1.PinOverrideMode.Enable;
        }
    }
    const FOCA = 1 << 7;
    const FOCB = 1 << 6;
    const FOCC = 1 << 5;
    class AVRTimer {
        constructor(cpu, config) {
            this.cpu = cpu;
            this.config = config;
            this.MAX = this.config.bits === 16 ? 0xffff : 0xff;
            this.lastCycle = 0;
            this.ocrA = 0;
            this.nextOcrA = 0;
            this.ocrB = 0;
            this.nextOcrB = 0;
            this.hasOCRC = this.config.OCRC > 0;
            this.ocrC = 0;
            this.nextOcrC = 0;
            this.ocrUpdateMode = OCRUpdateMode.Immediate;
            this.tovUpdateMode = TOVUpdateMode.Max;
            this.icr = 0;
            this.tcnt = 0;
            this.tcntNext = 0;
            this.tcntUpdated = false;
            this.updateDivider = false;
            this.countingUp = true;
            this.divider = 0;
            this.externalClockRisingEdge = false;
            this.highByteTemp = 0;
            this.OVF = {
                address: this.config.ovfInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.TOV,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.TOIE,
            };
            this.OCFA = {
                address: this.config.compAInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFA,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEA,
            };
            this.OCFB = {
                address: this.config.compBInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFB,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEB,
            };
            this.OCFC = {
                address: this.config.compCInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFC,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEC,
            };
            this.count = (reschedule = true, external = false) => {
                const { divider, lastCycle, cpu } = this;
                const { cycles } = cpu;
                const delta = cycles - lastCycle;
                if ((divider && delta >= divider) || external) {
                    const counterDelta = external ? 1 : Math.floor(delta / divider);
                    this.lastCycle += counterDelta * divider;
                    const val = this.tcnt;
                    const { timerMode, TOP } = this;
                    const phasePwm = timerMode === PWMPhaseCorrect || timerMode === PWMPhaseFrequencyCorrect;
                    const newVal = phasePwm
                        ? this.phasePwmCount(val, counterDelta)
                        : (val + counterDelta) % (TOP + 1);
                    const overflow = val + counterDelta > TOP;
                    if (!this.tcntUpdated) {
                        this.tcnt = newVal;
                        if (!phasePwm) {
                            this.timerUpdated(newVal, val);
                        }
                    }
                    if (!phasePwm) {
                        if (timerMode === FastPWM && overflow) {
                            const { compA, compB } = this;
                            if (compA) {
                                this.updateCompPin(compA, 'A', true);
                            }
                            if (compB) {
                                this.updateCompPin(compB, 'B', true);
                            }
                        }
                        if (this.ocrUpdateMode == OCRUpdateMode.Bottom && overflow) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                        if (overflow && (this.tovUpdateMode == TOVUpdateMode.Top || TOP === this.MAX)) {
                            cpu.setInterruptFlag(this.OVF);
                        }
                    }
                }
                if (this.tcntUpdated) {
                    this.tcnt = this.tcntNext;
                    this.tcntUpdated = false;
                    if ((this.tcnt === 0 && this.ocrUpdateMode === OCRUpdateMode.Bottom) ||
                        (this.tcnt === this.TOP && this.ocrUpdateMode === OCRUpdateMode.Top)) {
                        this.ocrA = this.nextOcrA;
                        this.ocrB = this.nextOcrB;
                        this.ocrC = this.nextOcrC;
                    }
                }
                if (this.updateDivider) {
                    const { CS } = this;
                    const { externalClockPin } = this.config;
                    const newDivider = this.config.dividers[CS];
                    this.lastCycle = newDivider ? this.cpu.cycles : 0;
                    this.updateDivider = false;
                    this.divider = newDivider;
                    if (this.config.externalClockPort && !this.externalClockPort) {
                        this.externalClockPort = this.cpu.gpioByPort[this.config.externalClockPort];
                    }
                    if (this.externalClockPort) {
                        this.externalClockPort.externalClockListeners[externalClockPin] = null;
                    }
                    if (newDivider) {
                        cpu.addClockEvent(this.count, this.lastCycle + newDivider - cpu.cycles);
                    }
                    else if (this.externalClockPort &&
                        (CS === ExternalClockMode.FallingEdge || CS === ExternalClockMode.RisingEdge)) {
                        this.externalClockPort.externalClockListeners[externalClockPin] =
                            this.externalClockCallback;
                        this.externalClockRisingEdge = CS === ExternalClockMode.RisingEdge;
                    }
                    return;
                }
                if (reschedule && divider) {
                    cpu.addClockEvent(this.count, this.lastCycle + divider - cpu.cycles);
                }
            };
            this.externalClockCallback = (value) => {
                if (value === this.externalClockRisingEdge) {
                    this.count(false, true);
                }
            };
            this.updateWGMConfig();
            this.cpu.readHooks[config.TCNT] = (addr) => {
                this.count(false);
                if (this.config.bits === 16) {
                    this.cpu.data[addr + 1] = this.tcnt >> 8;
                }
                return (this.cpu.data[addr] = this.tcnt & 0xff);
            };
            this.cpu.writeHooks[config.TCNT] = (value) => {
                this.tcntNext = (this.highByteTemp << 8) | value;
                this.countingUp = true;
                this.tcntUpdated = true;
                this.cpu.updateClockEvent(this.count, 0);
                if (this.divider) {
                    this.timerUpdated(this.tcntNext, this.tcntNext);
                }
            };
            this.cpu.writeHooks[config.OCRA] = (value) => {
                this.nextOcrA = (this.highByteTemp << 8) | value;
                if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                    this.ocrA = this.nextOcrA;
                }
            };
            this.cpu.writeHooks[config.OCRB] = (value) => {
                this.nextOcrB = (this.highByteTemp << 8) | value;
                if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                    this.ocrB = this.nextOcrB;
                }
            };
            if (this.hasOCRC) {
                this.cpu.writeHooks[config.OCRC] = (value) => {
                    this.nextOcrC = (this.highByteTemp << 8) | value;
                    if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                        this.ocrC = this.nextOcrC;
                    }
                };
            }
            if (this.config.bits === 16) {
                this.cpu.writeHooks[config.ICR] = (value) => {
                    this.icr = (this.highByteTemp << 8) | value;
                };
                const updateTempRegister = (value) => {
                    this.highByteTemp = value;
                };
                const updateOCRHighRegister = (value, old, addr) => {
                    this.highByteTemp = value & (this.ocrMask >> 8);
                    cpu.data[addr] = this.highByteTemp;
                    return true;
                };
                this.cpu.writeHooks[config.TCNT + 1] = updateTempRegister;
                this.cpu.writeHooks[config.OCRA + 1] = updateOCRHighRegister;
                this.cpu.writeHooks[config.OCRB + 1] = updateOCRHighRegister;
                if (this.hasOCRC) {
                    this.cpu.writeHooks[config.OCRC + 1] = updateOCRHighRegister;
                }
                this.cpu.writeHooks[config.ICR + 1] = updateTempRegister;
            }
            cpu.writeHooks[config.TCCRA] = (value) => {
                this.cpu.data[config.TCCRA] = value;
                this.updateWGMConfig();
                return true;
            };
            cpu.writeHooks[config.TCCRB] = (value) => {
                if (!config.TCCRC) {
                    this.checkForceCompare(value);
                    value &= ~(FOCA | FOCB);
                }
                this.cpu.data[config.TCCRB] = value;
                this.updateDivider = true;
                this.cpu.clearClockEvent(this.count);
                this.cpu.addClockEvent(this.count, 0);
                this.updateWGMConfig();
                return true;
            };
            if (config.TCCRC) {
                cpu.writeHooks[config.TCCRC] = (value) => {
                    this.checkForceCompare(value);
                };
            }
            cpu.writeHooks[config.TIFR] = (value) => {
                this.cpu.data[config.TIFR] = value;
                this.cpu.clearInterruptByFlag(this.OVF, value);
                this.cpu.clearInterruptByFlag(this.OCFA, value);
                this.cpu.clearInterruptByFlag(this.OCFB, value);
                return true;
            };
            cpu.writeHooks[config.TIMSK] = (value) => {
                this.cpu.updateInterruptEnable(this.OVF, value);
                this.cpu.updateInterruptEnable(this.OCFA, value);
                this.cpu.updateInterruptEnable(this.OCFB, value);
            };
        }
        reset() {
            this.divider = 0;
            this.lastCycle = 0;
            this.ocrA = 0;
            this.nextOcrA = 0;
            this.ocrB = 0;
            this.nextOcrB = 0;
            this.ocrC = 0;
            this.nextOcrC = 0;
            this.icr = 0;
            this.tcnt = 0;
            this.tcntNext = 0;
            this.tcntUpdated = false;
            this.countingUp = false;
            this.updateDivider = true;
        }
        get TCCRA() {
            return this.cpu.data[this.config.TCCRA];
        }
        get TCCRB() {
            return this.cpu.data[this.config.TCCRB];
        }
        get TIMSK() {
            return this.cpu.data[this.config.TIMSK];
        }
        get CS() {
            return (this.TCCRB & 0x7);
        }
        get WGM() {
            const mask = this.config.bits === 16 ? 0x18 : 0x8;
            return ((this.TCCRB & mask) >> 1) | (this.TCCRA & 0x3);
        }
        get TOP() {
            switch (this.topValue) {
                case TopOCRA:
                    return this.ocrA;
                case TopICR:
                    return this.icr;
                default:
                    return this.topValue;
            }
        }
        get ocrMask() {
            switch (this.topValue) {
                case TopOCRA:
                case TopICR:
                    return 0xffff;
                default:
                    return this.topValue;
            }
        }
        get debugTCNT() {
            return this.tcnt;
        }
        updateWGMConfig() {
            const { config, WGM } = this;
            const wgmModes = config.bits === 16 ? wgmModes16Bit : wgmModes8Bit;
            const TCCRA = this.cpu.data[config.TCCRA];
            const [timerMode, topValue, ocrUpdateMode, tovUpdateMode, flags] = wgmModes[WGM];
            this.timerMode = timerMode;
            this.topValue = topValue;
            this.ocrUpdateMode = ocrUpdateMode;
            this.tovUpdateMode = tovUpdateMode;
            const pwmMode = timerMode === FastPWM ||
                timerMode === PWMPhaseCorrect ||
                timerMode === PWMPhaseFrequencyCorrect;
            const prevCompA = this.compA;
            this.compA = ((TCCRA >> 6) & 0x3);
            if (this.compA === 1 && pwmMode && !(flags & OCToggle)) {
                this.compA = 0;
            }
            if (!!prevCompA !== !!this.compA) {
                this.updateCompA(this.compA ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
            }
            const prevCompB = this.compB;
            this.compB = ((TCCRA >> 4) & 0x3);
            if (this.compB === 1 && pwmMode) {
                this.compB = 0;
            }
            if (!!prevCompB !== !!this.compB) {
                this.updateCompB(this.compB ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
            }
            if (this.hasOCRC) {
                const prevCompC = this.compC;
                this.compC = ((TCCRA >> 2) & 0x3);
                if (this.compC === 1 && pwmMode) {
                    this.compC = 0;
                }
                if (!!prevCompC !== !!this.compC) {
                    this.updateCompC(this.compC ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
                }
            }
        }
        phasePwmCount(value, delta) {
            const { ocrA, ocrB, ocrC, hasOCRC, TOP, MAX, tcntUpdated } = this;
            if (!value && !TOP) {
                delta = 0;
                if (this.ocrUpdateMode === OCRUpdateMode.Top) {
                    this.ocrA = this.nextOcrA;
                    this.ocrB = this.nextOcrB;
                    this.ocrC = this.nextOcrC;
                }
            }
            while (delta > 0) {
                if (this.countingUp) {
                    value++;
                    if (value === TOP && !tcntUpdated) {
                        this.countingUp = false;
                        if (this.ocrUpdateMode === OCRUpdateMode.Top) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                    }
                }
                else {
                    value--;
                    if (!value && !tcntUpdated) {
                        this.countingUp = true;
                        this.cpu.setInterruptFlag(this.OVF);
                        if (this.ocrUpdateMode === OCRUpdateMode.Bottom) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                    }
                }
                if (!tcntUpdated) {
                    if (value === ocrA) {
                        this.cpu.setInterruptFlag(this.OCFA);
                        if (this.compA) {
                            this.updateCompPin(this.compA, 'A');
                        }
                    }
                    if (value === ocrB) {
                        this.cpu.setInterruptFlag(this.OCFB);
                        if (this.compB) {
                            this.updateCompPin(this.compB, 'B');
                        }
                    }
                    if (hasOCRC && value === ocrC) {
                        this.cpu.setInterruptFlag(this.OCFC);
                        if (this.compC) {
                            this.updateCompPin(this.compC, 'C');
                        }
                    }
                }
                delta--;
            }
            return value & MAX;
        }
        timerUpdated(value, prevValue) {
            const { ocrA, ocrB, ocrC, hasOCRC } = this;
            const overflow = prevValue > value;
            if (((prevValue < ocrA || overflow) && value >= ocrA) || (prevValue < ocrA && overflow)) {
                this.cpu.setInterruptFlag(this.OCFA);
                if (this.compA) {
                    this.updateCompPin(this.compA, 'A');
                }
            }
            if (((prevValue < ocrB || overflow) && value >= ocrB) || (prevValue < ocrB && overflow)) {
                this.cpu.setInterruptFlag(this.OCFB);
                if (this.compB) {
                    this.updateCompPin(this.compB, 'B');
                }
            }
            if (hasOCRC &&
                (((prevValue < ocrC || overflow) && value >= ocrC) || (prevValue < ocrC && overflow))) {
                this.cpu.setInterruptFlag(this.OCFC);
                if (this.compC) {
                    this.updateCompPin(this.compC, 'C');
                }
            }
        }
        checkForceCompare(value) {
            if (this.timerMode == TimerMode.FastPWM ||
                this.timerMode == TimerMode.PWMPhaseCorrect ||
                this.timerMode == TimerMode.PWMPhaseFrequencyCorrect) {
                return;
            }
            if (value & FOCA) {
                this.updateCompPin(this.compA, 'A');
            }
            if (value & FOCB) {
                this.updateCompPin(this.compB, 'B');
            }
            if (this.config.compPortC && value & FOCC) {
                this.updateCompPin(this.compC, 'C');
            }
        }
        updateCompPin(compValue, pinName, bottom = false) {
            let newValue = gpio_1.PinOverrideMode.None;
            const invertingMode = compValue === 3;
            const isSet = this.countingUp === invertingMode;
            switch (this.timerMode) {
                case Normal:
                case CTC:
                    newValue = compToOverride(compValue);
                    break;
                case FastPWM:
                    if (compValue === 1) {
                        newValue = bottom ? gpio_1.PinOverrideMode.None : gpio_1.PinOverrideMode.Toggle;
                    }
                    else {
                        newValue = invertingMode !== bottom ? gpio_1.PinOverrideMode.Set : gpio_1.PinOverrideMode.Clear;
                    }
                    break;
                case PWMPhaseCorrect:
                case PWMPhaseFrequencyCorrect:
                    if (compValue === 1) {
                        newValue = gpio_1.PinOverrideMode.Toggle;
                    }
                    else {
                        newValue = isSet ? gpio_1.PinOverrideMode.Set : gpio_1.PinOverrideMode.Clear;
                    }
                    break;
            }
            if (newValue !== gpio_1.PinOverrideMode.None) {
                if (pinName === 'A') {
                    this.updateCompA(newValue);
                }
                else if (pinName === 'B') {
                    this.updateCompB(newValue);
                }
                else {
                    this.updateCompC(newValue);
                }
            }
        }
        updateCompA(value) {
            const { compPortA, compPinA } = this.config;
            const port = this.cpu.gpioByPort[compPortA];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinA, value);
        }
        updateCompB(value) {
            const { compPortB, compPinB } = this.config;
            const port = this.cpu.gpioByPort[compPortB];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinB, value);
        }
        updateCompC(value) {
            const { compPortC, compPinC } = this.config;
            const port = this.cpu.gpioByPort[compPortC];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinC, value);
        }
    }
    exports.AVRTimer = AVRTimer;
});
define("lib/avr8js/peripherals/twi", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRTWI = exports.NoopTWIEventHandler = exports.twiConfig = void 0;
    const TWCR_TWINT = 0x80;
    const TWCR_TWEA = 0x40;
    const TWCR_TWSTA = 0x20;
    const TWCR_TWSTO = 0x10;
    const TWCR_TWWC = 0x8;
    const TWCR_TWEN = 0x4;
    const TWCR_TWIE = 0x1;
    const TWSR_TWS_MASK = 0xf8;
    const TWSR_TWPS1 = 0x2;
    const TWSR_TWPS0 = 0x1;
    const TWSR_TWPS_MASK = TWSR_TWPS1 | TWSR_TWPS0;
    const TWAR_TWA_MASK = 0xfe;
    const TWAR_TWGCE = 0x1;
    const STATUS_BUS_ERROR = 0x0;
    const STATUS_TWI_IDLE = 0xf8;
    const STATUS_START = 0x08;
    const STATUS_REPEATED_START = 0x10;
    const STATUS_SLAW_ACK = 0x18;
    const STATUS_SLAW_NACK = 0x20;
    const STATUS_DATA_SENT_ACK = 0x28;
    const STATUS_DATA_SENT_NACK = 0x30;
    const STATUS_DATA_LOST_ARBITRATION = 0x38;
    const STATUS_SLAR_ACK = 0x40;
    const STATUS_SLAR_NACK = 0x48;
    const STATUS_DATA_RECEIVED_ACK = 0x50;
    const STATUS_DATA_RECEIVED_NACK = 0x58;
    exports.twiConfig = {
        twiInterrupt: 0x30,
        TWBR: 0xb8,
        TWSR: 0xb9,
        TWAR: 0xba,
        TWDR: 0xbb,
        TWCR: 0xbc,
        TWAMR: 0xbd,
    };
    class NoopTWIEventHandler {
        constructor(twi) {
            this.twi = twi;
        }
        start() {
            this.twi.completeStart();
        }
        stop() {
            this.twi.completeStop();
        }
        connectToSlave() {
            this.twi.completeConnect(false);
        }
        writeByte() {
            this.twi.completeWrite(false);
        }
        readByte() {
            this.twi.completeRead(0xff);
        }
    }
    exports.NoopTWIEventHandler = NoopTWIEventHandler;
    class AVRTWI {
        constructor(cpu, config, freqHz) {
            this.cpu = cpu;
            this.config = config;
            this.freqHz = freqHz;
            this.eventHandler = new NoopTWIEventHandler(this);
            this.busy = false;
            this.TWI = {
                address: this.config.twiInterrupt,
                flagRegister: this.config.TWCR,
                flagMask: TWCR_TWINT,
                enableRegister: this.config.TWCR,
                enableMask: TWCR_TWIE,
            };
            this.updateStatus(STATUS_TWI_IDLE);
            this.cpu.writeHooks[config.TWCR] = (value) => {
                this.cpu.data[config.TWCR] = value;
                const clearInt = value & TWCR_TWINT;
                this.cpu.clearInterruptByFlag(this.TWI, value);
                this.cpu.updateInterruptEnable(this.TWI, value);
                const { status } = this;
                if (clearInt && value & TWCR_TWEN && !this.busy) {
                    const twdrValue = this.cpu.data[this.config.TWDR];
                    this.cpu.addClockEvent(() => {
                        if (value & TWCR_TWSTA) {
                            this.busy = true;
                            this.eventHandler.start(status !== STATUS_TWI_IDLE);
                        }
                        else if (value & TWCR_TWSTO) {
                            this.busy = true;
                            this.eventHandler.stop();
                        }
                        else if (status === STATUS_START || status === STATUS_REPEATED_START) {
                            this.busy = true;
                            this.eventHandler.connectToSlave(twdrValue >> 1, twdrValue & 0x1 ? false : true);
                        }
                        else if (status === STATUS_SLAW_ACK || status === STATUS_DATA_SENT_ACK) {
                            this.busy = true;
                            this.eventHandler.writeByte(twdrValue);
                        }
                        else if (status === STATUS_SLAR_ACK || status === STATUS_DATA_RECEIVED_ACK) {
                            this.busy = true;
                            const ack = !!(value & TWCR_TWEA);
                            this.eventHandler.readByte(ack);
                        }
                    }, 0);
                    return true;
                }
            };
        }
        get prescaler() {
            switch (this.cpu.data[this.config.TWSR] & TWSR_TWPS_MASK) {
                case 0:
                    return 1;
                case 1:
                    return 4;
                case 2:
                    return 16;
                case 3:
                    return 64;
            }
            throw new Error('Invalid prescaler value!');
        }
        get sclFrequency() {
            return this.freqHz / (16 + 2 * this.cpu.data[this.config.TWBR] * this.prescaler);
        }
        completeStart() {
            this.busy = false;
            this.updateStatus(this.status === STATUS_TWI_IDLE ? STATUS_START : STATUS_REPEATED_START);
        }
        completeStop() {
            this.busy = false;
            this.cpu.data[this.config.TWCR] &= ~TWCR_TWSTO;
            this.updateStatus(STATUS_TWI_IDLE);
        }
        completeConnect(ack) {
            this.busy = false;
            if (this.cpu.data[this.config.TWDR] & 0x1) {
                this.updateStatus(ack ? STATUS_SLAR_ACK : STATUS_SLAR_NACK);
            }
            else {
                this.updateStatus(ack ? STATUS_SLAW_ACK : STATUS_SLAW_NACK);
            }
        }
        completeWrite(ack) {
            this.busy = false;
            this.updateStatus(ack ? STATUS_DATA_SENT_ACK : STATUS_DATA_SENT_NACK);
        }
        completeRead(value) {
            this.busy = false;
            const ack = !!(this.cpu.data[this.config.TWCR] & TWCR_TWEA);
            this.cpu.data[this.config.TWDR] = value;
            this.updateStatus(ack ? STATUS_DATA_RECEIVED_ACK : STATUS_DATA_RECEIVED_NACK);
        }
        get status() {
            return this.cpu.data[this.config.TWSR] & TWSR_TWS_MASK;
        }
        updateStatus(value) {
            const { TWSR } = this.config;
            this.cpu.data[TWSR] = (this.cpu.data[TWSR] & ~TWSR_TWS_MASK) | value;
            this.cpu.setInterruptFlag(this.TWI);
        }
    }
    exports.AVRTWI = AVRTWI;
});
define("lib/avr8js/peripherals/usart", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRUSART = exports.usart0Config = void 0;
    exports.usart0Config = {
        rxCompleteInterrupt: 0x24,
        dataRegisterEmptyInterrupt: 0x26,
        txCompleteInterrupt: 0x28,
        UCSRA: 0xc0,
        UCSRB: 0xc1,
        UCSRC: 0xc2,
        UBRRL: 0xc4,
        UBRRH: 0xc5,
        UDR: 0xc6,
    };
    const UCSRA_RXC = 0x80;
    const UCSRA_TXC = 0x40;
    const UCSRA_UDRE = 0x20;
    const UCSRA_FE = 0x10;
    const UCSRA_DOR = 0x8;
    const UCSRA_UPE = 0x4;
    const UCSRA_U2X = 0x2;
    const UCSRA_MPCM = 0x1;
    const UCSRA_CFG_MASK = UCSRA_U2X;
    const UCSRB_RXCIE = 0x80;
    const UCSRB_TXCIE = 0x40;
    const UCSRB_UDRIE = 0x20;
    const UCSRB_RXEN = 0x10;
    const UCSRB_TXEN = 0x8;
    const UCSRB_UCSZ2 = 0x4;
    const UCSRB_RXB8 = 0x2;
    const UCSRB_TXB8 = 0x1;
    const UCSRB_CFG_MASK = UCSRB_UCSZ2 | UCSRB_RXEN | UCSRB_TXEN;
    const UCSRC_UMSEL1 = 0x80;
    const UCSRC_UMSEL0 = 0x40;
    const UCSRC_UPM1 = 0x20;
    const UCSRC_UPM0 = 0x10;
    const UCSRC_USBS = 0x8;
    const UCSRC_UCSZ1 = 0x4;
    const UCSRC_UCSZ0 = 0x2;
    const UCSRC_UCPOL = 0x1;
    const rxMasks = {
        5: 0x1f,
        6: 0x3f,
        7: 0x7f,
        8: 0xff,
        9: 0xff,
    };
    class AVRUSART {
        constructor(cpu, config, freqHz) {
            this.cpu = cpu;
            this.config = config;
            this.freqHz = freqHz;
            this.onByteTransmit = null;
            this.onLineTransmit = null;
            this.onRxComplete = null;
            this.onConfigurationChange = null;
            this.rxBusyValue = false;
            this.rxByte = 0;
            this.lineBuffer = '';
            this.RXC = {
                address: this.config.rxCompleteInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_RXC,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_RXCIE,
                constant: true,
            };
            this.UDRE = {
                address: this.config.dataRegisterEmptyInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_UDRE,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_UDRIE,
            };
            this.TXC = {
                address: this.config.txCompleteInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_TXC,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_TXCIE,
            };
            this.reset();
            this.cpu.writeHooks[config.UCSRA] = (value, oldValue) => {
                var _a;
                cpu.data[config.UCSRA] = value & (UCSRA_MPCM | UCSRA_U2X);
                cpu.clearInterruptByFlag(this.TXC, value);
                if ((value & UCSRA_CFG_MASK) !== (oldValue & UCSRA_CFG_MASK)) {
                    (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                return true;
            };
            this.cpu.writeHooks[config.UCSRB] = (value, oldValue) => {
                var _a;
                cpu.updateInterruptEnable(this.RXC, value);
                cpu.updateInterruptEnable(this.UDRE, value);
                cpu.updateInterruptEnable(this.TXC, value);
                if (value & UCSRB_RXEN && oldValue & UCSRB_RXEN) {
                    cpu.clearInterrupt(this.RXC);
                }
                if (value & UCSRB_TXEN && !(oldValue & UCSRB_TXEN)) {
                    cpu.setInterruptFlag(this.UDRE);
                }
                cpu.data[config.UCSRB] = value;
                if ((value & UCSRB_CFG_MASK) !== (oldValue & UCSRB_CFG_MASK)) {
                    (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                return true;
            };
            this.cpu.writeHooks[config.UCSRC] = (value) => {
                var _a;
                cpu.data[config.UCSRC] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
            this.cpu.readHooks[config.UDR] = () => {
                var _a;
                const mask = (_a = rxMasks[this.bitsPerChar]) !== null && _a !== void 0 ? _a : 0xff;
                const result = this.rxByte & mask;
                this.rxByte = 0;
                this.cpu.clearInterrupt(this.RXC);
                return result;
            };
            this.cpu.writeHooks[config.UDR] = (value) => {
                if (this.onByteTransmit) {
                    this.onByteTransmit(value);
                }
                if (this.onLineTransmit) {
                    const ch = String.fromCharCode(value);
                    if (ch === '\n') {
                        this.onLineTransmit(this.lineBuffer);
                        this.lineBuffer = '';
                    }
                    else {
                        this.lineBuffer += ch;
                    }
                }
                this.cpu.addClockEvent(() => {
                    cpu.setInterruptFlag(this.UDRE);
                    cpu.setInterruptFlag(this.TXC);
                }, this.cyclesPerChar);
                this.cpu.clearInterrupt(this.TXC);
                this.cpu.clearInterrupt(this.UDRE);
            };
            this.cpu.writeHooks[config.UBRRH] = (value) => {
                var _a;
                this.cpu.data[config.UBRRH] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
            this.cpu.writeHooks[config.UBRRL] = (value) => {
                var _a;
                this.cpu.data[config.UBRRL] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
        }
        reset() {
            this.cpu.data[this.config.UCSRA] = UCSRA_UDRE;
            this.cpu.data[this.config.UCSRB] = 0;
            this.cpu.data[this.config.UCSRC] = UCSRC_UCSZ1 | UCSRC_UCSZ0;
            this.rxBusyValue = false;
            this.rxByte = 0;
            this.lineBuffer = '';
        }
        get rxBusy() {
            return this.rxBusyValue;
        }
        writeByte(value, immediate = false) {
            var _a;
            const { cpu } = this;
            if (this.rxBusyValue || !this.rxEnable) {
                return false;
            }
            if (immediate) {
                this.rxByte = value;
                cpu.setInterruptFlag(this.RXC);
                (_a = this.onRxComplete) === null || _a === void 0 ? void 0 : _a.call(this);
            }
            else {
                this.rxBusyValue = true;
                cpu.addClockEvent(() => {
                    this.rxBusyValue = false;
                    this.writeByte(value, true);
                }, this.cyclesPerChar);
                return true;
            }
        }
        get cyclesPerChar() {
            const symbolsPerChar = 1 + this.bitsPerChar + this.stopBits + (this.parityEnabled ? 1 : 0);
            return (this.UBRR + 1) * this.multiplier * symbolsPerChar;
        }
        get UBRR() {
            const { UBRRH, UBRRL } = this.config;
            return (this.cpu.data[UBRRH] << 8) | this.cpu.data[UBRRL];
        }
        get multiplier() {
            return this.cpu.data[this.config.UCSRA] & UCSRA_U2X ? 8 : 16;
        }
        get rxEnable() {
            return !!(this.cpu.data[this.config.UCSRB] & UCSRB_RXEN);
        }
        get txEnable() {
            return !!(this.cpu.data[this.config.UCSRB] & UCSRB_TXEN);
        }
        get baudRate() {
            return Math.floor(this.freqHz / (this.multiplier * (1 + this.UBRR)));
        }
        get bitsPerChar() {
            const ucsz = ((this.cpu.data[this.config.UCSRC] & (UCSRC_UCSZ1 | UCSRC_UCSZ0)) >> 1) |
                (this.cpu.data[this.config.UCSRB] & UCSRB_UCSZ2);
            switch (ucsz) {
                case 0:
                    return 5;
                case 1:
                    return 6;
                case 2:
                    return 7;
                case 3:
                    return 8;
                default:
                case 7:
                    return 9;
            }
        }
        get stopBits() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_USBS ? 2 : 1;
        }
        get parityEnabled() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_UPM1 ? true : false;
        }
        get parityOdd() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_UPM0 ? true : false;
        }
    }
    exports.AVRUSART = AVRUSART;
});
define("lib/avr8js/peripherals/usi", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRUSI = void 0;
    const USICR = 0x2d;
    const USISR = 0x2e;
    const USIDR = 0x2f;
    const USIBR = 0x30;
    const USICNT_MASK = 0xf;
    const USIDC = 1 << 4;
    const USIPF = 1 << 5;
    const USIOIF = 1 << 6;
    const USISIF = 1 << 7;
    const USITC = 1 << 0;
    const USICLK = 1 << 1;
    const USICS0 = 1 << 2;
    const USICS1 = 1 << 3;
    const USIWM0 = 1 << 4;
    const USIWM1 = 1 << 5;
    const USIOIE = 1 << 6;
    const USISIE = 1 << 7;
    class AVRUSI {
        constructor(cpu, port, portPin, dataPin, clockPin) {
            this.START = {
                address: 0xd,
                flagRegister: USISR,
                flagMask: USISIF,
                enableRegister: USICR,
                enableMask: USISIE,
            };
            this.OVF = {
                address: 0xe,
                flagRegister: USISR,
                flagMask: USIOIF,
                enableRegister: USICR,
                enableMask: USIOIE,
            };
            const PIN = portPin;
            const PORT = PIN + 2;
            port.addListener((value) => {
                const twoWire = (cpu.data[USICR] & USIWM1) === USIWM1;
                if (twoWire) {
                    if (value & (1 << clockPin) && !(value & (1 << dataPin))) {
                        cpu.setInterruptFlag(this.START);
                    }
                    if (value & (1 << clockPin) && value & (1 << dataPin)) {
                        cpu.data[USISR] |= USIPF;
                    }
                }
            });
            const updateOutput = () => {
                const oldValue = cpu.data[PORT];
                const newValue = cpu.data[USIDR] & 0x80 ? oldValue | (1 << dataPin) : oldValue & ~(1 << dataPin);
                cpu.writeHooks[PORT](newValue, oldValue, PORT, 0xff);
                if (newValue & 0x80 && !(cpu.data[PIN] & 0x80)) {
                    cpu.data[USISR] |= USIDC;
                }
                else {
                    cpu.data[USISR] &= ~USIDC;
                }
            };
            const count = () => {
                const counter = (cpu.data[USISR] + 1) & USICNT_MASK;
                cpu.data[USISR] = (cpu.data[USISR] & ~USICNT_MASK) | counter;
                if (!counter) {
                    cpu.data[USIBR] = cpu.data[USIDR];
                    cpu.setInterruptFlag(this.OVF);
                }
            };
            const shift = (inputValue) => {
                cpu.data[USIDR] = (cpu.data[USIDR] << 1) | inputValue;
                updateOutput();
            };
            cpu.writeHooks[USIDR] = (value) => {
                cpu.data[USIDR] = value;
                updateOutput();
                return true;
            };
            cpu.writeHooks[USISR] = (value) => {
                const writeClearMask = USISIF | USIOIF | USIPF;
                cpu.data[USISR] = (cpu.data[USISR] & writeClearMask & ~value) | (value & 0xf);
                cpu.clearInterruptByFlag(this.START, value);
                cpu.clearInterruptByFlag(this.OVF, value);
                return true;
            };
            cpu.writeHooks[USICR] = (value) => {
                cpu.data[USICR] = value & ~(USICLK | USITC);
                cpu.updateInterruptEnable(this.START, value);
                cpu.updateInterruptEnable(this.OVF, value);
                const clockSrc = value & ((USICS1 | USICS0) >> 2);
                const mode = value & ((USIWM1 | USIWM0) >> 4);
                const usiClk = value & USICLK;
                port.openCollector = mode >= 2 ? 1 << dataPin : 0;
                const inputValue = cpu.data[PIN] & (1 << dataPin) ? 1 : 0;
                if (usiClk && !clockSrc) {
                    shift(inputValue);
                    count();
                }
                if (value & USITC) {
                    cpu.writeHooks[PIN](1 << clockPin, cpu.data[PIN], PIN, 0xff);
                    const newValue = cpu.data[PIN] & (1 << clockPin);
                    if (usiClk && (clockSrc === 2 || clockSrc === 3)) {
                        if (clockSrc === 2 && newValue) {
                            shift(inputValue);
                        }
                        if (clockSrc === 3 && !newValue) {
                            shift(inputValue);
                        }
                        count();
                    }
                    return true;
                }
            };
        }
    }
    exports.AVRUSI = AVRUSI;
});
define("lib/avr8js/peripherals/watchdog", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRWatchdog = exports.watchdogConfig = void 0;
    const MCUSR_WDRF = 0x8;
    const WDTCSR_WDIF = 0x80;
    const WDTCSR_WDIE = 0x40;
    const WDTCSR_WDP3 = 0x20;
    const WDTCSR_WDCE = 0x10;
    const WDTCSR_WDE = 0x8;
    const WDTCSR_WDP2 = 0x4;
    const WDTCSR_WDP1 = 0x2;
    const WDTCSR_WDP0 = 0x1;
    const WDTCSR_WDP210 = WDTCSR_WDP2 | WDTCSR_WDP1 | WDTCSR_WDP0;
    const WDTCSR_PROTECT_MASK = WDTCSR_WDE | WDTCSR_WDP3 | WDTCSR_WDP210;
    exports.watchdogConfig = {
        watchdogInterrupt: 0x0c,
        MCUSR: 0x54,
        WDTCSR: 0x60,
    };
    class AVRWatchdog {
        constructor(cpu, config, clock) {
            this.cpu = cpu;
            this.config = config;
            this.clock = clock;
            this.clockFrequency = 128000;
            this.changeEnabledCycles = 0;
            this.watchdogTimeout = 0;
            this.enabledValue = false;
            this.scheduled = false;
            this.Watchdog = {
                address: this.config.watchdogInterrupt,
                flagRegister: this.config.WDTCSR,
                flagMask: WDTCSR_WDIF,
                enableRegister: this.config.WDTCSR,
                enableMask: WDTCSR_WDIE,
            };
            this.checkWatchdog = () => {
                if (this.enabled && this.cpu.cycles >= this.watchdogTimeout) {
                    const wdtcsr = this.cpu.data[this.config.WDTCSR];
                    if (wdtcsr & WDTCSR_WDIE) {
                        this.cpu.setInterruptFlag(this.Watchdog);
                    }
                    if (wdtcsr & WDTCSR_WDE) {
                        if (wdtcsr & WDTCSR_WDIE) {
                            this.cpu.data[this.config.WDTCSR] &= ~WDTCSR_WDIE;
                        }
                        else {
                            this.cpu.reset();
                            this.scheduled = false;
                            this.cpu.data[this.config.MCUSR] |= MCUSR_WDRF;
                            return;
                        }
                    }
                    this.resetWatchdog();
                }
                if (this.enabled) {
                    this.scheduled = true;
                    this.cpu.addClockEvent(this.checkWatchdog, this.watchdogTimeout - this.cpu.cycles);
                }
                else {
                    this.scheduled = false;
                }
            };
            const { WDTCSR } = config;
            this.cpu.onWatchdogReset = () => {
                this.resetWatchdog();
            };
            cpu.writeHooks[WDTCSR] = (value, oldValue) => {
                if (value & WDTCSR_WDCE && value & WDTCSR_WDE) {
                    this.changeEnabledCycles = this.cpu.cycles + 4;
                    value = value & ~WDTCSR_PROTECT_MASK;
                }
                else {
                    if (this.cpu.cycles >= this.changeEnabledCycles) {
                        value = (value & ~WDTCSR_PROTECT_MASK) | (oldValue & WDTCSR_PROTECT_MASK);
                    }
                    this.enabledValue = !!(value & WDTCSR_WDE || value & WDTCSR_WDIE);
                    this.cpu.data[WDTCSR] = value;
                }
                if (this.enabled) {
                    this.resetWatchdog();
                }
                if (this.enabled && !this.scheduled) {
                    this.cpu.addClockEvent(this.checkWatchdog, this.watchdogTimeout - this.cpu.cycles);
                }
                this.cpu.clearInterruptByFlag(this.Watchdog, value);
                return true;
            };
        }
        resetWatchdog() {
            const cycles = Math.floor((this.clock.frequency / this.clockFrequency) * this.prescaler);
            this.watchdogTimeout = this.cpu.cycles + cycles;
        }
        get enabled() {
            return this.enabledValue;
        }
        get prescaler() {
            const wdtcsr = this.cpu.data[this.config.WDTCSR];
            const value = ((wdtcsr & WDTCSR_WDP3) >> 2) | (wdtcsr & WDTCSR_WDP210);
            return 2048 << value;
        }
    }
    exports.AVRWatchdog = AVRWatchdog;
});
define("lib/avr8js/index", ["require", "exports", "lib/avr8js/cpu/cpu", "lib/avr8js/cpu/instruction", "lib/avr8js/cpu/interrupt", "lib/avr8js/peripherals/adc", "lib/avr8js/peripherals/clock", "lib/avr8js/peripherals/eeprom", "lib/avr8js/peripherals/gpio", "lib/avr8js/peripherals/spi", "lib/avr8js/peripherals/timer", "lib/avr8js/peripherals/twi", "lib/avr8js/peripherals/usart", "lib/avr8js/peripherals/usi", "lib/avr8js/peripherals/watchdog"], function (require, exports, cpu_1, instruction_1, interrupt_2, adc_1, clock_1, eeprom_1, gpio_2, spi_1, timer_1, twi_1, usart_1, usi_1, watchdog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.watchdogConfig = exports.AVRWatchdog = exports.AVRUSI = exports.usart0Config = exports.AVRUSART = exports.timer2Config = exports.timer1Config = exports.timer0Config = exports.AVRTimer = exports.spiConfig = exports.AVRSPI = exports.portLConfig = exports.portKConfig = exports.portJConfig = exports.portHConfig = exports.portGConfig = exports.portFConfig = exports.portEConfig = exports.portDConfig = exports.portCConfig = exports.portBConfig = exports.portAConfig = exports.PinState = exports.PCINT2 = exports.PCINT1 = exports.PCINT0 = exports.INT1 = exports.INT0 = exports.AVRIOPort = exports.EEPROMMemoryBackend = exports.eepromConfig = exports.AVREEPROM = exports.clockConfig = exports.AVRClock = exports.AVRADC = exports.atmega328Channels = exports.ADCReference = exports.ADCMuxInputType = exports.adcConfig = exports.avrInterrupt = exports.avrInstruction = exports.CPU = void 0;
    Object.defineProperty(exports, "CPU", { enumerable: true, get: function () { return cpu_1.CPU; } });
    Object.defineProperty(exports, "avrInstruction", { enumerable: true, get: function () { return instruction_1.avrInstruction; } });
    Object.defineProperty(exports, "avrInterrupt", { enumerable: true, get: function () { return interrupt_2.avrInterrupt; } });
    Object.defineProperty(exports, "adcConfig", { enumerable: true, get: function () { return adc_1.adcConfig; } });
    Object.defineProperty(exports, "ADCMuxInputType", { enumerable: true, get: function () { return adc_1.ADCMuxInputType; } });
    Object.defineProperty(exports, "ADCReference", { enumerable: true, get: function () { return adc_1.ADCReference; } });
    Object.defineProperty(exports, "atmega328Channels", { enumerable: true, get: function () { return adc_1.atmega328Channels; } });
    Object.defineProperty(exports, "AVRADC", { enumerable: true, get: function () { return adc_1.AVRADC; } });
    Object.defineProperty(exports, "AVRClock", { enumerable: true, get: function () { return clock_1.AVRClock; } });
    Object.defineProperty(exports, "clockConfig", { enumerable: true, get: function () { return clock_1.clockConfig; } });
    Object.defineProperty(exports, "AVREEPROM", { enumerable: true, get: function () { return eeprom_1.AVREEPROM; } });
    Object.defineProperty(exports, "eepromConfig", { enumerable: true, get: function () { return eeprom_1.eepromConfig; } });
    Object.defineProperty(exports, "EEPROMMemoryBackend", { enumerable: true, get: function () { return eeprom_1.EEPROMMemoryBackend; } });
    Object.defineProperty(exports, "AVRIOPort", { enumerable: true, get: function () { return gpio_2.AVRIOPort; } });
    Object.defineProperty(exports, "INT0", { enumerable: true, get: function () { return gpio_2.INT0; } });
    Object.defineProperty(exports, "INT1", { enumerable: true, get: function () { return gpio_2.INT1; } });
    Object.defineProperty(exports, "PCINT0", { enumerable: true, get: function () { return gpio_2.PCINT0; } });
    Object.defineProperty(exports, "PCINT1", { enumerable: true, get: function () { return gpio_2.PCINT1; } });
    Object.defineProperty(exports, "PCINT2", { enumerable: true, get: function () { return gpio_2.PCINT2; } });
    Object.defineProperty(exports, "PinState", { enumerable: true, get: function () { return gpio_2.PinState; } });
    Object.defineProperty(exports, "portAConfig", { enumerable: true, get: function () { return gpio_2.portAConfig; } });
    Object.defineProperty(exports, "portBConfig", { enumerable: true, get: function () { return gpio_2.portBConfig; } });
    Object.defineProperty(exports, "portCConfig", { enumerable: true, get: function () { return gpio_2.portCConfig; } });
    Object.defineProperty(exports, "portDConfig", { enumerable: true, get: function () { return gpio_2.portDConfig; } });
    Object.defineProperty(exports, "portEConfig", { enumerable: true, get: function () { return gpio_2.portEConfig; } });
    Object.defineProperty(exports, "portFConfig", { enumerable: true, get: function () { return gpio_2.portFConfig; } });
    Object.defineProperty(exports, "portGConfig", { enumerable: true, get: function () { return gpio_2.portGConfig; } });
    Object.defineProperty(exports, "portHConfig", { enumerable: true, get: function () { return gpio_2.portHConfig; } });
    Object.defineProperty(exports, "portJConfig", { enumerable: true, get: function () { return gpio_2.portJConfig; } });
    Object.defineProperty(exports, "portKConfig", { enumerable: true, get: function () { return gpio_2.portKConfig; } });
    Object.defineProperty(exports, "portLConfig", { enumerable: true, get: function () { return gpio_2.portLConfig; } });
    Object.defineProperty(exports, "AVRSPI", { enumerable: true, get: function () { return spi_1.AVRSPI; } });
    Object.defineProperty(exports, "spiConfig", { enumerable: true, get: function () { return spi_1.spiConfig; } });
    Object.defineProperty(exports, "AVRTimer", { enumerable: true, get: function () { return timer_1.AVRTimer; } });
    Object.defineProperty(exports, "timer0Config", { enumerable: true, get: function () { return timer_1.timer0Config; } });
    Object.defineProperty(exports, "timer1Config", { enumerable: true, get: function () { return timer_1.timer1Config; } });
    Object.defineProperty(exports, "timer2Config", { enumerable: true, get: function () { return timer_1.timer2Config; } });
    __exportStar(twi_1, exports);
    Object.defineProperty(exports, "AVRUSART", { enumerable: true, get: function () { return usart_1.AVRUSART; } });
    Object.defineProperty(exports, "usart0Config", { enumerable: true, get: function () { return usart_1.usart0Config; } });
    Object.defineProperty(exports, "AVRUSI", { enumerable: true, get: function () { return usi_1.AVRUSI; } });
    Object.defineProperty(exports, "AVRWatchdog", { enumerable: true, get: function () { return watchdog_1.AVRWatchdog; } });
    Object.defineProperty(exports, "watchdogConfig", { enumerable: true, get: function () { return watchdog_1.watchdogConfig; } });
});
define("lib/execute", ["require", "exports", "lib/avr8js/index", "lib/compile-util"], function (require, exports, index_1, compile_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRRunner = void 0;
    const FLASH = 0x8000;
    class AVRRunner {
        constructor(hex) {
            this.program = new Uint16Array(FLASH);
            this.MHZ = 16e6;
            this.instructions = [];
            this.pausedOn = [];
            this.stopped = false;
            (0, compile_util_1.loadHex)(hex, new Uint8Array(this.program.buffer));
            this.cpu = new index_1.CPU(this.program);
            this.timer = new index_1.AVRTimer(this.cpu, index_1.timer0Config);
            this.portB = new index_1.AVRIOPort(this.cpu, index_1.portBConfig);
            this.portC = new index_1.AVRIOPort(this.cpu, index_1.portCConfig);
            this.portD = new index_1.AVRIOPort(this.cpu, index_1.portDConfig);
            this.usart = new index_1.AVRUSART(this.cpu, index_1.usart0Config, this.MHZ);
        }
        execute(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                this.stopped = false;
                for (;;) {
                    if (this.pausedOn.length == 0) {
                        (0, index_1.avrInstruction)(this.cpu);
                        this.cpu.tick();
                    }
                    else {
                        yield new Promise(resolve => setTimeout(resolve, 0));
                    }
                    let markDel = [];
                    this.instructions.forEach(t => {
                        var next = t.instructions[0];
                        if (this.cpu.cycles >= t.originCycle + next.cyclesSinceOrigin) {
                            t.instructions.shift();
                            if (t.instructions.length === 0) {
                                markDel.push(t);
                            }
                            if (next.pin < 8) {
                                this.portD.setPin(next.pin, next.isOn);
                            }
                            else if (next.pin < 14) {
                                this.portB.setPin(next.pin - 8, next.isOn);
                            }
                            else if (next.pin < 20) {
                                this.portC.setPin(next.pin - 14, next.isOn);
                            }
                        }
                    });
                    this.instructions = this.instructions.filter(i => !markDel.includes(i));
                    if (this.cpu.cycles % 50000 === 0) {
                        callback(this.cpu);
                        yield new Promise(resolve => setTimeout(resolve, 0));
                        if (this.stopped) {
                            break;
                        }
                    }
                }
            });
        }
        stop() {
            this.stopped = true;
        }
    }
    exports.AVRRunner = AVRRunner;
});
define("lib/avr8js/utils/assembler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assemble = void 0;
    function destRindex(r, min = 0, max = 31) {
        const match = r.match(/[Rr](\d{1,2})/);
        if (!match) {
            throw 'Not a register: ' + r;
        }
        const d = parseInt(match[1]);
        if (d < min || d > max) {
            throw 'Rd out of range: ' + min + '<>' + max;
        }
        return (d & 0x1f) << 4;
    }
    function srcRindex(r, min = 0, max = 31) {
        const match = r.match(/[Rr](\d{1,2})/);
        if (!match) {
            throw 'Not a register: ' + r;
        }
        const d = parseInt(match[1]);
        if (d < min || d > max) {
            throw 'Rd out of range: ' + min + '<>' + max;
        }
        let s = d & 0xf;
        s |= ((d >> 4) & 1) << 9;
        return s;
    }
    function constValue(r, min = 0, max = 255) {
        const d = typeof r === 'string' ? parseInt(r) : r;
        if (isNaN(d)) {
            throw 'constant is not a number.';
        }
        if (d < min || d > max) {
            throw '[Ks] out of range: ' + min + '<>' + max;
        }
        return d;
    }
    function fitTwoC(r, bits) {
        if (bits < 2) {
            throw 'Need at least 2 bits to be signed.';
        }
        if (bits > 16) {
            throw 'fitTwoC only works on 16bit numbers for now.';
        }
        if (Math.abs(r) > Math.pow(2, bits - 1))
            throw 'Not enough bits for number. (' + r + ', ' + bits + ')';
        if (r < 0) {
            r = 0xffff + r + 1;
        }
        const mask = 0xffff >> (16 - bits);
        return r & mask;
    }
    function constOrLabel(c, labels, offset = 0) {
        if (typeof c === 'string') {
            let d = parseInt(c);
            if (isNaN(d)) {
                if (c in labels) {
                    d = labels[c] - offset;
                }
                else {
                    return NaN;
                }
            }
            c = d;
        }
        return c;
    }
    function zeroPad(r, len = 4) {
        r = Number(r).toString(16);
        const base = Array(len + 1).join('0');
        const t = base.substr(0, len - r.length) + r;
        return t;
    }
    function stldXYZ(xyz) {
        switch (xyz) {
            case 'X':
                return 0x900c;
            case 'X+':
                return 0x900d;
            case '-X':
                return 0x900e;
            case 'Y':
                return 0x8008;
            case 'Y+':
                return 0x9009;
            case '-Y':
                return 0x900a;
            case 'Z':
                return 0x8000;
            case 'Z+':
                return 0x9001;
            case '-Z':
                return 0x9002;
            default:
                throw 'Not -?[XYZ]\\+?';
        }
    }
    function stldYZq(yzq) {
        const d = yzq.match(/([YZ])\+(\d+)/);
        let r = 0x8000;
        if (d == null) {
            throw 'Invalid arguments';
        }
        switch (d[1]) {
            case 'Y':
                r |= 0x8;
                break;
            case 'Z':
                break;
            default:
                throw 'Not Y or Z with q';
        }
        const q = parseInt(d[2]);
        if (q < 0 || q > 64) {
            throw 'q is out of range';
        }
        r |= ((q & 0x20) << 8) | ((q & 0x18) << 7) | (q & 0x7);
        return r;
    }
    const SEflag = (a) => zeroPad(0x9408 | (constValue(a, 0, 7) << 4));
    const OPTABLE = {
        ADD(a, b) {
            const r = 0x0c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ADC(a, b) {
            const r = 0x1c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ADIW(a, b) {
            let r = 0x9600;
            const dm = a.match(/[Rr](24|26|28|30)/);
            if (!dm) {
                throw 'Rd must be 24, 26, 28, or 30';
            }
            let d = parseInt(dm[1]);
            d = (d - 24) / 2;
            r |= (d & 0x3) << 4;
            const k = constValue(b, 0, 63);
            r |= ((k & 0x30) << 2) | (k & 0x0f);
            return zeroPad(r);
        },
        AND(a, b) {
            const r = 0x2000 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ANDI(a, b) {
            let r = 0x7000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        ASR(a) {
            const r = 0x9405 | destRindex(a);
            return zeroPad(r);
        },
        BCLR(a) {
            let r = 0x9488;
            const s = constValue(a, 0, 7);
            r |= (s & 0x7) << 4;
            return zeroPad(r);
        },
        BLD(a, b) {
            const r = 0xf800 | destRindex(a) | (constValue(b, 0, 7) & 0x7);
            return zeroPad(r);
        },
        BRBC(a, b, byteLoc, labels) {
            const k = constOrLabel(b, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['BRBC'](a, b, byteLoc, l);
            }
            let r = 0xf400 | constValue(a, 0, 7);
            r |= fitTwoC(constValue(k >> 1, -64, 63), 7) << 3;
            return zeroPad(r);
        },
        BRBS(a, b, byteLoc, labels) {
            const k = constOrLabel(b, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['BRBS'](a, b, byteLoc, l);
            }
            let r = 0xf000 | constValue(a, 0, 7);
            r |= fitTwoC(constValue(k >> 1, -64, 63), 7) << 3;
            return zeroPad(r);
        },
        BRCC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('0', a, byteLoc, labels);
        },
        BRCS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('0', a, byteLoc, labels);
        },
        BREAK() {
            return '9598';
        },
        BREQ(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('1', a, byteLoc, labels);
        },
        BRGE(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('4', a, byteLoc, labels);
        },
        BRHC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('5', a, byteLoc, labels);
        },
        BRHS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('5', a, byteLoc, labels);
        },
        BRID(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('7', a, byteLoc, labels);
        },
        BRIE(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('7', a, byteLoc, labels);
        },
        BRLO(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('0', a, byteLoc, labels);
        },
        BRLT(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('4', a, byteLoc, labels);
        },
        BRMI(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('2', a, byteLoc, labels);
        },
        BRNE(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('1', a, byteLoc, labels);
        },
        BRPL(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('2', a, byteLoc, labels);
        },
        BRSH(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('0', a, byteLoc, labels);
        },
        BRTC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('6', a, byteLoc, labels);
        },
        BRTS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('6', a, byteLoc, labels);
        },
        BRVC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('3', a, byteLoc, labels);
        },
        BRVS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('3', a, byteLoc, labels);
        },
        BSET(a) {
            let r = 0x9408;
            const s = constValue(a, 0, 7);
            r |= (s & 0x7) << 4;
            return zeroPad(r);
        },
        BST(a, b) {
            const r = 0xfa00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        CALL(a, b, byteLoc, labels) {
            let k = constOrLabel(a, labels);
            if (isNaN(k)) {
                return [(l) => OPTABLE['CALL'](a, b, byteLoc, l), 'xxxx'];
            }
            let r = 0x940e;
            k = constValue(k, 0, 0x400000) >> 1;
            const lk = k & 0xffff;
            const hk = (k >> 16) & 0x3f;
            r |= ((hk & 0x3e) << 3) | (hk & 1);
            return [zeroPad(r), zeroPad(lk)];
        },
        CBI(a, b) {
            const r = 0x9800 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        CRB(a, b, byteLoc, l) {
            const k = constValue(b);
            return OPTABLE['ANDI'](a.toString(), (~k & 0xff).toString(), byteLoc, l);
        },
        CLC() {
            return '9488';
        },
        CLH() {
            return '94d8';
        },
        CLI() {
            return '94f8';
        },
        CLN() {
            return '94a8';
        },
        CLR(a, _, byteLoc, l) {
            return OPTABLE['EOR'](a, a, byteLoc, l);
        },
        CLS() {
            return '94c8';
        },
        CLT() {
            return '94e8';
        },
        CLV() {
            return '94b8';
        },
        CLZ() {
            return '9498';
        },
        COM(a) {
            const r = 0x9400 | destRindex(a);
            return zeroPad(r);
        },
        CP(a, b) {
            const r = 0x1400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        CPC(a, b) {
            const r = 0x0400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        CPI(a, b) {
            let r = 0x3000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        CPSE(a, b) {
            const r = 0x1000 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        DEC(a) {
            const r = 0x940a | destRindex(a);
            return zeroPad(r);
        },
        DES(a) {
            const r = 0x940b | (constValue(a, 0, 15) << 4);
            return zeroPad(r);
        },
        EICALL() {
            return '9519';
        },
        EIJMP() {
            return '9419';
        },
        ELPM(a, b) {
            if (typeof a === 'undefined' || a === '') {
                return '95d8';
            }
            else {
                let r = 0x9000 | destRindex(a);
                switch (b) {
                    case 'Z':
                        r |= 6;
                        break;
                    case 'Z+':
                        r |= 7;
                        break;
                    default:
                        throw 'Bad operand';
                }
                return zeroPad(r);
            }
        },
        EOR(a, b) {
            const r = 0x2400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        FMUL(a, b) {
            const r = 0x0308 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        FMULS(a, b) {
            const r = 0x0380 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        FMULSU(a, b) {
            const r = 0x0388 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        ICALL() {
            return '9509';
        },
        IJMP() {
            return '9409';
        },
        IN(a, b) {
            let r = 0xb000 | destRindex(a);
            const A = constValue(b, 0, 63);
            r |= ((A & 0x30) << 5) | (A & 0x0f);
            return zeroPad(r);
        },
        INC(a) {
            const r = 0x9403 | destRindex(a);
            return zeroPad(r);
        },
        JMP(a, b, byteLoc, labels) {
            let k = constOrLabel(a, labels);
            if (isNaN(k)) {
                return [(l) => OPTABLE['JMP'](a, b, byteLoc, l), 'xxxx'];
            }
            let r = 0x940c;
            k = constValue(k, 0, 0x400000) >> 1;
            const lk = k & 0xffff;
            const hk = (k >> 16) & 0x3f;
            r |= ((hk & 0x3e) << 3) | (hk & 1);
            return [zeroPad(r), zeroPad(lk)];
        },
        LAC(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9206 | destRindex(b);
            return zeroPad(r);
        },
        LAS(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9205 | destRindex(b);
            return zeroPad(r);
        },
        LAT(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9207 | destRindex(b);
            return zeroPad(r);
        },
        LD(a, b) {
            const r = 0x0000 | destRindex(a) | stldXYZ(b);
            return zeroPad(r);
        },
        LDD(a, b) {
            const r = 0x0000 | destRindex(a) | stldYZq(b);
            return zeroPad(r);
        },
        LDI(a, b) {
            let r = 0xe000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        LDS(a, b) {
            const k = constValue(b, 0, 65535);
            const r = 0x9000 | destRindex(a);
            return [zeroPad(r), zeroPad(k)];
        },
        LPM(a, b) {
            if (typeof a === 'undefined' || a === '') {
                return '95c8';
            }
            else {
                let r = 0x9000 | destRindex(a);
                switch (b) {
                    case 'Z':
                        r |= 4;
                        break;
                    case 'Z+':
                        r |= 5;
                        break;
                    default:
                        throw 'Bad operand';
                }
                return zeroPad(r);
            }
        },
        LSL(a, _, byteLoc, l) {
            return OPTABLE['ADD'](a, a, byteLoc, l);
        },
        LSR(a) {
            const r = 0x9406 | destRindex(a);
            return zeroPad(r);
        },
        MOV(a, b) {
            const r = 0x2c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        MOVW(a, b) {
            const r = 0x0100 | ((destRindex(a) >> 1) & 0xf0) | ((destRindex(b) >> 5) & 0xf);
            return zeroPad(r);
        },
        MUL(a, b) {
            const r = 0x9c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        MULS(a, b) {
            const r = 0x0200 | (destRindex(a, 16, 31) & 0xf0) | (srcRindex(b, 16, 31) & 0xf);
            return zeroPad(r);
        },
        MULSU(a, b) {
            const r = 0x0300 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        NEG(a) {
            const r = 0x9401 | destRindex(a);
            return zeroPad(r);
        },
        NOP() {
            return '0000';
        },
        OR(a, b) {
            const r = 0x2800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ORI(a, b) {
            let r = 0x6000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        OUT(a, b) {
            let r = 0xb800 | destRindex(b);
            const A = constValue(a, 0, 63);
            r |= ((A & 0x30) << 5) | (A & 0x0f);
            return zeroPad(r);
        },
        POP(a) {
            const r = 0x900f | destRindex(a);
            return zeroPad(r);
        },
        PUSH(a) {
            const r = 0x920f | destRindex(a);
            return zeroPad(r);
        },
        RCALL(a, b, byteLoc, labels) {
            const k = constOrLabel(a, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['RCALL'](a, b, byteLoc, l);
            }
            const r = 0xd000 | fitTwoC(constValue(k >> 1, -2048, 2047), 12);
            return zeroPad(r);
        },
        RET() {
            return '9508';
        },
        RETI() {
            return '9518';
        },
        RJMP(a, b, byteLoc, labels) {
            const k = constOrLabel(a, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['RJMP'](a, b, byteLoc, l);
            }
            const r = 0xc000 | fitTwoC(constValue(k >> 1, -2048, 2047), 12);
            return zeroPad(r);
        },
        ROL(a, _, byteLoc, l) {
            return OPTABLE['ADC'](a, a, byteLoc, l);
        },
        ROR(a) {
            const r = 0x9407 | destRindex(a);
            return zeroPad(r);
        },
        SBC(a, b) {
            const r = 0x0800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        SBCI(a, b) {
            let r = 0x4000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0x0f);
            return zeroPad(r);
        },
        SBI(a, b) {
            const r = 0x9a00 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIC(a, b) {
            const r = 0x9900 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIS(a, b) {
            const r = 0x9b00 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIW(a, b) {
            let r = 0x9700;
            const dm = a.match(/[Rr](24|26|28|30)/);
            if (!dm) {
                throw 'Rd must be 24, 26, 28, or 30';
            }
            let d = parseInt(dm[1]);
            d = (d - 24) / 2;
            r |= (d & 0x3) << 4;
            const k = constValue(b, 0, 63);
            r |= ((k & 0x30) << 2) | (k & 0x0f);
            return zeroPad(r);
        },
        SBR(a, b) {
            let r = 0x6000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0x0f);
            return zeroPad(r);
        },
        SBRC(a, b) {
            const r = 0xfc00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBRS(a, b) {
            const r = 0xfe00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SEC() {
            return SEflag(0);
        },
        SEH() {
            return SEflag(5);
        },
        SEI() {
            return SEflag(7);
        },
        SEN() {
            return SEflag(2);
        },
        SER(a) {
            const r = 0xef0f | (destRindex(a, 16, 31) & 0xf0);
            return zeroPad(r);
        },
        SES() {
            return SEflag(4);
        },
        SET() {
            return SEflag(6);
        },
        SEV() {
            return SEflag(3);
        },
        SEZ() {
            return SEflag(1);
        },
        SLEEP() {
            return '9588';
        },
        SPM(a) {
            if (typeof a === 'undefined' || a === '') {
                return '95e8';
            }
            else {
                if (a !== 'Z+') {
                    throw 'Bad param to SPM';
                }
                return '95f8';
            }
        },
        ST(a, b) {
            const r = 0x0200 | destRindex(b) | stldXYZ(a);
            return zeroPad(r);
        },
        STD(a, b) {
            const r = 0x0200 | destRindex(b) | stldYZq(a);
            return zeroPad(r);
        },
        STS(a, b) {
            const k = constValue(a, 0, 65535);
            const r = 0x9200 | destRindex(b);
            return [zeroPad(r), zeroPad(k)];
        },
        SUB(a, b) {
            const r = 0x1800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        SUBI(a, b) {
            let r = 0x5000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        SWAP(a) {
            const r = 0x9402 | destRindex(a);
            return zeroPad(r);
        },
        TST(a, _, byteLoc, l) {
            return OPTABLE['AND'](a, a, byteLoc, l);
        },
        WDR() {
            return '95a8';
        },
        XCH(a, b) {
            const r = 0x9204 | destRindex(b);
            if (a !== 'Z') {
                throw 'Bad param, not Z';
            }
            return zeroPad(r);
        },
    };
    function passOne(inputdata) {
        const lines = inputdata.split('\n');
        const commentReg = /[#;].*$/;
        const labelReg = /^(\w+):/;
        const codeReg = /^\s*(\w+)(?:\s+([^,]+)(?:,\s*(\S+))?)?\s*$/;
        let lt;
        let res;
        let rets;
        let instruction;
        let byteOffset = 0;
        const lableTable = {};
        const replacements = {};
        const errorTable = [];
        const lineTable = [];
        for (let idx = 0; idx < lines.length; idx++) {
            res = lines[idx].trim();
            if (res.length === 0) {
                continue;
            }
            lt = { line: idx + 1, text: res, bytes: [], byteOffset: 0 };
            res = res.replace(commentReg, '').trim();
            if (res.length === 0) {
                continue;
            }
            rets = res.match(labelReg);
            if (rets) {
                lableTable[rets[1]] = byteOffset;
                res = res.replace(labelReg, '').trim();
            }
            if (res.length === 0) {
                continue;
            }
            const resMatch = res.match(codeReg);
            try {
                if (resMatch === null) {
                    throw "doesn't match as code!";
                }
                if (!resMatch[1]) {
                    throw 'Empty mnemonic field!';
                }
                instruction = resMatch[1].toUpperCase().trim();
                switch (instruction) {
                    case '_REPLACE':
                        replacements[resMatch[2]] = resMatch[3];
                        continue;
                    case '_LOC': {
                        const num = parseInt(resMatch[2]);
                        if (isNaN(num)) {
                            throw 'Location is not a number.';
                        }
                        if (num & 0x1) {
                            throw 'Location is odd';
                        }
                        byteOffset = num;
                        continue;
                    }
                    case '_IW': {
                        const num = parseInt(resMatch[2]);
                        if (isNaN(num)) {
                            throw 'Immeadiate Word is not a number.';
                        }
                        lt.bytes = zeroPad(num);
                        lt.byteOffset = byteOffset;
                        byteOffset += 2;
                        continue;
                    }
                }
                if (!(instruction in OPTABLE)) {
                    throw 'No such instruction: ' + instruction;
                }
                if (resMatch[2] in replacements) {
                    resMatch[2] = replacements[resMatch[2]];
                }
                if (resMatch[3] in replacements) {
                    resMatch[3] = replacements[resMatch[3]];
                }
                const bytes = OPTABLE[instruction](resMatch[2], resMatch[3], byteOffset, lableTable);
                lt.byteOffset = byteOffset;
                switch (typeof bytes) {
                    case 'function':
                    case 'string':
                        byteOffset += 2;
                        break;
                    case 'object':
                        byteOffset += bytes.length * 2;
                        break;
                    default:
                        throw 'unknown return type from optable.';
                }
                lt.bytes = bytes;
                lineTable.push(lt);
            }
            catch (err) {
                errorTable.push('Line ' + idx + ': ' + err);
            }
        }
        return {
            labels: lableTable,
            errors: errorTable,
            lines: lineTable,
        };
    }
    function elementSize(lt) {
        return typeof lt.bytes === 'string' ? lt.bytes.length / 2 : lt.bytes.length * 2;
    }
    function passTwo(lineTable, labels) {
        const errorTable = [];
        const lastElement = lineTable[lineTable.length - 1];
        const byteSize = lastElement ? lastElement.byteOffset + elementSize(lastElement) : 0;
        const resultTable = new Uint8Array(byteSize);
        for (const ltEntry of lineTable) {
            try {
                if (typeof ltEntry.bytes === 'function') {
                    ltEntry.bytes = ltEntry.bytes(labels);
                }
                if (ltEntry.bytes instanceof Array &&
                    ltEntry.bytes.length >= 1 &&
                    typeof ltEntry.bytes[0] === 'function') {
                    ltEntry.bytes = ltEntry.bytes[0](labels);
                }
                switch (typeof ltEntry.bytes) {
                    case 'string':
                        resultTable[ltEntry.byteOffset + 1] = parseInt(ltEntry.bytes.substr(0, 2), 16);
                        resultTable[ltEntry.byteOffset] = parseInt(ltEntry.bytes.substr(2, 4), 16);
                        break;
                    case 'object':
                        if (ltEntry.bytes.length < 1) {
                            throw 'Empty array in lineTable.';
                        }
                        for (let j = 0, bi = ltEntry.byteOffset; j < ltEntry.bytes.length; j++, bi += 2) {
                            const value = ltEntry.bytes[j];
                            if (typeof value !== 'string') {
                                throw 'Not an array of strings.';
                            }
                            resultTable[bi + 1] = parseInt(value.substr(0, 2), 16);
                            resultTable[bi] = parseInt(value.substr(2, 4), 16);
                        }
                        break;
                    default:
                        throw 'unknown return type from optable.';
                }
            }
            catch (err) {
                errorTable.push('Line: ' + ltEntry.line + ': ' + err);
            }
        }
        return { errors: errorTable, bytes: resultTable, lines: lineTable, labels };
    }
    function assemble(input) {
        const mid = passOne(input);
        if (mid.errors.length > 0) {
            return {
                bytes: new Uint8Array(0),
                errors: mid.errors,
                lines: [],
                labels: {},
            };
        }
        return passTwo(mid.lines, mid.labels);
    }
    exports.assemble = assemble;
});
define("lib/avr8js/utils/test-utils", ["require", "exports", "lib/avr8js/utils/assembler", "lib/avr8js/cpu/instruction"], function (require, exports, assembler_1, instruction_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestProgramRunner = exports.asmProgram = void 0;
    const BREAK_OPCODE = 0x9598;
    function asmProgram(source) {
        const { bytes, errors, lines, labels } = (0, assembler_1.assemble)(source);
        if (errors.length) {
            throw new Error('Assembly failed: ' + errors);
        }
        return { program: new Uint16Array(bytes.buffer), lines, instructionCount: lines.length, labels };
    }
    exports.asmProgram = asmProgram;
    const defaultOnBreak = () => {
        throw new Error('BREAK instruction encountered');
    };
    class TestProgramRunner {
        constructor(cpu, onBreak = defaultOnBreak) {
            this.cpu = cpu;
            this.onBreak = onBreak;
        }
        runInstructions(count) {
            const { cpu, onBreak } = this;
            for (let i = 0; i < count; i++) {
                if (cpu.progMem[cpu.pc] === BREAK_OPCODE) {
                    onBreak === null || onBreak === void 0 ? void 0 : onBreak(cpu);
                }
                (0, instruction_2.avrInstruction)(cpu);
                cpu.tick();
            }
        }
        runUntil(predicate, maxIterations = 5000) {
            const { cpu, onBreak } = this;
            for (let i = 0; i < maxIterations; i++) {
                if (cpu.progMem[cpu.pc] === BREAK_OPCODE) {
                    onBreak === null || onBreak === void 0 ? void 0 : onBreak(cpu);
                }
                if (predicate(cpu)) {
                    return;
                }
                (0, instruction_2.avrInstruction)(cpu);
                cpu.tick();
            }
            throw new Error('Test program ran for too long, check your predicate');
        }
        runToBreak() {
            this.runUntil((cpu) => cpu.progMem[cpu.pc] === BREAK_OPCODE);
        }
        runToAddress(byteAddr) {
            this.runUntil((cpu) => cpu.pc * 2 === byteAddr);
        }
    }
    exports.TestProgramRunner = TestProgramRunner;
});
define("interopManager", ["require", "exports", "lib/TimingPacket", "lib/avr8js/index", "lib/compile-util", "lib/execute"], function (require, exports, TimingPacket_1, index_2, compile_util_2, execute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interopManager = void 0;
    var interopManager;
    (function (interopManager) {
        class InteropManager {
            constructor() {
                this.interopLoc = "ADArCWebApp";
                this.awaitResponseOn = [];
                this.prevB = 0;
                this.prevC = 0;
                this.prevD = 0;
            }
            getChangedPins(newReg, regIndex) {
                var diff;
                var delta;
                if (regIndex === 0) {
                    diff = newReg ^ this.prevB;
                    delta = 8;
                }
                else if (regIndex === 1) {
                    diff = newReg ^ this.prevC;
                    delta = 14;
                }
                else {
                    diff = newReg ^ this.prevD;
                    delta = 0;
                }
                return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta - 1));
            }
            startCodeLoop() {
                this.runner.portB.addListener((e) => __awaiter(this, void 0, void 0, function* () {
                    this.runner.pausedOn = this.runner.pausedOn.concat(this.getChangedPins(e, 0).filter(e => this.awaitResponseOn.includes(e)));
                    this.prevB = e;
                    yield DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 0);
                }));
                this.runner.portC.addListener((e) => __awaiter(this, void 0, void 0, function* () {
                    this.runner.pausedOn.concat(this.getChangedPins(e, 1).filter(e => this.awaitResponseOn.includes(e)));
                    this.prevC = e;
                    yield DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 1);
                }));
                this.runner.portD.addListener((e) => __awaiter(this, void 0, void 0, function* () {
                    this.runner.pausedOn.concat(this.getChangedPins(e, 2).filter(e => this.awaitResponseOn.includes(e)));
                    this.prevD = e;
                    yield DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 2);
                }));
                this.runner.usart.onByteTransmit = (value) => __awaiter(this, void 0, void 0, function* () {
                    yield DotNet.invokeMethodAsync(this.interopLoc, "sendSerial", String.fromCharCode(value));
                });
                this.runCode();
            }
            getWindowWidth() {
                return window.innerWidth;
            }
            getWindowHeight() {
                return window.innerHeight;
            }
            getModel() {
                return window.monaco.editor.getModels()[0];
            }
            updateCodeInPane(code) {
                this.getModel().setValue(code);
            }
            getCodeInPane() {
                return this.getModel().getValue();
            }
            makeMonacoError(message, line, column) {
                var marker = {
                    message: message,
                    severity: monaco.MarkerSeverity.Error,
                    startLineNumber: line,
                    startColumn: column,
                    endLineNumber: line,
                    endColumn: column,
                };
                window.monaco.editor.setModelMarkers(this.getModel(), "owner", [marker]);
            }
            clearMonacoErrors() {
                window.monaco.editor.setModelMarkers(this.getModel(), "owner", []);
            }
            compile() {
                return __awaiter(this, void 0, void 0, function* () {
                    var res = yield (0, compile_util_2.buildHex)(this.getCodeInPane());
                    this.runner = new execute_1.AVRRunner(res.hex);
                    this.adc = new index_2.AVRADC(this.runner.cpu, index_2.adcConfig);
                    return { stdout: res.stdout, stderr: res.stderr };
                });
            }
            runCode() {
                this.runner.execute(cpu => { });
            }
            stop() {
                this.runner.stop();
                this.runner.pausedOn = [];
            }
            addResponseReqFlag(absoluteIndex) {
                this.awaitResponseOn.push(absoluteIndex);
            }
            removeResponseReqFlag(absoluteIndex) {
                const indexInAwaits = this.awaitResponseOn.indexOf(absoluteIndex);
                if (indexInAwaits > -1) {
                    this.awaitResponseOn.splice(indexInAwaits, 1);
                }
            }
            arduinoInput(insts) {
                var real = TimingPacket_1.TimingPacket.fix(insts);
                this.runner.instructions.push(real);
                const index = this.runner.pausedOn.indexOf(insts.instructions[0].pin);
                if (index > -1) {
                    this.runner.pausedOn.splice(index, 1);
                }
            }
            arduinoADCInput(channel, value) {
                this.adc.channelValues[channel] = value;
            }
            getPinState(index) {
                var state;
                if (index < 8) {
                    state = this.runner.portD.pinState(index);
                }
                else if (index < 14) {
                    state = this.runner.portB.pinState(index - 8);
                }
                else if (index < 20) {
                    state = this.runner.portC.pinState(index - 14);
                }
                else {
                    console.log("getPinState received invalid index: " + index);
                }
                if (state == index_2.PinState.High || state == index_2.PinState.InputPullUp) {
                    return true;
                }
                else {
                    return false;
                }
            }
            downloadFile(filename, contentStreamRef) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield contentStreamRef;
                    filename = new Date(Date.now()).toISOString() + " - " + filename;
                    console.log(filename);
                    const data = yield contentStreamRef.arrayBuffer();
                    const blob = new Blob([data]);
                    const url = URL.createObjectURL(blob);
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.download = filename !== null && filename !== void 0 ? filename : "";
                    anchor.click();
                    anchor.remove();
                    URL.revokeObjectURL(url);
                });
            }
            runTutorial() {
                const intro = window.introJs().setOption('keyboardNavigation', false);
                ;
                if (intro) {
                    console.log("intro is a valid object");
                }
                else {
                    console.log("intro not valid");
                }
                intro.start();
            }
        }
        interopManager.InteropManager = InteropManager;
        function getInteropManager() {
            return new InteropManager();
        }
        interopManager.getInteropManager = getInteropManager;
    })(interopManager || (exports.interopManager = interopManager = {}));
});
define("main", ["require", "exports", "interopManager"], function (require, exports, interopManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getInteropManager = interopManager_1.interopManager.getInteropManager;
    window.interopManager = interopManager_1.interopManager;
    window.addEventListener("resize", (e) => __awaiter(void 0, void 0, void 0, function* () { yield DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight()); }));
});
//# sourceMappingURL=build.js.map