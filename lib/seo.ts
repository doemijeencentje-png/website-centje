import type { Metadata } from "next";

const SITE = "https://centje.app";
const DEFAULT_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Centje, de app die betaalverzoeken leuker maakt" };

/**
 * Volledige metadata voor een losse pagina. Next.js vervangt openGraph en twitter
 * van de layout in hun geheel; zonder deze helper verdwijnt de deelafbeelding.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
}): Metadata {
  const images = image ? [image] : [DEFAULT_IMAGE];
  const fullTitle = `${title} | Centje`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: `${SITE}${path}`,
      siteName: "Centje",
      locale: "nl_NL",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
    },
  };
}
