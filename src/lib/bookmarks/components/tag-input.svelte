<script lang="ts">
  import { isValidTag, normalizeTags } from "$lib/bookmarks/tags";

  let {
    name,
    tags = $bindable([]),
    vocabulary,
  }: {
    name: string;
    tags?: string[];
    vocabulary: { count: number; tag: string }[];
  } = $props();

  const MAX_SUGGESTIONS = 6;
  const uid = $props.id();
  const listboxId = `${uid}-listbox`;

  let draft = $state("");
  let active = $state(0);
  let dismissed = $state(false);
  let input = $state<HTMLInputElement | null>(null);

  // What the draft would become as a tag: lowercase, spaces to hyphens.
  const candidate = $derived(normalizeTags([draft])[0] ?? "");
  const isKnown = $derived(vocabulary.some(({ tag }) => tag === candidate));
  const canCreate = $derived(
    candidate !== "" &&
      !isKnown &&
      !tags.includes(candidate) &&
      isValidTag(candidate),
  );

  const suggestions = $derived.by(() => {
    if (!candidate || dismissed) return [];

    const matches = vocabulary.filter(
      ({ tag }) => !tags.includes(tag) && tag.includes(candidate),
    );

    // Prefix matches first; the vocabulary is already alphabetical.
    return [
      ...matches.filter(({ tag }) => tag.startsWith(candidate)),
      ...matches.filter(({ tag }) => !tag.startsWith(candidate)),
    ].slice(0, MAX_SUGGESTIONS);
  });

  const open = $derived(suggestions.length > 0 || canCreate);
  const rowCount = $derived(suggestions.length + (canCreate ? 1 : 0));

  // The form field: committed chips plus a valid, uncommitted draft, so a
  // tag typed but not yet confirmed still saves.
  const fieldValue = $derived(
    [
      ...tags,
      ...(canCreate || (isKnown && !tags.includes(candidate))
        ? [candidate]
        : []),
    ].join(","),
  );

  function commit(tag: string) {
    if (!tags.includes(tag)) {
      tags = [...tags, tag];
    }

    draft = "";
    active = 0;
    dismissed = false;
    input?.focus();
  }

  function remove(tag: string) {
    tags = tags.filter((item) => item !== tag);
    input?.focus();
  }

  function pick(index: number) {
    if (index < suggestions.length) {
      commit(suggestions[index]!.tag);
    } else if (canCreate) {
      commit(candidate);
    }
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault();
      tags = tags.slice(0, -1);
      return;
    }

    if (event.key === ",") {
      event.preventDefault();
      if (open) pick(active);
      return;
    }

    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        active = (active + 1) % rowCount;
        break;
      case "ArrowUp":
        event.preventDefault();
        active = (active - 1 + rowCount) % rowCount;
        break;
      case "Enter":
      case "Tab":
        event.preventDefault();
        pick(active);
        break;
      case "Escape":
        event.preventDefault();
        dismissed = true;
        break;
      default:
    }
  }
</script>

<div class="relative">
  <input {name} type="hidden" value={fieldValue} />
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class="border-hairline bg-bg focus-within:border-ink flex min-h-9 cursor-text flex-wrap items-center gap-1 rounded-md border px-2 py-1"
    onclick={() => input?.focus()}
  >
    {#each tags as tag (tag)}
      <button
        aria-label={`Remove ${tag}`}
        class="bg-hover text-ink hover:text-secondary cursor-pointer rounded px-2 py-0.5 text-sm"
        onclick={(event) => {
          event.stopPropagation();
          remove(tag);
        }}
        type="button"
      >
        #{tag}
      </button>
    {/each}
    <!-- 16px scaled to a visual 14px so iOS Safari doesn't zoom on focus. -->
    <input
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-label="Tags"
      aria-expanded={open}
      autocapitalize="off"
      autocomplete="off"
      bind:this={input}
      bind:value={draft}
      class="h-[22.857143px] min-w-32 grow origin-left scale-[0.875] bg-transparent text-[16px] outline-none"
      oninput={() => {
        dismissed = false;
        active = 0;
      }}
      {onkeydown}
      placeholder={tags.length === 0 ? "Add tags" : ""}
      role="combobox"
      spellcheck="false"
    />
  </div>
  {#if open}
    <ul
      class="border-hairline bg-bg absolute top-full left-0 z-10 mt-1 w-full overflow-hidden rounded-md border py-1 shadow-lg"
      id={listboxId}
      role="listbox"
    >
      {#each suggestions as { count, tag }, index (tag)}
        <li
          aria-selected={index === active}
          class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm select-none {index ===
          active
            ? 'bg-hover'
            : ''}"
          onmousedown={(event) => {
            // Keep focus in the input; a click here is a pick, not a blur.
            event.preventDefault();
            pick(index);
          }}
          onmouseenter={() => (active = index)}
          role="option"
        >
          <span class="grow">{tag}</span>
          <span class="text-faint text-xs">{count}</span>
        </li>
      {/each}
      {#if canCreate}
        <li
          aria-selected={active === suggestions.length}
          class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm select-none {active ===
          suggestions.length
            ? 'bg-hover'
            : ''}"
          onmousedown={(event) => {
            event.preventDefault();
            pick(suggestions.length);
          }}
          onmouseenter={() => (active = suggestions.length)}
          role="option"
        >
          <span class="grow">{candidate}</span>
          <span class="text-faint text-xs">New tag</span>
        </li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  /* The site's global :focus-visible ring is un-layered, so Tailwind's
     outline utilities can't override it. The ink border is the focus cue. */
  input:focus-visible {
    outline: none;
  }
</style>
