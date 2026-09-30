import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { FaqList } from "./content/FaqList";
import { FAQ_HOME } from "./content/faq";

export function FaqTeaser() {
  return (
    <section
      id="vragen"
      aria-labelledby="vragen-titel"
      className="relative scroll-mt-16 bg-white py-16 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="vragen-titel"
            className="font-heading text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
          >
            Goed om te weten
          </h2>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">
            De vragen die we het vaakst krijgen, kort beantwoord.
          </p>
          <Link
            href="/veelgestelde-vragen"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0C0A] px-6 text-[15px] font-semibold text-white outline-none transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
          >
            Alle vragen
            <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div>
          <FaqList items={FAQ_HOME} />
        </div>
      </div>
    </section>
  );
}
