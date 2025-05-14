import { Link } from "@/components/link";

export function Bio() {
  return (
    <h1 className="text-2xl">
      <span className="font-bold">Michael Novotny</span>
      <span className="font-extralight text-neutral-500 dark:text-neutral-400">
        —software developer, stock investor/trader, avid coffee drinker.
        Currently leading content at{" "}
        <Link href="https://vercel.com/home">Vercel</Link>.
      </span>
    </h1>
  );
}
