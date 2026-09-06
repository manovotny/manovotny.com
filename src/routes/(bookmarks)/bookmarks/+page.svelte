<script lang="ts">
  import { SignOutButton } from "svelte-clerk";
  import type { ActionData, PageData } from "./$types";

  import { enhance } from "$app/forms";
  import { replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import BookmarkRow from "$lib/bookmarks/components/bookmark-row.svelte";
  import Filters from "$lib/bookmarks/components/filters.svelte";
  import {
    applyFilters,
    buildIndex,
    filtersFromParams,
    filtersToParams,
  } from "$lib/bookmarks/search";
  import PageTitle from "$lib/components/page-title.svelte";
  import type { Filters as FilterState } from "$lib/bookmarks/search";

  const PAGE_SIZE = 100;

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let filters = $state<FilterState>(filtersFromParams(page.url.searchParams));
  let visible = $state(PAGE_SIZE);

  const index = $derived(buildIndex(data.bookmarks));
  const results = $derived(applyFilters(data.bookmarks, index, filters));
  const vocabulary = $derived(data.tags.map(({ tag }) => tag));

  function setFilters(next: FilterState) {
    filters = next;
    visible = PAGE_SIZE;

    const params = filtersToParams(next).toString();
    const url = new URL(page.url);
    url.search = params ? `?${params}` : "";
    replaceState(url, {});
  }

  function addTag(tag: string) {
    if (!filters.tags.includes(tag)) {
      setFilters({ ...filters, tags: [...filters.tags, tag] });
    }
  }
</script>

<svelte:head>
  <title>Bookmarks • Michael Novotny</title>
  <meta content="noindex, nofollow" name="robots" />
</svelte:head>

<PageTitle>Bookmarks</PageTitle>

<form
  action="?/add"
  class="mb-6 flex gap-2"
  method="POST"
  use:enhance={({ formElement }) =>
    async ({ result, update }) => {
      // Keep the typed URL on failure so it can be corrected.
      await update({ reset: false });

      if (result.type === "success") {
        formElement.reset();
      }
    }}
>
  <input
    aria-label="Add a bookmark by URL"
    class="border-hairline bg-bg focus:border-ink min-w-0 grow rounded-md border px-3 py-2 outline-none"
    inputmode="url"
    name="url"
    placeholder="Paste a URL to save it"
    required
    value={form?.url ?? ""}
  />
  <button
    class="metadata bg-ink text-bg cursor-pointer rounded-md px-3 py-2"
    type="submit"
  >
    Add
  </button>
</form>

{#if form?.message && !form?.id}
  <p class="text-secondary mb-4 text-sm" role="alert">{form.message}</p>
{:else if form?.added === "duplicate"}
  <p class="text-secondary mb-4 text-sm" role="status">Already saved.</p>
{:else if form?.added === "restored"}
  <p class="text-secondary mb-4 text-sm" role="status">Restored.</p>
{/if}

<Filters {filters} onchange={setFilters} tags={data.tags} />

<p class="metadata text-faint mt-4 flex items-center">
  <span>{results.length} of {data.bookmarks.length}</span>
  <SignOutButton
    class="text-secondary hover:text-ink ml-auto cursor-pointer bg-transparent p-0"
    redirectUrl="/bookmarks"
  >
    Sign out
  </SignOutButton>
</p>

<ul class="mt-2">
  {#each results.slice(0, visible) as bookmark (bookmark.id)}
    <BookmarkRow
      {bookmark}
      message={form?.id === bookmark.id ? form.message : undefined}
      ontag={addTag}
      {vocabulary}
    />
  {/each}
</ul>

{#if results.length > visible}
  <button
    class="metadata border-hairline hover:bg-hover mt-6 w-full cursor-pointer rounded-md border px-3 py-3"
    onclick={() => (visible += PAGE_SIZE)}
    type="button"
  >
    Show more
  </button>
{/if}
