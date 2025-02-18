import { Link } from "@/components/link";

export function Bio() {
  return (
    <h1 className="text-2xl">
      <span className="font-bold">Michael Novotny</span>
      <span className="font-extralight text-neutral-500">
        —software developer, stock trader, coffee enthusiast. Currently leading
        Content at{" "}
        <Link href="https://vercel.com" target="_blank">
          Vercel
        </Link>
        .
      </span>
    </h1>
  );
}
