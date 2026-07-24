<script lang="ts">
  import Link from "$lib/components/link.svelte";
  import { siteName } from "$lib/constants";
</script>

<div class="text-2xl text-balance">
  <h1 class="inline font-bold">{siteName}</h1>
  <h2
    class="dark:text-neutral-40 inline font-extralight text-neutral-500 before:content-['—']"
  >
    software developer, stock investor/trader, coffee enthusiast. Currently
    working on docs at <Link href="https://clerk.com">Clerk</Link>.
  </h2>
</div>
