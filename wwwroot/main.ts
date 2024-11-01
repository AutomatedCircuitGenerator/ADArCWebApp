//imported by index.html
"use strict";

import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";
import {LCD1602I2C} from "@controllers/lcd1602i2c";
import {MAX6675} from "@controllers/max6675";
import {KY012} from "@controllers/ky012";
import {BNO055} from "@controllers/bno055";
import {HCSR501} from "@controllers/hcsr501";
import {KY018} from "@controllers/ky018";
import {ArcadePushButton} from "@controllers/arcade-push-button";

//setup the interop module for use by the C# side (Interop/AppInterop.cs)
(<any>window).interopManager = interopManager;
//send a request to C# to resize palette elements on window resize.
(<any>window).addEventListener("resize", async (e) => { await DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight()) });
//components
(<any>window).LCD1602I2C = LCD1602I2C;
(<any>window).BNO055 = BNO055;
(<any>window).MAX6675 = MAX6675;
(<any>window).KY012 = KY012;
(<any>window).ArcadePushButton = ArcadePushButton;
(<any>window).HCSR501 = HCSR501;
(<any>window).KY018 = KY018;
