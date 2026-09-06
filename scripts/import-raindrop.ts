import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { parseCsvRecords } from "../src/lib/bookmarks/csv";
import { createDb } from "../src/lib/bookmarks/db/client";
import { bookmarks } from "../src/lib/bookmarks/db/schema";
import { mapRaindropRow } from "../src/lib/bookmarks/raindrop";

const BATCH_SIZE = 100;

if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const args = process.argv.slice(2);
const write = args.includes("--write");
const [path] = args.filter((arg) => !arg.startsWith("--"));

if (!path) {
  console.error(
    "Usage: npm run import:raindrop -- <path-to-raindrop.csv> [--write]",
  );
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

// Never print credentials; the host is enough to tell dev from production.
console.info(
  `${write ? "WRITING to" : "Dry run against"} ${new URL(process.env.DATABASE_URL).host}`,
);

const db = createDb(process.env.DATABASE_URL);
const records = parseCsvRecords(await readFile(path, "utf8"));

// Oldest first so "keep the earlier row" holds on collisions.
const mapped = records
  .map((record) => ({ record, result: mapRaindropRow(record) }))
  .sort((a, b) => {
    const aTime =
      "bookmark" in a.result ? a.result.bookmark.createdAt!.getTime() : 0;
    const bTime =
      "bookmark" in b.result ? b.result.bookmark.createdAt!.getTime() : 0;

    return aTime - bTime;
  });

const existing = new Set(
  (
    await db.select({ normalizedUrl: bookmarks.normalizedUrl }).from(bookmarks)
  ).map((row) => row.normalizedUrl),
);

const counts = { inserted: 0, invalid: 0, skipped: 0 };
let batch: (typeof bookmarks.$inferInsert)[] = [];

async function flush() {
  if (batch.length === 0) {
    return;
  }

  if (write) {
    await db.insert(bookmarks).values(batch).onConflictDoNothing();
  }

  counts.inserted += batch.length;
  batch = [];
}

for (const { record, result } of mapped) {
  if ("error" in result) {
    counts.invalid += 1;
    console.warn(`invalid  ${record.id}  ${result.error}`);
    continue;
  }

  const { bookmark } = result;

  if (existing.has(bookmark.normalizedUrl)) {
    counts.skipped += 1;
    console.warn(
      `skipped  ${record.id}  duplicate of ${bookmark.normalizedUrl}`,
    );
    continue;
  }

  existing.add(bookmark.normalizedUrl);
  batch.push(bookmark);

  if (batch.length >= BATCH_SIZE) {
    await flush();
  }
}

await flush();

console.info(
  `${write ? "Done." : "Dry run."} inserted=${counts.inserted} skipped=${counts.skipped} invalid=${counts.invalid} total=${records.length}`,
);
