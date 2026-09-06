<script lang="ts">
  import { enhance } from "$app/forms";
  import type { BookmarkView } from "$lib/bookmarks/view";

  let {
    bookmark,
    message,
    onclose,
    vocabulary,
  }: {
    bookmark: BookmarkView;
    message?: string;
    onclose: () => void;
    vocabulary: string[];
  } = $props();

  let tags = $state(bookmark.tags.join(", "));

  const inputClassNames =
    "border-hairline bg-bg focus:border-ink w-full rounded-md border px-3 py-2 outline-none";

  // A <datalist> would replace the whole comma-separated value, so existing
  // tags are appended from a plain <select> instead.
  function appendTag(tag: string) {
    if (!tag) return;

    const current = tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!current.includes(tag)) {
      tags = [...current, tag].join(", ");
    }
  }
</script>

<form
  action="?/update"
  class="flex flex-col gap-2"
  method="POST"
  use:enhance={() =>
    async ({ result, update }) => {
      // Keep the editor open (with its values) on validation failure.
      await update({ reset: false });

      if (result.type === "success") {
        onclose();
      }
    }}
>
  <input name="id" type="hidden" value={bookmark.id} />
  <label class="flex flex-col gap-1">
    <span class="metadata text-secondary">Title</span>
    <input class={inputClassNames} name="title" value={bookmark.title ?? ""} />
  </label>
  <label class="flex flex-col gap-1">
    <span class="metadata text-secondary">Tags (comma separated)</span>
    <input bind:value={tags} class={inputClassNames} name="tags" />
  </label>
  <select
    aria-label="Add an existing tag"
    class="metadata border-hairline bg-bg cursor-pointer rounded-md border px-3 py-2"
    onchange={(event) => {
      appendTag(event.currentTarget.value);
      event.currentTarget.value = "";
    }}
  >
    <option value="">Add existing tag…</option>
    {#each vocabulary as tag (tag)}
      <option value={tag}>{tag}</option>
    {/each}
  </select>
  {#if message}
    <p class="text-secondary text-sm" role="alert">{message}</p>
  {/if}
  <div class="flex gap-2">
    <button
      class="metadata bg-ink text-bg cursor-pointer rounded-md px-3 py-2"
      type="submit"
    >
      Save
    </button>
    <button
      class="metadata border-hairline hover:bg-hover cursor-pointer rounded-md border px-3 py-2"
      onclick={onclose}
      type="button"
    >
      Cancel
    </button>
  </div>
</form>
