<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { cn } from "$lib/classname";

  let {
    children,
    class: className,
    href,
    ...rest
  }: HTMLAnchorAttributes & { children?: Snippet } = $props();

  const classNames = $derived(
    cn(
      "text-blue-500 underline-offset-3 hover:text-blue-500 hover:underline dark:text-blue-400",
      className,
    ),
  );

  const isInternal = $derived(href?.startsWith("/") || href?.startsWith("#"));

  const isAffiliateLink = $derived(
    href?.includes("rwrd.io") ||
      href?.includes("join.robinhood.com") ||
      href?.includes("share_your_love=manovotny"),
  );

  const rel = $derived(
    "noopener noreferrer nofollow" + (isAffiliateLink ? " sponsored" : ""),
  );
</script>

{#if isInternal}
  <a class={classNames} {href} {...rest}>{@render children?.()}</a>
{:else}
  <a class={classNames} {href} {rel} {...rest}>
    {@render children?.()}
  </a>
{/if}
