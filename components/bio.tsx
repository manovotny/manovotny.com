import { Link } from "@/components/link";

export function Bio() {
  return (
    <div className="text-2xl text-balance">
      <h1 className="inline font-bold">Michael Novotny</h1>
      <h2 className="dark:text-neutral-40 inline font-extralight text-neutral-500 before:content-['—']">
        software developer, stock investor/trader, avid coffee drinker.
        Currently leading content at{" "}
        <Link href="https://vercel.com/home">Vercel</Link>.
      </h2>
    </div>
  );
}
