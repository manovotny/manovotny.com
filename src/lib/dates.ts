export function formatNoteDate(
  date: string,
  format: "full" | "month-year" = "full",
): string {
  return new Intl.DateTimeFormat("en-US", {
    ...(format === "full" && { day: "numeric" }),
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(date));
}
