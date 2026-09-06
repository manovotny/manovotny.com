const TRACKING_PARAMS = new Set([
  "fbclid",
  "gclid",
  "igshid",
  "mc_cid",
  "mc_eid",
  "ref_src",
  "ref_url",
]);

// x.com share links carry `?s=20&t=<token>`; both are noise.
const X_PARAMS = new Set(["s", "t"]);

export class InvalidUrlError extends Error {
  constructor(input: string) {
    super(`Invalid URL: ${input}`);
    this.name = "InvalidUrlError";
  }
}

export type NormalizedUrl = {
  domain: string;
  normalizedUrl: string;
  url: string;
};

function isTrackingParam(key: string, isX: boolean): boolean {
  return (
    key.startsWith("utm_") ||
    TRACKING_PARAMS.has(key) ||
    (isX && X_PARAMS.has(key))
  );
}

function canonicalHost(hostname: string): string {
  const host = hostname.toLowerCase().replace(/^www\./, "");

  return host === "twitter.com" ? "x.com" : host;
}

export function normalizeUrl(input: string): NormalizedUrl {
  let parsed: URL;

  try {
    parsed = new URL(input.trim());
  } catch {
    throw new InvalidUrlError(input);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new InvalidUrlError(input);
  }

  if (parsed.username || parsed.password) {
    throw new InvalidUrlError(input);
  }

  const domain = canonicalHost(parsed.hostname);
  const isX = domain === "x.com";
  const params = [...parsed.searchParams.entries()].filter(
    ([key]) => !isTrackingParam(key, isX),
  );

  // `url`: what the user saved, minus tracking noise. Opened by the UI.
  // Only rebuilt when a tracking param was actually stripped — otherwise the
  // original query string is kept verbatim (e.g. `%20` is not re-encoded).
  const cleaned = new URL(parsed.href);
  if (params.length !== parsed.searchParams.size) {
    cleaned.search = "";
    for (const [key, value] of params) {
      cleaned.searchParams.append(key, value);
    }
  }

  // `normalizedUrl`: dupe identity. Aggressively canonical.
  // `URL` already drops default ports (80/443); non-default ports stay.
  const normalized = new URL(cleaned.href);
  normalized.hash = "";
  normalized.protocol = "https:";
  normalized.hostname = domain;
  normalized.search = "";
  for (const [key, value] of [...params].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    normalized.searchParams.append(key, value);
  }
  if (normalized.pathname !== "/" && normalized.pathname.endsWith("/")) {
    normalized.pathname = normalized.pathname.slice(0, -1);
  }

  return { domain, normalizedUrl: normalized.href, url: cleaned.href };
}

const PRIVATE_IPV4 = [
  /^0\./,
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,
];

// Outbound-fetch guard against SSRF: only public hosts over http(s), no
// credentials. Cheap literal checks — DNS resolution is deliberately not done.
export function isPublicHttpUrl(input: string): boolean {
  let parsed: URL;

  try {
    parsed = new URL(input);
  } catch {
    return false;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }

  if (parsed.username || parsed.password) {
    return false;
  }

  const host = parsed.hostname.toLowerCase();

  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return false;
  }

  if (host.startsWith("[")) {
    const ipv6 = host.slice(1, -1);

    // fc00::/7 unique-local, fe80::/10 link-local (fe8, fe9, fea, feb).
    return !(
      ipv6 === "::1" ||
      ipv6 === "::" ||
      ipv6.startsWith("fc") ||
      ipv6.startsWith("fd") ||
      /^fe[89ab]/.test(ipv6) ||
      ipv6.startsWith("::ffff:")
    );
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return !PRIVATE_IPV4.some((range) => range.test(host));
  }

  return true;
}
