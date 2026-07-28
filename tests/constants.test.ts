import { describe, expect, it, vi } from "vitest";

// baseUrl is a module-level const, so each case needs a fresh module registry.
async function baseUrlWithPort(port?: string) {
  const original = {
    PORT: process.env.PORT,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  delete process.env.VERCEL_ENV; // keep the local branch deterministic in CI

  if (port === undefined) delete process.env.PORT;
  else process.env.PORT = port;

  try {
    vi.resetModules();

    return (await import("../src/lib/constants")).baseUrl;
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

describe("baseUrl", () => {
  it("uses the port the dev server was told to bind", async () => {
    expect(await baseUrlWithPort("52908")).toBe("http://localhost:52908");
  });

  it("falls back to Vite's default when PORT is unset", async () => {
    expect(await baseUrlWithPort()).toBe("http://localhost:5173");
  });

  // Regression: `??` kept an empty PORT and emitted "http://localhost:/notes".
  // scripts/ai/run.sh treats an empty PORT as absent, so this must too.
  it("falls back to Vite's default when PORT is empty", async () => {
    expect(await baseUrlWithPort("")).toBe("http://localhost:5173");
  });

  it("falls back to Vite's default when PORT can't name a port", async () => {
    // "0" is truthy but Vite won't serve it, and neither survives coercion.
    expect(await baseUrlWithPort("0")).toBe("http://localhost:5173");
    expect(await baseUrlWithPort("http://localhost")).toBe(
      "http://localhost:5173",
    );
  });
});
