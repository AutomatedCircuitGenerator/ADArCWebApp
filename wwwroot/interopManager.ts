﻿import { TimingPacket } from "./lib/TimingPacket";
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

        /**
         * Returns an array of absolute (0-19?) pin indices that have changed "recently."
         * Recently generally means since the last pin change, so in most cases this should not
         * have more than one value in it. However, this accounts for more cases.
         * 
         * @param newReg the new state of a pin register as an int.
         * @param regIndex an int representing which register we are using. 0=b, 1=c, else=d.
         * @returns number[] of absolute pin indices that changed since the last check.
         */
        private getChangedPins(newReg: number, regIndex: number): number[] {
            var diff: number;
            var delta: number;
            if (regIndex === 0) {
                //b
                diff = newReg ^ this.prevB;     //get diff as int (prevB set on pin change AFTER this function called)
                delta = 8;                      //number to add to get absolute index
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
            //magic bitshift. maps each bit of the difference to a 0/1 array.
            //then multiply by index + 1 as index would multiply 0 index by 0
            //remove 0s, representing pin indices that did not change.
            //the state of the array is not a set of 1-indexed array positions if changed values
            //subtract 1 to return to 0-indexed, then add the absolute pin adjustment to get return value.
            return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta-1));
        }
        /**
         * this function handles setting up the arduino output and sending it to C#.
         * Also starts the code.
         * 
         * Only run by C#.
         */
        startCodeLoop() {

            //TODO: implement cleanup of these listeners, as it is likely they stack up on repeated calls.
            //Haven't noticed any issues related to this, but should be pointed out.

            //each of the listeners handles a different register in the same way.
            //checks for changed pins that have been registered as places to be paused.
            //sends values to C#.
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
            //handles serial output.
            this.runner.usart.onByteTransmit = async (value: number) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "sendSerial", String.fromCharCode(value));
            };
            //finish by running code.
            this.runCode();
        }

        /**
         * Gets the width of the window.
         * @returns the width of the window
         */
        getWindowWidth(): number {
            return window.innerWidth;
        }
        /**
         * Gets the height of the window, up to the bottom of the browser task bar (address/bookmark area)
         * @returns the height of the window.
         */
        getWindowHeight(): number {
            return window.innerHeight;
        }
        /**
         * Gets the monaco model. Used internally in monaco related functions.
         * @returns the monaco model.
         */
        private getModel(){
            return (<any>window).monaco.editor.getModels()[0];
        }
        /**
         * Overwrites the code in the monaco instance. 
         * @param code The complete code to populate monaco with.
         */
        updateCodeInPane(code: string) {
            this.getModel().setValue(code);
        }
        /**
         * Gets the entire text of the code in the monaco editor.
         * @returns the entire text in the monaco editor.
         */
        getCodeInPane(): string {
            return this.getModel().getValue();
        }

        /**
         * Makes an error message in monaco.
         * @param message the message to display
         * @param line the line the error is present in
         * @param column the column the error is present in
         */
        makeMonacoError(message, line, column) {
            //not quite sure why using the same start/end line/column works to highlight everything properly, but it does.
            //probably some case to highligh entire word when equal.
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

        /**
         * Removes all errors from the monaco editor.
         */
        clearMonacoErrors() {
            (<any>window).monaco.editor.setModelMarkers(this.getModel(), "owner", []);
        }
        /**
         * Compiles the code currently present in the pane.
         * @returns the compiler output (stdout and stderr) as an anonymous object.
         */
        async compile(): Promise<object> {
            var res = await buildHex(this.getCodeInPane());
            this.runner = new AVRRunner(res.hex);
            this.adc = new AVRADC(this.runner.cpu, adcConfig);
            return { stdout: res.stdout, stderr: res.stderr }
        }
        /**
         * Tells the runner to execute the code.
         */
        runCode() {
            this.runner.execute(cpu => { });
        }

        /**
         * stops the code runnning and cleans up the pause states of the runner.
         */
        stop() {
            this.runner.stop();
            this.runner.pausedOn = [];
        }

        /**
         * Registers the provided absolute index as a pin to pause on and await C# response.
         * @param absoluteIndex pin index to pause on.
         */
        addResponseReqFlag(absoluteIndex: number) {
            this.awaitResponseOn.push(absoluteIndex);
        }

        /**
         * Deregisters the provided absolute index.
         * @param absoluteIndex pin to deregister
         */
        removeResponseReqFlag(absoluteIndex: number) {
            //TODO: invoke when importing file.

            //get the provided number's index in the registration list
            const indexInAwaits = this.awaitResponseOn.indexOf(absoluteIndex);
            //if it exists, remove it from the list
            if (indexInAwaits > -1) {
                this.awaitResponseOn.splice(indexInAwaits, 1);
            }
        }

        /**
         * Data input to arduino function. relies on a timing packet (TimingPacket.cs/ts) to schedule
         * pin changes on a specific arduino CPU cycle for maximum accuracy.
         * @param insts the data to input to the arduino
         */
        arduinoInput(insts: TimingPacket) {
            //console.log("JS arrive cycle:" + this.runner.cpu.cycles);

            var real = TimingPacket.fix(insts);//comes in unsorted for some reason. fix it here.
            this.runner.instructions.push(real);//add it to queued instructions

            //if we were awaiting a response, remove the pause condition
            const index = this.runner.pausedOn.indexOf(insts.instructions[0].pin);
            if (index > -1) {
                this.runner.pausedOn.splice(index, 1);//remove element
            }
        }

        /**
         * Secondary input for specific adc values that do not require timing.
         * @param channel honestly, no idea. pretty sure this should be 0 usually, probably has something to do with which pin is changed.
         * @param value the value to update to. I am fairly certain this is supposed to be a value between 0-5 (voltage),
         * which is then interpolated out to the internal adc value of 0-1024. not 100% sure.
         */
        arduinoADCInput(channel: number, value: number) {
            this.adc.channelValues[channel] = value;
        }

        /**
         * Get the state of a pin from its absolute index as a boolean.
         * @param index the absolute index of the pin to check.
         * @returns the state of the pin as a boolean.
         */
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

            //TODO: confirm that this is correct.
            if (state == PinState.High || state == PinState.InputPullUp) {
                return true;
            }
            else {
                return false;
            }
        }

        /**
         * Download the file provided in the contentstreamref param.
         * @param filename the name of the file to download.
         * @param contentStreamRef the file data to download.
         */
        async downloadFile(filename: string, contentStreamRef: any) {
            await contentStreamRef;
            //append timestamp
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
        public runTutorial() {
            
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