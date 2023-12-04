import { buildHex } from "./lib/compile-util";
import { AVRRunner } from "./lib/execute";

export namespace interopManager {

    export class InteropManager {

        interopLoc = "ADArCWebApp";
        runner: AVRRunner;

        startCodeLoop(wrapper: any) {
            console.log("starting code!")
            this.runner.portB.addListener(async (e) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, 0);
            });

            this.runner.portC.addListener(async (e) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, 1);
            });

            this.runner.portD.addListener(async (e) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, 2);
            });
            this.runCode();
        }

        getWindowWidth(): number {
            return window.innerWidth;
        }

        updateCodeInPane(code: string) {
            (<any>window).monaco.editor.getModels()[0].setValue(code);
        }

        getCodeInPane(): string {
            return (<any>window).monaco.editor.getModels()[0].getValue();
        }

        async compile(): Promise<object> {
            var res = await buildHex(this.getCodeInPane());
            this.runner = new AVRRunner(res.hex);
            return { stdout: res.stdout, stderr: res.stderr }
        }
        
        runCode() {
            this.runner.execute(cpu => { });
        }

        stop() {
            this.runner.stop();
        }


    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}