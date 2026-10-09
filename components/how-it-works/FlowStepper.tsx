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

// Stippen op het podium: groen, zacht, hele pixels (trilt niet bij het scrollen).
const STAGE_DOTS = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,210,106,0.22) 1.25px, transparent 1.75px), radial-gradient(circle, rgba(0,210,106,0.22) 1.25px, transparent 1.75px)",
  backgroundSize: "14px 24px",
  backgroundPosition: "0 0, 7px 12px",
  maskImage: "radial-gradient(70% 90% at 35% 50%, #000 0%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(70% 90% at 35% 50%, #000 0%, transparent 100%)",
} as const;

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
      <div className="sticky top-16 flex h-[calc(100svh_-_4rem)] items-center py-2 lg:top-[72px] lg:h-[calc(100svh_-_72px)] lg:py-5">
        {/* Het podium: donkergroen vlak met gloed en stippen, zodat de stappen eruit springen. */}
        <div className="relative isolate flex h-full w-full items-center overflow-hidden rounded-[28px] bg-[#07130C] px-4 py-4 text-white sm:rounded-[40px] sm:px-10 sm:py-8 lg:px-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={STAGE_DOTS} />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-48 top-1/2 -z-10 h-[760px] w-[760px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
          />

          <div className="grid w-full items-center gap-4 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* Telefoon met de schermen van beide speelvormen boven elkaar, op een gloeiende sokkel */}
            <div
              ref={phone}
              className="relative isolate mx-auto w-[min(220px,calc((100svh_-_22rem)_*_0.4615))] sm:w-[min(270px,calc((100svh_-_22rem)_*_0.4615))] lg:w-[min(300px,calc((100svh_-_11rem)_*_0.4615))]"
            >
              <div
                aria-hidden
                className="gloed absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.5),rgba(0,210,106,0))] blur-2xl"
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
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#00D26A] lg:mb-5 lg:px-5">
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
                      <span className="block h-1.5 overflow-hidden rounded-full bg-white/20 ring-offset-2 ring-offset-[#07130C] group-focus-visible:ring-2 group-focus-visible:ring-[#00D26A]">
                        <StepBar progress={scrollYProgress} index={i} count={count} />
                      </span>
                    </button>
                  ))}
                </div>
                <div className="relative mt-3 min-h-[8.5rem] sm:min-h-[7.5rem]">
                  {/* Korte overgang zonder uitfaden: de nieuwe stap staat er meteen. */}
                  <div key={`${flow.id}-${step}`} className="stap-in">
                    <p className="flex items-center gap-3">
                      <span className="font-heading flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00D26A] text-base font-extrabold text-[#0A0C0A]">
                        {step + 1}
                      </span>
                      <span className="font-heading text-xl font-extrabold leading-tight text-white sm:text-2xl">
                        {current.title}
                      </span>
                    </p>
                    <p className="mt-2 text-base leading-[1.55] text-white/70">{current.text}</p>
                  </div>
                </div>
              </div>

              {/* Desktop: alle stappen met vaste plek; de actieve stap wordt een witte kaart, er verschuift niets. */}
              <ol className="hidden space-y-2 lg:block">
                {flow.steps.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={`${flow.id}-${s.title}`}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? "step" : undefined}
                        className={`group relative flex w-full gap-5 overflow-hidden rounded-[22px] px-5 py-4 text-left outline-none transition-[background-color,box-shadow] duration-500 focus-visible:ring-4 focus-visible:ring-[#00D26A]/60 ${
                          active
                            ? "bg-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]"
                            : "hover:bg-white/[0.06]"
                        }`}
                      >
                        <span
                          className={`font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-extrabold transition-colors duration-500 ${
                            active ? "bg-[#00D26A] text-[#0A0C0A]" : "bg-white/10 text-white/70"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`font-heading block text-xl font-extrabold leading-snug transition-colors duration-500 ${
                              active ? "text-[#0A0C0A]" : "text-white/85"
                            }`}
                          >
                            {s.title}
                          </span>
                          <span
                            className={`mt-1 block text-base leading-[1.55] transition-colors duration-500 ${
                              active ? "text-neutral-600" : "text-white/50"
                            }`}
                          >
                            {s.text}
                          </span>
                        </span>
                        {active && (
                          <span
                            aria-hidden
                            className="absolute bottom-0 left-5 right-5 h-[3px] overflow-hidden rounded-full bg-black/10"
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
    </div>
  );
}
