<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h2 class="my-6 text-xl font-bold text-balance" {...rest}>
  {@render children?.()}
</h2>
