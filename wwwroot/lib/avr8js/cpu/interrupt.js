"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avrInterrupt = avrInterrupt;
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
//# sourceMappingURL=interrupt.js.map