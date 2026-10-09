"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
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
// Marge rond een stapgrens (in stappen), zodat de stap niet heen en weer springt als je er precies op stilstaat.
const HYSTERESIS = 0.04;

/** Stap bij een scrollvoortgang van 0 tot 1. */
const stepAt = (progress: number, count: number) => Math.min(count - 1, Math.max(0, Math.floor(progress * count)));

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
  const phone = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = flow.steps.length;
  const FlowIcon = flow.id === "groep" ? UsersThree : User;

  // 0 zodra het blok vaststaat, 1 op het moment dat het weer loslaat.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Het scrollen kiest de stap; de wissel zelf is een vaste overgang op tijd, los van het scrolltempo.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = v * count;
    setStep((prev) => (raw >= prev + 1 + HYSTERESIS || raw < prev - HYSTERESIS ? stepAt(v, count) : prev));
  });

  useEffect(() => {
    // Alle schermen alvast decoderen, zodat een stapwissel nooit een leeg scherm laat zien.
    phone.current?.querySelectorAll("img").forEach((img) => {
      const decode = () => img.decode().catch(() => {});
      if (img.complete) decode();
      else img.addEventListener("load", decode, { once: true });
    });
  }, []);

  useEffect(() => {
    // Wie halverwege de pagina binnenkomt (bv. terug van een andere pagina), ziet meteen de juiste stap.
    const frame = requestAnimationFrame(() => setStep(stepAt(scrollYProgress.get(), count)));
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
      <div className="sticky top-16 flex h-[calc(100svh_-_4rem)] items-center lg:top-[72px] lg:h-[calc(100svh_-_72px)]">
        <div className="grid w-full items-center gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Telefoon met de schermen van beide speelvormen boven elkaar */}
          <div
            ref={phone}
            className="relative mx-auto w-[min(220px,calc((100svh_-_19.5rem)_*_0.4615))] sm:w-[min(270px,calc((100svh_-_19rem)_*_0.4615))] lg:w-[min(300px,calc((100svh_-_9rem)_*_0.4615))]"
          >
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
                      // Alles laadt meteen (de eerste schermen met voorrang), zodat de telefoon nooit leeg is.
                      loading="eager"
                      fetchPriority={i === 0 ? "auto" : "low"}
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
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#007F45] lg:mb-4 lg:px-5">
              <FlowIcon weight="bold" className="h-4 w-4" aria-hidden />
              {flow.label}
            </p>

            {/* Mobiel en tablet: balkjes per stap met daaronder de huidige stap */}
            <div className="lg:hidden">
              {/* De balkjes zijn dun; het tikvlak eromheen is 46 px hoog (before:), zonder dat er iets verschuift. */}
              <div className="flex gap-1.5" role="group" aria-label="Stappen">
                {flow.steps.map((s, i) => (
                  <button
                    key={`${flow.id}-${s.title}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Stap ${i + 1}: ${s.title}`}
                    aria-current={i === step ? "step" : undefined}
                    className="group relative flex-1 py-2 focus-visible:outline-none before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']"
                  >
                    <span className="block h-1.5 overflow-hidden rounded-full bg-[#E3EAE6] ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-[#00D26A]">
                      <StepBar progress={scrollYProgress} index={i} count={count} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative mt-3 min-h-[8.5rem] sm:min-h-[7.5rem]">
                {/* Korte overgang zonder uitfaden: de nieuwe stap staat er meteen. */}
                <div key={`${flow.id}-${step}`} className="stap-in">
                  <p className="flex items-baseline gap-2.5">
                    <span className="text-sm font-bold tabular-nums text-[#007F45]">{step + 1}</span>
                    <span className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                      {current.title}
                    </span>
                  </p>
                  <p className="mt-1.5 text-base leading-[1.6] text-neutral-700">
                    {current.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop: alle stappen met vaste plek; alleen de actieve stap licht op, er verschuift niets. */}
            <ol className="hidden space-y-1 lg:block">
              {flow.steps.map((s, i) => {
                const active = i === step;
                return (
                  <li key={`${flow.id}-${s.title}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? "step" : undefined}
                      className="group relative flex w-full gap-4 rounded-2xl px-5 py-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-[#00D26A]/50"
                    >
                      <span
                        className={`w-4 shrink-0 pt-0.5 text-base font-bold tabular-nums transition-colors duration-300 ${
                          active ? "text-[#007F45]" : "text-neutral-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`font-heading block text-lg font-extrabold leading-snug transition-colors duration-300 ${
                            active ? "text-[#0A0C0A]" : "text-neutral-500 group-hover:text-neutral-700"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`mt-1 block text-base leading-[1.6] transition-colors duration-300 ${
                            active ? "text-neutral-600" : "text-neutral-500"
                          }`}
                        >
                          {s.text}
                        </span>
                      </span>
                      {active && (
                        <span
                          aria-hidden
                          className="absolute bottom-1 left-14 right-5 h-[2px] overflow-hidden rounded-full bg-[#E3EAE6]"
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
