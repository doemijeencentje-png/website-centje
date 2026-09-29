import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContentShell } from "@/components/content/ContentShell";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ARTICLES } from "@/components/content/articles";

export const metadata: Metadata = pageMetadata({
  title: "Artikelen",
  description:
    "Tips en uitleg over rekeningen splitsen, geld terugvragen en spelen met Centje: van het percentage tot het Groepscentje.",
  path: "/artikelen",
});

export default function ArtikelenPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <ContentShell
      crumbs={[{ label: "Artikelen", href: "/artikelen" }]}
      title="Artikelen"
      intro="Tips en uitleg over rekeningen splitsen, geld terugvragen en slimmer spelen met Centje."
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {featured ? <ArticleCard article={featured} large /> : null}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </ContentShell>
  );
}
