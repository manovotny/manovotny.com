import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { baseUrl } from "@/lib/environment";
import { siteName, siteDescription, username } from "@/lib/constants";
import "./globals.css";

const geistMono = Geist_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
});
const geistSans = Geist({ display: "swap", preload: true, subsets: ["latin"] });

export const metadata: Metadata = {
  description: siteDescription,
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      type: "image/png",
      url: "/icon-light.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      rel: "icon",
      type: "image/png",
      url: "/icon-dark.png",
    },
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    description: siteDescription,
    images: "/api/og-image",
    locale: "en_US",
    siteName,
    title: siteName,
    type: "website",
    url: baseUrl,
  },
  title: { default: siteName, template: `%s • ${siteName}` },
  twitter: {
    card: "summary_large_image",
    creator: `@${username}`,
    creatorId: "14803093",
    description: siteDescription,
    images: `/api/og-image`,
    title: siteName,
    site: `@${username}`,
    siteId: "14803093",
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
