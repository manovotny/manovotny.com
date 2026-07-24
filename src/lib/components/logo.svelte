<script lang="ts">
  import { logoPaths } from "$lib/logo-paths";

  let { size = 28 }: { size?: number } = $props();
</script>

<svg
  aria-label="Michael Novotny Logo"
  fill="currentColor"
  height={size}
  role="img"
  viewBox="0 0 512 512"
  width={size}
  xmlns="http://www.w3.org/2000/svg"
>
  {#each logoPaths as d (d)}
    <path {d} />
  {/each}
</svg>
