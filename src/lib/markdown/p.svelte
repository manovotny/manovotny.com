<script lang="ts">
  let { children, ...rest } = $props();
</script>

<p class="mb-6 last:mb-0" {...rest}>
  {@render children?.()}
</p>
