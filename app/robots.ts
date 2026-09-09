import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Intern dashboard (rewrite naar het Dashboard-project): niet indexeren
      disallow: "/intern",
    },
    sitemap: "https://centje.app/sitemap.xml",
  };
}
