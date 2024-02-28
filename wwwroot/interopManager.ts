import { TimingPacket } from "./lib/TimingPacket";
import { AVRADC, PinState, adcConfig } from "./lib/avr8js/index";
import { buildHex } from "./lib/compile-util";
import { AVRRunner } from "./lib/execute";

/*declare var introJs: any;*/

export namespace interopManager {

    export class InteropManager {

        interopLoc = "ADArCWebApp";
        runner: AVRRunner;
        adc: AVRADC;
        awaitResponseOn: number[] = [];
        prevB: number = 0;
        prevC: number = 0;
        prevD: number = 0;

        private getChangedPins(newReg: number, regIndex: number): number[] {
            var diff: number;
            var delta: number;
            if (regIndex === 0) {
                //b
                diff = newReg ^ this.prevB;
                delta = 8;
            }
            else if (regIndex === 1) {
                //c
                diff = newReg ^ this.prevC;
                delta = 14;
            }
            else {
                //d
                diff = newReg ^ this.prevD;
                delta = 0;
            }
            //magic bitshift. maps each bit to array 0/1, multiply by index +1, remove 0s, 
            //then subtract the one and convert to absolute pins
            return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta-1));
        }

        startCodeLoop(wrapper: any) {
            console.log("starting code!")
            this.runner.portB.addListener(async (e) => {
                this.runner.pausedOn = this.runner.pausedOn.concat(this.getChangedPins(e, 0).filter(e => this.awaitResponseOn.includes(e)));
                this.prevB = e;
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 0);
            });

            this.runner.portC.addListener(async (e) => {
                this.runner.pausedOn.concat(this.getChangedPins(e, 1).filter(e => this.awaitResponseOn.includes(e)));
                this.prevC = e;
                await DotNet.invokeMethodAsync(this.interopLoc, "sendVal", e, this.runner.cpu.cycles, 1);
            });

            this.runner.portD.addListener(async (e) => {
                this.runner.pausedOn.concat(this.getChangedPins(e, 2).filter(e => this.awaitResponseOn.includes(e)));
                this.prevD = e;
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
            this.runner.pausedOn = [];
        }

        //go 0-19 or whatever
        addResponseReqFlag(absoluteIndex: number) {
            this.awaitResponseOn.push(absoluteIndex);
        }

        //go 0-19 or whatever
        removeResponseReqFlag(absoluteIndex: number) {
            const index = this.awaitResponseOn.indexOf(absoluteIndex);
            if (index > -1) {
                this.awaitResponseOn.splice(index, 1);
            }
        }

        arduinoInput(insts: TimingPacket) {
            //console.log("JS arrive cycle:" + this.runner.cpu.cycles);
            var real = TimingPacket.fix(insts);//comes in unsorted for some reason. fix it here.
            this.runner.instructions.push(real);
            const index = this.runner.pausedOn.indexOf(insts.instructions[0].pin);
            if (index > -1) {
                this.runner.pausedOn.splice(index, 1);//remove element
            }
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

            filename = new Date(Date.now()).toISOString() + " - " + filename;
            console.log(filename);
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

        // runs the tutorial using Intro.js
        public runTutorial(closeImmediate: boolean) {
            
            const intro = (<any>window).introJs().setOption('keyboardNavigation', false);;
            if (intro) {
                console.log("intro is a valid object")
            }
            else {
                console.log("intro not valid")
            }
            //this.closeMenu("Help");
            
            intro.start();
            //intro.onexit(()=> intro.goToStep(6));
            
        }
    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}