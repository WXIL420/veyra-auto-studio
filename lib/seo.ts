import type { Metadata } from "next";

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Veyra Auto Studio — Precision in every reflection.",
  };
  const full = `${title} | Veyra Auto Studio`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Veyra Auto Studio",
      locale: "en_US",
      title: full,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}
