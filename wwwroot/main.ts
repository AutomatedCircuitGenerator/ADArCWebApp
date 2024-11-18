//imported by index.html
"use strict";

import getInteropManager = interopManager.getInteropManager;
import {interopManager} from "./interopManager";
import {LCD1602I2C} from "@controllers/lcd1602i2c";
import {MAX6675} from "@controllers/max6675";
import {KY012} from "@controllers/ky012";
import {BNO055} from "@controllers/bno055";
import {HCSR501} from "@controllers/hcsr501";
import {KY018} from "@controllers/ky018";
import {ArcadePushButton} from "@controllers/arcade-push-button";
import {Servo} from "@controllers/servo";
import {TFLunaLidarI2C} from "@controllers/tf-luna-lidar-i2c";
import {KY008} from "@controllers/ky008";
import {ADXL345I2C} from "@controllers/adxl345i2c";
import {MQ3} from "@controllers/mq3";
import {HCSR04} from "@controllers/hcsr04";
import {KY003} from "@controllers/ky003";
import {KY022} from "@controllers/ky022";
import {LED} from "@controllers/led";

//setup the interop module for use by the C# side (Interop/AppInterop.cs)
(<any>window).interopManager = interopManager;
//send a request to C# to resize palette elements on window resize.
(<any>window).addEventListener("resize", async (e) => {
    await DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight())
});
//components
(<any>window).LCD1602I2C = LCD1602I2C;
(<any>window).BNO055 = BNO055;
(<any>window).MAX6675 = MAX6675;
(<any>window).KY012 = KY012;
(<any>window).ArcadePushButton = ArcadePushButton;
(<any>window).Servo = Servo;
(<any>window).HCSR501 = HCSR501;
(<any>window).KY018 = KY018;
(<any>window).TFLunaLidarI2C = TFLunaLidarI2C;
(<any>window).KY008 = KY008;
(<any>window).ADXL345I2C = ADXL345I2C;
(<any>window).MQ3 = MQ3;
(<any>window).HCSR04 = HCSR04;
(<any>window).KY003 = KY003;
(<any>window).KY022 = KY022;
(<any>window).LED = LED;
