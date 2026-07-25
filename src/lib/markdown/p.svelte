<script lang="ts">
  let { children, ...rest } = $props();
</script>

<p class="mb-[1.4rem] last:mb-0" {...rest}>
  {@render children?.()}
</p>
