<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h3 class="my-6 text-[15px] font-semibold text-balance" {...rest}>
  {@render children?.()}
</h3>
