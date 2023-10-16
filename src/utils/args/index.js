import { getCurrentStartDate, getCurrentEndDate } from "../dates/index.js";

const PARAMETER = {
  CLIPBOARD: "--clipboard",
  DETAILS: "--details",
  END_DATE: "--end",
  FILE_PATH: "--filepath",
  HELP: "--help",
  START_DATE: "--start",
  VERBOSE: "--verbose",
};

export function extractValue(arg) {
  if (!arg) {
    return undefined;
  }

  const extracted =
    arg?.split("=")?.[1] ?? new Error(`arg doesn't has an equal sign.`);

  if (extracted instanceof Error) {
    throw extracted;
  }

  return extracted;
}

export function getArgs() {
  const now = Date.now();

  const help = !!process.argv.find((arg) => arg === PARAMETER.HELP);
  if (help) {
    return { help };
  }

  const filepathOrClipboard =
    extractValue(
      process.argv.find((arg) => arg.includes(PARAMETER.FILE_PATH))
    ) ?? !!process.argv.find((arg) => arg === PARAMETER.CLIPBOARD);

  if (!filepathOrClipboard) {
    throw new Error(
      `${PARAMETER.FILE_PATH} or ${PARAMETER.CLIPBOARD} argument is missing.`
    );
  }

  const endDate = extractValue(
    process.argv.find((arg) => arg.includes(PARAMETER.END_DATE))
  );

  const startDate = extractValue(
    process.argv.find((arg) => arg.includes(PARAMETER.START_DATE))
  );

  const details = !!process.argv.find((arg) => arg === PARAMETER.DETAILS);

  const verbose = !!process.argv.find((arg) => arg === PARAMETER.VERBOSE);

  const args = {
    clipboard:
      typeof filepathOrClipboard === "boolean" ? filepathOrClipboard : false,
    details,
    endDate: endDate ?? getCurrentEndDate(now),
    filepath:
      typeof filepathOrClipboard === "string" ? filepathOrClipboard : undefined,
    help,
    startDate: startDate ?? getCurrentStartDate(endDate ?? now),
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
