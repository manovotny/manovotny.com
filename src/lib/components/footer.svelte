<script lang="ts">
  import Link from "$lib/components/link.svelte";
  import { siteDomain, username } from "$lib/constants";

  const links = [
    { name: "X", url: `https://x.com/${username}` },
    { name: "LinkedIn", url: `https://linkedin.com/in/${username}` },
    { name: "Bluesky", url: `https://bsky.app/profile/${siteDomain}` },
    { name: "GitHub", url: `https://github.com/${username}` },
    { name: "Email", url: "mailto:manovotny@gmail.com" },
  ];

  const linkClassNames =
    "block p-2 text-secondary no-underline transition-colors duration-150 hover:text-ink";

  const opensNewTab = (url: string) => !url.startsWith("mailto:");
</script>

<footer class="metadata flex items-center pt-20 pb-10">
  <a class={`-ml-2 hidden md:block ${linkClassNames}`} href="/">{siteDomain}</a>
  <nav aria-label="Social" class="-mx-2 flex min-w-0 grow md:justify-end">
    <ul class="flex flex-wrap gap-x-2 gap-y-1">
      {#each links as link (link.url)}
        {@const newTab = opensNewTab(link.url)}
        <li>
          <Link
            class={linkClassNames}
            href={link.url}
            rel={newTab ? "noopener noreferrer" : undefined}
            target={newTab ? "_blank" : undefined}
          >
            {link.name}{#if newTab}<span class="sr-only normal-case">
                (opens in new tab)</span
              >{/if}
          </Link>
        </li>
      {/each}
    </ul>
  </nav>
</footer>
