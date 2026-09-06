import { isPublicHttpUrl } from "./url";

const MAX_REDIRECTS = 5;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

// `redirect: "follow"` would let a public URL bounce the function to
// localhost, a private range, or a cloud metadata endpoint. Follow hops by
// hand and hold every target to the same host-literal guard as the first.
export async function fetchPublic(
  url: string,
  init: RequestInit,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  let current = url;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    if (!isPublicHttpUrl(current)) {
      throw new Error(`Refusing to fetch non-public URL: ${current}`);
    }

    const response = await fetcher(current, { ...init, redirect: "manual" });
    const location = response.headers.get("location");

    if (!REDIRECT_STATUSES.has(response.status) || !location) {
      return response;
    }

    await response.body?.cancel().catch(() => undefined);
    current = new URL(location, current).href;
  }

  throw new Error(`Too many redirects: ${url}`);
}
