<script lang="ts">
  import { formatDate } from "$lib/dates";

  let {
    class: className = "mt-[-16px] mb-8 block",
    date,
    format = "full",
  }: {
    class?: string;
    date: string;
    format?: "full" | "month-year";
  } = $props();

  const formatted = $derived(formatDate(date, format));
</script>

<time class={`metadata text-secondary ${className}`} dateTime={date}>
  {formatted}
</time>
