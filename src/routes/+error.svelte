<script lang="ts">
  import Link from "$lib/components/link.svelte";
  import Seo from "$lib/components/seo.svelte";
</script>

<svelte:head>
  <meta content="noindex" name="robots" />
</svelte:head>

<Seo />

<h1
  class="mt-18 mb-6 text-[22px] leading-[1.35] font-semibold tracking-[-0.02em] text-balance"
>
  Oops!
</h1>

<p class="mb-6 last:mb-0">What you were looking for no longer exists.</p>

<p class="mb-6 last:mb-0"><Link href="/">Return home</Link>.</p>
