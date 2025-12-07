export function FormattedDate({ date }: { date: string }) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return (
    <time
      className="mt-[-24px] mb-6 block text-sm text-neutral-600 dark:text-neutral-400"
      dateTime={date}
    >
      {formatted}
    </time>
  );
}
