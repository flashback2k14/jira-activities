import { getCurrentStartDate, getCurrentEndDate } from "./dates.js";

const PARAMETER = {
  FILE_PATH: "--filepath",
  START_DATE: "--start",
  END_DATE: "--end",
  DETAILS: "--details",
  VERBOSE: "--verbose",
};

export function extractValue(arg) {
  const extracted =
    arg?.split("=")?.[1] ?? new Error(`arg doesn't has an equal sign.`);

  if (extracted instanceof Error) {
    throw extracted;
  }

  return extracted;
}

export function getArgs() {
  const now = Date.now();

  const filepath =
    process.argv.find((arg) => arg.includes(PARAMETER.FILE_PATH)) ??
    new Error(`${PARAMETER.FILE_PATH} argument is missing.`);

  const endDate =
    process.argv.find((arg) => arg.includes(PARAMETER.END_DATE)) ?? now;

  const startDate =
    process.argv.find((arg) => arg.includes(PARAMETER.START_DATE)) ??
    getCurrentStartDate(endDate);

  const details =
    !!process.argv.find((arg) => arg === PARAMETER.DETAILS) ?? false;

  const verbose =
    !!process.argv.find((arg) => arg === PARAMETER.VERBOSE) ?? false;

  if (filepath instanceof Error) {
    throw filepath;
  }

  const args = {
    filepath: extractValue(filepath),
    startDate,
    endDate: endDate === now ? getCurrentEndDate(now) : endDate,
    details,
    verbose,
  };

  if (verbose) {
    console.log("------------------");
    console.log("Arguments:");
    console.log("------------------");
    console.log(args);
  }

  return args;
}
