"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { IPhoneFrame } from "../IPhoneFrame";
import { FLOWS, type Flow } from "./flows";

const STEP_MS = 6000;

export function FlowStepper({ flow }: { flow: Flow }) {
  const [step, setStep] = useState(0);
  const [shownFlow, setShownFlow] = useState(flow.id);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  // Na een eigen keuze van de bezoeker loopt het niet meer vanzelf door
  // (ook op touch, waar pauzeren door erboven te hangen niet bestaat).
  const [chosen, setChosen] = useState(false);
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  // Bij een andere speelvorm opnieuw bij stap 1 beginnen.
  if (shownFlow !== flow.id) {
    setShownFlow(flow.id);
    setStep(0);
    setChosen(false);
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoplay = !reduceMotion && inView && !held && !chosen;
  const goNext = () => setStep((s) => (s + 1) % flow.steps.length);

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
    >
      {/* Telefoon met de schermen van beide speelvormen boven elkaar */}
      <div className="relative mx-auto w-[236px] sm:w-[270px] lg:w-[300px]">
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
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 270px, 236px"
                  className={`object-cover object-top transition-[opacity,scale] duration-500 ease-out ${
                    visible ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
                  }`}
                />
              );
            }),
          )}
        </IPhoneFrame>
      </div>

      <ol className="mx-auto w-full max-w-xl space-y-2 lg:mx-0">
        {flow.steps.map((s, i) => {
          const active = i === step;
          return (
            <li key={`${flow.id}-${s.title}`}>
              <button
                type="button"
                onClick={() => {
                  setStep(i);
                  setChosen(true);
                }}
                aria-current={active ? "step" : undefined}
                className={`relative w-full overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00D26A]/50 sm:px-5 sm:py-4 ${
                  active
                    ? "bg-white shadow-[0_1px_2px_rgba(10,12,10,0.06),0_14px_40px_-18px_rgba(0,90,45,0.35)] ring-1 ring-[#E3EFE7]"
                    : "hover:bg-white/70"
                }`}
              >
                <span className="flex items-start gap-3.5 sm:gap-4">
                  <span
                    className={`mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums transition-colors duration-300 sm:h-8 sm:w-8 ${
                      active ? "bg-[#00D26A] text-[#0A0C0A]" : "bg-[#EAEFEC] text-neutral-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`font-heading block text-[17px] font-extrabold leading-snug transition-colors duration-300 sm:text-xl ${
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
                        <span className="block pt-1.5 text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                          {s.text}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>

                {active && !chosen && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-0 h-[3px] overflow-hidden rounded-full bg-[#EAEFEC] motion-reduce:hidden sm:inset-x-5"
                  >
                    <span
                      key={`${flow.id}-${i}`}
                      className="step-progress block h-full rounded-full bg-[#00D26A]"
                      style={
                        {
                          "--step-duration": `${STEP_MS}ms`,
                          animationPlayState: autoplay ? "running" : "paused",
                        } as React.CSSProperties
                      }
                      onAnimationEnd={goNext}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
