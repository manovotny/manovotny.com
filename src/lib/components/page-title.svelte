<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<h1
  class="metadata text-ink after:bg-hairline mt-18 mb-10 flex items-center gap-4 after:h-px after:grow after:content-['']"
>
  {@render children?.()}
</h1>
