import { error } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";
import { hasBearerToken } from "$lib/bookmarks/auth";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

// Absent or non-numeric → default; otherwise an integer clamped to 1..100.
export function parseLimit(raw: string | null): number {
  // Number("") is 0, so blank must be handled before conversion.
  if (raw === null || raw.trim() === "") {
    return DEFAULT_LIMIT;
  }

  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(MAX_LIMIT, Math.max(1, Math.trunc(parsed)));
}

// The capture token lives on a phone (Apple Shortcut) and may only create
// bookmarks. The service token lives in the Claude Routine's host-scoped
// credential and may do everything.
export function requireServiceToken(
  request: Request,
  scope: "capture" | "service",
): void {
  const allowed =
    hasBearerToken(request, env.BOOKMARKS_API_TOKEN) ||
    (scope === "capture" &&
      hasBearerToken(request, env.BOOKMARKS_CAPTURE_TOKEN));

  if (!allowed) {
    error(401, "Unauthorized");
  }
}
