<script lang="ts">
  import { enhance } from "$app/forms";
  import BookmarkEditor from "$lib/bookmarks/components/bookmark-editor.svelte";
  import { isBrokenStatus } from "$lib/bookmarks/search";
  import type { BookmarkView } from "$lib/bookmarks/view";

  let {
    bookmark,
    message,
    ontag,
    vocabulary,
  }: {
    bookmark: BookmarkView;
    message?: string;
    ontag: (tag: string) => void;
    vocabulary: string[];
  } = $props();

  let editing = $state(false);

  const actionClassNames =
    "metadata text-secondary hover:text-ink cursor-pointer bg-transparent p-0";
</script>

<li class="border-hairline flex gap-4 border-b py-5">
  {#if bookmark.image}
    <img
      alt=""
      class="border-hairline mt-1 size-12 shrink-0 rounded border object-cover"
      loading="lazy"
      onerror={(event) =>
        ((event.currentTarget as HTMLImageElement).hidden = true)}
      referrerpolicy="no-referrer"
      src={bookmark.image}
    />
  {/if}
  <div class="min-w-0 grow">
    {#if editing}
      <BookmarkEditor
        {bookmark}
        {message}
        onclose={() => (editing = false)}
        {vocabulary}
      />
    {:else}
      <a
        class="text-ink decoration-faint hover:decoration-ink font-medium underline decoration-1 underline-offset-3"
        href={bookmark.url}
        referrerpolicy="no-referrer"
        rel="noopener noreferrer"
        target="_blank"
      >
        {bookmark.title ?? bookmark.url}
      </a>
      {#if bookmark.description}
        <p class="text-secondary mt-1 line-clamp-2 text-sm">
          {bookmark.description}
        </p>
      {/if}
      {#if bookmark.tags.length > 0}
        <ul class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {#each bookmark.tags as tag (tag)}
            <li>
              <button
                class="text-secondary hover:text-ink cursor-pointer bg-transparent p-0 text-sm"
                onclick={() => ontag(tag)}
                type="button"
              >
                #{tag}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
      <div
        class="metadata text-faint mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"
      >
        <span>{bookmark.domain}</span>
        <span>·</span>
        <time dateTime={bookmark.createdAt}>{bookmark.createdAtLabel}</time>
        {#if !bookmark.processed}
          <span>·</span>
          <span>Untagged</span>
        {/if}
        {#if isBrokenStatus(bookmark.httpStatus)}
          <span>·</span>
          <span>
            {bookmark.httpStatus === 0
              ? "Unreachable"
              : `Broken (${bookmark.httpStatus})`}
          </span>
        {/if}
        <span class="ml-auto flex items-center gap-3">
          <form action="?/favorite" method="POST" use:enhance>
            <input name="id" type="hidden" value={bookmark.id} />
            <input
              name="favorite"
              type="hidden"
              value={bookmark.favorite ? "false" : "true"}
            />
            <button
              aria-pressed={bookmark.favorite}
              class={actionClassNames}
              type="submit"
            >
              {bookmark.favorite ? "★ Favorite" : "☆ Favorite"}
            </button>
          </form>
          <button
            class={actionClassNames}
            onclick={() => (editing = true)}
            type="button"
          >
            Edit
          </button>
          <form
            action="?/delete"
            method="POST"
            onsubmit={(event) => {
              if (!confirm("Delete this bookmark?")) event.preventDefault();
            }}
            use:enhance
          >
            <input name="id" type="hidden" value={bookmark.id} />
            <button class={actionClassNames} type="submit">Delete</button>
          </form>
        </span>
      </div>
    {/if}
  </div>
</li>
