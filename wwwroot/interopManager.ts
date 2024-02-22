import { TimingPacket } from "./lib/TimingPacket";
import { AVRADC, PinState, adcConfig } from "./lib/avr8js/index";
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
                console.log("send time: " + new Date(Date.now()).toISOString() + " value: " + e);
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 0);
            });

            this.runner.portC.addListener(async (e) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 1);
            });

            this.runner.portD.addListener(async (e) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 2);
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

        arduinoInput(insts: TimingPacket) {
            console.log("arrive time: " + new Date(Date.now()).toISOString());
            this.runner.instructions.push(insts);
        }

        arduinoADCInput(channel: number, value: number) {
            this.adc.channelValues[channel] = value;
        }

        getPinState(index: number): boolean {
            var state: PinState;
            if (index < 8) {
                state = this.runner.portD.pinState(index);
            }
            else if (index < 14) {
                state = this.runner.portB.pinState(index - 8);
            }
            else if (index < 20) {
                state = this.runner.portC.pinState(index - 14);
            }
            else {
                console.log("getPinState received invalid index: " + index);
            }

            if (state == PinState.High || state == PinState.InputPullUp) {
                return true;
            }
            else {
                return false;
            }
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