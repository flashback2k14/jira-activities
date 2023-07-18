#!/usr/bin/env node

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
  const { filepath, startDate, endDate, details, help } = getArgs();

  if (help) {
    printHelp();
    return;
  }

  const xmlContent = await getFileContent(filepath);
  const content = getContent(xmlContent);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, excluded } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed);
  print(result, excluded, details);
}

main().catch((error) => console.error(error));
