<script lang="ts">
  import type { Filters, SortOrder } from "$lib/bookmarks/search";

  let {
    filters,
    onchange,
    tags,
  }: {
    filters: Filters;
    onchange: (filters: Filters) => void;
    tags: { count: number; tag: string }[];
  } = $props();

  const summaryClassNames =
    "metadata border-hairline hover:bg-hover flex cursor-pointer list-none items-center gap-2 rounded-md border px-3 py-2 select-none";
  const menuClassNames =
    "border-hairline bg-bg absolute top-full left-0 z-10 mt-1 max-h-80 min-w-56 overflow-y-auto rounded-md border p-2 shadow-lg";

  function toggleTag(tag: string, checked: boolean) {
    const next = checked
      ? [...filters.tags, tag]
      : filters.tags.filter((item) => item !== tag);

    onchange({ ...filters, tags: next });
  }
</script>

<div class="flex flex-wrap items-center gap-2">
  <input
    aria-label="Search bookmarks"
    class="border-hairline bg-bg focus:border-ink min-w-0 grow rounded-md border px-3 py-2 outline-none"
    oninput={(event) =>
      onchange({ ...filters, query: event.currentTarget.value })}
    placeholder="Search, or #tag"
    type="search"
    value={filters.query}
  />

  <details class="relative">
    <summary class={summaryClassNames}>
      Tags{filters.tags.length > 0 ? ` · ${filters.tags.length}` : ""}
    </summary>
    <ul class={menuClassNames}>
      {#each tags as { count, tag } (tag)}
        <li>
          <label
            class="hover:bg-hover flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm"
          >
            <input
              checked={filters.tags.includes(tag)}
              onchange={(event) => toggleTag(tag, event.currentTarget.checked)}
              type="checkbox"
            />
            <span class="grow">{tag}</span>
            <span class="text-faint text-xs">{count}</span>
          </label>
        </li>
      {/each}
    </ul>
  </details>

  <details class="relative">
    <summary class={summaryClassNames}>Show</summary>
    <div class={menuClassNames}>
      {#each [["favorites", "Favorites"], ["untagged", "Untagged"], ["broken", "Broken links"]] as [key, label] (key)}
        <label
          class="hover:bg-hover flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm"
        >
          <input
            checked={filters[key as "broken" | "favorites" | "untagged"]}
            onchange={(event) =>
              onchange({
                ...filters,
                [key]: event.currentTarget.checked,
              } as Filters)}
            type="checkbox"
          />
          {label}
        </label>
      {/each}
    </div>
  </details>

  <select
    aria-label="Sort"
    class="metadata border-hairline bg-bg cursor-pointer rounded-md border px-3 py-2"
    onchange={(event) =>
      onchange({ ...filters, sort: event.currentTarget.value as SortOrder })}
    value={filters.sort}
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="title">Title</option>
  </select>
</div>
