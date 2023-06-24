import { readFile } from "node:fs/promises";
import { xml2js } from "xml-js";

export async function getFileContent(filepath) {
  const xml = await readFile(filepath, {
    encoding: "utf-8",
  });

  const js = xml2js(xml, { compact: true, spaces: 2 });

  return js.feed.entry;
}
