/*
    This file was taken from the examples provided on the avr8js github.
*/

import { library } from "./library_dictionary";

const url = "https://hexi.wokwi.com";

export interface IHexiResult {
  stdout: string;
  stderr: string;
  hex: string;
}

export async function buildHex(source: string, board: "uno" | "mega" = "uno") {
  const include = Array.from(source.matchAll(/#include <([^>]+)>/g)).map((match) => match[1]);
  const renameInclude = include.map((lib) => library[lib]).filter((lib) => lib !== undefined);

  let listString = "";
  listString +=
    renameInclude
      .filter((lib) => !lib.startsWith("local/"))
      .join("\n") + "\n";

  const files: { name: string; content: string }[] = [
    {
      name: "libraries.txt",
      content: listString,
    },
  ];

  // Add local libraries (.h/.cpp from ./libraries folder)
  for (const lib of renameInclude) {
    if (lib.startsWith("local/")) {
      const libName = lib.replace("local/", "");
      const basePath = `/libraries/${libName}`;

      // always include header
      const header = await fetch(`${basePath}/${libName}.h`).then((r) => r.text());
      files.push({ name: `libraries/${libName}/${libName}.h`, content: header });

      // Look for nested libraries
      const nestedIncludes = Array.from(header.matchAll(/#include <([^>]+)>/g)).map((m) => m[1]);
      for (const nested of nestedIncludes) {
        if (library[nested]?.startsWith("local/")) {
          const nestedName = library[nested].replace("local/", "");
          const nestedPath = `/libraries/${nestedName}`;
          const nestedHeader = await fetch(`${nestedPath}/${nestedName}.h`).then((r) => r.text());
          files.push({ name: `libraries/${nestedName}/${nestedName}.h`, content: nestedHeader });

          // Look for cpp file
          try {
            const resp = await fetch(`${nestedPath}/${nestedName}.cpp`);
            if (resp.ok) {
              const src = await resp.text();
              files.push({ name: `libraries/${nestedName}/${nestedName}.cpp`, content: src });
            }
          } catch {}
        }
      }

      // Look for cpp file
      try {
        const resp = await fetch(`${basePath}/${libName}.cpp`);
        if (resp.ok) {
          const sourceFile = await resp.text();
          files.push({ name: `libraries/${libName}/${libName}.cpp`, content: sourceFile });
        }
      } catch {}
    }
  }

  const resp = await fetch(url + "/build", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      files,
      sketch: source,
      board: board === "uno" ? "" : "mega",
    }),
  });

  return (await resp.json()) as IHexiResult;
}
