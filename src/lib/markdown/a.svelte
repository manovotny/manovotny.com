<script lang="ts">
  import Link from "$lib/components/link.svelte";

  let { children, ...rest } = $props();
</script>

<Link {...rest}>{@render children?.()}</Link>
