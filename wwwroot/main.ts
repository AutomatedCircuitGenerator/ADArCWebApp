//imported by index.html
"use strict";

import getInteropManager = interopManager.getInteropManager;
import { interopManager } from "./interopManager";

//setup the interop module for use by the C# side (Interop/AppInterop.cs)
(<any>window).interopManager = interopManager;

//send a request to C# to resize palette elements on window resize.
(<any>window).addEventListener("resize", async (e) => { await DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight()) });