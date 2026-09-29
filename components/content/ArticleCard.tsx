import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Article } from "./articleTypes";
import { formatDate, readingMinutes } from "./articleMeta";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article
      className={`group relative flex overflow-hidden rounded-[28px] bg-white ring-1 ring-[#E3EAE6] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,70,35,0.45)] ${
        large ? "flex-col md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "flex-col"
      }`}
    >
      <div className={`relative overflow-hidden bg-[#0A0C0A] ${large ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]"}`}>
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          fill
          sizes={large ? "(min-width: 768px) 620px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: article.cover.position ?? "50% 50%" }}
        />
      </div>
      <div className={`flex flex-1 flex-col ${large ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}>
        <p className="text-sm font-semibold text-[#007F45]">{article.category}</p>
        <h3
          className={`font-heading mt-2 text-balance font-extrabold leading-[1.1] text-[#0A0C0A] ${
            large ? "text-[26px] sm:text-4xl" : "text-xl sm:text-[22px]"
          }`}
        >
          <Link href={`/artikelen/${article.slug}`} className="outline-none after:absolute after:inset-0 focus-visible:underline">
            {article.title}
          </Link>
        </h3>
        <p className={`mt-3 leading-relaxed text-neutral-600 ${large ? "text-base sm:text-lg" : "text-[15px]"}`}>
          {article.description}
        </p>
        <p className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm text-neutral-500">
          <span>
            {formatDate(article.updated ?? article.published)} · {readingMinutes(article)} min lezen
          </span>
          <ArrowRight
            weight="bold"
            aria-hidden
            className="h-4 w-4 text-[#007F45] transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </div>
    </article>
  );
}
