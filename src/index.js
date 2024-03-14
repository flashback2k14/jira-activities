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

  const { filepath, clipboard, startDate, endDate, details, extend } = args;

  const xmlContent = clipboard
    ? await clippy.read()
    : await getFileContent(filepath);
  const content = getContent(xmlContent);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, excluded } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed, extend);

  print(result, excluded, extend, details);
}

main().catch((error) => console.error(error));
