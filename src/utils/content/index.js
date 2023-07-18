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

export function addSummarizedTickets(content) {
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

export function print(content, ignored, details = false) {
  console.log("------------------");
  console.log("Tickets per day:");
  console.log("------------------");

  content.forEach((value, key) => {
    console.log(key + ": " + value.tickets);

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
    "  This program has one required parameter and five optional parameter.",
    "  -  The first parameter is the '--filepath' to the xml file that contains the result from the Jira activity feed. Because of permission issue we can not fetch directly the Jira activity feed.",
    "  -  The second parameter is the '--start'. Mostly the start day of the working week. If it's not set then it's calculated from the 'end' or from 'Date.now()' if 'end' is not present.",
    "  -  The third parameter is the '--end'. Mostly the end day of the working week. If it's not set then it's calculated from the 'Date.now()'.",
    "  -  The fourth parameter is '--details'. To print out more details for each Jira ticket you worked on.",
    "  -  The fifth parameter is '--verbose'. To print out the program arguments.",
    "  -  The sixed parameter is '--help'. To print out this help text.",
    "",
    "  The version is " + process.env.npm_package_version + ".",
  ].forEach((line) => console.log(line));
}
