import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContentShell } from "@/components/content/ContentShell";
import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleCard } from "@/components/content/ArticleCard";
import { JsonLd } from "@/components/content/JsonLd";
import { ARTICLES, getArticle } from "@/components/content/articles";
import { formatDate, readingMinutes } from "@/components/content/articleMeta";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const base = pageMetadata({
    title: article.title,
    description: article.description,
    path: `/artikelen/${article.slug}`,
    image: { url: article.cover.src, alt: article.cover.alt },
    type: "article",
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
    },
  };
}

export default async function ArtikelPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.related
    .map((relatedSlug) => getArticle(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const url = `https://centje.app/artikelen/${article.slug}`;

  return (
    <ContentShell
      crumbs={[
        { label: "Artikelen", href: "/artikelen" },
        { label: article.title, href: `/artikelen/${article.slug}` },
      ]}
      title={article.title}
      intro={
        <>
          <p>{article.description}</p>
          <p className="mt-4 text-sm text-neutral-500 sm:text-base">
            {article.category} · {formatDate(article.updated ?? article.published)} · {readingMinutes(article)} min lezen
          </p>
        </>
      }
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          image: [`https://centje.app${article.cover.src}`],
          datePublished: article.published,
          dateModified: article.updated ?? article.published,
          inLanguage: "nl-NL",
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: "Team Centje", url: "https://centje.app" },
          publisher: { "@id": "https://centje.app/#organization" },
        }}
      />

      <article className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-[28px] bg-[#0A0C0A]">
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            style={{ objectPosition: article.cover.position ?? "50% 50%" }}
          />
        </div>

        <div className="mx-auto mt-10 max-w-[68ch] sm:mt-14">
          <ArticleBody blocks={article.blocks} />
          <p className="mt-12 border-t border-[#E3EAE6] pt-6 text-sm text-neutral-500">
            Geschreven door Team Centje.
          </p>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="lees-ook" className="border-t border-[#E3EAE6] bg-[#F3F6F4]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <h2 id="lees-ook" className="font-heading text-2xl font-extrabold text-[#0A0C0A] sm:text-3xl">
              Lees ook
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </ContentShell>
  );
}
