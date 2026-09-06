import { describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ dev: false }));
vi.mock("$env/dynamic/private", () => ({ env: {} }));
vi.mock("../../src/lib/bookmarks/link-check", () => ({ checkLink: vi.fn() }));
vi.mock("../../src/lib/bookmarks/db/queries", () => ({
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
