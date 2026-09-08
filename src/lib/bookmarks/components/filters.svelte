<script lang="ts">
  import Menu from "$lib/bookmarks/components/menu.svelte";
  import SortMenu from "$lib/bookmarks/components/sort-menu.svelte";
  import TextInput from "$lib/bookmarks/components/text-input.svelte";
  import type { Filters } from "$lib/bookmarks/search";

  let {
    filters,
    onchange,
    tags,
  }: {
    filters: Filters;
    onchange: (filters: Filters) => void;
    tags: { count: number; tag: string }[];
  } = $props();

  const rowClassNames =
    "hover:bg-hover flex cursor-pointer items-center gap-2 px-3 py-2 text-sm select-none";

  const showOptions: [
    keyof Pick<Filters, "broken" | "favorites" | "untagged">,
    string,
  ][] = [
    ["favorites", "Favorites"],
    ["untagged", "Untagged"],
    ["broken", "Broken links"],
  ];

  const tagsLabel = $derived(
    filters.tags.length > 0 ? `Tags · ${filters.tags.length}` : "Tags",
  );

  function toggleTag(tag: string, checked: boolean) {
    const next = checked
      ? [...filters.tags, tag]
      : filters.tags.filter((item) => item !== tag);

    onchange({ ...filters, tags: next });
  }
</script>

<div class="flex flex-wrap items-center gap-2">
  <TextInput
    aria-label="Search bookmarks"
    class="min-w-0 grow"
    oninput={(event) =>
      onchange({ ...filters, query: event.currentTarget.value })}
    placeholder="Search, or #tag"
    type="search"
    value={filters.query}
  />

  <Menu id="tags" label={tagsLabel}>
    {#each tags as { count, tag } (tag)}
      <label class={rowClassNames}>
        <input
          checked={filters.tags.includes(tag)}
          onchange={(event) => toggleTag(tag, event.currentTarget.checked)}
          type="checkbox"
        />
        <span class="grow">{tag}</span>
        <span class="text-faint text-xs">{count}</span>
      </label>
    {/each}
  </Menu>

  <Menu id="show" label="Show" width="w-44">
    {#each showOptions as [key, label] (key)}
      <label class={rowClassNames}>
        <input
          checked={filters[key]}
          onchange={(event) =>
            onchange({ ...filters, [key]: event.currentTarget.checked })}
          type="checkbox"
        />
        {label}
      </label>
    {/each}
  </Menu>

  <SortMenu
    onchange={(sort) => onchange({ ...filters, sort })}
    sort={filters.sort}
  />
</div>
