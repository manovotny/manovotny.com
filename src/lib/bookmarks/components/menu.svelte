<script lang="ts">
  import type { Snippet } from "svelte";

  import { menuState } from "$lib/bookmarks/components/menu-state.svelte";

  let {
    align = "left",
    children,
    id,
    label,
    width = "w-56",
  }: {
    align?: "left" | "right";
    children: Snippet;
    id: string;
    label: string;
    width?: string;
  } = $props();

  let ref = $state<HTMLDivElement | null>(null);

  const open = $derived(menuState.open === id);

  function toggle() {
    menuState.open = open ? null : id;
  }

  // Close on a click outside or Escape. The listener is registered on the
  // next tick so the click that opened the menu doesn't close it, and it
  // only closes this menu, so a click that opens a sibling wins.
  $effect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (menuState.open === id && ref && !ref.contains(event.target as Node)) {
        menuState.open = null;
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && menuState.open === id) {
        menuState.open = null;
      }
    }

    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleClick);
      window.addEventListener("keydown", handleKey);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  });
</script>

<div bind:this={ref} class="relative">
  <button
    aria-expanded={open}
    aria-haspopup="menu"
    class="metadata border-hairline hover:bg-hover flex h-9 cursor-pointer items-center gap-1.5 rounded-md border px-3 whitespace-nowrap select-none"
    onclick={toggle}
    type="button"
  >
    {label}
    <svg
      aria-hidden="true"
      class="size-3"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
  {#if open}
    <div
      class="border-hairline bg-bg absolute top-full z-10 mt-1 max-h-80 overflow-y-auto rounded-md border py-1 shadow-lg {width} {align ===
      'right'
        ? 'right-0'
        : 'left-0'}"
      role="menu"
    >
      {@render children()}
    </div>
  {/if}
</div>
