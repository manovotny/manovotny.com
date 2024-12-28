import Image from "next/image";

export function Header() {
  return (
    <header className="flex pt-12">
      <Image
        className="rounded-full"
        src="https://ty3rozserpuox2as.public.blob.vercel-storage.com/avatar-iUBOIX0isAlrKIyzDh4N9jeKpmheWV.jpg"
        alt="Michael Novotny"
        width={28}
        height={28}
      />
      <nav className="gap-4R ml-auto">
        <ol className="flex gap-10">
          <li>Notes</li>
          <li>About</li>
          <li>Uses</li>
        </ol>
      </nav>
    </header>
  );
}
