import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });

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
      <html lang="en" className={geistSans.className}>
        <body className="tracking-tight antialiased">
          <div className="flex min-h-screen flex-col justify-between bg-white p-8 pt-0 text-gray-900 md:pt-8">
            <main className="mx-auto w-full max-w-[60ch] space-y-6">
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
      <div className="flex justify-center gap-8">
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
