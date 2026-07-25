<script lang="ts">
  let { children, ...rest } = $props();
</script>

<h6 class="my-4 font-bold text-balance" {...rest}>
  {@render children?.()}
</h6>
