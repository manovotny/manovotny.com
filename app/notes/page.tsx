import fs from "fs";
import path from "path";

import Link from "next/link";
import type { Metadata } from "next";

import { FormattedDate } from "@/components/formatted-date";
import { createMetadata } from "@/lib/metadata";

type NoteData = {
  date: string;
  slug: string;
  title: string;
};

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

export default async function NotesPage() {
  const directories = getNoteDirectories();

  const notes: NoteData[] = [];

  for (const directory of directories) {
    const mod = await import(`@/app/(notes)/${directory}/page.mdx`);
    const { date, slug, title } = mod.data;

    notes.push({ date, slug, title });
  }

  notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
      <ul className="mt-8 space-y-4">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              className="group flex flex-col text-neutral-800 no-underline hover:text-neutral-800 sm:flex-row sm:items-baseline sm:gap-4 dark:text-neutral-200 dark:hover:text-neutral-200"
              href={`/${note.slug}`}
            >
              <FormattedDate date={note.date} />
              <span className="group-hover:underline">{note.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
