import { siteDescriptionCode, siteName } from "@/lib/constants";

export function Bio() {
  return (
    <div className="text-2xl text-balance">
      <h1 className="inline font-bold">{siteName}</h1>
      <h2 className="dark:text-neutral-40 inline font-extralight text-neutral-500 before:content-['—']">
        {siteDescriptionCode}
      </h2>
    </div>
  );
}
