/**
 * LCD1602
 * Part of AVR8js Electron Playground
 *
 * Copyright (C) 2019, Uri Shaked
 * Copyright (C) 2020, Anderson Costa
 */
import {I2CBus, I2CController} from "@lib/i2c-bus";
import {DotNetObjectReference} from "@type-declarations/dotnet";
import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";

export const LCD1602_ADDR          = 0x27;

const LCD_MODE_CMD                 = 0x00;
const LCD_MODE_DATA                = 0x40;

const LCD_CMD_CLEAR                = 0x01;
const LCD_CMD_HOME                 = 0x02;

const LCD_CMD_ENTRY_MODE           = 0x04;
const LCD_CMD_ENTRY_MODE_INCREMENT = 0x02;
const LCD_CMD_ENTRY_MODE_DECREMENT = 0x00;
const LCD_CMD_ENTRY_MODE_SHIFT     = 0x01;

const LCD_CMD_DISPLAY_CONTROL      = 0x08;
const LCD_CMD_DISPLAY_ENABLE       = 0x04;
const LCD_CMD_DISPLAY_CURSOR       = 0x02;
const LCD_CMD_DISPLAY_CURSOR_BLINK = 0x01;

const LCD_CMD_SHIFT                = 0x10;
const LCD_CMD_SHIFT_CURSOR         = 0x00;
const LCD_CMD_SHIFT_DISPLAY        = 0x08;
const LCD_CMD_SHIFT_LEFT           = 0x00;
const LCD_CMD_SHIFT_RIGHT          = 0x04;

const LCD_CMD_FUNCTION             = 0x20;
const LCD_CMD_FUNCTION_LCD_1LINE   = 0x00;
const LCD_CMD_FUNCTION_LCD_2LINE   = 0x08;
const LCD_CMD_FUNCTION_5x10_DOTS   = 0x04;

const LCD_CMD_SET_CGRAM_ADDR       = 0x40;
const LCD_CMD_SET_DRAM_ADDR        = 0x80;

// Extra
const LCD_CMD_SET_CONTRAST         = 0x81;

// Oscillator frequency defined in datasheet is 270 kHz
const fOsc = 270000;

export class LCD1602I2C extends Controller implements I2CController {
    // RAM settings
    private cgram = new Uint8Array(64);
    private ddram = new Uint8Array(128);

    // Memory and addressing settings
    private addr = 0x00;  // Address
    private shift = 0x00; // Shift Register
    private data = 0x00;  // Data Register

    // Display settings
    private displayOn = false;
    private blinkOn = false;
    private cursorOn = false;
    private backlight = false;

    // Command parsing state machine
    private firstByte = true;
    private commandMode = false;
    private cgramMode = false;
    private cgramUpdated = true;
    private incrementMode = true;
    private shiftMode = false;
    private is8bit = true;
    private updated = false;
    
    setup() {
        AVRRunner.getInstance().twi.eventHandler.registerController(LCD1602_ADDR, this);
    }
    
    reset() {
        this.cgram.fill(0);  
        this.ddram.fill(0); 

        this.addr = 0x00;     
        this.shift = 0x00;    
        this.data = 0x00;    

        this.displayOn = false; 
        this.blinkOn = false;    
        this.cursorOn = false;    
        this.backlight = false;  

        this.firstByte = true;      
        this.commandMode = false;    
        this.cgramMode = false;      
        this.cgramUpdated = true;    
        this.incrementMode = true;   
        this.shiftMode = false;     
        this.is8bit = true;         
        this.updated = false;
    }

    update() {
        if (this.updated) {
            this.updated = false;
            return this.render();
        }

        return false;
    }

    render() {
        let characters = new Uint8Array(32);

        if (this.displayOn) {
            const r1 = this.shift % 64;
            const r2 = 64 + this.shift % 64;
            // Set characters
            characters.set(this.ddram.slice(r1, r1 + 16));
            characters.set(this.ddram.slice(r2, r2 + 16), 16);
        } else {
            characters.fill(32);
        }
        
        this.cgramUpdated = false;
        
        const backlight = this.element.querySelector<HTMLElement>(".backlight");
        const path = this.element.querySelector<HTMLElement>(".path");

        backlight.style.opacity = this.backlight ? '0' : '0.5';
        path.setAttribute("d", this.path(characters));
    }

    path(characters: Uint8Array | number[]) {
        const xSpacing = 0.6;
        const ySpacing = 0.7;
        const charXSpacing = 3.55;
        const charYSpacing = 5.95;
        const result = [];
        const cols = 16;
        for (let i = 0; i < characters.length; i++) {
            const charX = (i % cols) * charXSpacing;
            const charY = Math.floor(i / cols) * charYSpacing;

            for (let py = 0; py < 8; py++) {
                const row = fontA00[characters[i] * 8 + py];
                for (let px = 0; px < 5; px++) {
                    if (row & (1 << px)) {
                        const x = (charX + px * xSpacing).toFixed(2);
                        const y = (charY + py * ySpacing).toFixed(2);
                        result.push(`M ${x} ${y}h0.55v0.65h-0.55Z`);
                    }
                }
            }
        }
        return result.join(' ');
    }

    backlightOn(value: boolean) {
        if (this.backlight !== value) {
            this.backlight = value;
        }
    }

    i2cConnect() {
        return true;
    }

    i2cDisconnect() {}

    i2cReadByte(): number {
        return 0xff;
    }

    i2cWriteByte(value: number) {
        const data = value & 0xF0;
        const rs = (value & 0x01) ? true : false; // Register Select
        const bl = (value & LCD_CMD_DISPLAY_CONTROL) ? true : false;

        // Turn on/off backlight
        this.backlightOn(bl);

        // Check data write
        if ((value & 0x04) && !(value & 0x02)) {
            this.writeData(data, rs);
        }

        this.update();
        return this.updated = true;
    }

    writeData(value: number, rs: boolean) {
        if (!this.is8bit) {
            // Check register
            if (this.firstByte) {
                this.firstByte = false;
                this.data = value;
                return false;
            }

            value = this.data | value >> 4;

            this.firstByte = true;
        }

        if (rs) {
            this.processData(value);
        } else {
            this.processCommand(value);
        }

        this.updated = true;
    }

    processCommand(value: number) {
        // Check commands
        if (value & LCD_CMD_FUNCTION) {
            this.is8bit = (value & 0x10) ? true : false;
        } else if (value & LCD_CMD_SET_DRAM_ADDR) {
            this.cgramMode = false;
            this.addr = value & 0x7F;
        } else if (value & LCD_CMD_SET_CGRAM_ADDR) {
            this.cgramMode = true;
            this.addr = value & 0x3F;
        } else if (value & LCD_CMD_SHIFT) {
            const shiftDisplay = (value & LCD_CMD_SHIFT_DISPLAY) ? true : false;
            const shiftRight = (value & LCD_CMD_SHIFT_RIGHT) ? 1 : -1;

            this.cgramMode = false;
            this.addr = (this.addr + shiftRight) % 128;

            if (shiftDisplay) {
                this.shift = (this.shift + shiftRight) % 64;
            }
        } else if (value & LCD_CMD_DISPLAY_CONTROL) {
            this.displayOn = (value & LCD_CMD_DISPLAY_ENABLE) ? true : false;
            this.blinkOn = (value & LCD_CMD_DISPLAY_CURSOR_BLINK) ? true : false;
            this.cursorOn = (value & LCD_CMD_DISPLAY_CURSOR) ? true : false;
        } else if (value & LCD_CMD_ENTRY_MODE) {
            this.cgramMode = false;
            this.incrementMode = (value & LCD_CMD_ENTRY_MODE_INCREMENT) ? true : false;
            this.shiftMode = (value & LCD_CMD_ENTRY_MODE_SHIFT) ? true : false;
        } else if (value & LCD_CMD_HOME) {
            this.cgramMode = false;
            this.addr = 0x00;
            this.shift = 0x00;
        } else if (value & LCD_CMD_CLEAR) {
            this.cgramMode = false;
            this.incrementMode = true;
            this.addr = 0x00;
            this.shift = 0x00;
            this.ddram.fill(32);
        } else {
            console.warn(
                'Unknown LCD1602 Command',
                value.toString(16),
            );
        }
    }

    processData(value: number) {
        // Check RAM type
        if (this.cgramMode) {
            // CGRAM
            const data = (value & 0x01) << 4 | (value & 0x02) << 2 | (value & 0x04) | (value & 0x08) >> 2 | (value & 0x10) >> 4;

            this.cgram[this.addr] = data;
            this.addr = (this.addr + 1) % 64;
            this.cgramUpdated = true;
        } else {
            // DRAM
            const mode = this.incrementMode ? 1 : -1;

            this.ddram[this.addr] = value;
            this.addr = (this.addr + mode) % 128,
            this.shiftMode && (this.shift = (this.shift + mode) % 40);
        }
    }
}

export const fontA00 = new Uint8Array([
    /* 0 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 1 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 2 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 3 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 4 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 5 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 6 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 7 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 8 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 9 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 10 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 11 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 12 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 13 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 14 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 15 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 16 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 17 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 18 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 19 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 20 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 21 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 22 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 23 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 24 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 25 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 26 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 27 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 28 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 29 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 30 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 31 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 32 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 33 */ 4, 4, 4, 4, 0, 0, 4, 0,
    /* 34 */ 10, 10, 10, 0, 0, 0, 0, 0,
    /* 35 */ 10, 10, 31, 10, 31, 10, 10, 0,
    /* 36 */ 4, 30, 5, 14, 20, 15, 4, 0,
    /* 37 */ 3, 19, 8, 4, 2, 25, 24, 0,
    /* 38 */ 6, 9, 5, 2, 21, 9, 22, 0,
    /* 39 */ 6, 4, 2, 0, 0, 0, 0, 0,
    /* 40 */ 8, 4, 2, 2, 2, 4, 8, 0,
    /* 41 */ 2, 4, 8, 8, 8, 4, 2, 0,
    /* 42 */ 0, 4, 21, 14, 21, 4, 0, 0,
    /* 43 */ 0, 4, 4, 31, 4, 4, 0, 0,
    /* 44 */ 0, 0, 0, 0, 6, 4, 2, 0,
    /* 45 */ 0, 0, 0, 31, 0, 0, 0, 0,
    /* 46 */ 0, 0, 0, 0, 0, 6, 6, 0,
    /* 47 */ 0, 16, 8, 4, 2, 1, 0, 0,
    /* 48 */ 14, 17, 25, 21, 19, 17, 14, 0,
    /* 49 */ 4, 6, 4, 4, 4, 4, 14, 0,
    /* 50 */ 14, 17, 16, 8, 4, 2, 31, 0,
    /* 51 */ 31, 8, 4, 8, 16, 17, 14, 0,
    /* 52 */ 8, 12, 10, 9, 31, 8, 8, 0,
    /* 53 */ 31, 1, 15, 16, 16, 17, 14, 0,
    /* 54 */ 12, 2, 1, 15, 17, 17, 14, 0,
    /* 55 */ 31, 17, 16, 8, 4, 4, 4, 0,
    /* 56 */ 14, 17, 17, 14, 17, 17, 14, 0,
    /* 57 */ 14, 17, 17, 30, 16, 8, 6, 0,
    /* 58 */ 0, 6, 6, 0, 6, 6, 0, 0,
    /* 59 */ 0, 6, 6, 0, 6, 4, 2, 0,
    /* 60 */ 8, 4, 2, 1, 2, 4, 8, 0,
    /* 61 */ 0, 0, 31, 0, 31, 0, 0, 0,
    /* 62 */ 2, 4, 8, 16, 8, 4, 2, 0,
    /* 63 */ 14, 17, 16, 8, 4, 0, 4, 0,
    /* 64 */ 14, 17, 16, 22, 21, 21, 14, 0,
    /* 65 */ 14, 17, 17, 17, 31, 17, 17, 0,
    /* 66 */ 15, 17, 17, 15, 17, 17, 15, 0,
    /* 67 */ 14, 17, 1, 1, 1, 17, 14, 0,
    /* 68 */ 7, 9, 17, 17, 17, 9, 7, 0,
    /* 69 */ 31, 1, 1, 15, 1, 1, 31, 0,
    /* 70 */ 31, 1, 1, 15, 1, 1, 1, 0,
    /* 71 */ 14, 17, 1, 29, 17, 17, 30, 0,
    /* 72 */ 17, 17, 17, 31, 17, 17, 17, 0,
    /* 73 */ 14, 4, 4, 4, 4, 4, 14, 0,
    /* 74 */ 28, 8, 8, 8, 8, 9, 6, 0,
    /* 75 */ 17, 9, 5, 3, 5, 9, 17, 0,
    /* 76 */ 1, 1, 1, 1, 1, 1, 31, 0,
    /* 77 */ 17, 27, 21, 21, 17, 17, 17, 0,
    /* 78 */ 17, 17, 19, 21, 25, 17, 17, 0,
    /* 79 */ 14, 17, 17, 17, 17, 17, 14, 0,
    /* 80 */ 15, 17, 17, 15, 1, 1, 1, 0,
    /* 81 */ 14, 17, 17, 17, 21, 9, 22, 0,
    /* 82 */ 15, 17, 17, 15, 5, 9, 17, 0,
    /* 83 */ 30, 1, 1, 14, 16, 16, 15, 0,
    /* 84 */ 31, 4, 4, 4, 4, 4, 4, 0,
    /* 85 */ 17, 17, 17, 17, 17, 17, 14, 0,
    /* 86 */ 17, 17, 17, 17, 17, 10, 4, 0,
    /* 87 */ 17, 17, 17, 21, 21, 21, 10, 0,
    /* 88 */ 17, 17, 10, 4, 10, 17, 17, 0,
    /* 89 */ 17, 17, 17, 10, 4, 4, 4, 0,
    /* 90 */ 31, 16, 8, 4, 2, 1, 31, 0,
    /* 91 */ 7, 1, 1, 1, 1, 1, 7, 0,
    /* 92 */ 17, 10, 31, 4, 31, 4, 4, 0,
    /* 93 */ 14, 8, 8, 8, 8, 8, 14, 0,
    /* 94 */ 4, 10, 17, 0, 0, 0, 0, 0,
    /* 95 */ 0, 0, 0, 0, 0, 0, 31, 0,
    /* 96 */ 2, 4, 8, 0, 0, 0, 0, 0,
    /* 97 */ 0, 0, 14, 16, 30, 17, 30, 0,
    /* 98 */ 1, 1, 13, 19, 17, 17, 15, 0,
    /* 99 */ 0, 0, 14, 1, 1, 17, 14, 0,
    /* 100 */ 16, 16, 22, 25, 17, 17, 30, 0,
    /* 101 */ 0, 0, 14, 17, 31, 1, 14, 0,
    /* 102 */ 12, 18, 2, 7, 2, 2, 2, 0,
    /* 103 */ 0, 30, 17, 17, 30, 16, 14, 0,
    /* 104 */ 1, 1, 13, 19, 17, 17, 17, 0,
    /* 105 */ 4, 0, 6, 4, 4, 4, 14, 0,
    /* 106 */ 8, 0, 12, 8, 8, 9, 6, 0,
    /* 107 */ 1, 1, 9, 5, 3, 5, 9, 0,
    /* 108 */ 6, 4, 4, 4, 4, 4, 14, 0,
    /* 109 */ 0, 0, 11, 21, 21, 17, 17, 0,
    /* 110 */ 0, 0, 13, 19, 17, 17, 17, 0,
    /* 111 */ 0, 0, 14, 17, 17, 17, 14, 0,
    /* 112 */ 0, 0, 15, 17, 15, 1, 1, 0,
    /* 113 */ 0, 0, 22, 25, 30, 16, 16, 0,
    /* 114 */ 0, 0, 13, 19, 1, 1, 1, 0,
    /* 115 */ 0, 0, 14, 1, 14, 16, 15, 0,
    /* 116 */ 2, 2, 7, 2, 2, 18, 12, 0,
    /* 117 */ 0, 0, 17, 17, 17, 25, 22, 0,
    /* 118 */ 0, 0, 17, 17, 17, 10, 4, 0,
    /* 119 */ 0, 0, 17, 21, 21, 21, 10, 0,
    /* 120 */ 0, 0, 17, 10, 4, 10, 17, 0,
    /* 121 */ 0, 0, 17, 17, 30, 16, 14, 0,
    /* 122 */ 0, 0, 31, 8, 4, 2, 31, 0,
    /* 123 */ 8, 4, 4, 2, 4, 4, 8, 0,
    /* 124 */ 4, 4, 4, 4, 4, 4, 4, 0,
    /* 125 */ 2, 4, 4, 8, 4, 4, 2, 0,
    /* 126 */ 0, 4, 8, 31, 8, 4, 0, 0,
    /* 127 */ 0, 4, 2, 31, 2, 4, 0, 0,
    /* 128 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 129 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 130 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 131 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 132 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 133 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 134 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 135 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 136 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 137 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 138 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 139 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 140 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 141 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 142 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 143 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 144 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 145 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 146 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 147 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 148 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 149 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 150 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 151 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 152 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 153 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 154 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 155 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 156 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 157 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 158 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 159 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 160 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 161 */ 0, 0, 0, 0, 7, 5, 7, 0,
    /* 162 */ 28, 4, 4, 4, 0, 0, 0, 0,
    /* 163 */ 0, 0, 0, 4, 4, 4, 7, 0,
    /* 164 */ 0, 0, 0, 0, 1, 2, 4, 0,
    /* 165 */ 0, 0, 0, 6, 6, 0, 0, 0,
    /* 166 */ 0, 31, 16, 31, 16, 8, 4, 0,
    /* 167 */ 0, 0, 31, 16, 12, 4, 2, 0,
    /* 168 */ 0, 0, 8, 4, 6, 5, 4, 0,
    /* 169 */ 0, 0, 4, 31, 17, 16, 12, 0,
    /* 170 */ 0, 0, 31, 4, 4, 4, 31, 0,
    /* 171 */ 0, 0, 8, 31, 12, 10, 9, 0,
    /* 172 */ 0, 0, 2, 31, 18, 10, 2, 0,
    /* 173 */ 0, 0, 0, 14, 8, 8, 31, 0,
    /* 174 */ 0, 0, 15, 8, 15, 8, 15, 0,
    /* 175 */ 0, 0, 0, 21, 21, 16, 12, 0,
    /* 176 */ 0, 0, 0, 31, 0, 0, 0, 0,
    /* 177 */ 31, 16, 20, 12, 4, 4, 2, 0,
    /* 178 */ 16, 8, 4, 6, 5, 4, 4, 0,
    /* 179 */ 4, 31, 17, 17, 16, 8, 4, 0,
    /* 180 */ 0, 31, 4, 4, 4, 4, 31, 0,
    /* 181 */ 8, 31, 8, 12, 10, 9, 8, 0,
    /* 182 */ 2, 31, 18, 18, 18, 18, 9, 0,
    /* 183 */ 4, 31, 4, 31, 4, 4, 4, 0,
    /* 184 */ 0, 30, 18, 17, 16, 8, 6, 0,
    /* 185 */ 2, 30, 9, 8, 8, 8, 4, 0,
    /* 186 */ 0, 31, 16, 16, 16, 16, 31, 0,
    /* 187 */ 10, 31, 10, 10, 8, 4, 2, 0,
    /* 188 */ 0, 3, 16, 19, 16, 8, 7, 0,
    /* 189 */ 0, 31, 16, 8, 4, 10, 17, 0,
    /* 190 */ 2, 31, 18, 10, 2, 2, 28, 0,
    /* 191 */ 0, 17, 17, 18, 16, 8, 6, 0,
    /* 192 */ 0, 30, 18, 21, 24, 8, 6, 0,
    /* 193 */ 8, 7, 4, 31, 4, 4, 2, 0,
    /* 194 */ 0, 21, 21, 21, 16, 8, 4, 0,
    /* 195 */ 14, 0, 31, 4, 4, 4, 2, 0,
    /* 196 */ 2, 2, 2, 6, 10, 2, 2, 0,
    /* 197 */ 4, 4, 31, 4, 4, 2, 1, 0,
    /* 198 */ 0, 14, 0, 0, 0, 0, 31, 0,
    /* 199 */ 0, 31, 16, 10, 4, 10, 1, 0,
    /* 200 */ 4, 31, 8, 4, 14, 21, 4, 0,
    /* 201 */ 8, 8, 8, 8, 8, 4, 2, 0,
    /* 202 */ 0, 4, 8, 17, 17, 17, 17, 0,
    /* 203 */ 1, 1, 31, 1, 1, 1, 30, 0,
    /* 204 */ 0, 31, 16, 16, 16, 8, 6, 0,
    /* 205 */ 0, 2, 5, 8, 16, 16, 0, 0,
    /* 206 */ 4, 31, 4, 4, 21, 21, 4, 0,
    /* 207 */ 0, 31, 16, 16, 10, 4, 8, 0,
    /* 208 */ 0, 14, 0, 14, 0, 14, 16, 0,
    /* 209 */ 0, 4, 2, 1, 17, 31, 16, 0,
    /* 210 */ 0, 16, 16, 10, 4, 10, 1, 0,
    /* 211 */ 0, 31, 2, 31, 2, 2, 28, 0,
    /* 212 */ 2, 2, 31, 18, 10, 2, 2, 0,
    /* 213 */ 0, 14, 8, 8, 8, 8, 31, 0,
    /* 214 */ 0, 31, 16, 31, 16, 16, 31, 0,
    /* 215 */ 14, 0, 31, 16, 16, 8, 4, 0,
    /* 216 */ 9, 9, 9, 9, 8, 4, 2, 0,
    /* 217 */ 0, 4, 5, 5, 21, 21, 13, 0,
    /* 218 */ 0, 1, 1, 17, 9, 5, 3, 0,
    /* 219 */ 0, 31, 17, 17, 17, 17, 31, 0,
    /* 220 */ 0, 31, 17, 17, 16, 8, 4, 0,
    /* 221 */ 0, 3, 0, 16, 16, 8, 7, 0,
    /* 222 */ 4, 9, 2, 0, 0, 0, 0, 0,
    /* 223 */ 7, 5, 7, 0, 0, 0, 0, 0,
    /* 224 */ 0, 0, 18, 21, 9, 9, 22, 0,
    /* 225 */ 10, 0, 14, 16, 30, 17, 30, 0,
    /* 226 */ 0, 0, 14, 17, 15, 17, 15, 1,
    /* 227 */ 0, 0, 14, 1, 6, 17, 14, 0,
    /* 228 */ 0, 0, 17, 17, 17, 25, 23, 1,
    /* 229 */ 0, 0, 30, 5, 9, 17, 14, 0,
    /* 230 */ 0, 0, 12, 18, 17, 17, 15, 1,
    /* 231 */ 0, 0, 30, 17, 17, 17, 30, 16,
    /* 232 */ 0, 0, 28, 4, 4, 5, 2, 0,
    /* 233 */ 0, 8, 11, 8, 0, 0, 0, 0,
    /* 234 */ 8, 0, 12, 8, 8, 8, 8, 8,
    /* 235 */ 0, 5, 2, 5, 0, 0, 0, 0,
    /* 236 */ 0, 4, 14, 5, 21, 14, 4, 0,
    /* 237 */ 2, 2, 7, 2, 7, 2, 30, 0,
    /* 238 */ 14, 0, 13, 19, 17, 17, 17, 0,
    /* 239 */ 10, 0, 14, 17, 17, 17, 14, 0,
    /* 240 */ 0, 0, 13, 19, 17, 17, 15, 1,
    /* 241 */ 0, 0, 22, 25, 17, 17, 30, 16,
    /* 242 */ 0, 14, 17, 31, 17, 17, 14, 0,
    /* 243 */ 0, 0, 0, 26, 21, 11, 0, 0,
    /* 244 */ 0, 0, 14, 17, 17, 10, 27, 0,
    /* 245 */ 10, 0, 17, 17, 17, 17, 25, 22,
    /* 246 */ 31, 1, 2, 4, 2, 1, 31, 0,
    /* 247 */ 0, 0, 31, 10, 10, 10, 25, 0,
    /* 248 */ 31, 0, 17, 10, 4, 10, 17, 0,
    /* 249 */ 0, 0, 17, 17, 17, 17, 30, 16,
    /* 250 */ 0, 16, 15, 4, 31, 4, 4, 0,
    /* 251 */ 0, 0, 31, 2, 30, 18, 17, 0,
    /* 252 */ 0, 0, 31, 21, 31, 17, 17, 0,
    /* 253 */ 0, 4, 0, 31, 0, 4, 0, 0,
    /* 254 */ 0, 0, 0, 0, 0, 0, 0, 0,
    /* 255 */ 31, 31, 31, 31, 31, 31, 31, 31,
]);