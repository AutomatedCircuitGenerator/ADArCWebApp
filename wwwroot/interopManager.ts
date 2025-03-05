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

            if (intro) {
                console.log("intro is a valid object")
            } else {
                console.log("intro not valid")
            }

            intro.start();
        }

        setBoard(board: BoardType) {
            let boardConstructor: BoardConstructor;
            switch (board) {
                case BoardType.ArduinoUno:
                    boardConstructor = ArduinoUno;
                    break;
                case BoardType.ArduinoMega:
                    boardConstructor = ArduinoMega;
                    break;
            }
            this.runner.boardConstructor = boardConstructor;
        }

        isMobileUser() {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window["opera"]);
            return check;
        }
        
        getBoundingClientRect(element: HTMLElement) {
            const rect = element.getBoundingClientRect();
            
            return {
                X: rect.x,
                Y: rect.y,
                Width: rect.width,
                Height: rect.height,
                Top: rect.top,
                Left: rect.left,
                Right: rect.right,
                Bottom: rect.bottom
            }
        }
    }


    // Keep this outside the class
    let manager: InteropManager | null = null;

    export function getInteropManager(): InteropManager {
        if (!manager) {
            manager = new InteropManager();
        }
        return manager;
    }
}