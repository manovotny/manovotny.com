<script lang="ts">
  let { children, ...rest } = $props();
</script>

<ol class="mb-6 list-decimal space-y-0.5 pl-5" {...rest}>
  {@render children?.()}
</ol>
