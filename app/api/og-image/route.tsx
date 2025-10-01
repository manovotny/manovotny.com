import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import { Logo } from "@/components/logo";
import { siteDomain, siteName } from "@/lib/constants";

export const contentType = "image/jpg";

export async function GET(request: Request) {
  try {
    const domain = siteDomain;
    const { searchParams } = new URL(request.url);
    const title = searchParams.has("title")
      ? searchParams.get("title") || siteName
      : siteName;
    const geistSansBold = await readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf",
      ),
    );
    const geistSansThin = await readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans/Geist-Thin.ttf",
      ),
    );

    return new ImageResponse(
      <div tw="bg-neutral-50 text-neutral-800 flex h-full w-full flex-col p-8">
        <div tw="flex flex-row justify-between">
          <Logo size={48} />
          <p tw="m-0 p-0 text-5xl font-thin">{domain}</p>
        </div>
        <p
          style={{
            textWrap: "balance",
          }}
          tw="text-center text-7xl m-auto font-bold"
        >
          {title}
        </p>
      </div>,
      {
        fonts: [
          {
            data: geistSansThin,
            name: "Geist",
            style: "normal",
            weight: 100,
          },
          {
            data: geistSansBold,
            name: "Geist",
            style: "normal",
            weight: 700,
          },
        ],
        height: 630,
        width: 1200,
      },
    );
  } catch (error: unknown) {
    const errorMessage = "Failed to generate og image";

    console.log(
      `${errorMessage}: ${error instanceof Error ? error.message : error}`,
    );

    return new Response(errorMessage, {
      status: 500,
    });
  }
}
