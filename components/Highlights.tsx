"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Highlights() {
  return (
    <section aria-labelledby="gemak-titel" className="relative bg-white pb-20 pt-4 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          {...reveal()}
          id="gemak-titel"
          className="font-heading max-w-3xl text-balance text-[30px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-5xl"
        >
          Makkelijk voor iedereen aan tafel
        </motion.h2>

        <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(300px,auto))_minmax(280px,auto)]">
          {/* Foto: samen spelen */}
          <motion.article
            {...reveal()}
            className="relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#0A0C0A] p-6 sm:p-9 md:col-span-2 lg:row-span-2 lg:min-h-0"
          >
            <Image
              src="/foto/samen-spelen.jpg"
              alt="Twee vrienden spelen allebei een spelletje op hun telefoon en lachen"
              fill
              sizes="(min-width: 1024px) 760px, (min-width: 768px) 100vw, 100vw"
              className="-z-10 object-cover object-[32%_40%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/35 to-black/0"
            />
            <h3 className="font-heading max-w-[18ch] text-[26px] font-extrabold leading-[1.05] text-white sm:text-4xl">
              Eerlijk spel, voor iedereen gelijk
            </h3>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-white/85 sm:text-lg">
              Iedereen speelt hetzelfde level en krijgt één poging. Wie het best
              speelt, betaalt het minst.
            </p>
          </motion.article>

          {/* Overzicht */}
          <motion.article
            {...reveal(0.05)}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#F3F6F4] p-6 sm:p-7"
          >
            <h3 className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
              Alles op één plek
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Zie in één oogopslag wat betaald is en op wie je nog wacht.
            </p>
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,12,10,0.05),0_18px_40px_-22px_rgba(0,70,35,0.35)] ring-1 ring-black/5">
              <Image
                src="/app/fragment-overzicht.webp"
                alt="Twee verzoeken in de app: Etentje wacht op de tegenstander, van Pizza-avond is 2 van de 3 betaald"
                width={1122}
                height={714}
                quality={90}
                sizes="(min-width: 1024px) 330px, (min-width: 768px) 45vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </motion.article>

          {/* Ontvanger ziet wie betaald heeft */}
          <motion.article
            {...reveal(0.1)}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#F3F6F4] p-6 sm:p-7"
          >
            <h3 className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
              Zie wie al betaald heeft
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Per vriend het bedrag en de status. Een herinnering sturen kan
              direct vanuit de app.
            </p>
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,12,10,0.05),0_18px_40px_-22px_rgba(0,70,35,0.35)] ring-1 ring-black/5">
              <Image
                src="/app/fragment-ontvanger.webp"
                alt="Ranglijst van een Groepscentje: Tim en Noor hebben betaald, Daan nog niet, Sanne is de ontvanger"
                width={1098}
                height={740}
                quality={90}
                sizes="(min-width: 1024px) 330px, (min-width: 768px) 45vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </motion.article>

          {/* Geen app nodig */}
          <motion.article
            {...reveal()}
            className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-[#00D26A] p-6 pb-0 sm:p-7 sm:pb-0"
          >
            <h3 className="font-heading max-w-[14ch] text-[26px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-3xl">
              Je vrienden hebben geen app nodig
            </h3>
            <p className="mt-3 max-w-[30ch] text-[15px] font-medium leading-relaxed text-[#0A0C0A]/80">
              Ze openen je link, spelen in de browser en betalen met iDEAL.
            </p>
            {/* In de flow in plaats van absoluut, zodat de munt nooit over de tekst valt. */}
            <Image
              src="/munt.webp"
              alt=""
              width={192}
              height={192}
              className="pointer-events-none -mb-10 -mr-8 mt-auto h-32 w-32 shrink-0 self-end rotate-[-14deg] pt-4 drop-shadow-[0_18px_30px_rgba(0,60,30,0.35)] sm:h-36 sm:w-36"
            />
          </motion.article>

          {/* Arcade */}
          <motion.article
            {...reveal(0.05)}
            className="relative isolate grid min-h-[280px] overflow-hidden rounded-[28px] bg-[#0A0C0A] p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-6 sm:p-9 md:grid-cols-1 lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.28),rgba(0,210,106,0))]"
            />
            <div>
              <h3 className="font-heading text-[26px] font-extrabold leading-[1.05] text-white sm:text-3xl">
                Oefen in de Arcade
              </h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/70 sm:text-base">
                Speel alle spellen gewoon voor de lol en word beter voordat het om
                de rekening gaat.
              </p>
            </div>
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:mt-0 sm:rotate-2 md:mt-6 lg:mt-0">
              <Image
                src="/app/fragment-arcade.webp"
                alt="Spellen in de Arcade van Centje"
                width={1110}
                height={705}
                quality={90}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
