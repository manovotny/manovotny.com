<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h1 class="mb-6 text-2xl font-bold text-balance" {...rest}>
  {@render children?.()}
</h1>
