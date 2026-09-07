<script lang="ts">
  import { menuState } from "$lib/bookmarks/components/menu-state.svelte";
  import Menu from "$lib/bookmarks/components/menu.svelte";
  import type { SortOrder } from "$lib/bookmarks/search";

  let {
    onchange,
    sort,
  }: {
    onchange: (sort: SortOrder) => void;
    sort: SortOrder;
  } = $props();

  const labels: Record<SortOrder, string> = {
    newest: "Newest",
    oldest: "Oldest",
    title: "Title",
  };
  const options: SortOrder[] = ["newest", "oldest", "title"];

  function choose(value: SortOrder) {
    menuState.open = null;
    onchange(value);
  }
</script>

<Menu align="right" id="sort" label={labels[sort]} width="w-36">
  {#each options as option (option)}
    <button
      aria-checked={sort === option}
      class="hover:bg-hover flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm select-none"
      class:font-medium={sort === option}
      onclick={() => choose(option)}
      role="menuitemradio"
      type="button"
    >
      {#if sort === option}
        <svg
          aria-hidden="true"
          class="size-4"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      {:else}
        <span class="size-4"></span>
      {/if}
      {labels[option]}
    </button>
  {/each}
</Menu>
