import fs from "node:fs/promises";
import convert from "xml-js";

export async function getFileContent(filepath) {
  if (!filepath.endsWith(".xml")) {
    throw new Error("Filepath must be an xml file.");
  }

  const xml = await fs.readFile(filepath, {
    encoding: "utf-8",
  });

  return xml;
}

export function getContent(xml) {
  if (!xml) {
    return [];
  }

  const js = convert.xml2js(xml, {
    compact: true,
    spaces: 2,
  });

  const entries = js?.feed?.entry ?? [];

  return Array.isArray(entries) ? entries : [entries];
}
