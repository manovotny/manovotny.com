<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h2 class="my-6 text-base font-semibold text-balance" {...rest}>
  {@render children?.()}
</h2>
