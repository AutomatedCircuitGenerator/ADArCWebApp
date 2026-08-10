"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoAnalog = exports.ArduinoDigital = exports.ArduinoUSART = exports.ArduinoTWI = exports.ArduinoTimer = exports.ArduinoSPI = exports.ArduinoCPU = exports.MHZ = void 0;
const avr8js_1 = require("@lib/avr8js");
const timer_1 = require("@lib/avr8js/peripherals/timer");
exports.MHZ = 16e6;
class ArduinoCPU {
    constructor(cpu) {
        this.cpu = cpu;
    }
    clock() {
        (0, avr8js_1.avrInstruction)(this.cpu);
        this.cpu.tick();
    }
    get cycles() {
        return this.cpu.cycles;
    }
    get frequency() {
        return exports.MHZ;
    }
    addClockEvent(callback, cycles) {
        this.cpu.addClockEvent(callback, cycles);
    }
}
exports.ArduinoCPU = ArduinoCPU;
class ArduinoSPI {
    constructor(spi) {
        this.spi = spi;
    }
    addListener(listener) {
        this.spi.addListener(listener);
    }
    removeListener(listener) {
        this.spi.removeListener(listener);
    }
    completeTransfer(receivedByte) {
        this.spi.completeTransfer(receivedByte);
    }
    get transferCycles() {
        return this.spi.transferCycles;
    }
}
exports.ArduinoSPI = ArduinoSPI;
class ArduinoTimer {
    constructor(timer) {
        this.timer = timer;
    }
    getPwmPeriod() {
        const { timer } = this;
        const timerMode = timer.getTimerMode();
        let period = 0;
        if (timerMode === timer_1.TimerMode.FastPWM) {
            period = ((timer.TOP + 1) * timer.getDivider());
        }
        else if (timerMode === timer_1.TimerMode.PWMPhaseCorrect) {
            period = (2 * (timer.TOP + 1) * timer.getDivider());
        }
        return period;
    }
}
exports.ArduinoTimer = ArduinoTimer;
class ArduinoTWI {
    constructor(twi) {
        this.twi = twi;
    }
    registerController(addr, device) {
        this.twi.eventHandler.registerController(addr, device);
    }
    unregisterController(addr) {
        this.twi.eventHandler.unregisterController(addr);
    }
}
exports.ArduinoTWI = ArduinoTWI;
class ArduinoUSART {
    constructor(usart) {
        this.usart = usart;
    }
    set onByteTransmit(listener) {
        this.usart.onByteTransmit = listener;
    }
    writeByte(value, immediate = false) {
        return this.usart.writeByte(value, immediate);
    }
}
exports.ArduinoUSART = ArduinoUSART;
class ArduinoDigital {
    get state() {
        return this.port.pinState(this.index);
    }
    addListener(listener) {
        this.port.addListener(() => {
            let state = this.port.pinState(this.index);
            if (state !== this.previousState) {
                listener(state);
            }
            this.previousState = state;
        });
    }
    set state(state) {
        this.port.setPin(this.index, state === avr8js_1.PinState.High);
    }
    constructor(port, index) {
        this.port = port;
        this.index = index;
    }
}
exports.ArduinoDigital = ArduinoDigital;
class ArduinoAnalog {
    get voltage() {
        return this.adc.channelValues[this.channel];
    }
    set voltage(voltage) {
        this.adc.channelValues[this.channel] = voltage;
    }
    constructor(adc, channel) {
        this.adc = adc;
        this.channel = channel;
    }
}
exports.ArduinoAnalog = ArduinoAnalog;
//# sourceMappingURL=arduino.js.map