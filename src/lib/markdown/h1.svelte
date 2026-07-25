<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h1
  class="mb-6 text-[22px] leading-[1.35] font-semibold tracking-[-0.02em] text-balance"
  {...rest}
>
  {@render children?.()}
</h1>
