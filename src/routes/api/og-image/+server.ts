import { ImageResponse } from "@vercel/og";
import type { RequestHandler } from "./$types";

import { read } from "$app/server";
import { siteDomain, siteName } from "$lib/constants";
import { logoPaths } from "$lib/logo-paths";
import plexMono from "$lib/server/fonts/IBMPlexMono-Regular.ttf";
import monaSansSemibold from "$lib/server/fonts/MonaSans-SemiBold.woff";

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
    const [semibold, mono] = await Promise.all([
      read(monaSansSemibold).arrayBuffer(),
      read(plexMono).arrayBuffer(),
    ]);

    const card = h(
      "div",
      {
        style: { fontFamily: "Mona Sans" },
        tw: "bg-white text-[#131316] flex h-full w-full flex-col p-16",
      },
      h(
        "div",
        { tw: "flex flex-row items-center justify-between" },
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
        h(
          "p",
          {
            style: { fontFamily: "IBM Plex Mono", letterSpacing: "0.08em" },
            tw: "m-0 p-0 text-[26px] uppercase text-[#70707b]",
          },
          siteDomain,
        ),
      ),
      h(
        "p",
        {
          style: { letterSpacing: "-0.02em", textWrap: "balance" },
          tw: "text-center text-7xl m-auto font-semibold",
        },
        title,
      ),
    );

    return new ImageResponse(card as never, {
      fonts: [
        { data: mono, name: "IBM Plex Mono", style: "normal", weight: 400 },
        { data: semibold, name: "Mona Sans", style: "normal", weight: 600 },
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
