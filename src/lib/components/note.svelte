<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div
  class="mb-4 flex gap-2 rounded-md border border-neutral-200 bg-neutral-100 p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
>
  <svg
    class="size-5 shrink-0 stroke-neutral-700 dark:stroke-neutral-300"
    fill="none"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  {@render children?.()}
</div>
