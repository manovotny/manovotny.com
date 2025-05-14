import { Link } from "@/components/link";

const links = [
  { name: "X", url: "https://x.com/manovotny" },
  { name: "LinkedIn", url: "https://linkedin.com/in/manovotny" },
  { name: "Bluesky", url: "https://bsky.app/profile/manovotny.com" },
  { name: "GitHub", url: "https://github.com/manovotny" },
  { name: "Email", url: "mailto:manovotny@gmail.com" },
];

const linkClassNames =
  "text-neutral-500 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-400";

export function Footer() {
  return (
    <footer className="mb-0 flex grow items-end pt-16 text-sm">
      <a className={`hidden md:block ${linkClassNames}`} href="/">
        {"manovotny.com"}
      </a>
      <nav className="flex md:grow md:justify-end">
        <ul className="flex gap-2">
          {links.map((link) => (
            <li
              className="after:pl-2 after:content-['•'] last:after:content-['']"
              key={link.url}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-200 ${linkClassNames}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
