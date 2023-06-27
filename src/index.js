#!/usr/bin/env node

import {
  addSummarizedTickets,
  getArgs,
  getFileContent,
  getDatesBetween,
  transformContent,
  print,
  getContent,
} from "./utils/index.js";

async function main() {
  const { filepath, startDate, endDate, details } = getArgs();
  const xmlContent = await getFileContent(filepath);
  const content = getContent(xmlContent);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, excluded } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed);
  print(result, excluded, details);
}

main().catch((error) => console.error(error));
