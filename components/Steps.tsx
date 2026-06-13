"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IPhoneFrame } from "./IPhoneFrame";
import { CentjeCard } from "./CentjeCard";

const STEPS = [
  {
    number: "01",
    title: "Maak een verzoek",
    description:
      "Start een betaalverzoek en kies tussen een individueel verzoek of een groepscentje.",
    image: "/steps/step-1.png",
  },
  {
    number: "02",
    title: "Stel je challenge in",
    description:
      "Vul het bedrag in en kies het percentage waarmee je wilt spelen. Hoe hoger het percentage, hoe minder je je maat verschuldigd bent als je wint!",
    image: "/steps/step-2.png",
  },
  {
    number: "03",
    title: "Kies je spel",
    description:
      "Selecteer een spel voor je challenge. Van Flappy Bird tot Sudoku — er is voor iedereen iets.",
    image: "/steps/step-3.png",
  },
  {
    number: "04",
    title: "Een speelse verdeling!",
    description:
      "Win het spel en betaal minder. Verlies? Dan betaal je iets meer. Zo simpel is het.",
    image: "/steps/step-4.png",
  },
  {
    number: "05",
    title: "Bekijk je verzoeken",
    description:
      "Houd al je betaalverzoeken bij op één plek. Betaald, openstaand of wachtend op je tegenstander.",
    image: "/steps/step-5.png",
  },
];

export function Steps() {
  return (
    <section id="stappen" className="py-14 sm:py-20 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20 md:mb-28"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black leading-tight">
            Hoe centje werkt
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-600 mt-3">
            In 5 stappen klaar
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-16 md:gap-24">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className={`flex items-center gap-4 sm:gap-8 md:gap-12 ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Text */}
                <div className="flex-1 text-left">
                  <CentjeCard>
                    <span className="text-2xl sm:text-4xl md:text-5xl font-black text-[#00D26A]/20 block leading-none mb-1.5">
                      {step.number}
                    </span>
                    <h3 className="text-base sm:text-xl md:text-2xl font-black text-neutral-900 tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-md leading-relaxed">
                      {step.description}
                    </p>
                  </CentjeCard>
                </div>

                {/* iPhone */}
                <div className="flex-shrink-0 w-[120px] sm:w-[175px] md:w-[200px]">
                  <IPhoneFrame>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover object-top"
                      sizes="200px"
                    />
                  </IPhoneFrame>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
