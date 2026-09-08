import { checkLink } from "../../src/lib/bookmarks/link-check";
import { describe, expect, it, vi } from "vitest";

describe("checkLink", () => {
  it("returns the HEAD status when the server answers", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(new Response("", { status: 200 }));

    expect(
      await checkLink(
        "https://example.com",
        fetcher as unknown as typeof fetch,
      ),
    ).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0]?.[1]).toMatchObject({ method: "HEAD" });
  });

  it("falls back to GET when HEAD is rejected with 405", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(new Response("", { status: 405 }))
      .mockResolvedValueOnce(new Response("", { status: 404 }));

    expect(
      await checkLink(
        "https://example.com",
        fetcher as unknown as typeof fetch,
      ),
    ).toBe(404);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[1]?.[1]).toMatchObject({ method: "GET" });
  });

  it("falls back to GET when HEAD throws, and returns 0 only when GET fails too", async () => {
    const headThrows = vi
      .fn()
      .mockRejectedValueOnce(new Error("reset"))
      .mockResolvedValueOnce(new Response("", { status: 200 }));

    expect(
      await checkLink(
        "https://example.com",
        headThrows as unknown as typeof fetch,
      ),
    ).toBe(200);

    const bothThrow = vi.fn(async () => {
      throw new Error("timeout");
    });

    expect(
      await checkLink(
        "https://example.com",
        bothThrow as unknown as typeof fetch,
      ),
    ).toBe(0);
  });

  it("returns 0 without fetching non-public hosts", async () => {
    const fetcher = vi.fn();

    expect(
      await checkLink("http://10.0.0.1/", fetcher as unknown as typeof fetch),
    ).toBe(0);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("follows public redirects to the final status", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        new Response("", {
          headers: { location: "https://example.com/moved" },
          status: 301,
        }),
      )
      .mockResolvedValueOnce(new Response("", { status: 404 }));

    expect(
      await checkLink(
        "https://example.com",
        fetcher as unknown as typeof fetch,
      ),
    ).toBe(404);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("treats a redirect to a non-public host as unreachable", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response("", {
        headers: { location: "http://127.0.0.1/" },
        status: 302,
      }),
    );

    expect(
      await checkLink(
        "https://example.com",
        fetcher as unknown as typeof fetch,
      ),
    ).toBe(0);
    // HEAD refused at the redirect, then GET refused at the redirect.
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
