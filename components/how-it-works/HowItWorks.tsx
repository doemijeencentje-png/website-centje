"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeSwitcher } from "./ModeSwitcher";
import { FlowStepper } from "./FlowStepper";
import { FLOWS, type FlowId } from "./flows";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HowItWorks() {
  const [mode, setMode] = useState<FlowId>("individueel");
  const flow = FLOWS.find((f) => f.id === mode) ?? FLOWS[0];

  return (
    <section
      id="stappen"
      aria-labelledby="stappen-titel"
      className="relative scroll-mt-16 pb-16 pt-14 sm:scroll-mt-20 sm:pb-24 sm:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <h2
            id="stappen-titel"
            className="font-heading text-[34px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-5xl lg:text-6xl"
          >
            Hoe Centje werkt
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-xl">
            Kies hoe je speelt: samen met één vriend, of met de hele groep tegelijk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="mt-8 sm:mt-12"
        >
          <ModeSwitcher mode={mode} onChange={setMode} />
        </motion.div>

        {/* Op mobiel past de omschrijving niet in het paneel; daarom eronder. */}
        <div className="mt-4 min-h-[4.5rem] sm:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[15px] leading-relaxed text-neutral-600"
            >
              {flow.summary}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          id="stappen-flow"
          role="tabpanel"
          aria-labelledby={`tab-${mode}`}
          className="mt-8 sm:mt-16 lg:mt-20"
        >
          <FlowStepper flow={flow} />
        </div>
      </div>
    </section>
  );
}
