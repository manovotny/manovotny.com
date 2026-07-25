<script lang="ts">
  import FormattedDate from "$lib/components/formatted-date.svelte";
  import Link from "$lib/components/link.svelte";
  import Seo from "$lib/components/seo.svelte";
  import { getNotes } from "$lib/notes";

  const notes = getNotes();

  const linkClassName =
    "group flex flex-col text-neutral-800 no-underline hover:text-neutral-800 sm:flex-row sm:items-baseline sm:gap-4 dark:text-neutral-200 dark:hover:text-neutral-200";
</script>

<Seo
  description="A collection of notes, thoughts, and articles."
  slug="notes"
  title="Notes"
/>

<h1 class="text-3xl font-bold tracking-tight">Notes</h1>
<ul class="mt-8 space-y-4">
  {#each notes as note (note.href)}
    <li>
      {#if note.href.startsWith("/")}
        <Link class={linkClassName} href={note.href}>
          <FormattedDate class="w-28 shrink-0" date={note.date} />
          <span class="group-hover:underline">{note.title}</span>
        </Link>
      {:else}
        <a
          class={linkClassName}
          href={note.href}
          rel="noopener noreferrer nofollow"
        >
          <FormattedDate class="w-28 shrink-0" date={note.date} />
          <span class="group-hover:underline"
            >{note.title.split(" ").slice(0, -1).join(" ")}{" "}<span
              class="whitespace-nowrap"
              >{note.title.split(" ").at(-1)}<svg
                aria-hidden="true"
                class="mb-0.5 ml-1.5 inline size-4"
                data-slot="icon"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg></span
            ><span class="sr-only">(external link)</span></span
          >
        </a>
      {/if}
    </li>
  {/each}
</ul>
