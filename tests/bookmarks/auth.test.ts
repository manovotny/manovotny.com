import {
  hasBearerToken,
  isOwner,
  viewerRole,
} from "../../src/lib/bookmarks/auth";
import { describe, expect, it } from "vitest";

function requestWith(authorization?: string): Request {
  return new Request("https://example.com", {
    headers: authorization ? { authorization } : {},
  });
}

describe("hasBearerToken", () => {
  it("accepts the exact bearer token", () => {
    expect(hasBearerToken(requestWith("Bearer secret-1"), "secret-1")).toBe(
      true,
    );
  });

  it("rejects missing, malformed, wrong, and prefix-matching tokens", () => {
    expect(hasBearerToken(requestWith(), "secret-1")).toBe(false);
    expect(hasBearerToken(requestWith("secret-1"), "secret-1")).toBe(false);
    expect(hasBearerToken(requestWith("Bearer nope"), "secret-1")).toBe(false);
    expect(hasBearerToken(requestWith("Bearer secret-1x"), "secret-1")).toBe(
      false,
    );
  });

  it("rejects everything when no token is configured", () => {
    expect(hasBearerToken(requestWith("Bearer "), "")).toBe(false);
    expect(hasBearerToken(requestWith("Bearer x"), undefined)).toBe(false);
  });
});

describe("isOwner", () => {
  it("is true only for the configured owner", () => {
    expect(isOwner("user_1", "user_1")).toBe(true);
    expect(isOwner("user_2", "user_1")).toBe(false);
    expect(isOwner(null, "user_1")).toBe(false);
    expect(isOwner("user_1", undefined)).toBe(false);
    expect(isOwner("", "")).toBe(false);
  });
});

describe("viewerRole", () => {
  it("classifies anonymous, owner, and stranger", () => {
    expect(viewerRole(null, "user_1")).toBe("anonymous");
    expect(viewerRole(undefined, "user_1")).toBe("anonymous");
    expect(viewerRole("user_1", "user_1")).toBe("owner");
    expect(viewerRole("user_2", "user_1")).toBe("stranger");
    expect(viewerRole("user_1", undefined)).toBe("stranger");
  });
});
