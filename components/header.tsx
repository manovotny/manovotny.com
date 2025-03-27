import { Link } from "@/components/link";
import { Logo } from "@/components/icons/logo-dot";

export function Header() {
  return (
    <header className="flex py-16">
      <Link
        className="group relative flex h-[28px] items-center gap-4 overflow-hidden text-neutral-800 hover:text-neutral-800 hover:no-underline dark:text-neutral-200 dark:hover:text-neutral-200"
        href="/"
      >
        <Logo />
        <p className="mt-[-4px] h-[28px] transform text-2xl font-extralight transition-transform duration-[400ms] group-hover:translate-y-[-33px]">
          <span className="block origin-[right_center] rotate-0 transform transition-transform duration-[400ms] group-hover:rotate-12">
            Michael Novotny
          </span>
          <span className="block origin-[left_center] rotate-12 transform transition-transform duration-[400ms] group-hover:rotate-0">
            manovotny
          </span>
        </p>
      </Link>
      {/* <nav className="ml-auto">
        <ol className="flex gap-10">
          <li>Notes</li>
          <li>About</li>
          <li>Uses</li>
        </ol>
      </nav> */}
    </header>
  );
}
