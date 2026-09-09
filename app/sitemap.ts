import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://centje.app";
  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
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
