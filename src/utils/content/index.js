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
