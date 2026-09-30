"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { GroenKader } from "../GroenKader";
import { FaqList } from "./FaqList";
import type { FaqCategory } from "./faq";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Alle vragen per onderwerp, met snel zoeken en een onderwerpenbalk. */
export function FaqExplorer({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = normalize(deferred.trim());
    if (!q) return categories;
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          normalize(`${item.question} ${item.answer.join(" ")}`).includes(q),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, deferred]);

  const total = filtered.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label htmlFor="faq-zoek" className="text-sm font-semibold text-[#0A0C0A]">
          Zoek een vraag
        </label>
        <div className="relative mt-2">
          <MagnifyingGlass
            aria-hidden
            weight="bold"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          />
          <input
            id="faq-zoek"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bijvoorbeeld: iDEAL"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-[#D5DED9] bg-white pl-11 pr-11 text-[15px] text-[#0A0C0A] outline-none transition-shadow placeholder:text-neutral-500 focus:border-[#00A855] focus:ring-4 focus:ring-[#00D26A]/25 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Zoekopdracht wissen"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X weight="bold" className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <p aria-live="polite" className="mt-2 min-h-5 text-sm text-neutral-500">
          {deferred.trim() ? (total === 1 ? "1 vraag gevonden" : `${total} vragen gevonden`) : ""}
        </p>

        <nav aria-label="Onderwerpen" className="mt-4 hidden lg:block">
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="block rounded-xl px-3 py-2 text-[15px] font-medium text-neutral-600 transition-colors hover:bg-white hover:text-[#0A0C0A]"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="mt-8 space-y-12 lg:mt-0">
        {filtered.map((category) => (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-titel`} className="scroll-mt-24 sm:scroll-mt-28">
            <h2
              id={`${category.id}-titel`}
              className="font-heading mb-5 text-2xl font-extrabold leading-tight text-[#0A0C0A] sm:text-3xl"
            >
              {category.title}
            </h2>
            <GroenKader padding="px-6 py-2 sm:px-8 sm:py-3">
              <FaqList key={`${category.id}-${deferred}`} items={category.items} />
            </GroenKader>
          </section>
        ))}
        {filtered.length === 0 ? (
          <GroenKader padding="p-8">
            <div className="text-center">
              <p className="font-heading text-xl font-extrabold text-[#0A0C0A]">Geen vraag gevonden</p>
              <p className="mt-2 text-neutral-600">
                Probeer een ander woord, bijvoorbeeld &lsquo;Groepscentje&rsquo;, &lsquo;spel&rsquo; of &lsquo;betalen&rsquo;.
              </p>
            </div>
          </GroenKader>
        ) : null}
      </div>
    </div>
  );
}
