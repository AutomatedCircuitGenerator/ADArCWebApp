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

            this.runner.usart.onByteTransmit = async (value: number) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendSerial", String.fromCharCode(value));
            };
            this.runCode();
        }

        getWindowWidth(): number {
            return window.innerWidth;
        }

        private getModel() {
            return (<any>window).monaco.editor.getModels()[0];
        }

        updateCodeInPane(code: string) {
            this.getModel().setValue(code);
        }

        getCodeInPane(): string {
            return this.getModel().getValue();
        }

        makeMonacoError(message, line, column) {
            var marker = {
                message: message,
                severity: monaco.MarkerSeverity.Error,
                startLineNumber: line,
                startColumn: column,
                endLineNumber: line,
                endColumn: column,
            };
            (<any>window).monaco.editor.setModelMarkers(this.getModel(), "owner", [marker]);
        }
        clearMonacoErrors() {
            (<any>window).monaco.editor.setModelMarkers(this.getModel(), "owner", []);
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