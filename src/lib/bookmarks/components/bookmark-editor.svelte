<script lang="ts">
  import { untrack } from "svelte";

  import { enhance } from "$app/forms";
  import TagInput from "$lib/bookmarks/components/tag-input.svelte";
  import TextInput from "$lib/bookmarks/components/text-input.svelte";
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
    vocabulary: { count: number; tag: string }[];
  } = $props();

  // A draft: snapshot the tags once when the editor opens. The editor is
  // mounted per edit and unmounts on success, so it never needs to track
  // later prop changes — untrack makes that intentional.
  let tags = $state(untrack(() => [...bookmark.tags]));
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
    <TextInput name="title" value={bookmark.title ?? ""} />
  </label>
  <!-- Not a <label>: a click on a label's dead space activates its first
       labelable descendant, which here would be a tag chip's remove button. -->
  <div class="flex flex-col gap-1">
    <span class="metadata text-secondary">Tags</span>
    <TagInput bind:tags name="tags" {vocabulary} />
  </div>
  {#if message}
    <p class="text-secondary text-sm" role="alert">{message}</p>
  {/if}
  <div class="flex gap-2">
    <button
      class="metadata bg-ink text-bg inline-flex h-9 cursor-pointer items-center rounded-md px-3"
      type="submit"
    >
      Save
    </button>
    <button
      class="metadata border-hairline hover:bg-hover inline-flex h-9 cursor-pointer items-center rounded-md border px-3"
      onclick={onclose}
      type="button"
    >
      Cancel
    </button>
  </div>
</form>
