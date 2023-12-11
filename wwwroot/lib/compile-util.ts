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
    const resp = await fetch(url + '/build', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sketch: source })
    });
    return (await resp.json()) as IHexiResult;
}
