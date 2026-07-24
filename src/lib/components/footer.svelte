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
    "text-neutral-500 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-400";
</script>

<footer class="mb-0 flex grow items-end pt-16 text-sm">
  <a class={`hidden md:block ${linkClassNames}`} href="/">{siteDomain}</a>
  <nav class="flex md:grow md:justify-end">
    <ul class="flex gap-2">
      {#each links as link (link.url)}
        <li class="after:pl-2 after:content-['•'] last:after:content-['']">
          <Link
            class={linkClassNames}
            href={link.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.name}
          </Link>
        </li>
      {/each}
    </ul>
  </nav>
</footer>
