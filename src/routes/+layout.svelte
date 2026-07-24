<script lang="ts">
  import Footer from "$lib/components/footer.svelte";
  import Header from "$lib/components/header.svelte";

  import "../app.css";

  let { children } = $props();
</script>

<div
  class="mx-auto flex min-h-dvh w-full max-w-3xl flex-col space-y-6 p-8 pt-0 md:pt-8"
>
  <Header />
  <main>{@render children()}</main>
  <Footer />
</div>
