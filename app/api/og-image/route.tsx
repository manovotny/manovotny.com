import { ImageResponse } from "next/og";
import { Logo } from "@/components/icons/logo";

// https://developers.google.com/fonts/docs/css2
async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const fontUrl = resource[1];
    const response = await fetch(fontUrl);

    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font data: ${font}@${weight}`);
}

export async function GET(request: Request) {
  try {
    const domain = "manovotny.com";
    const { searchParams } = new URL(request.url);
    const title = searchParams.has("title")
      ? searchParams.get("title") || "Michael Novotny"
      : "Michael Novotny";

    return new ImageResponse(
      (
        <div tw="bg-neutral-50 text-neutral-800 flex font-['Geist'] h-full w-full flex-col p-8">
          <div tw="flex flex-row justify-between">
            <Logo size={48} />
            <p tw="m-0 p-0 text-5xl font-thin">{domain}</p>
          </div>
          <p
            tw="text-center text-7xl m-auto font-bold"
            style={{
              textWrap: "balance",
            }}
          >
            {title}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // https://fonts.google.com/specimen/Geist
        fonts: [
          {
            name: "Geist",
            data: await loadGoogleFont("Geist", 100, domain),
            style: "normal",
            weight: 100,
          },
          {
            name: "Geist",
            data: await loadGoogleFont("Geist", 700, title),
            style: "normal",
            weight: 700,
          },
        ],
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
