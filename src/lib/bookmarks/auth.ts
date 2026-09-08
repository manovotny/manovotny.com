import { timingSafeEqual } from "node:crypto";

export function hasBearerToken(
  request: Request,
  token: string | undefined,
): boolean {
  if (!token) {
    return false;
  }

  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  const expected = Buffer.from(token);
  const actual = Buffer.from(provided);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function isOwner(
  userId: string | null | undefined,
  ownerUserId: string | undefined,
): boolean {
  return Boolean(userId) && Boolean(ownerUserId) && userId === ownerUserId;
}

export type ViewerRole = "anonymous" | "owner" | "stranger";

// Every page load and action branches on this; a stranger is a signed-in
// Clerk user who is not the owner and must see a 404, never data.
export function viewerRole(
  userId: string | null | undefined,
  ownerUserId: string | undefined,
): ViewerRole {
  if (!userId) {
    return "anonymous";
  }

  return isOwner(userId, ownerUserId) ? "owner" : "stranger";
}
