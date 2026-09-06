import { isPublicHttpUrl } from "./url";

const TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

async function request(
  url: string,
  method: "GET" | "HEAD",
  fetcher: typeof fetch,
): Promise<Response> {
  return fetcher(url, {
    headers: { "user-agent": USER_AGENT },
    method,
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

// Final status after redirects; 0 when the host could not be reached at all
// (DNS, TLS, timeout) or must not be fetched (non-public host).
export async function checkLink(
  url: string,
  fetcher: typeof fetch = fetch,
): Promise<number> {
  if (!isPublicHttpUrl(url)) {
    return 0;
  }

  // Some hosts reject or drop HEAD entirely; fall back to GET on 405/501
  // and on a thrown HEAD. Only a failed GET counts as unreachable.
  try {
    const head = await request(url, "HEAD", fetcher);

    if (head.status !== 405 && head.status !== 501) {
      return head.status;
    }
  } catch {
    // fall through to GET
  }

  try {
    const get = await request(url, "GET", fetcher);
    await get.body?.cancel().catch(() => undefined);

    return get.status;
  } catch {
    return 0;
  }
}
