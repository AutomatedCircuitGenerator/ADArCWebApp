import { I2CController } from "@lib/i2c-bus";
import { Controller } from "@controllers/controller";

export class SSD1306 extends Controller implements I2CController {

    private displayText = "SSD1306";
    private updated = true;
    private buffer = new Uint8Array(128 * 64);

    setup() {
        console.log("SSD1306 setup");

        this.pins.scl[0].twi.registerController(0x3C, this);
        
        for(let x=0;x<128;x++){
            this.buffer[32 * 128 + x] = 1;
        }

        this.render();
    }

    cleanup() {
        console.log("SSD1306 cleanup");
    }

    update() {
        if (this.updated) {
            this.render();
            this.updated = false;
        }
    }

    render() {

        const pixelGroup =
            this.element.querySelector("#oledPixels");

        if (!pixelGroup) {
            return;
        }

        pixelGroup.innerHTML = "";

        const startX = 612;
        const startY = 350;

        const pixelWidth = 386 / 128;
        const pixelHeight = 197 / 64;

        for (let y = 0; y < 64; y++) {

            for (let x = 0; x < 128; x++) {

                if (!this.buffer[y * 128 + x]) {
                    continue;
                }

                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                rect.setAttribute("x", (startX + x * pixelWidth).toString());

                rect.setAttribute("y", (startY + y * pixelHeight).toString());

                rect.setAttribute("width", pixelWidth.toString());

                rect.setAttribute("height", pixelHeight.toString());

                rect.setAttribute("fill", "#88aaff");

                pixelGroup.appendChild(rect);
            }
        }
    }

    i2cConnect() {
        console.log("I2C CONNECT");
        return true;
    }

    i2cDisconnect() {
        console.log("I2C DISCONNECT");
    }

    i2cReadByte(): number {
        return 0xFF;
    }

    i2cWriteByte(value: number) {

        console.log("SSD1306 I2C:", value.toString(16));

        this.displayText = value.toString(16);

        this.updated = true;
        this.update();

        return true;
    }
}