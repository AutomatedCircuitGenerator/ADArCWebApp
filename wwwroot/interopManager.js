"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interopManager = void 0;
const TimingPacket_1 = require("./lib/TimingPacket");
const index_1 = require("./lib/avr8js/index");
const compile_util_1 = require("./lib/compile-util");
const execute_1 = require("./lib/execute");
const arduino_uno_1 = require("./boards/arduino/arduino-uno/arduino-uno");
const arduino_mega_1 = require("./boards/arduino/arduino-mega/arduino-mega");
var interopManager;
(function (interopManager) {
    let isUrlLoadInitialized = false;
    class InteropManager {
        constructor() {
            this.interopLoc = "ADArCWebApp";
            this.runner = execute_1.AVRRunner.getInstance();
            this.awaitResponseOn = [];
            this.prevB = 0;
            this.prevC = 0;
            this.prevD = 0;
        }
        getChangedPins(newReg, regIndex) {
            var diff;
            var delta;
            if (regIndex === 0) {
                diff = newReg ^ this.prevB;
                delta = 8;
            }
            else if (regIndex === 1) {
                diff = newReg ^ this.prevC;
                delta = 14;
            }
            else {
                diff = newReg ^ this.prevD;
                delta = 0;
            }
            return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta - 1));
        }
        startCodeLoop() {
            this.runner.board.usarts[0].onByteTransmit = ((value) => __awaiter(this, void 0, void 0, function* () {
                yield DotNet.invokeMethodAsync(this.interopLoc, "SendSerial", String.fromCharCode(value));
            }));
            this.runCode();
        }
        getWindowWidth() {
            return window.innerWidth;
        }
        getWindowHeight() {
            return window.innerHeight;
        }
        getModel() {
            return window.monaco.editor.getModels()[0];
        }
        updateCodeInPane(code) {
            this.getModel().setValue(code);
        }
        getCodeInPane() {
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
            window.monaco.editor.setModelMarkers(this.getModel(), "owner", [marker]);
        }
        clearMonacoErrors() {
            window.monaco.editor.setModelMarkers(this.getModel(), "owner", []);
        }
        compile() {
            return __awaiter(this, void 0, void 0, function* () {
                var res = yield (0, compile_util_1.buildHex)(this.getCodeInPane());
                yield this.runner.loadProgram(res.hex);
                return { stdout: res.stdout, stderr: res.stderr };
            });
        }
        runCode() {
            this.runner.execute(cpu => {
            });
        }
        stop() {
            this.runner.stop();
            this.runner.pausedOn = [];
        }
        addResponseReqFlag(absoluteIndex) {
            this.awaitResponseOn.push(absoluteIndex);
        }
        removeResponseReqFlag(absoluteIndex) {
            const indexInAwaits = this.awaitResponseOn.indexOf(absoluteIndex);
            if (indexInAwaits > -1) {
                this.awaitResponseOn.splice(indexInAwaits, 1);
            }
        }
        arduinoInput(insts) {
            var real = TimingPacket_1.TimingPacket.fix(insts);
            this.runner.instructions.push(real);
            const index = this.runner.pausedOn.indexOf(insts.instructions[0].pin);
            if (index > -1) {
                this.runner.pausedOn.splice(index, 1);
            }
        }
        getPinState(index) {
            const state = this.runner.board.pins[index].digital.state;
            if (state == index_1.PinState.High || state == index_1.PinState.InputPullUp) {
                return true;
            }
            else {
                return false;
            }
        }
        downloadFile(filename, contentStreamRef) {
            return __awaiter(this, void 0, void 0, function* () {
                yield contentStreamRef;
                filename = new Date(Date.now()).toISOString() + " - " + filename;
                console.log(filename);
                const data = yield contentStreamRef.arrayBuffer();
                const blob = new Blob([data]);
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = filename !== null && filename !== void 0 ? filename : "";
                anchor.click();
                anchor.remove();
                URL.revokeObjectURL(url);
            });
        }
        runTutorial() {
            const intro = window.introJs().setOption('keyboardNavigation', false);
            if (intro) {
                console.log("intro is a valid object");
            }
            else {
                console.log("intro not valid");
            }
            intro.start();
        }
        setBoard(board) {
            let boardConstructor;
            switch (board) {
                case execute_1.BoardType.ArduinoUno:
                    boardConstructor = arduino_uno_1.ArduinoUno;
                    break;
                case execute_1.BoardType.ArduinoMega:
                    boardConstructor = arduino_mega_1.ArduinoMega;
                    break;
            }
            this.runner.boardConstructor = boardConstructor;
        }
        isMobileUser() {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true;
            })(navigator.userAgent || navigator.vendor || window["opera"]);
            return check;
        }
    }
    interopManager.InteropManager = InteropManager;
    let manager = null;
    function getInteropManager() {
        if (!manager) {
            manager = new InteropManager();
        }
        return manager;
    }
    interopManager.getInteropManager = getInteropManager;
})(interopManager || (exports.interopManager = interopManager = {}));
//# sourceMappingURL=interopManager.js.map