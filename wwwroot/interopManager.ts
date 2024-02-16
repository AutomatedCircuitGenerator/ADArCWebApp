import { AVRADC, adcConfig } from "./lib/avr8js/index";
import { buildHex } from "./lib/compile-util";
import { AVRRunner } from "./lib/execute";

export namespace interopManager {

    export class InteropManager {

        interopLoc = "ADArCWebApp";
        runner: AVRRunner;
        adc: AVRADC;

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

        getWindowHeight(): number {
            return window.innerHeight;
        }

        private getModel(){
            return (<any>window).monaco.editor.getModels()[0];
        }

        updateCodeInPane(code: string) {
            this.getModel().setValue(code);
        }

        getCodeInPane(): string {
            return this.getModel().getValue();
        }

        setPaneCode(text: string) {
            this.getModel().setValue(text);
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
            this.adc = new AVRADC(this.runner.cpu, adcConfig);
            return { stdout: res.stdout, stderr: res.stderr }
        }
        
        runCode() {
            this.runner.execute(cpu => { });
        }

        stop() {
            this.runner.stop();
        }

        arduinoInput(pin: number, value: boolean) {
            if (pin < 8) {
                this.runner.portD.setPin(pin, value);
            }
            else if (pin < 14) {
                this.runner.portB.setPin(pin - 8, value);
            }
            else if (pin < 20) {
                this.runner.portC.setPin(pin - 14, value);
            }
        }

        arduinoADCInput(channel: number, value: number) {
            this.adc.channelValues[channel] = value;
        }

        async delayus(delay: number): Promise<boolean> {
            const start = performance.now();

            for (var counter = 0; counter < this.cyclesPerUs * delay; counter++) {
                performance.now();
            }
            //console.log("start: " + start + "end: " + performance.now());

            var real = performance.now() - start;

            if (real < 1) {
                return true;
            }

            var adjustRatio = (delay / 1000) / real;

            adjustRatio = Math.max(Math.min(adjustRatio,1.1), .9);

            this.cyclesPerUs *= adjustRatio;

            console.log(this.cyclesPerUs);

            return true;
        }

        cyclesPerUs = -1;

        calibrateTiming() {
            let counter = 0;
            const start = performance.now();
            while (performance.now() - start < 2000) {
                counter++;
            }

            this.cyclesPerUs = counter / 2000000;
            console.log("cyclesPerUs: " + this.cyclesPerUs);
        }


        async downloadFile(filename: string, contentStreamRef: any) {
            await contentStreamRef;
            console.log("download!");
            const data = await contentStreamRef.arrayBuffer();
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = filename ?? "";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        }

    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}