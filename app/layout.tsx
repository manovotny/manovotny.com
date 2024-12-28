import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
});
const geistSans = Geist({
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manovotny.com"),
  title: {
    default: "Michael Novotny",
    template: "%s | Michael Novotny",
  },
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${geistMono.className} min-w-80`}
    >
      <body className="bg-neutral-50 text-lg text-neutral-800 scheme-light dark:bg-neutral-900 dark:text-white dark:scheme-dark">
        <div className="flex min-h-screen flex-col justify-between p-8 pt-0 md:pt-8">
          <main className="mx-auto w-full max-w-3xl space-y-6">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: "X", url: "https://x.com/manovotny" },
    { name: "LinkedIn", url: "https://linkedin.com/in/manovotny" },
    { name: "GitHub", url: "https://github.com/manovotny" },
  ];

  return (
    <footer className="mt-12">
      <div className="flex justify-center gap-10">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
