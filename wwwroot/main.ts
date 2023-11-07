//imported by index.html
"use strict";
import { loadBlink } from "./lib/arduino-blink"
import * as avr8js from './lib/avr8js/index';
import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";


const program = new Uint16Array(16384);
loadBlink(program);

const cpu = new avr8js.CPU(program);
const timer0 = new avr8js.AVRTimer(cpu, avr8js.timer0Config);
const portB = new avr8js.AVRIOPort(cpu, avr8js.portBConfig);

(<any>window).interopManager = interopManager;


portB.addListener(async () => {
    await DotNet.invokeMethodAsync("MinAVR", "updVal", portB.pinState(5) === avr8js.PinState.High);
});

export function runCode() {
    for (let i = 0; i < 50000; i++) {
        avr8js.avrInstruction(cpu);
        cpu.tick();
    }
    setTimeout(runCode, 0);
}


