"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/link";
import { Logo } from "@/components/logo";

const linkClassNames =
  "text-neutral-800 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="flex py-16">
      <Link
        className="group relative flex h-[28px] items-center gap-4 overflow-hidden text-neutral-800 hover:text-neutral-800 hover:no-underline dark:text-neutral-200 dark:hover:text-neutral-200"
        href="/"
      >
        <Logo />
        {isHome ? null : (
          <p className="mt-[-4px] h-[28px] transform text-2xl font-light transition-transform duration-[400ms] group-hover:translate-y-[-33px]">
            <span className="block origin-[right_center] transform transition-transform duration-[400ms]">
              Michael Novotny
            </span>
            <span className="block origin-[left_center] transform transition-transform duration-[400ms]">
              manovotny
            </span>
          </p>
        )}
      </Link>
      <nav className="ml-auto">
        <ol className="flex gap-10">
          <Link className={linkClassNames} href="/uses">
            Uses
          </Link>
        </ol>
      </nav>
    </header>
  );
}
