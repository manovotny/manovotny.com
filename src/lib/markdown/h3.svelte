<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h3 class="my-6 text-lg font-bold text-balance" {...rest}>
  {@render children?.()}
</h3>
