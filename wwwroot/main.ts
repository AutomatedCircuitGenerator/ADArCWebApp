//imported by index.html
"use strict";

import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";
import {LCD1602I2C} from "@components/lcd1602i2c";

//setup the interop module for use by the C# side (Interop/AppInterop.cs)
(<any>window).interopManager = interopManager;
(<any>window).LCD1602I2C = LCD1602I2C;
//send a request to C# to resize palette elements on window resize.
(<any>window).addEventListener("resize", async (e) => { await DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight()) });