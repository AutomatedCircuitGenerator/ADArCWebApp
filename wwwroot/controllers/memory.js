"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
class Memory {
    constructor(size) {
        this.memory = new Uint8Array(size);
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                return target.memory[prop];
            },
            set(target, prop, value) {
                target.memory[prop] = value;
                return true;
            }
        });
    }
    clear() {
        this.memory.fill(0);
    }
    get size() {
        return this.memory.length;
    }
    read(register) {
        const bytes = this.memory.subarray(register.address, register.address + register.size);
        let value = 0;
        for (let i = 0; i < register.size; i++) {
            value |= bytes[i] << (i * 8);
        }
        return value;
    }
    write(register, value) {
        const bytes = new Uint8Array(register.size);
        for (let i = 0; i < register.size; i++) {
            bytes[i] = (value >> (i * 8)) & 0xFF;
        }
        this.memory.set(bytes, register.address);
    }
}
exports.Memory = Memory;
//# sourceMappingURL=memory.js.map