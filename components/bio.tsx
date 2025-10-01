import { siteDescriptionCode, siteName } from "@/lib/constants";

export function Bio() {
  return (
    <div className="text-balance text-2xl">
      <h1 className="inline font-bold">{siteName}</h1>
      <h2 className="inline font-extralight text-neutral-500 before:content-['—'] dark:text-neutral-40">
        {siteDescriptionCode}
      </h2>
    </div>
  );
}
