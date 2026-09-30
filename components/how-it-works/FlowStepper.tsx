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
// Deel van elke stap waarin het volgende scherm binnenschuift; de rest van de stap staat het scherm stil.
const SLIDE = 0.35;
// Marge rond het omslagpunt, zodat de tekst niet heen en weer springt als je daar precies stilstaat.
const HYSTERESIS = 0.08;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Positie in de rij schermen (0 = eerste scherm) bij een scrollvoortgang van 0 tot 1. */
function slidePosition(progress: number, count: number) {
  const raw = Math.min(count, Math.max(0, progress * count));
  const index = Math.min(count - 1, Math.floor(raw));
  const within = raw - index;
  if (index >= count - 1 || within < 1 - SLIDE) return index;
  return index + easeInOut((within - (1 - SLIDE)) / SLIDE);
}

/**
 * Vulling van het balkje van een stap (0 tot 1). Een stap is actief vanaf het midden van het
 * inschuiven tot het midden van het volgende inschuiven; het balkje loopt precies over dat stuk.
 */
function barFill(progress: number, index: number, count: number) {
  const raw = progress * count;
  const start = index === 0 ? 0 : index - SLIDE / 2;
  const end = index === count - 1 ? count : index + 1 - SLIDE / 2;
  return Math.min(1, Math.max(0, (raw - start) / (end - start)));
}

// Balkje dat meeloopt met het scrollen binnen één stap.
function StepBar({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
  const fill = useTransform(progress, (v) => barFill(v, index, count));
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
  // De schermen schuiven mee met het scrollen, als één rij in de telefoon.
  const slideX = useTransform(scrollYProgress, (v) => `${-slidePosition(v, count) * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const position = slidePosition(v, count);
    setStep((prev) => (Math.abs(position - prev) >= 0.5 + HYSTERESIS ? Math.round(position) : prev));
  });

  useEffect(() => {
    // Alle schermen alvast decoderen, zodat er tijdens het schuiven nooit een leeg scherm te zien is.
    phone.current?.querySelectorAll("img").forEach((img) => {
      const decode = () => img.decode().catch(() => {});
      if (img.complete) decode();
      else img.addEventListener("load", decode, { once: true });
    });
  }, []);

  useEffect(() => {
    // Wie halverwege de pagina binnenkomt (bv. terug van een andere pagina), ziet meteen de juiste stap.
    const frame = requestAnimationFrame(() =>
      setStep(Math.round(slidePosition(scrollYProgress.get(), count))),
    );
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress, count]);

  // Een stap aanklikken scrolt naar het rustige deel van die stap, waar het scherm stilstaat.
  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const distance = el.offsetHeight - window.innerHeight;
    const middle = index === count - 1 ? index + 0.5 : index + (1 - SLIDE) / 2;
    window.scrollTo({
      top: top + distance * (middle / count),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const current = flow.steps[step];

  return (
    <div ref={track} className="relative" style={{ height: `calc(100svh + ${count * STEP_SCROLL_SVH}svh)` }}>
      <div className="sticky top-16 flex h-[calc(100svh_-_4rem)] items-center lg:top-[72px] lg:h-[calc(100svh_-_72px)]">
        <div className="grid w-full items-center gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Telefoon: per speelvorm een rij schermen die met het scrollen meeschuift */}
          <div
            ref={phone}
            className="relative mx-auto w-[min(220px,calc((100svh_-_18rem)_*_0.4615))] sm:w-[min(270px,calc((100svh_-_19rem)_*_0.4615))] lg:w-[min(300px,calc((100svh_-_9rem)_*_0.4615))]"
          >
            <div
              aria-hidden
              className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
            />
            <IPhoneFrame>
              {FLOWS.map((f) => {
                const active = f.id === flow.id;
                return (
                  <motion.div
                    key={f.id}
                    aria-hidden={!active}
                    className={`absolute inset-0 flex transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                    style={reduceMotion ? { transform: `translateX(${-step * 100}%)` } : { x: slideX }}
                  >
                    {f.steps.map((s, i) => (
                      <div key={s.image} className="relative h-full w-full shrink-0">
                        <Image
                          src={s.image}
                          alt={active && i === step ? s.alt : ""}
                          fill
                          quality={90}
                          // Alles laadt meteen (de eerste schermen met voorrang), zodat de telefoon nooit leeg is.
                          loading="eager"
                          fetchPriority={i === 0 ? "auto" : "low"}
                          sizes="(min-width: 1024px) 300px, (min-width: 640px) 270px, 220px"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </IPhoneFrame>
          </div>

          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#007F45] lg:mb-4 lg:px-5">
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
                {/* Korte overgang zonder uitfaden: de nieuwe stap staat er meteen. */}
                <div key={`${flow.id}-${step}`} className="stap-in">
                  <p className="flex items-baseline gap-2.5">
                    <span className="text-sm font-bold tabular-nums text-[#007F45]">{step + 1}</span>
                    <span className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                      {current.title}
                    </span>
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600 sm:text-base">
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
                      className={`relative flex w-full gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00D26A]/50 ${
                        active
                          ? "bg-white shadow-[0_1px_2px_rgba(10,12,10,0.06),0_14px_40px_-18px_rgba(0,90,45,0.35)] ring-1 ring-[#E3EFE7]"
                          : "hover:bg-white/60"
                      }`}
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
                            active ? "text-[#0A0C0A]" : "text-neutral-500"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`mt-1 block text-[15px] leading-relaxed transition-colors duration-300 ${
                            active ? "text-neutral-600" : "text-neutral-500"
                          }`}
                        >
                          {s.text}
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
