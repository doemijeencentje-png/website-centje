"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { FaqList } from "./content/FaqList";
import { FAQ_HOME } from "./content/faq";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqTeaser() {
  return (
    <section
      id="vragen"
      aria-labelledby="vragen-titel"
      className="relative scroll-mt-16 border-t border-[#E3EAE6] bg-[#F3F6F4] py-16 sm:scroll-mt-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <h2
            id="vragen-titel"
            className="font-heading text-[34px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
          >
            Goed om te weten
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
            De vragen die we het vaakst krijgen, kort beantwoord.
          </p>
          <Link
            href="/veelgestelde-vragen"
            className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0C0A] px-6 text-[15px] font-semibold text-white outline-none transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
          >
            Alle vragen
            <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        >
          <FaqList items={FAQ_HOME} />
        </motion.div>
      </div>
    </section>
  );
}
