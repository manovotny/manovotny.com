export type NoteData = {
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

const modules = import.meta.glob("/src/routes/(notes)/*/+page.md", {
  eager: true,
});

export function getNotes(): NoteData[] {
  const localNotes = Object.values(modules).map((mod) => {
    const { date, slug, title } = (
      mod as { metadata: { date: string; slug: string; title: string } }
    ).metadata;

    return { date, href: `/${slug}`, title };
  });

  return [...externalNotes, ...localNotes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
