#!/usr/bin/env node

import {
  addSummarizedTickets,
  getArgs,
  getFileContent,
  getDatesBetween,
  transformContent,
  print,
} from "./utils/index.js";

async function main() {
  const { filepath, startDate, endDate, details } = getArgs();
  const content = await getFileContent(filepath);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, excluded } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed);
  print(result, excluded, details);
}

main().catch((error) => console.error(error));
