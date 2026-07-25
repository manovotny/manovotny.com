<script lang="ts">
  let { children, ...rest } = $props();
</script>

<ul class="mb-6 list-disc space-y-0.5 pl-5" {...rest}>
  {@render children?.()}
</ul>
