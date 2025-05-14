import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";
import { baseUrl } from "@/lib/environment";

const geistMono = Geist_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
});
const geistSans = Geist({ display: "swap", preload: true, subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Michael Novotny", template: "%s | Michael Novotny" },
  description:
    "Software developer, stock trader, coffee enthusiast. Currently leading Content at Vercel.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/icon-light.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/icon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  openGraph: {
    images: `/api/og-image`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${geistMono.className} min-w-[360px]`}
    >
      <body className="bg-neutral-50 text-lg text-neutral-800 scheme-light-dark dark:bg-black dark:text-neutral-200">
        <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col space-y-6 p-8 pt-0 md:pt-8">
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
