<script lang="ts">
  import Link from "$lib/components/link.svelte";
  import { siteName } from "$lib/constants";
</script>

<h1
  class="text-secondary pt-20 text-[17px] leading-[1.75] font-normal text-balance"
>
  <span class="text-ink font-medium">{siteName}</span> — software developer,
  <span class="whitespace-nowrap">stock investor&#8202;/&#8202;trader,</span>
  coffee enthusiast. Currently working on docs at
  <Link href="https://clerk.com/home">Clerk</Link>.
</h1>
