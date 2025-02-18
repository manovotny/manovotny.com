import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const geistMono = Geist_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
});
const geistSans = Geist({ display: "swap", preload: true, subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://manovotny.com"),
  title: { default: "Michael Novotny", template: "%s | Michael Novotny" },
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${geistMono.className} min-w-[360px]`}
    >
      <body className="bg-neutral-50 text-lg text-neutral-800 scheme-light dark:bg-neutral-900 dark:text-neutral-200 dark:scheme-dark">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col space-y-6 p-8 pt-0 md:pt-8">
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
