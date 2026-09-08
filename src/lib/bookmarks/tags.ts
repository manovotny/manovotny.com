const TAG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isValidTag(tag: string): boolean {
  return TAG_PATTERN.test(tag);
}

export function normalizeTags(tags: readonly string[]): string[] {
  const seen = new Set<string>();

  for (const raw of tags) {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, "-");

    if (tag) {
      seen.add(tag);
    }
  }

  return [...seen].sort();
}

export function invalidTags(tags: readonly string[]): string[] {
  return normalizeTags(tags).filter((tag) => !isValidTag(tag));
}

export function parseTagInput(input: string): string[] {
  return normalizeTags(input.split(",")).filter(isValidTag);
}
