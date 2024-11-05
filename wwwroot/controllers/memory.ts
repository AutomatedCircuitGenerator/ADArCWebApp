type Register = {
    address: number;
    size: number;
};

export class Memory {
    private readonly memory: Uint8Array;
    constructor(size: number) {
        this.memory = new Uint8Array(size);

        return new Proxy(this, {
            get(target, prop) {
                // If the property exists on the target (the Memory instance), return it.
                if (prop in target) {
                    return target[prop];
                }
                // Otherwise, access the memory array
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

    read(register: Register) {
        const bytes = this.memory.subarray(register.address, register.address + register.size);
        let value = 0;

        // Assuming little-endian byte order; modify if needed
        for (let i = 0; i < register.size; i++) {
            value |= bytes[i] << (i * 8);
        }

        return value;
    }

    write(register: Register, value: number) {
        const bytes = new Uint8Array(register.size);

        // Assuming little-endian byte order; modify if needed
        for (let i = 0; i < register.size; i++) {
            bytes[i] = (value >> (i * 8)) & 0xFF;
        }

        this.memory.set(bytes, register.address);
    }
}
