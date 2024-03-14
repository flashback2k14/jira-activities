import { packageJSON } from "./../helper/index.js";

export function transformContent(content, dates) {
  const transformed = new Map();
  let excluded = 0;

  if (!content || !dates) {
    return { transformed, excluded };
  }

  content.forEach((entry) => {
    const date = entry?.updated?._text?.split("T")?.[0] ?? "";

    if (dates.some((d) => d === date)) {
      const item = {
        date,
        category: entry?.category?._attributes?.term ?? "",
        title: entry?.["activity:object"]?.title?._text ?? "",
        summary: entry?.["activity:object"]?.summary?._text ?? "",
        link: entry?.link?.[0]?._attributes?.href ?? "",
        type: entry?.link?.[1]?._attributes?.title ?? "",
      };

      if (transformed.has(date)) {
        const items = transformed.get(date);
        items.push(item);
      } else {
        transformed.set(date, [item]);
      }
    } else {
      excluded++;
    }
  });

  return { transformed, excluded };
}

export function addSummarizedTickets(content, extend) {
  const result = new Map();

  if (extend) {
    for (const [key, value] of content) {
      const titles = value
        .map((v) => ({ title: v.title, summary: v.summary, type: v.type }))
        .filter(Boolean)
        .filter((v) => !v.title?.includes("image"))
        .map(
          (v) =>
            `- ${v?.title ?? "no-title"} - ${
              v?.summary ?? "no-summary"
            } \n\t--> ${v?.type ?? "no-type"}`
        )
        .sort();

      result.set(key, {
        ...content.get(key),
        tickets: [...new Set(titles)].join("\n "),
      });
    }
  } else {
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
  }

  return result;
}

export function print(content, ignored, extend = false, details = false) {
  console.log("------------------");
  console.log("Tickets per day:");
  console.log("------------------");

  content.forEach((value, key) => {
    if (extend) {
      console.log(key + ": ");
      console.log(" " + value.tickets);
    } else {
      console.log(key + ": " + value.tickets);
    }

    if (details) {
      const { tickets, ...rest } = value;
      console.log("------------------");
      console.log("Details:");
      console.log("------------------");
      console.log(rest);
    }
  });

  console.log("------------------");
  console.log(`excluded entries: ${ignored}.`);
  console.log("------------------");
}

export function printHelp() {
  [
    "Welcome to Jira activities.",
    "",
    "  This program has one required parameter and six optional parameter.",
    "  -  The first parameter is one of the following parameter. Because of permission issue we can not fetch directly the Jira activity feed.",
    "     - The parameter '--filepath' to the xml file that contains the result from the Jira activity feed.",
    "     - The parameter '--clipboard' to the copied xml content from the Jira activity feed.",
    "  -  The second parameter is the '--start'. Mostly the start day of the working week. If it's not set then it's calculated from the 'end' or from 'Date.now()' if 'end' is not present.",
    "  -  The third parameter is the '--end'. Mostly the end day of the working week. If it's not set then it's calculated from the 'Date.now()'.",
    "  -  The fourth parameter is '--details'. To print out more details for each Jira ticket you worked on.",
    "  -  The fifth parameter is '--verbose'. To print out the program arguments.",
    "  -  The sixed parameter is '--help'. To print out this help text.",
    "  -  The seventh parameter is '--extend'. To print out the summary and the type of the ticket.",
    "",
    "  The version is " + packageJSON.version + ".",
  ].forEach((line) => console.log(line));
}
