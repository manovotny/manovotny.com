import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
    <ViewTransitions>
      <html lang="en">
        <body className="text-lg bg-neutral-50 text-neutral-900 scheme-light dark:bg-black dark:text-neutral-300 dark:scheme-dark">
          <div className="p-8 pt-0 md:pt-8 flex min-h-screen flex-col justify-between">
            <main className="max-w-3xl space-y-6 mx-auto w-full">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
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
      <div className="gap-8 flex justify-center">
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
