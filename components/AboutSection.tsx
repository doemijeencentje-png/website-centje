"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="over-ons"
      className="about-fullpage relative flex h-[100dvh] flex-col overflow-hidden scroll-mt-16 sm:h-auto sm:min-h-0 sm:scroll-mt-20 sm:py-28 md:py-36"
    >
      <div className="about-fullpage-main mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:flex-none sm:justify-start sm:px-6">
        <div className="grid grid-cols-1 items-center gap-4 py-4 sm:grid-cols-[1.4fr_1fr] sm:gap-8 sm:py-0 md:grid-cols-2 md:gap-16">
          {/* Tekstkolom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="order-1"
          >
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#009652] sm:text-sm">
              Ons verhaal
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:mt-4 sm:text-5xl md:text-6xl">
              Hoe het begon
            </h2>
            <div className="mt-3 h-1 w-10 rounded-full bg-[#00D26A] sm:mt-7 sm:w-14" />

            <div className="mt-4 max-w-[620px] space-y-3 text-[15px] leading-relaxed text-neutral-600 sm:mt-8 sm:space-y-5 sm:text-xl">
              <p>
                Het begon op een terras. De rekening kwam en daar was het weer:
                wie betaalt wat?
              </p>
              <p>
                Waarom moet zoiets altijd zo droog en zakelijk zijn? Het gaat om
                vrienden. Dat mag ook een beetje leuk zijn.
              </p>
              <p>
                Dus gaven we betaalverzoeken een{" "}
                <b className="text-[#00D26A]">sociale twist</b>: je stuurt een
                challenge in plaats van een kaal verzoek. Win je het spelletje,
                dan betaal je minder.
              </p>
              <p>
                Geen saaie fintech. Gewoon geld terugvragen, maar dan leuker.
              </p>
            </div>

            {/* Mobiel: logo naast Team Centje */}
            <div className="mt-5 flex items-center justify-between gap-4 sm:hidden">
              <p className="text-sm italic text-neutral-400">Team Centje, 2025</p>
              <div className="relative aspect-[2172/724] w-[110px] shrink-0">
                <Image
                  src="/centje-logo.png"
                  alt="Centje logo"
                  fill
                  className="object-contain object-right"
                  sizes="110px"
                />
              </div>
            </div>

            {/* Desktop: alleen handtekening */}
            <div className="mt-3 hidden text-base italic text-neutral-400 sm:mt-10 sm:block">
              Team Centje, 2025
            </div>
          </motion.div>

          {/* Desktop: logo rechts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 hidden items-center justify-center sm:flex"
          >
            <div className="relative aspect-[2172/724] w-full">
              <Image
                src="/centje-logo.png"
                alt="Centje logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 45vw, 500px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
