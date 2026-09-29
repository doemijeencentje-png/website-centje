"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function AboutSection() {
  return (
    <section
      id="over-ons"
      aria-labelledby="verhaal-titel"
      className="relative scroll-mt-16 bg-white pb-20 pt-4 sm:scroll-mt-20 sm:pb-28 sm:pt-8 lg:pb-36"
    >
      <div className="mx-auto grid max-w-6xl items-center px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <motion.div {...enter()} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#0A0C0A] sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/foto/rekening.jpg"
              alt="Vrienden aan tafel op een terras aan de gracht. Eén van hen slaat de handen voor zijn hoofd terwijl de rest lacht."
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <Image
            src="/munt.webp"
            alt=""
            width={192}
            height={192}
            className="pointer-events-none absolute -left-3 -top-6 h-20 w-20 -rotate-12 drop-shadow-[0_16px_28px_rgba(0,60,30,0.35)] sm:-left-5 sm:h-24 sm:w-24"
          />
        </motion.div>

        <motion.div
          {...enter(0.1)}
          className="relative mx-3 -mt-20 rounded-[28px] bg-white p-6 shadow-[0_2px_4px_rgba(10,12,10,0.04),0_30px_80px_-30px_rgba(0,70,35,0.35)] ring-1 ring-black/5 sm:mx-10 sm:-mt-28 sm:p-10 lg:mx-0 lg:-ml-16 lg:mt-0 lg:p-12"
        >
          {/* Kleine groene tekst op wit in #007F45: merkgroen #00D26A haalt daar maar 2:1 contrast. */}
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#007F45] sm:text-sm">
            Ons verhaal
          </span>
          <h2
            id="verhaal-titel"
            className="font-heading mt-3 text-[34px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-5xl"
          >
            Hoe het begon
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-600 sm:mt-7 sm:text-lg">
            <p>
              Het begon op een terras. De rekening kwam en daar was het weer: wie
              betaalt wat?
            </p>
            <p>
              Waarom moet zoiets altijd zo droog en zakelijk zijn? Het gaat om
              vrienden. Dat mag ook een beetje leuk zijn.
            </p>
            <p>
              Dus gaven we betaalverzoeken een{" "}
              <strong className="font-semibold text-[#007F45]">sociale twist</strong>: je
              stuurt een challenge in plaats van een kaal verzoek. Win je het
              spelletje, dan betaal je minder.
            </p>
          </div>

          <figure className="mt-7 border-l-4 border-[#00D26A] pl-5 sm:mt-9 sm:pl-6">
            <blockquote className="font-heading text-[22px] font-extrabold leading-[1.15] text-[#0A0C0A] sm:text-[28px]">
              Geen saaie fintech. Gewoon geld terugvragen, maar dan leuker.
            </blockquote>
            <figcaption className="mt-3 text-sm text-neutral-500">Team Centje, 2025</figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
