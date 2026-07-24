<script lang="ts">
  import { page } from "$app/state";
  import Link from "$lib/components/link.svelte";
  import Logo from "$lib/components/logo.svelte";
  import { siteName, username } from "$lib/constants";

  const linkClassNames =
    "text-neutral-800 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200";

  const isHome = $derived(page.url.pathname === "/");
</script>

<header class="flex py-16">
  <Link
    class="group relative flex h-[30px] items-center gap-4 overflow-hidden text-neutral-800 hover:text-neutral-800 hover:no-underline dark:text-neutral-200 dark:hover:text-neutral-200"
    href="/"
  >
    <Logo />
    {#if !isHome}
      <p
        class="-mt-1 h-[30px] transform text-2xl font-light transition-transform duration-400 group-hover:translate-y-[-35px]"
      >
        <span
          class="block origin-[right_center] transform transition-transform duration-400"
        >
          {siteName}
        </span>
        <span
          class="block origin-[left_center] transform transition-transform duration-400"
        >
          {username}
        </span>
      </p>
    {/if}
  </Link>
  <nav class="ml-auto">
    <ol class="flex gap-10">
      <li><Link class={linkClassNames} href="/notes">Notes</Link></li>
      <li><Link class={linkClassNames} href="/uses">Uses</Link></li>
    </ol>
  </nav>
</header>
