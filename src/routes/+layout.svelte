<script lang="ts">
  import Footer from "$lib/components/footer.svelte";
  import Header from "$lib/components/header.svelte";

  import "../app.css";

  let { children } = $props();
</script>

<a
  class="focus:bg-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:px-3 focus:py-2"
  href="#main"
>
  Skip to content
</a>
<div class="mx-auto flex min-h-dvh w-full max-w-[41rem] flex-col px-6">
  <Header />
  <main class="grow" id="main" tabindex="-1">{@render children()}</main>
  <Footer />
</div>
