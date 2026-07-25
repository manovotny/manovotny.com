<script lang="ts">
  import { formatNoteDate } from "$lib/dates";

  let {
    class: className = "mt-[-16px] mb-8 block",
    date,
    format = "full",
  }: {
    class?: string;
    date: string;
    format?: "full" | "month-year";
  } = $props();

  const formatted = $derived(formatNoteDate(date, format));
</script>

<time class={`meta text-secondary ${className}`} dateTime={date}>
  {formatted}
</time>
