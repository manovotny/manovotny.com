import Image from "next/image";
import { Link } from "@/components/link";

export function Header() {
  return (
    <header className="flex py-16">
      <Link
        className="group relative flex h-[28px] items-center gap-4 overflow-hidden text-neutral-500 hover:text-neutral-500 hover:no-underline"
        href="/"
      >
        <Image
          src="/logo-dot.png"
          alt="Michael Novotny"
          width={28}
          height={28}
        />
        {/* <Image
          className="rounded-full"
          src="https://ty3rozserpuox2as.public.blob.vercel-storage.com/avatar-iUBOIX0isAlrKIyzDh4N9jeKpmheWV.jpg"
          alt="Michael Novotny"
          width={28}
          height={28}
        /> */}
        <p className="mt-[-4px] h-[28px] transform text-2xl font-extralight transition-all duration-[400ms] group-hover:translate-y-[-33px]">
          <span className="block origin-[right_center] rotate-0 transform transition-all duration-[400ms] group-hover:rotate-12">
            Michael Novotny
          </span>
          <span className="block origin-[left_center] rotate-12 transform transition-all duration-[400ms] group-hover:rotate-0">
            manovotny
          </span>
        </p>
      </Link>
      <nav className="ml-auto">
        <ol className="flex gap-10">
          <li>Notes</li>
          <li>About</li>
          <li>Uses</li>
        </ol>
      </nav>
    </header>
  );
}
