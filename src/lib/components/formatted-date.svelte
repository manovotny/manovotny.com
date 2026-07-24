<script lang="ts">
  let {
    class: className = "mt-[-24px] mb-6 block",
    date,
  }: { class?: string; date: string } = $props();

  const formatted = $derived(
    new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }).format(new Date(date)),
  );
</script>

<time
  class={`${className} text-sm text-neutral-600 dark:text-neutral-400`}
  dateTime={date}
>
  {formatted}
</time>
