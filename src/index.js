#!/usr/bin/env node

import clippy from "clipboardy";
import {
  addSummarizedTickets,
  getArgs,
  getFileContent,
  getDatesBetween,
  transformContent,
  print,
  getContent,
  printHelp,
} from "./utils/index.js";

async function main() {
  const args = getArgs();
  if (args.help) {
    printHelp();
    return;
  }

  const { filepath, clipboard, startDate, endDate, details } = args;

  const xmlContent = clipboard
    ? await clippy.read()
    : await getFileContent(filepath);
  const content = getContent(xmlContent);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, excluded } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed);

  print(result, excluded, details);
}

main().catch((error) => console.error(error));
