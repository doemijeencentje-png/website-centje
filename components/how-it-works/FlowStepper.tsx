"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { User, UsersThree } from "@phosphor-icons/react";
import { IPhoneFrame } from "../IPhoneFrame";
import { FLOWS, type Flow } from "./flows";

// Scrollafstand per stap terwijl het blok vaststaat, in svh.
const STEP_SCROLL_SVH = 65;

// Balkje dat meeloopt met het scrollen binnen één stap (0 tot 1).
function StepBar({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * count - index)));
  return (
    <motion.span
      className="block h-full origin-left rounded-full bg-[#00D26A]"
      style={{ scaleX: fill }}
    />
  );
}

export function FlowStepper({ flow }: { flow: Flow }) {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = flow.steps.length;
  const FlowIcon = flow.id === "groep" ? UsersThree : User;

  // 0 zodra het blok vaststaat, 1 op het moment dat het weer loslaat.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStep(Math.min(count - 1, Math.max(0, Math.floor(v * count)))),
  );
  useEffect(() => {
    // Wie halverwege de pagina binnenkomt (bv. terug van een andere pagina), ziet meteen de juiste stap.
    const frame = requestAnimationFrame(() =>
      setStep(Math.min(count - 1, Math.max(0, Math.floor(scrollYProgress.get() * count)))),
    );
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress, count]);

  // Een stap aanklikken scrolt naar het midden van die stap, zodat scrollpositie en stap gelijk blijven.
  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + distance * ((index + 0.5) / count),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const current = flow.steps[step];

  return (
    <div ref={track} className="relative" style={{ height: `calc(100svh + ${count * STEP_SCROLL_SVH}svh)` }}>
      <div className="sticky top-16 flex h-[calc(100svh_-_4rem)] items-center sm:top-20 sm:h-[calc(100svh_-_5rem)]">
        <div className="grid w-full items-center gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Telefoon met de schermen van beide speelvormen boven elkaar */}
          <div className="relative mx-auto w-[min(220px,calc((100svh_-_18rem)_*_0.4615))] sm:w-[min(270px,calc((100svh_-_19rem)_*_0.4615))] lg:w-[min(300px,calc((100svh_-_9rem)_*_0.4615))]">
            <div
              aria-hidden
              className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
            />
            <IPhoneFrame>
              {FLOWS.flatMap((f) =>
                f.steps.map((s, i) => {
                  const visible = f.id === flow.id && i === step;
                  return (
                    <Image
                      key={s.image}
                      src={s.image}
                      alt={visible ? s.alt : ""}
                      aria-hidden={!visible}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 270px, 220px"
                      className={`object-cover object-top transition-[opacity,scale] duration-500 ease-out ${
                        visible ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
                      }`}
                    />
                  );
                }),
              )}
            </IPhoneFrame>
          </div>

          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#007F45] lg:mb-5 lg:px-5">
              <FlowIcon weight="bold" className="h-4 w-4" aria-hidden />
              {flow.label}
            </p>

            {/* Mobiel en tablet: balkjes per stap met daaronder de huidige stap */}
            <div className="lg:hidden">
              <div className="flex gap-1.5" role="group" aria-label="Stappen">
                {flow.steps.map((s, i) => (
                  <button
                    key={`${flow.id}-${s.title}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Stap ${i + 1}: ${s.title}`}
                    aria-current={i === step ? "step" : undefined}
                    className="group flex-1 py-2 focus-visible:outline-none"
                  >
                    <span className="block h-1.5 overflow-hidden rounded-full bg-[#E3EAE6] ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-[#00D26A]">
                      <StepBar progress={scrollYProgress} index={i} count={count} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative mt-3 min-h-[8.5rem] sm:min-h-[7.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${flow.id}-${step}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <p className="flex items-baseline gap-2.5">
                      <span className="text-sm font-bold tabular-nums text-[#007F45]">{step + 1}</span>
                      <span className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                        {current.title}
                      </span>
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                      {current.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop: alle stappen onder elkaar */}
            <ol className="hidden space-y-2 lg:block">
              {flow.steps.map((s, i) => {
                const active = i === step;
                return (
                  <li key={`${flow.id}-${s.title}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? "step" : undefined}
                      className={`relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00D26A]/50 ${
                        active
                          ? "bg-white shadow-[0_1px_2px_rgba(10,12,10,0.06),0_14px_40px_-18px_rgba(0,90,45,0.35)] ring-1 ring-[#E3EFE7]"
                          : "hover:bg-white/70"
                      }`}
                    >
                      <span className="flex items-start gap-4">
                        <span
                          className={`mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums transition-colors duration-300 ${
                            active ? "bg-[#00D26A] text-[#0A0C0A]" : "bg-[#EAEFEC] text-neutral-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`font-heading block text-xl font-extrabold leading-snug transition-colors duration-300 ${
                              active ? "text-[#0A0C0A]" : "text-neutral-500"
                            }`}
                          >
                            {s.title}
                          </span>
                          <span
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <span className="overflow-hidden">
                              <span className="block pt-1.5 text-base leading-relaxed text-neutral-600">
                                {s.text}
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-[#EAEFEC]"
                        >
                          <StepBar progress={scrollYProgress} index={i} count={count} />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
