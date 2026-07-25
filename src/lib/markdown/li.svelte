<script lang="ts">
  let { children, ...rest } = $props();
</script>

<li class="pl-1" {...rest}>
  {@render children?.()}
</li>
