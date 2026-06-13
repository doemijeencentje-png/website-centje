"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="over-ons"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        {/* Tekstkolom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <span className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#009652]">
            Ons verhaal
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-[1] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Hoe het begon
          </h2>
          <div className="mt-7 h-1 w-14 rounded-full bg-[#00D26A]" />

          <div className="mt-8 max-w-[620px] space-y-5 text-lg leading-relaxed text-neutral-600 sm:text-xl">
            <p>
              Het begon op een terras. De rekening kwam en daar was het weer:{" "}
              <b className="text-neutral-900">wie betaalt wat?</b>
            </p>
            <p>
              Waarom moet zoiets altijd zo droog en zakelijk zijn? Het gaat om
              vrienden. Dat mag ook een beetje{" "}
              <b className="text-[#00D26A]">leuk</b> zijn.
            </p>
            <p>
              Dus gaven we betaalverzoeken een{" "}
              <b className="text-[#00D26A]">sociale twist</b>: je stuurt een
              challenge in plaats van een kaal verzoek. Win je het spelletje, dan
              betaal je minder.
            </p>
            <p>
              Geen saaie fintech. Gewoon geld terugvragen — maar dan{" "}
              <b className="text-neutral-900">leuker</b>.
            </p>
          </div>

          <div className="mt-10 text-base italic text-neutral-400">
            — Team Centje, 2025
          </div>
        </motion.div>

        {/* Echte Centje-logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 flex flex-col items-center gap-7 md:order-2"
        >
          <div className="relative h-48 w-48 overflow-hidden rounded-[42px] shadow-[0_30px_70px_-25px_rgba(0,168,85,0.45)] sm:h-60 sm:w-60">
            <Image
              src="/og-image.png"
              alt="Centje logo"
              fill
              className="object-cover"
              sizes="240px"
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            CENTJE
          </span>
        </motion.div>
      </div>
    </section>
  );
}
