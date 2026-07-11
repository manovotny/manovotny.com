export function FormattedDate({
  className = "mt-[-24px] mb-6 block",
  date,
}: {
  className?: string;
  date: string;
}) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return (
    <time
      className={`${className} text-sm text-neutral-600 dark:text-neutral-400`}
      dateTime={date}
    >
      {formatted}
    </time>
  );
}
