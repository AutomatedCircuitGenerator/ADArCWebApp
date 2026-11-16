"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontA00 = exports.LCD1602I2C = exports.LCD1602_ADDR = void 0;
const controller_1 = require("@controllers/controller");
exports.LCD1602_ADDR = 0x27;
const LCD_MODE_CMD = 0x00;
const LCD_MODE_DATA = 0x40;
const LCD_CMD_CLEAR = 0x01;
const LCD_CMD_HOME = 0x02;
const LCD_CMD_ENTRY_MODE = 0x04;
const LCD_CMD_ENTRY_MODE_INCREMENT = 0x02;
const LCD_CMD_ENTRY_MODE_DECREMENT = 0x00;
const LCD_CMD_ENTRY_MODE_SHIFT = 0x01;
const LCD_CMD_DISPLAY_CONTROL = 0x08;
const LCD_CMD_DISPLAY_ENABLE = 0x04;
const LCD_CMD_DISPLAY_CURSOR = 0x02;
const LCD_CMD_DISPLAY_CURSOR_BLINK = 0x01;
const LCD_CMD_SHIFT = 0x10;
const LCD_CMD_SHIFT_CURSOR = 0x00;
const LCD_CMD_SHIFT_DISPLAY = 0x08;
const LCD_CMD_SHIFT_LEFT = 0x00;
const LCD_CMD_SHIFT_RIGHT = 0x04;
const LCD_CMD_FUNCTION = 0x20;
const LCD_CMD_FUNCTION_LCD_1LINE = 0x00;
const LCD_CMD_FUNCTION_LCD_2LINE = 0x08;
const LCD_CMD_FUNCTION_5x10_DOTS = 0x04;
const LCD_CMD_SET_CGRAM_ADDR = 0x40;
const LCD_CMD_SET_DRAM_ADDR = 0x80;
const LCD_CMD_SET_CONTRAST = 0x81;
const fOsc = 270000;
class LCD1602I2C extends controller_1.Controller {
    constructor() {
        super(...arguments);
        this.cgram = new Uint8Array(64);
        this.ddram = new Uint8Array(128);
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
    setup() {
        this.pins.pin3[0].twi.registerController(this.id, this);
    }
    cleanup() {
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
        this.render();
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
            characters.set(this.ddram.slice(r1, r1 + 16));
            characters.set(this.ddram.slice(r2, r2 + 16), 16);
        }
        else {
            characters.fill(32);
        }
        this.cgramUpdated = false;
        const backlight = this.element.querySelector(".backlight");
        const path = this.element.querySelector(".path");
        backlight.style.opacity = this.backlight ? '0' : '0.5';
        path.setAttribute("d", this.path(characters));
        this.renderCursor(this.addr % 64, Math.floor(this.addr / 64));
    }
    renderCursor(cursorX, cursorY) {
        const cursor = this.element.querySelector(".cursor");
        const xOffset = 12.45 + cursorX * 3.55;
        const yOffset = 12.55 + cursorY * 5.95;
        cursor.innerHTML = '';
        if (cursorX >= 0 && cursorX < 16 && cursorY >= 0 && cursorY < 2) {
            if (this.blinkOn) {
                cursor.innerHTML += `
                        <rect x="${xOffset}" y="${yOffset}" width="2.95" height="5.55" fill="black">
                            <animate attributeName="opacity" values="0;0;0;0;1;1;0;0;0;0" dur="1s" fill="freeze" repeatCount="indefinite"/>
                        </rect>
                    `;
            }
            if (this.cursorOn) {
                const y = yOffset + 0.7 * 7;
                cursor.innerHTML += `
                        <rect x="${xOffset}" y="${y}" width="2.95" height="0.65" fill="black"/>
                    `;
            }
        }
    }
    path(characters) {
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
                const row = exports.fontA00[characters[i] * 8 + py];
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
    backlightOn(value) {
        if (this.backlight !== value) {
            this.backlight = value;
        }
    }
    i2cConnect() {
        return true;
    }
    i2cDisconnect() { }
    i2cReadByte() {
        return 0xff;
    }
    i2cWriteByte(value) {
        const data = value & 0xF0;
        const rs = (value & 0x01) ? true : false;
        const bl = (value & LCD_CMD_DISPLAY_CONTROL) ? true : false;
        this.backlightOn(bl);
        if ((value & 0x04) && !(value & 0x02)) {
            this.writeData(data, rs);
        }
        this.update();
        return this.updated = true;
    }
    writeData(value, rs) {
        if (!this.is8bit) {
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
        }
        else {
            this.processCommand(value);
        }
        this.updated = true;
    }
    processCommand(value) {
        if (value & LCD_CMD_FUNCTION) {
            this.is8bit = (value & 0x10) ? true : false;
        }
        else if (value & LCD_CMD_SET_DRAM_ADDR) {
            this.cgramMode = false;
            this.addr = value & 0x7F;
        }
        else if (value & LCD_CMD_SET_CGRAM_ADDR) {
            this.cgramMode = true;
            this.addr = value & 0x3F;
        }
        else if (value & LCD_CMD_SHIFT) {
            const shiftDisplay = (value & LCD_CMD_SHIFT_DISPLAY) ? true : false;
            const shiftRight = (value & LCD_CMD_SHIFT_RIGHT) ? 1 : -1;
            this.cgramMode = false;
            this.addr = (this.addr + shiftRight) % 128;
            if (shiftDisplay) {
                this.shift = (this.shift + shiftRight) % 64;
            }
        }
        else if (value & LCD_CMD_DISPLAY_CONTROL) {
            this.displayOn = (value & LCD_CMD_DISPLAY_ENABLE) ? true : false;
            this.blinkOn = (value & LCD_CMD_DISPLAY_CURSOR_BLINK) ? true : false;
            this.cursorOn = (value & LCD_CMD_DISPLAY_CURSOR) ? true : false;
        }
        else if (value & LCD_CMD_ENTRY_MODE) {
            this.cgramMode = false;
            this.incrementMode = (value & LCD_CMD_ENTRY_MODE_INCREMENT) ? true : false;
            this.shiftMode = (value & LCD_CMD_ENTRY_MODE_SHIFT) ? true : false;
        }
        else if (value & LCD_CMD_HOME) {
            this.cgramMode = false;
            this.addr = 0x00;
            this.shift = 0x00;
        }
        else if (value & LCD_CMD_CLEAR) {
            this.cgramMode = false;
            this.incrementMode = true;
            this.addr = 0x00;
            this.shift = 0x00;
            this.ddram.fill(32);
        }
        else {
            console.warn('Unknown LCD1602 Command', value.toString(16));
        }
    }
    processData(value) {
        if (this.cgramMode) {
            const data = (value & 0x01) << 4 | (value & 0x02) << 2 | (value & 0x04) | (value & 0x08) >> 2 | (value & 0x10) >> 4;
            this.cgram[this.addr] = data;
            this.addr = (this.addr + 1) % 64;
            this.cgramUpdated = true;
        }
        else {
            const mode = this.incrementMode ? 1 : -1;
            this.ddram[this.addr] = value;
            this.addr = (this.addr + mode) % 128,
                this.shiftMode && (this.shift = (this.shift + mode) % 40);
        }
    }
}
exports.LCD1602I2C = LCD1602I2C;
exports.fontA00 = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    4, 4, 4, 4, 0, 0, 4, 0,
    10, 10, 10, 0, 0, 0, 0, 0,
    10, 10, 31, 10, 31, 10, 10, 0,
    4, 30, 5, 14, 20, 15, 4, 0,
    3, 19, 8, 4, 2, 25, 24, 0,
    6, 9, 5, 2, 21, 9, 22, 0,
    6, 4, 2, 0, 0, 0, 0, 0,
    8, 4, 2, 2, 2, 4, 8, 0,
    2, 4, 8, 8, 8, 4, 2, 0,
    0, 4, 21, 14, 21, 4, 0, 0,
    0, 4, 4, 31, 4, 4, 0, 0,
    0, 0, 0, 0, 6, 4, 2, 0,
    0, 0, 0, 31, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 6, 6, 0,
    0, 16, 8, 4, 2, 1, 0, 0,
    14, 17, 25, 21, 19, 17, 14, 0,
    4, 6, 4, 4, 4, 4, 14, 0,
    14, 17, 16, 8, 4, 2, 31, 0,
    31, 8, 4, 8, 16, 17, 14, 0,
    8, 12, 10, 9, 31, 8, 8, 0,
    31, 1, 15, 16, 16, 17, 14, 0,
    12, 2, 1, 15, 17, 17, 14, 0,
    31, 17, 16, 8, 4, 4, 4, 0,
    14, 17, 17, 14, 17, 17, 14, 0,
    14, 17, 17, 30, 16, 8, 6, 0,
    0, 6, 6, 0, 6, 6, 0, 0,
    0, 6, 6, 0, 6, 4, 2, 0,
    8, 4, 2, 1, 2, 4, 8, 0,
    0, 0, 31, 0, 31, 0, 0, 0,
    2, 4, 8, 16, 8, 4, 2, 0,
    14, 17, 16, 8, 4, 0, 4, 0,
    14, 17, 16, 22, 21, 21, 14, 0,
    14, 17, 17, 17, 31, 17, 17, 0,
    15, 17, 17, 15, 17, 17, 15, 0,
    14, 17, 1, 1, 1, 17, 14, 0,
    7, 9, 17, 17, 17, 9, 7, 0,
    31, 1, 1, 15, 1, 1, 31, 0,
    31, 1, 1, 15, 1, 1, 1, 0,
    14, 17, 1, 29, 17, 17, 30, 0,
    17, 17, 17, 31, 17, 17, 17, 0,
    14, 4, 4, 4, 4, 4, 14, 0,
    28, 8, 8, 8, 8, 9, 6, 0,
    17, 9, 5, 3, 5, 9, 17, 0,
    1, 1, 1, 1, 1, 1, 31, 0,
    17, 27, 21, 21, 17, 17, 17, 0,
    17, 17, 19, 21, 25, 17, 17, 0,
    14, 17, 17, 17, 17, 17, 14, 0,
    15, 17, 17, 15, 1, 1, 1, 0,
    14, 17, 17, 17, 21, 9, 22, 0,
    15, 17, 17, 15, 5, 9, 17, 0,
    30, 1, 1, 14, 16, 16, 15, 0,
    31, 4, 4, 4, 4, 4, 4, 0,
    17, 17, 17, 17, 17, 17, 14, 0,
    17, 17, 17, 17, 17, 10, 4, 0,
    17, 17, 17, 21, 21, 21, 10, 0,
    17, 17, 10, 4, 10, 17, 17, 0,
    17, 17, 17, 10, 4, 4, 4, 0,
    31, 16, 8, 4, 2, 1, 31, 0,
    7, 1, 1, 1, 1, 1, 7, 0,
    17, 10, 31, 4, 31, 4, 4, 0,
    14, 8, 8, 8, 8, 8, 14, 0,
    4, 10, 17, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 31, 0,
    2, 4, 8, 0, 0, 0, 0, 0,
    0, 0, 14, 16, 30, 17, 30, 0,
    1, 1, 13, 19, 17, 17, 15, 0,
    0, 0, 14, 1, 1, 17, 14, 0,
    16, 16, 22, 25, 17, 17, 30, 0,
    0, 0, 14, 17, 31, 1, 14, 0,
    12, 18, 2, 7, 2, 2, 2, 0,
    0, 30, 17, 17, 30, 16, 14, 0,
    1, 1, 13, 19, 17, 17, 17, 0,
    4, 0, 6, 4, 4, 4, 14, 0,
    8, 0, 12, 8, 8, 9, 6, 0,
    1, 1, 9, 5, 3, 5, 9, 0,
    6, 4, 4, 4, 4, 4, 14, 0,
    0, 0, 11, 21, 21, 17, 17, 0,
    0, 0, 13, 19, 17, 17, 17, 0,
    0, 0, 14, 17, 17, 17, 14, 0,
    0, 0, 15, 17, 15, 1, 1, 0,
    0, 0, 22, 25, 30, 16, 16, 0,
    0, 0, 13, 19, 1, 1, 1, 0,
    0, 0, 14, 1, 14, 16, 15, 0,
    2, 2, 7, 2, 2, 18, 12, 0,
    0, 0, 17, 17, 17, 25, 22, 0,
    0, 0, 17, 17, 17, 10, 4, 0,
    0, 0, 17, 21, 21, 21, 10, 0,
    0, 0, 17, 10, 4, 10, 17, 0,
    0, 0, 17, 17, 30, 16, 14, 0,
    0, 0, 31, 8, 4, 2, 31, 0,
    8, 4, 4, 2, 4, 4, 8, 0,
    4, 4, 4, 4, 4, 4, 4, 0,
    2, 4, 4, 8, 4, 4, 2, 0,
    0, 4, 8, 31, 8, 4, 0, 0,
    0, 4, 2, 31, 2, 4, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 7, 5, 7, 0,
    28, 4, 4, 4, 0, 0, 0, 0,
    0, 0, 0, 4, 4, 4, 7, 0,
    0, 0, 0, 0, 1, 2, 4, 0,
    0, 0, 0, 6, 6, 0, 0, 0,
    0, 31, 16, 31, 16, 8, 4, 0,
    0, 0, 31, 16, 12, 4, 2, 0,
    0, 0, 8, 4, 6, 5, 4, 0,
    0, 0, 4, 31, 17, 16, 12, 0,
    0, 0, 31, 4, 4, 4, 31, 0,
    0, 0, 8, 31, 12, 10, 9, 0,
    0, 0, 2, 31, 18, 10, 2, 0,
    0, 0, 0, 14, 8, 8, 31, 0,
    0, 0, 15, 8, 15, 8, 15, 0,
    0, 0, 0, 21, 21, 16, 12, 0,
    0, 0, 0, 31, 0, 0, 0, 0,
    31, 16, 20, 12, 4, 4, 2, 0,
    16, 8, 4, 6, 5, 4, 4, 0,
    4, 31, 17, 17, 16, 8, 4, 0,
    0, 31, 4, 4, 4, 4, 31, 0,
    8, 31, 8, 12, 10, 9, 8, 0,
    2, 31, 18, 18, 18, 18, 9, 0,
    4, 31, 4, 31, 4, 4, 4, 0,
    0, 30, 18, 17, 16, 8, 6, 0,
    2, 30, 9, 8, 8, 8, 4, 0,
    0, 31, 16, 16, 16, 16, 31, 0,
    10, 31, 10, 10, 8, 4, 2, 0,
    0, 3, 16, 19, 16, 8, 7, 0,
    0, 31, 16, 8, 4, 10, 17, 0,
    2, 31, 18, 10, 2, 2, 28, 0,
    0, 17, 17, 18, 16, 8, 6, 0,
    0, 30, 18, 21, 24, 8, 6, 0,
    8, 7, 4, 31, 4, 4, 2, 0,
    0, 21, 21, 21, 16, 8, 4, 0,
    14, 0, 31, 4, 4, 4, 2, 0,
    2, 2, 2, 6, 10, 2, 2, 0,
    4, 4, 31, 4, 4, 2, 1, 0,
    0, 14, 0, 0, 0, 0, 31, 0,
    0, 31, 16, 10, 4, 10, 1, 0,
    4, 31, 8, 4, 14, 21, 4, 0,
    8, 8, 8, 8, 8, 4, 2, 0,
    0, 4, 8, 17, 17, 17, 17, 0,
    1, 1, 31, 1, 1, 1, 30, 0,
    0, 31, 16, 16, 16, 8, 6, 0,
    0, 2, 5, 8, 16, 16, 0, 0,
    4, 31, 4, 4, 21, 21, 4, 0,
    0, 31, 16, 16, 10, 4, 8, 0,
    0, 14, 0, 14, 0, 14, 16, 0,
    0, 4, 2, 1, 17, 31, 16, 0,
    0, 16, 16, 10, 4, 10, 1, 0,
    0, 31, 2, 31, 2, 2, 28, 0,
    2, 2, 31, 18, 10, 2, 2, 0,
    0, 14, 8, 8, 8, 8, 31, 0,
    0, 31, 16, 31, 16, 16, 31, 0,
    14, 0, 31, 16, 16, 8, 4, 0,
    9, 9, 9, 9, 8, 4, 2, 0,
    0, 4, 5, 5, 21, 21, 13, 0,
    0, 1, 1, 17, 9, 5, 3, 0,
    0, 31, 17, 17, 17, 17, 31, 0,
    0, 31, 17, 17, 16, 8, 4, 0,
    0, 3, 0, 16, 16, 8, 7, 0,
    4, 9, 2, 0, 0, 0, 0, 0,
    7, 5, 7, 0, 0, 0, 0, 0,
    0, 0, 18, 21, 9, 9, 22, 0,
    10, 0, 14, 16, 30, 17, 30, 0,
    0, 0, 14, 17, 15, 17, 15, 1,
    0, 0, 14, 1, 6, 17, 14, 0,
    0, 0, 17, 17, 17, 25, 23, 1,
    0, 0, 30, 5, 9, 17, 14, 0,
    0, 0, 12, 18, 17, 17, 15, 1,
    0, 0, 30, 17, 17, 17, 30, 16,
    0, 0, 28, 4, 4, 5, 2, 0,
    0, 8, 11, 8, 0, 0, 0, 0,
    8, 0, 12, 8, 8, 8, 8, 8,
    0, 5, 2, 5, 0, 0, 0, 0,
    0, 4, 14, 5, 21, 14, 4, 0,
    2, 2, 7, 2, 7, 2, 30, 0,
    14, 0, 13, 19, 17, 17, 17, 0,
    10, 0, 14, 17, 17, 17, 14, 0,
    0, 0, 13, 19, 17, 17, 15, 1,
    0, 0, 22, 25, 17, 17, 30, 16,
    0, 14, 17, 31, 17, 17, 14, 0,
    0, 0, 0, 26, 21, 11, 0, 0,
    0, 0, 14, 17, 17, 10, 27, 0,
    10, 0, 17, 17, 17, 17, 25, 22,
    31, 1, 2, 4, 2, 1, 31, 0,
    0, 0, 31, 10, 10, 10, 25, 0,
    31, 0, 17, 10, 4, 10, 17, 0,
    0, 0, 17, 17, 17, 17, 30, 16,
    0, 16, 15, 4, 31, 4, 4, 0,
    0, 0, 31, 2, 30, 18, 17, 0,
    0, 0, 31, 21, 31, 17, 17, 0,
    0, 4, 0, 31, 0, 4, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    31, 31, 31, 31, 31, 31, 31, 31,
]);
//# sourceMappingURL=lcd1602i2c.js.map