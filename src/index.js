#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { xml2js } from "xml-js";

function getArgs() {
  const filepath =
    process.argv?.at(2)?.split("=")?.[1] ??
    new Error("--filepath argument is missing.");

  const startDate =
    process.argv?.at(3)?.split("=")?.[1] ??
    new Error("--start argument is missing.");

  const endDate =
    process.argv.at(4)?.split("=")?.[1] ??
    new Error("--end argument is missing.");

  const details = process.argv?.at(5) ?? false;

  if (filepath instanceof Error) {
    throw filepath;
  }

  if (startDate instanceof Error) {
    throw startDate;
  }

  if (endDate instanceof Error) {
    throw endDate;
  }

  return {
    filepath,
    startDate,
    endDate,
    details,
  };
}

function getDatesBetween(startDate, endDate) {
  let dates = [];
  const current = new Date(startDate);
  const lastDate = new Date(endDate);

  while (current <= lastDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

async function getFileContent(filepath) {
  const xml = await readFile(filepath, {
    encoding: "utf-8",
  });

  const js = xml2js(xml, { compact: true, spaces: 2 });

  return js.feed.entry;
}

function transformContent(content, dates) {
  const transformed = new Map();
  let ignored = 0;

  content.map((entry) => {
    const date = entry?.updated?._text?.split("T")?.[0] ?? "";

    if (dates.some((d) => d === date)) {
      const item = {
        date,
        category: entry?.category?._attributes?.term ?? "",
        title: entry?.["activity:object"]?.title?._text ?? "",
        summary: entry?.["activity:object"]?.summary?._text ?? "",
        link: entry?.link?.[0]?._attributes?.href ?? "",
      };

      if (transformed.has(date)) {
        const items = transformed.get(date);
        items.push(item);
      } else {
        transformed.set(date, [item]);
      }
    } else {
      ignored++;
    }
  });

  return { transformed, ignored };
}

function addSummarizedTickets(content) {
  const result = new Map();

  for (const [key, value] of content) {
    const titles = value
      .map((v) => v.title)
      .filter(Boolean)
      .filter((v) => !v.includes("image"))
      .sort();

    result.set(key, {
      ...content.get(key),
      tickets: [...new Set(titles)].join(", "),
    });
  }

  return result;
}

function print(content, ignored, details = false) {
  if (details) {
    console.log("------------------");
    console.log("Details:");
    console.log("------------------");
    console.log(content);
  }

  console.log("------------------");
  console.log("Tickets per day:");
  console.log("------------------");

  content.forEach((value, key) => {
    console.log(key + ": " + value.tickets);
  });

  console.log("------------------");
  console.log(`ignored days: ${ignored}.`);
  console.log("------------------");
}

async function main() {
  const { filepath, startDate, endDate, details } = getArgs();
  const content = await getFileContent(filepath);
  const dates = getDatesBetween(startDate, endDate);
  const { transformed, ignored } = transformContent(content, dates);
  const result = addSummarizedTickets(transformed);
  print(result, ignored, details);
}

main().catch((error) => console.error(error));
