import {TimingPacket} from "./lib/TimingPacket";
import {PinState} from "./lib/avr8js/index";
import {buildHex} from "./lib/compile-util";
import {AVRRunner, BoardType} from "./lib/execute";
import {ArduinoUno} from "./boards/arduino/arduino-uno/arduino-uno";
import {ArduinoMega} from "./boards/arduino/arduino-mega/arduino-mega";
import {Board, BoardConstructor} from "./boards/board";
/*declare var introJs: any;*/

export namespace interopManager {
    let isUrlLoadInitialized = false;

    export class InteropManager {

        interopLoc = "ADArCWebApp";
        runner: AVRRunner = AVRRunner.getInstance();
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
            } else if (regIndex === 1) {
                //c
                diff = newReg ^ this.prevC;
                delta = 14;
            } else {
                //d
                diff = newReg ^ this.prevD;
                delta = 0;
            }
            //magic bitshift. maps each bit of the difference to a 0/1 array.
            //then multiply by index + 1 as index would multiply 0 index by 0
            //remove 0s, representing pin indices that did not change.
            //the state of the array is not a set of 1-indexed array positions if changed values
            //subtract 1 to return to 0-indexed, then add the absolute pin adjustment to get return value.
            return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta - 1));
        }

        /**
         * this function handles setting up the arduino output and sending it to C#.
         * Also starts the code.
         *
         * Only run by C#.
         */
        startCodeLoop() {
            this.runner.board.usarts[0].onByteTransmit = (async (value: number) => {
                await DotNet.invokeMethodAsync(this.interopLoc, "SendSerial", String.fromCharCode(value));
            });
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
        private getModel() {
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
            await this.runner.loadProgram(res.hex);
            return {stdout: res.stdout, stderr: res.stderr}
        }

        /**
         * Tells the runner to execute the code.
         */
        runCode() {
            this.runner.execute(cpu => {
            });
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
         * Get the state of a pin from its absolute index as a boolean.
         * @param index the absolute index of the pin to check.
         * @returns the state of the pin as a boolean.
         */
        getPinState(index: number): boolean {
            const state = this.runner.board.pins[index].digital.state;

            //TODO: confirm that this is correct.
            if (state == PinState.High || state == PinState.InputPullUp) {
                return true;
            } else {
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

            const intro = (<any>window).introJs().setOption('keyboardNavigation', false);
            ;
            if (intro) {
                console.log("intro is a valid object")
            } else {
                console.log("intro not valid")
            }
            //this.closeMenu("Help");

            intro.start();
            //intro.onexit(()=> intro.goToStep(6));

        }


        /**
         * Initialize URL loading functionality
         */
        initUrlLoading() {
            // Only initialize once
            if (isUrlLoadInitialized) {
                return;
            }
            isUrlLoadInitialized = true;

            // Check if document is already loaded
            if (document.readyState === 'complete') {
                this.tryLoadFromUrl();
            } else {
                // Wait for document to load
                window.addEventListener('load', () => {
                    this.tryLoadFromUrl();
                });
            }
        }

        private waitForBlazerAndRules() {
            // Wait 12 seconds total to ensure Blazor is ready and rules are loaded
            setTimeout(() => {
                this.tryLoadFromUrl();
            }, 12000);
        }

        private async tryLoadFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const data = params.get('c');

            if (data) {
                try {
                    // Add a small delay to ensure Blazor is ready
                    await new Promise(resolve => setTimeout(resolve, 10000));

                    // Try to load only once
                    await DotNet.invokeMethodAsync("ADArCWebApp", "LoadFromUrl", data);

                    // Clear the URL parameter after successful load
                    const newUrl = window.location.pathname;
                    window.history.replaceState({}, '', newUrl);
                } catch (error) {
                    console.error("Error loading from URL:", error);
                }
            }
        }

        setBoard(board: BoardType) {
            let boardConstructor: BoardConstructor;
            switch(board) {
                case BoardType.ArduinoUno:
                    boardConstructor = ArduinoUno;
                    break;
                case BoardType.ArduinoMega:
                    boardConstructor = ArduinoMega;
                    break;
            }
            this.runner.boardConstructor = boardConstructor;
        }
    }





    // Keep this outside the class
    let manager: InteropManager | null = null;

    export function getInteropManager(): InteropManager {
        if (!manager) {
            manager = new InteropManager();
            manager.initUrlLoading();
        }
        return manager;
    }
}