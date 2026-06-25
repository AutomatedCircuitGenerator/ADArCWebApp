import { I2CController } from "@lib/i2c-bus";
import { Controller } from "@controllers/controller";

export class SSD1306 extends Controller implements I2CController {
    
    private updated = true;
    private buffer = new Uint8Array(128 * 64);
    private page = 0;
    private column = 0;
    // private mode: "command" | "data" = "command";
    private dataCount = 0;
    private isDataMode = false;
    private dataIndex = 0;
    private expectingControlByte = true;
    private mode = "command";
    private powered = false;

    setup() {
        console.log("SSD1306 setup");
        this.powered = true;
        this.buffer.fill(0);
        this.pins.scl[0].twi.registerController(0x3C, this);
        console.log("registered");
        this.render();
    }

    cleanup() {
        console.log("SSD1306 cleanup");
        this.powered = false;
        this.buffer.fill(0);
        this.render();
    }

    update() {
        if (this.updated) {
            this.render();
            this.updated = false;
        }
    }

    render() {
        const pixels = this.element.querySelector("#oledPixels");
        let litPixels = 0;
        if (!this.powered) {
            pixels.innerHTML = "";
            return;
        }

        if (!pixels) {
            return;
        }

        pixels.innerHTML = "";

        for(let page=0; page<8; page++) {
            for(let x=0; x<128; x++) {
                const b = this.buffer[page * 128 + x];
                for(let bit=0; bit<8; bit++) {
                    if(b & (1 << bit)) {
                        litPixels++;
                        const y = page * 8 + bit;
                        const pixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                        pixel.setAttribute("x", (625 + x * 2.82).toString());
                        pixel.setAttribute("y", (355 + y * 3.0).toString());
                        pixel.setAttribute("width", "2.82");
                        pixel.setAttribute("height", "3");
                        pixel.setAttribute("fill", "white");
                        pixels.appendChild(pixel);
                    }
                }
            }
        }
        console.log("litPixels =", litPixels);
    }

    i2cConnect() {
        console.log("I2C CONNECT");
        this.expectingControlByte = true;
        return true;
    }

    i2cDisconnect() {
        console.log("I2C DISCONNECT");
        console.log("I2C DISCONNECT dataIndex=", this.dataIndex);
        this.render();
        return true;
    }

    i2cReadByte(): number {
        return 0xFF;
    }

    i2cWriteByte(value: number) {
        if(this.expectingControlByte) {
            console.log("CONTROL:", value.toString(16));
            this.expectingControlByte = false;
            if(value === 0x40) {
                this.mode = "data";
            }
            else {
                this.mode = "command";
            }
            return true;
        }

        if(this.mode === "data") {
            this.buffer[this.dataIndex++] = value;
            if(this.dataIndex % 100 === 0) {
                console.log("dataIndex", this.dataIndex);
            }
        }

        return true;
    }

    display() {
        this.render();
    }
}