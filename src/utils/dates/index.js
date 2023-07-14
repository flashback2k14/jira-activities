export function getCurrentEndDate(now) {
  if (typeof now !== "number") {
    throw new Error("Now is not a number.");
  }

  return new Date(now).toISOString().slice(0, 10);
}

export function getCurrentStartDate(now) {
  if (typeof now === "string") {
    const parts = now.split("-");
    const end = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2]),
      2
    );
    end.setDate(end.getDate() - 4);
    return end.toISOString().slice(0, 10);
  }

  if (typeof now === "number") {
    const end = new Date(now);
    end.setDate(end.getDate() - 4);
    return end.toISOString().slice(0, 10);
  }

  throw new Error("Now has an undefined type.");
}

export function getDatesBetween(startDate, endDate) {
  let dates = [];
  const current = new Date(startDate);
  const lastDate = new Date(endDate);

  while (current <= lastDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
