import Image from "next/image";

export function Name() {
  return (
    <header className="gap-2 pt-12 flex">
      <Image
        className="rounded-full"
        src="https://ty3rozserpuox2as.public.blob.vercel-storage.com/avatar-iUBOIX0isAlrKIyzDh4N9jeKpmheWV.jpg"
        alt="Michael Novotny"
        width={28}
        height={28}
      />
      <h1 className="transition-element">
        <span className="sr-only">Michael Novotny</span>
        <span
          aria-hidden="true"
          className="group relative block overflow-hidden"
        >
          <span className="ease-in-out inline-block transition-all duration-300 group-hover:-translate-y-full">
            {"Michael Novotny".split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
          <span className="top-0 left-0 ease-in-out group-hover:translate-y-0 absolute inline-block translate-y-full transition-all duration-300">
            {"manovotny".split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </header>
  );
}
