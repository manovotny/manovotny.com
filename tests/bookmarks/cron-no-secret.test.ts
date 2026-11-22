import { describe, expect, it, vi } from "vitest";

vi.mock("$app/env", () => ({ dev: false }));
// The `has` trap lets the module read an unset CRON_SECRET without tripping
// vitest's missing-export check on the mocked module.
vi.mock("$app/env/private", () => new Proxy({}, { has: () => true }));
vi.mock("../../src/lib/bookmarks/link-check", () => ({ checkLink: vi.fn() }));
vi.mock("../../src/lib/bookmarks/queries", () => ({
  listStaleLinks: vi.fn(),
  recordLinkCheck: vi.fn(),
}));

const { GET } =
  await import("../../src/routes/(bookmarks)/api/bookmarks/cron/check-links/+server");

describe("check-links cron without a configured secret", () => {
  it("fails closed even for 'Bearer undefined'", async () => {
    const response = await GET({
      request: new Request("http://localhost/x", {
        headers: { authorization: "Bearer undefined" },
      }),
    } as never);

    expect(response.status).toBe(401);
  });
});
