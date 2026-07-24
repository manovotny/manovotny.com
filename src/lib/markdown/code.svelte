<script lang="ts">
  let { children, ...rest } = $props();
</script>

<code
  class="rounded-md border border-neutral-200 bg-white px-[4px] py-[5px] font-mono text-sm break-words whitespace-pre-wrap shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
  {...rest}
>
  {@render children?.()}
</code>
