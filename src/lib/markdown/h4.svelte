<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h4 class="my-4 text-sm font-semibold text-balance" {...rest}>
  {@render children?.()}
</h4>
