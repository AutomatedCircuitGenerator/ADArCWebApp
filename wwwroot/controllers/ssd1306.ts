import { I2CController } from "@lib/i2c-bus";
import { Controller } from "@controllers/controller";

export class SSD1306 extends Controller implements I2CController {

    private updated = true;
    private displayText = "SSD1306";

    setup() {
        console.log("SSD1306 setup");
        console.log("registering at", 0x3C);
        this.pins.scl[0].twi.registerController(0x3C, this);
        this.render();
    }

    cleanup() {}

    update() {
        if (this.updated) {
            this.render();
            this.updated = false;
        }
    }

    render() {
        console.log("displayText =", this.displayText);
        const text = this.element.querySelector("#oledText");
        console.log("text =", text);

        if (text) {
            text.textContent = this.displayText;
        }
        console.log("render");
    }

    i2cConnect() {
        console.log("I2C CONNECT");
        return true;
    }

    i2cDisconnect() {}

    i2cReadByte(): number {
        return 0xff;
    }

    i2cWriteByte(value: number) {
        console.log("SSD1306 I2C:", value.toString(16));

        this.displayText = value.toString(16);

        this.updated = true;
        this.update();

        return true;
    }
}