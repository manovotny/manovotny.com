import { fetchPublic } from "./safe-fetch";

export type Metadata = {
  description?: string;
  image?: string;
  title?: string;
};

const MAX_BYTES = 256 * 1024;
const TIMEOUT_MS = 8000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(Number.parseInt(dec, 10)),
    )
    .replace(
      /&([a-z]+);/gi,
      (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match,
    );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function metaContent(
  html: string,
  attribute: "name" | "property",
  key: string,
): string | undefined {
  const tag = html.match(
    new RegExp(
      `<meta\\b[^>]*\\b${attribute}\\s*=\\s*["']${escapeRegExp(key)}["'][^>]*>`,
      "i",
    ),
  )?.[0];
  const contentMatch = tag?.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  const content = (contentMatch?.[1] ?? contentMatch?.[2])?.trim();

  return content ? decodeEntities(content) : undefined;
}

function resolveUrl(raw: string, baseUrl: string): string | undefined {
  try {
    return new URL(raw, baseUrl).href;
  } catch {
    return undefined;
  }
}

export function parseMetadata(html: string, baseUrl: string): Metadata {
  const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const title =
    metaContent(html, "property", "og:title") ??
    (titleTag ? decodeEntities(titleTag) : undefined);
  const description =
    metaContent(html, "property", "og:description") ??
    metaContent(html, "name", "description");
  const rawImage =
    metaContent(html, "property", "og:image") ??
    metaContent(html, "name", "twitter:image");
  const image = rawImage ? resolveUrl(rawImage, baseUrl) : undefined;

  return {
    ...(description && { description }),
    ...(image && { image }),
    ...(title && { title }),
  };
}

async function readPrefix(response: Response, limit: number): Promise<string> {
  const reader = response.body?.getReader();

  if (!reader) {
    return "";
  }

  const decoder = new TextDecoder();
  let html = "";
  let received = 0;

  while (received < limit) {
    const { done, value } = await reader.read();

    if (done || !value) {
      break;
    }

    const remaining = limit - received;
    const chunk =
      value.byteLength > remaining ? value.subarray(0, remaining) : value;
    received += chunk.byteLength;
    html += decoder.decode(chunk, { stream: true });
  }

  await reader.cancel().catch(() => undefined);

  // Flush any buffered partial UTF-8 sequence.
  return html + decoder.decode();
}

export async function fetchMetadata(
  url: string,
  fetcher: typeof fetch = fetch,
): Promise<Metadata> {
  try {
    // fetchPublic refuses non-public hosts, including redirect targets.
    const response = await fetchPublic(
      url,
      {
        headers: { accept: "text/html", "user-agent": USER_AGENT },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
      fetcher,
    );

    const contentType = response.headers.get("content-type")?.toLowerCase();

    if (!response.ok || !contentType?.includes("text/html")) {
      return {};
    }

    const html = await readPrefix(response, MAX_BYTES);

    return parseMetadata(html, response.url || url);
  } catch {
    return {};
  }
}
