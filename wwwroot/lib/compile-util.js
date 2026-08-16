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
exports.loadHex = loadHex;
exports.buildHex = buildHex;
const library_dictionary_1 = require("./library_dictionary");
const execute_1 = require("@lib/execute");
const arduino_uno_1 = require("../boards/arduino/arduino-uno/arduino-uno");
function loadHex(source, target) {
    for (const line of source.split('\n')) {
        if (line[0] === ':' && line.substr(7, 2) === '00') {
            const bytes = parseInt(line.substr(1, 2), 16);
            const addr = parseInt(line.substr(3, 4), 16);
            for (let i = 0; i < bytes; i++) {
                target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
            }
        }
    }
}
const url = 'https://hexi.wokwi.com';
function buildHex(source) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const include = Array.from(source.matchAll(/#include <([^>]+)>/g)).map(match => match[1]);
        const renameInclude = include.map(lib => library_dictionary_1.library[lib]).filter(lib => lib !== undefined);
        let listString = "";
        listString += renameInclude
            .filter(lib => !lib.startsWith("local/"))
            .join("\n") + "\n";
        const files = [
            {
                name: "libraries.txt",
                content: listString
            }
        ];
        for (const lib of renameInclude) {
            if (lib.startsWith("local/")) {
                const libName = lib.replace("local/", "");
                const basePath = `/libraries/${libName}`;
                const header = yield fetch(`${basePath}/${libName}.h`).then(r => r.text());
                files.push({ name: `libraries/${libName}/${libName}.h`, content: header });
                const nestedIncludes = Array.from(header.matchAll(/#include <([^>]+)>/g)).map(m => m[1]);
                for (const nested of nestedIncludes) {
                    if ((_a = library_dictionary_1.library[nested]) === null || _a === void 0 ? void 0 : _a.startsWith("local/")) {
                        const nestedName = library_dictionary_1.library[nested].replace("local/", "");
                        const nestedPath = `/libraries/${nestedName}`;
                        const nestedHeader = yield fetch(`${nestedPath}/${nestedName}.h`).then(r => r.text());
                        files.push({ name: `libraries/${nestedName}/${nestedName}.h`, content: nestedHeader });
                        try {
                            const resp = yield fetch(`${nestedPath}/${nestedName}.cpp`);
                            if (resp.ok) {
                                const src = yield resp.text();
                                files.push({ name: `libraries/${nestedName}/${nestedName}.cpp`, content: src });
                            }
                        }
                        catch (_b) { }
                    }
                }
                try {
                    const resp = yield fetch(`${basePath}/${libName}.cpp`);
                    if (resp.ok) {
                        const sourceFile = yield resp.text();
                        files.push({ name: `libraries/${libName}/${libName}.cpp`, content: sourceFile });
                    }
                }
                catch (_c) { }
            }
        }
        const resp = yield fetch(url + '/build', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                files,
                sketch: source.includes("getVocalIndex") ? `#define getVocalIndex(rh, temp) getVoclndex()\n` + source : source,
                board: execute_1.AVRRunner.getInstance().boardConstructor == arduino_uno_1.ArduinoUno ? "" : "mega"
            })
        });
        return (yield resp.json());
    });
}
//# sourceMappingURL=compile-util.js.map