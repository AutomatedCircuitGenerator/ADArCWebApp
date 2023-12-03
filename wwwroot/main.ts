//imported by index.html
"use strict";
import { loadHex, lcd } from "./lib/arduino-blink"
import * as avr8js from './lib/avr8js/index';
import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";


const program = new Uint16Array(0x8000);
loadHex(lcd, new Uint8Array(program.buffer));
const interopLoc = "ADArCWebApp";
const cpu = new avr8js.CPU(program);
const timer0 = new avr8js.AVRTimer(cpu, avr8js.timer0Config);
const portB = new avr8js.AVRIOPort(cpu, avr8js.portBConfig);
const portC = new avr8js.AVRIOPort(cpu, avr8js.portCConfig);
const portD = new avr8js.AVRIOPort(cpu, avr8js.portDConfig);

(<any>window).interopManager = interopManager;


portB.addListener(async (e) => {
    await DotNet.invokeMethodAsync(interopLoc, "sendVal", e, 0);
});

portC.addListener(async (e) => {
    await DotNet.invokeMethodAsync(interopLoc, "sendVal", e, 0);
});

portD.addListener(async (e) => {
    await DotNet.invokeMethodAsync(interopLoc, "sendVal", e, 0);
});


export function runCode() {
    for (let i = 0; i < 50000; i++) {
        avr8js.avrInstruction(cpu);
        cpu.tick();
    }
    setTimeout(runCode, 0);
}



(<any>window).addEventListener("resize", async (e) => { await DotNet.invokeMethodAsync(interopLoc, "updateScreenWidthRatio", getInteropManager().getWindowWidth()) });