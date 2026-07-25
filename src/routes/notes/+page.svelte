<script lang="ts">
  import FormattedDate from "$lib/components/formatted-date.svelte";
  import Link from "$lib/components/link.svelte";
  import PageTitle from "$lib/components/page-title.svelte";
  import Seo from "$lib/components/seo.svelte";
  import { getNotes } from "$lib/notes";

  const notes = getNotes();

  const linkClassName =
    "-mx-3 flex items-baseline gap-6 px-3 py-3 text-[15px] text-ink no-underline transition-colors duration-150 hover:bg-hover";
</script>

<Seo
  description="A collection of notes, thoughts, and articles."
  slug="notes"
  title="Notes"
/>

<PageTitle>Notes</PageTitle>
<ul>
  {#each notes as note (note.href)}
    <li class="border-hairline border-b">
      {#if note.href.startsWith("/")}
        <Link class={linkClassName} href={note.href}>
          <FormattedDate
            class="w-22 shrink-0"
            date={note.date}
            format="month-year"
          />
          <span class="min-w-0 break-words">{note.title}</span>
        </Link>
      {:else}
        <a
          class={linkClassName}
          href={note.href}
          rel="noopener noreferrer nofollow"
        >
          <FormattedDate
            class="w-22 shrink-0"
            date={note.date}
            format="month-year"
          />
          <span class="min-w-0 break-words">{note.title}</span>
          <span
            aria-hidden="true"
            class="text-faint ml-auto pl-4 font-mono text-[13px]">↗</span
          >
          <span class="sr-only">(external link)</span>
        </a>
      {/if}
    </li>
  {/each}
</ul>
