import { Controller } from "@controllers/controller";
import { I2CController } from "@lib/i2c-bus";

export class SHT30 extends Controller implements I2CController {
    /* Buffers */
    private commandBuffer: number[] = [];
    private readBuffer: number[] = [];
    private readIndex = 0;

    /* Environment */
    private temperatureC = 25.0;
    private humidityRH = 50.0;

    setup(): void {
        this.pins.sda[0].twi.registerController(this.id, this);
    }

    // TODO: Add clamping
    override update(state: Record<string, any>) {
        this.temperatureC = state.temperature;
        this.humidityRH = state.humidity;
    }

    i2cConnect(addr: number, _write: boolean): boolean {
        return addr === this.id;
    }

    i2cDisconnect(): void {
        this.commandBuffer = [];
        this.readIndex = 0;
    }
    
    i2cWriteByte(value: number): boolean {
        this.commandBuffer.push(value);

        if (this.commandBuffer.length === 2) {
            const [msb, lsb] = this.commandBuffer;
            this.commandBuffer = [];
            this.handleCommand(msb, lsb);
        }

        return true;
    }
    
    i2cReadByte(acked: boolean): number {
        if (this.readIndex >= this.readBuffer.length)
            return 0xff;
        
        const byte = this.readBuffer[this.readIndex++];

        if (!acked)
            this.readIndex = 0;

        return byte;
    }

    private handleCommand(msb: number, lsb: number) {
        const validCommands = [
            [0x2C, 0x06], // High rep, clock stretch
            [0x2C, 0x0D], // Medium rep, clock stretch
            [0x2C, 0x10], // Low rep, clock stretch
            [0x24, 0x00], // High rep, no stretch
            [0x24, 0x0B], // Medium rep, no stretch
            [0x24, 0x16], // Low rep, no stretch
        ];
        
        for (const [cmdMSB, cmdLSB] of validCommands) {
            if (msb === cmdMSB && lsb === cmdLSB) {
                this.performMeasurement(msb, lsb);
                return;
            }
        }

        // Unknown commands are ignored
    }
    
    private performMeasurement(msb: number, lsb: number) {
        let temp = this.temperatureC;
        let hum = this.humidityRH;

        // Add noise based on repeatability
        if (msb === 0x2C || msb === 0x24) {
            switch (lsb) {
                case 0x06: // high
                case 0x00:
                    temp += this.rand(-0.05, 0.05);
                    hum += this.rand(-0.2, 0.2);
                    break;

                case 0x0D: // medium
                case 0x0B:
                    temp += this.rand(-0.1, 0.1);
                    hum += this.rand(-0.5, 0.5);
                    break;

                case 0x10: // low
                case 0x16:
                    temp += this.rand(-0.2, 0.2);
                    hum += this.rand(-1.0, 1.0);
                    break;
            }
        }

        // Clamp to physical limits
        hum = Math.max(0, Math.min(100, hum));

        // Convert temperature (°C) to raw 16-bit sensor value
        // SHT30 datasheet formula: T_raw = (T + 45) * (2^16 - 1) / 175
        const tempRaw = Math.round((temp + 45) * (175 / 0xFFFF));

        // Convert relative humidity (%) to raw 16-bit sensor value
        // SHT30 datasheet formula: RH_raw = RH * (2^16 - 1) / 100
        const humRaw = Math.round(hum * 0xFFFF / 100.0);

        // Split temperature into most significant byte and least significant byte
        const tMSB = (tempRaw >> 8) & 0xff;
        const tLSB = tempRaw & 0xff;
        
        // Split humidity into most significant byte and least significant byte
        const hMSB = (humRaw >> 8) & 0xff;
        const hLSB = humRaw & 0xff;

        // Compute CRC-8 checksums for temperature and humidity bytes (used by sensor to detect transmission errors)
        const tCRC = this.crc8(tMSB, tLSB);
        const hCRC = this.crc8(hMSB, hLSB);

        // Arduino library expects I2C read buffer in the following order: 
        // [Temperature MSB, Temperature LSB, Temperature CRC, Humidity MSB, Humidity LSB, Humidity CRC]
        this.readBuffer = [
            tMSB, tLSB, tCRC,
            hMSB, hLSB, hCRC,
        ];

        this.readIndex = 0;
    }
    
    private crc8(msb: number, lsb: number): number {
        let crc = 0xff;

        crc ^= msb;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
            crc &= 0xff;
        }

        crc ^= lsb;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
            crc &= 0xff;
        }

        return crc;
    }

    private rand(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }
}
