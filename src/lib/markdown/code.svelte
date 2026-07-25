<script lang="ts">
  let { children, ...rest } = $props();
</script>

<code
  class="border-hairline bg-hover rounded border px-[4px] py-[2px] font-mono text-[13px] break-words whitespace-pre-wrap"
  {...rest}
>
  {@render children?.()}
</code>
