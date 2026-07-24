<script module>
  export { default as a } from "./a.svelte";
  export { default as code } from "./code.svelte";
  export { default as h1 } from "./h1.svelte";
  export { default as h2 } from "./h2.svelte";
  export { default as h3 } from "./h3.svelte";
  export { default as h4 } from "./h4.svelte";
  export { default as h5 } from "./h5.svelte";
  export { default as h6 } from "./h6.svelte";
  export { default as hr } from "./hr.svelte";
  export { default as li } from "./li.svelte";
  export { default as ol } from "./ol.svelte";
  export { default as p } from "./p.svelte";
  export { default as ul } from "./ul.svelte";
</script>

<script lang="ts">
  import Seo from "$lib/components/seo.svelte";

  let {
    children,
    description,
    slug,
    title,
  }: {
    children?: import("svelte").Snippet;
    description?: string;
    slug?: string;
    title?: string;
  } = $props();
</script>

<Seo {description} {slug} {title} />

{@render children?.()}
