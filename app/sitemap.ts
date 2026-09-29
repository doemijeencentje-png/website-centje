import type { MetadataRoute } from "next";
import { ARTICLES } from "@/components/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://centje.app";
  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/veelgestelde-vragen`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/adverteren`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/artikelen`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...ARTICLES.map((article) => ({
      url: `${base}/artikelen/${article.slug}`,
      lastModified: article.updated ?? article.published,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: `${base}/voorwaarden`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/voorwaarden/app`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/voorwaarden/betalingen`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
