/*
    This file was taken from the examples provided on the avr8js github.



*/


import {library} from './library_dictionary';
import {AVRRunner, BoardType} from "@lib/execute";
import {ArduinoUno} from "../boards/arduino/arduino-uno/arduino-uno";


export function loadHex(source: string, target: Uint8Array) {
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

export interface IHexiResult {
    stdout: string;
    stderr: string;
    hex: string;
}

export async function buildHex(source: string) {
    const include = Array.from(source.matchAll(/#include <([^>]+)>/g)).map(match => match[1]);
    const renameInclude = include.map(lib => library[lib]).filter(lib => lib !== undefined);

    let listString = "";
    listString += renameInclude.join("\n") + "\n";
    const resp = await fetch(url + '/build', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: [{
                name: "libraries.txt",
                content: listString
            }], sketch: source, board: AVRRunner.getInstance().boardConstructor == ArduinoUno ? "" : "mega"
        })
    });
    return (await resp.json()) as IHexiResult;
}