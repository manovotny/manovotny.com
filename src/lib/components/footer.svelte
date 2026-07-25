<script lang="ts">
  import Link from "$lib/components/link.svelte";
  import { siteDomain, username } from "$lib/constants";

  const links = [
    { name: "X", newTab: true, url: `https://x.com/${username}` },
    {
      name: "LinkedIn",
      newTab: true,
      url: `https://linkedin.com/in/${username}`,
    },
    {
      name: "Bluesky",
      newTab: true,
      url: `https://bsky.app/profile/${siteDomain}`,
    },
    { name: "GitHub", newTab: true, url: `https://github.com/${username}` },
    { name: "Email", newTab: false, url: "mailto:manovotny@gmail.com" },
  ];

  const linkClassNames =
    "block p-2 text-secondary no-underline transition-colors duration-150 hover:text-ink";
</script>

<footer class="meta flex items-center pt-20 pb-10">
  <a class={`-ml-2 hidden md:block ${linkClassNames}`} href="/">{siteDomain}</a>
  <nav aria-label="Social" class="-mx-2 flex min-w-0 grow md:justify-end">
    <ul class="flex flex-wrap gap-x-2 gap-y-1">
      {#each links as link (link.url)}
        <li>
          <Link
            class={linkClassNames}
            href={link.url}
            rel={link.newTab ? "noopener noreferrer" : undefined}
            target={link.newTab ? "_blank" : undefined}
          >
            {link.name}{#if link.newTab}<span class="sr-only normal-case">
                (opens in new tab)</span
              >{/if}
          </Link>
        </li>
      {/each}
    </ul>
  </nav>
</footer>
