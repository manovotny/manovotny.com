import { ImageResponse } from "next/og";
import { Logo } from "@/components/icons/logo-dot";

export const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.has("title")
      ? searchParams.get("title")
      : "Michael Novotny";

    return new ImageResponse(
      (
        <div tw="bg-neutral-50 text-neutral-800 flex h-full w-full flex-col p-8">
          <div tw="flex flex-row justify-between">
            <Logo size={48} />
            <p tw="m-0 p-0 text-5xl font-light">manovotny.com</p>
          </div>
          <p
            tw="text-center text-7xl font-bold m-auto"
            style={{ textWrap: "balance" }}
          >
            {title}
          </p>
        </div>
      ),
      {
        ...size,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
