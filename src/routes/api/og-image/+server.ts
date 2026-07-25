import { ImageResponse } from "@vercel/og";
import type { RequestHandler } from "./$types";

import { read } from "$app/server";
import { siteDomain, siteName } from "$lib/constants";
import { logoPaths } from "$lib/logo-paths";
import geistBold from "$lib/server/fonts/Geist-Bold.ttf";
import geistThin from "$lib/server/fonts/Geist-Thin.ttf";

export const prerender = false;

type Element = {
  type: string;
  props: Record<string, unknown> & { children?: unknown };
};

const h = (
  type: string,
  props: Record<string, unknown>,
  ...children: unknown[]
): Element => ({
  props: { ...props, children: children.length === 1 ? children[0] : children },
  type,
});

export const GET: RequestHandler = async ({ url }) => {
  try {
    const title = url.searchParams.get("title") || siteName;
    const [bold, thin] = await Promise.all([
      read(geistBold).arrayBuffer(),
      read(geistThin).arrayBuffer(),
    ]);

    const card = h(
      "div",
      { tw: "bg-neutral-50 text-neutral-800 flex h-full w-full flex-col p-8" },
      h(
        "div",
        { tw: "flex flex-row justify-between" },
        h(
          "svg",
          {
            fill: "currentColor",
            height: 48,
            viewBox: "0 0 512 512",
            width: 48,
            xmlns: "http://www.w3.org/2000/svg",
          },
          ...logoPaths.map((d) => h("path", { d })),
        ),
        h("p", { tw: "m-0 p-0 text-5xl font-thin" }, siteDomain),
      ),
      h(
        "p",
        {
          style: { textWrap: "balance" },
          tw: "text-center text-7xl m-auto font-bold",
        },
        title,
      ),
    );

    return new ImageResponse(card as never, {
      fonts: [
        { data: thin, name: "Geist", style: "normal", weight: 100 },
        { data: bold, name: "Geist", style: "normal", weight: 700 },
      ],
      height: 630,
      width: 1200,
    });
  } catch (error: unknown) {
    const errorMessage = "Failed to generate og image";

    console.log(
      `${errorMessage}: ${error instanceof Error ? error.message : error}`,
    );

    return new Response(errorMessage, { status: 500 });
  }
};
