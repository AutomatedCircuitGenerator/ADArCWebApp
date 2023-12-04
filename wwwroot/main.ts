//imported by index.html
"use strict";

import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";

(<any>window).interopManager = interopManager;


(<any>window).addEventListener("resize", async (e) => { await DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenWidthRatio", getInteropManager().getWindowWidth()) });