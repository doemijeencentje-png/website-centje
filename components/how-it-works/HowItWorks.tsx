"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MODE_BY_HASH, MODE_EVENT } from "../site/inPage";
import { ModeSwitcher } from "./ModeSwitcher";
import { FlowStepper } from "./FlowStepper";
import { FLOWS, type FlowId } from "./flows";

export function HowItWorks() {
  const [mode, setMode] = useState<FlowId>("individueel");
  const flow = FLOWS.find((f) => f.id === mode) ?? FLOWS[0];

  // Menu-links (/#individueel, /#groepscentje) openen direct de juiste speelvorm.
  useEffect(() => {
    const fromHash = () => {
      const fromUrl = MODE_BY_HASH[window.location.hash.slice(1)];
      if (fromUrl) setMode(fromUrl);
    };
    const fromMenu = (event: Event) => setMode((event as CustomEvent<FlowId>).detail);
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(MODE_EVENT, fromMenu);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(MODE_EVENT, fromMenu);
    };
  }, []);

  return (
    <section
      id="stappen"
      aria-labelledby="stappen-titel"
      className="relative scroll-mt-16 overflow-x-clip pb-16 pt-12 sm:pb-24 sm:pt-16 lg:scroll-mt-[72px] lg:pb-28"
    >
      {/* Ankers voor het menu; ze wijzen naar het begin van deze sectie. */}
      <span id="individueel" aria-hidden className="absolute top-0 scroll-mt-16 lg:scroll-mt-[72px]" />
      <span id="groepscentje" aria-hidden className="absolute top-0 scroll-mt-16 lg:scroll-mt-[72px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2
            id="stappen-titel"
            className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-[56px]"
          >
            Hoe Centje werkt
          </h2>
        </div>

        <div className="mt-8 sm:mt-12">
          <ModeSwitcher mode={mode} onChange={setMode} />
        </div>

        {/* Op mobiel past de omschrijving niet in het paneel; daarom eronder. */}
        <div className="mt-4 min-h-[4.5rem] sm:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-base leading-[1.6] text-neutral-700"
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
