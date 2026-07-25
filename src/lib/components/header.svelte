<script lang="ts">
  import { page } from "$app/state";
  import Link from "$lib/components/link.svelte";
  import Logo from "$lib/components/logo.svelte";
  import { siteName } from "$lib/constants";

  const linkClassNames =
    "block p-2 text-secondary no-underline transition-colors duration-150 hover:text-ink";

  const isHome = $derived(page.url.pathname === "/");
  const isNotes = $derived(page.url.pathname === "/notes");
  const isUses = $derived(page.url.pathname === "/uses");
</script>

<header class="flex items-center pt-14">
  <Link
    aria-label="Home"
    class="text-ink hover:text-ink flex items-center gap-3 no-underline"
    href="/"
  >
    <Logo size={26} />
    {#if !isHome}
      <span class="text-[15px] font-medium tracking-[-0.01em]">{siteName}</span>
    {/if}
  </Link>
  <nav aria-label="Primary" class="-mr-2 ml-auto">
    <ol class="meta flex gap-3">
      <li>
        <Link
          aria-current={isNotes ? "page" : undefined}
          class={linkClassNames}
          href="/notes"
        >
          Notes
        </Link>
      </li>
      <li>
        <Link
          aria-current={isUses ? "page" : undefined}
          class={linkClassNames}
          href="/uses"
        >
          Uses
        </Link>
      </li>
    </ol>
  </nav>
</header>
