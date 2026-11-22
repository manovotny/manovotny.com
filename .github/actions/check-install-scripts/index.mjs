import { readFileSync } from "fs";
import { join } from "path";

const lock = JSON.parse(
  readFileSync(join(process.cwd(), "package-lock.json"), "utf8"),
);

const allowed = new Set(
  process.argv[2]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

const found = Object.entries(lock.packages || {})
  .filter(([, v]) => v.hasInstallScript)
  .map(([k]) => {
    const parts = k.split("node_modules/");
    return parts[parts.length - 1];
  })
  .filter((k) => k);

const unexpected = found.filter((p) => !allowed.has(p));

if (unexpected.length) {
  console.error(
    "Unexpected packages with install scripts:",
    unexpected.join(", "),
  );
  console.error(
    "If these are expected, add them to the allowed-packages input.",
  );
  process.exit(1);
}

console.log("Install script allowlist OK:", found.join(", "));
