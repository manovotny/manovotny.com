import fs from "fs";
import path from "path";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { Metadata } from "next";

import { FormattedDate } from "@/components/formatted-date";
import { createMetadata } from "@/lib/metadata";

type NoteData = {
  date: string;
  href: string;
  title: string;
};

const externalNotes: NoteData[] = [
  {
    date: "2024-09-04",
    href: "https://vercel.com/blog/whats-new-in-react-19",
    title: "What's new in React 19",
  },
  {
    date: "2023-08-07",
    href: "https://vercel.com/blog/introducing-next-js-commerce-2-0",
    title: "Introducing Next.js Commerce 2.0",
  },
  {
    date: "2022-12-08",
    href: "https://vercel.com/blog/migrating-a-large-open-source-react-application-to-next-js-and-vercel",
    title:
      "Migrating a large, open-source React application to Next.js and Vercel",
  },
];

export const metadata: Metadata = createMetadata({
  description: "A collection of notes, thoughts, and articles.",
  slug: "notes",
  title: "Notes",
});

function getNoteDirectories() {
  const notesDir = path.join(process.cwd(), "app", "(notes)");

  return fs
    .readdirSync(notesDir)
    .filter((dir) => fs.existsSync(path.join(notesDir, dir, "page.mdx")));
}

const linkClassName =
  "group flex flex-col text-neutral-800 no-underline hover:text-neutral-800 sm:flex-row sm:items-baseline sm:gap-4 dark:text-neutral-200 dark:hover:text-neutral-200";

export default async function NotesPage() {
  const directories = getNoteDirectories();

  const notes: NoteData[] = [...externalNotes];

  for (const directory of directories) {
    const mod = await import(`@/app/(notes)/${directory}/page.mdx`);
    const { date, slug, title } = mod.data;

    notes.push({ date, href: `/${slug}`, title });
  }

  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
      <ul className="mt-8 space-y-4">
        {notes.map((note) => (
          <li key={note.href}>
            {note.href.startsWith("/") ? (
              <Link className={linkClassName} href={note.href}>
                <FormattedDate className="w-28 shrink-0" date={note.date} />
                <span className="group-hover:underline">{note.title}</span>
              </Link>
            ) : (
              <a
                className={linkClassName}
                href={note.href}
                rel="noopener noreferrer nofollow"
              >
                <FormattedDate className="w-28 shrink-0" date={note.date} />
                <span className="group-hover:underline">
                  {note.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="whitespace-nowrap">
                    {note.title.split(" ").at(-1)}
                    <ArrowTopRightOnSquareIcon className="mb-0.5 ml-1.5 inline size-4" />
                  </span>
                  <span className="sr-only">(external link)</span>
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
