"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bank, BellRinging, CalendarCheck, IdentificationCard } from "@phosphor-icons/react";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Alle punten komen uit de veelgestelde vragen (gecontroleerd tegen app en voorwaarden).
const POINTS = [
  {
    icon: Bank,
    title: "Met iDEAL",
    text: "Je rondt elke betaling af in de vertrouwde omgeving van je eigen bank.",
  },
  {
    icon: IdentificationCard,
    title: "Geverifieerde ontvangers",
    text: "Wie geld ontvangt, is geverifieerd. Zo weet onze betaalpartner altijd wie er achter een account zit.",
  },
  {
    icon: CalendarCheck,
    title: "Snel op je rekening",
    text: "Na een betaling gaat het geld naar je gekoppelde rekening, vaak al de eerstvolgende werkdag.",
  },
  {
    icon: BellRinging,
    title: "Altijd overzicht",
    text: "Je krijgt een melding zodra iemand betaald heeft, en je ziet per persoon wie nog moet betalen.",
  },
];

export function SafetySection() {
  return (
    <section
      id="veilig"
      aria-labelledby="veilig-titel"
      className="relative scroll-mt-16 bg-white pb-20 pt-4 sm:pb-28 sm:pt-8 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <motion.div {...reveal()}>
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[30px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl lg:max-w-[16ch]"
          >
            Veilig betalen, gewoon via je bank
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
            De betalingen lopen via Online Payment Platform, een betaalinstelling met een vergunning
            van De Nederlandsche Bank.
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#E7F8EE] text-[#007F45]">
                  <Icon weight="bold" aria-hidden className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-[#0A0C0A] sm:text-[17px]">{title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-neutral-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          {...reveal(0.1)}
          aria-labelledby="kosten-titel"
          id="kosten"
          className="relative isolate flex scroll-mt-24 flex-col overflow-hidden rounded-[28px] bg-[#0A0C0A] p-7 text-white sm:p-10 lg:self-start"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.3),rgba(0,210,106,0))]"
          />
          <Image
            src="/merk/munt.webp"
            alt=""
            width={256}
            height={256}
            sizes="128px"
            className="pointer-events-none absolute right-6 top-6 h-20 w-20 rotate-12 drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)] sm:right-8 sm:top-8 sm:h-28 sm:w-28"
          />
          <h3 id="kosten-titel" className="text-base font-semibold text-white/70">
            Wat kost Centje?
          </h3>
          <p className="font-heading mt-5 text-[72px] font-extrabold leading-none text-[#00D26A] sm:text-[96px]">
            €&nbsp;1
          </p>
          <p className="mt-3 text-lg font-semibold text-white">Eenmalig, voor je verificatie</p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base">
            Downloaden is gratis. Bij het aanmaken van je account betaal je eenmalig €&nbsp;1 met
            iDEAL, vanaf de rekening waarop je je geld wilt ontvangen. Zo bevestig je dat die rekening
            echt van jou is.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70 sm:text-base">
            Wat je bij een verzoek afrekent, zie je altijd vooraf in de app.
          </p>
          <Link
            href="/veelgestelde-vragen#account-en-veiligheid"
            className="group mt-8 inline-flex items-center gap-2 self-start rounded-full text-[15px] font-semibold text-[#00D26A] outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0C0A]"
          >
            Meer over verificatie
            <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
