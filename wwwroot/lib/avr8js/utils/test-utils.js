"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestProgramRunner = void 0;
exports.asmProgram = asmProgram;
const assembler_1 = require("./assembler");
const instruction_1 = require("../cpu/instruction");
const BREAK_OPCODE = 0x9598;
function asmProgram(source) {
    const { bytes, errors, lines, labels } = (0, assembler_1.assemble)(source);
    if (errors.length) {
        throw new Error('Assembly failed: ' + errors);
    }
    return { program: new Uint16Array(bytes.buffer), lines, instructionCount: lines.length, labels };
}
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
            (0, instruction_1.avrInstruction)(cpu);
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
            (0, instruction_1.avrInstruction)(cpu);
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
//# sourceMappingURL=test-utils.js.map