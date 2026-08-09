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
exports.AVRRunner = exports.BoardType = void 0;
const compile_util_1 = require("./compile-util");
const arduino_uno_1 = require("../boards/arduino/arduino-uno/arduino-uno");
var BoardType;
(function (BoardType) {
    BoardType[BoardType["ArduinoUno"] = 0] = "ArduinoUno";
    BoardType[BoardType["ArduinoMega"] = 1] = "ArduinoMega";
})(BoardType || (exports.BoardType = BoardType = {}));
class AVRRunner {
    constructor() {
        this.boardConstructor = arduino_uno_1.ArduinoUno;
        this.instructions = [];
        this.pausedOn = [];
        this.stopped = false;
        this.controllers = [];
    }
    static getInstance() {
        if (!AVRRunner._instance) {
            AVRRunner._instance = new AVRRunner();
        }
        return AVRRunner._instance;
    }
    addController(controller) {
        this.controllers.push(controller);
    }
    removeController(controller) {
        this.controllers = this.controllers.filter(c => c !== controller);
    }
    loadProgram(hex) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = new Uint16Array(this.boardConstructor.FLASH);
            (0, compile_util_1.loadHex)(hex, new Uint8Array(program.buffer));
            this.board = new this.boardConstructor(program);
            for (const controller of this.controllers) {
                controller.init();
            }
        });
    }
    execute(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopped = false;
            for (;;) {
                if (this.pausedOn.length == 0) {
                    this.board.cpu.clock();
                }
                else {
                    yield new Promise(resolve => setTimeout(resolve, 0));
                }
                if (this.board.cpu.cycles % 50000 === 0) {
                    callback(this.board.cpu);
                    yield new Promise(resolve => setTimeout(resolve, 0));
                    if (this.stopped) {
                        break;
                    }
                }
            }
        });
    }
    stop() {
        this.stopped = true;
        for (const controller of this.controllers) {
            controller.cleanup();
        }
    }
    usToCycles(us) {
        if (!(this.board.cpu.frequency > 0)) {
            throw new Error("Board does not have a frequency. This should never happen");
        }
        return us * this.board.cpu.frequency / 1e6;
    }
}
exports.AVRRunner = AVRRunner;
AVRRunner._instance = null;
//# sourceMappingURL=execute.js.map