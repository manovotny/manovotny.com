import type { Metadata } from "next";

type PageData = {
  date?: string;
  description: string;
  slug: string;
  title: string;
};

export function createMetadata(data: PageData): Metadata {
  return {
    ...data,
    alternates: {
      canonical: `/${data.slug}`,
    },
    openGraph: {
      images: `/api/og-image?title=${encodeURIComponent(data.title)}`,
    },
  };
}
