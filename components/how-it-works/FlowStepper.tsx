"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { User, UsersThree } from "@phosphor-icons/react";
import { IPhoneFrame } from "../IPhoneFrame";
import { MODE_EVENT } from "../site/inPage";
import { FLOWS, type Flow, type FlowId } from "./flows";

// Scrollafstand per stap terwijl het blok vaststaat, in svh.
const STEP_SCROLL_SVH = 65;
// Marge rond een stapgrens (in stappen), zodat de stap niet heen en weer springt als je er precies op stilstaat.
const HYSTERESIS = 0.04;

// Lage laptopschermen (1280x720, 1366x768): de klassen met [@media(max-height:820px)] maken alles iets compacter.

/** Stap bij een scrollvoortgang van 0 tot 1. */
const stepAt = (progress: number, count: number) => Math.min(count - 1, Math.max(0, Math.floor(progress * count)));

export function FlowStepper({ flow }: { flow: Flow }) {
  const track = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = flow.steps.length;

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

  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const steps = useRef<HTMLDivElement>(null);
  const flyPhone = useRef<HTMLDivElement>(null);
  const shownFlow = useRef(flow.id);

  // Andere speelvorm gekozen: de telefoon komt rustig van links binnen, de stappen van rechts.
  // Alleen bij een wissel (een klik of menu-link), nooit gekoppeld aan het scrollen.
  useEffect(() => {
    if (shownFlow.current === flow.id) return;
    shownFlow.current = flow.id;
    if (reduceMotion) return;
    // Gelijkmatig op gang en gelijkmatig tot stilstand, zodat de beweging over de hele tijd te zien is.
    const ease = [0.45, 0, 0.25, 1] as const;
    const runs = [
      flyPhone.current &&
        animate(flyPhone.current, { opacity: [0, 1], x: [-48, 0], rotate: [-3, 0] }, { duration: 1.4, ease }),
      steps.current && animate(steps.current, { opacity: [0, 1], x: [32, 0] }, { duration: 1.2, ease, delay: 0.15 }),
    ];
    return () => runs.forEach((run) => run?.stop());
  }, [flow.id, reduceMotion]);

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const last = FLOWS.length - 1;
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? last : event.key === "ArrowRight" ? (index + 1) % FLOWS.length : (index + last) % FLOWS.length;
    choose(FLOWS[next].id);
    tabs.current[next]?.focus();
  };

  // Speelvorm wisselen vanuit het podium zelf; HowItWorks luistert naar dit event.
  const choose = (id: FlowId) => {
    if (id !== flow.id) window.dispatchEvent(new CustomEvent<FlowId>(MODE_EVENT, { detail: id }));
    goTo(0);
  };

  const current = flow.steps[step];

  return (
    <div ref={track} className="relative" style={{ height: `calc(100svh + ${count * STEP_SCROLL_SVH}svh)` }}>
      <div className="sticky top-16 flex h-[calc(100svh_-_4rem)] py-2 lg:top-[72px] lg:h-[calc(100svh_-_72px)] lg:items-center lg:py-5">
        {/* Het podium: een wit venster zoals "Nieuw verzoek" erboven en in de app, met groene knoppen. */}
        <div
          className={`relative isolate flex h-full w-full flex-col overflow-hidden rounded-[32px] bg-white px-4 pt-4 text-[#0A0C0A] shadow-[0_2px_6px_rgba(10,12,10,0.05),0_30px_70px_-30px_rgba(0,90,45,0.35)] ring-1 ring-black/5 sm:rounded-[40px] sm:px-10 sm:pt-8 lg:flex-row lg:items-center lg:gap-16 lg:px-14 lg:py-8 [@media(max-height:820px)]:lg:py-6`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-[4%] top-1/2 -z-10 h-[760px] w-[760px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.14),rgba(0,210,106,0))]"
          />

          {/* Tekst: op mobiel bovenaan, op desktop rechts van de telefoon */}
          <div className="mx-auto w-full max-w-xl shrink-0 lg:order-2 lg:mx-0 lg:min-w-0 lg:flex-1">
            {/* De keuze uit het venster "Nieuw verzoek" van de app: twee uitgerekte ronde knoppen. */}
            <div
              role="tablist"
              aria-label="Kies hoe je speelt"
              className="mb-5 grid grid-cols-2 gap-2 sm:gap-3 lg:mb-6 [@media(max-height:820px)]:lg:mb-4"
            >
              {FLOWS.map((f, index) => {
                const Icon = f.id === "groep" ? UsersThree : User;
                const on = f.id === flow.id;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      tabs.current[index] = el;
                    }}
                    id={`tab-${f.id}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="stappen-flow"
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(f.id)}
                    onKeyDown={(event) => onTabKey(event, index)}
                    className={`flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-[14px] font-semibold outline-none transition-[background-color,color,box-shadow,transform] duration-300 focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98] sm:h-14 sm:text-base lg:h-[60px] lg:text-lg [@media(max-height:820px)]:lg:h-12 [@media(max-height:820px)]:lg:text-base ${
                      on
                        ? "bg-[linear-gradient(90deg,#00B84D_0%,#12C65C_55%,#2ECF70_100%)] text-white shadow-[0_14px_28px_-14px_rgba(0,150,65,0.75)]"
                        : "bg-white text-[#00A852] ring-2 ring-inset ring-[#00C853]/35 hover:bg-[#F0FBF4]"
                    }`}
                  >
                    <Icon weight="bold" className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden />
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Bij een wissel van speelvorm vliegen de stappen en de telefoon opnieuw binnen. */}
            <div ref={steps}>
            {/* Mobiel en tablet: balkjes per stap (gedaan en huidig groen) met daaronder de huidige stap */}
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
                    <span
                      className={`block h-1.5 rounded-full ring-offset-2 ring-offset-white transition-colors duration-500 group-focus-visible:ring-2 group-focus-visible:ring-[#00D26A] ${
                        i <= step ? "bg-[#00C853]" : "bg-[#E3EAE6]"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="relative mt-3 min-h-[8rem] sm:min-h-[7rem]">
                {/* Korte overgang zonder uitfaden: de nieuwe stap staat er meteen. */}
                <div key={`${flow.id}-${step}`} className="stap-in">
                  <p className="flex items-center gap-3">
                    <span className="font-heading flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(90deg,#00B84D_0%,#12C65C_55%,#2ECF70_100%)] text-base font-extrabold text-white">
                      {step + 1}
                    </span>
                    <span className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                      {current.title}
                    </span>
                  </p>
                  <p className="mt-2 text-base leading-[1.55] text-neutral-600">{current.text}</p>
                </div>
              </div>
            </div>

            {/* Desktop: alle stappen met vaste plek; de actieve stap wordt een witte kaart, er verschuift niets. */}
            <ol className={`hidden space-y-2 lg:block [@media(max-height:820px)]:space-y-0.5`}>
              {flow.steps.map((s, i) => {
                const active = i === step;
                return (
                  <li key={`${flow.id}-${s.title}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? "step" : undefined}
                      className={`group relative flex w-full gap-5 rounded-[22px] px-5 py-4 text-left outline-none transition-[background-color,box-shadow] duration-500 focus-visible:ring-4 focus-visible:ring-[#00D26A]/60 [@media(max-height:820px)]:py-2.5 ${
                        active ? "bg-[#F0FBF4] ring-2 ring-inset ring-[#00C853]/35" : "hover:bg-[#F6FAF7]"
                      }`}
                    >
                      <span
                        className={`font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-extrabold transition-colors duration-500 ${
                          active ? "bg-[linear-gradient(90deg,#00B84D_0%,#12C65C_55%,#2ECF70_100%)] text-white shadow-[0_8px_18px_-8px_rgba(0,150,65,0.7)]" : "bg-[#EEF3F0] text-neutral-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`font-heading block text-xl font-extrabold leading-snug transition-colors duration-500 ${
                            active ? "text-[#0A0C0A]" : "text-neutral-700"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`mt-1 block text-base leading-[1.55] transition-colors duration-500 [@media(max-height:820px)]:text-[14px] [@media(max-height:820px)]:leading-[1.4] ${
                            active ? "text-neutral-600" : "text-neutral-500"
                          }`}
                        >
                          {s.text}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            </div>
          </div>

          {/* Telefoon: op mobiel onderaan, hij loopt onder de ronde rand door (zo blijft hij groot genoeg om te lezen);
              op desktop links, met een ademende gloed. */}
          <div className="relative mt-4 min-h-0 flex-1 overflow-y-clip sm:mt-6 lg:order-1 lg:mt-0 lg:flex-none lg:overflow-visible">
            <div ref={flyPhone}>
            <div
              ref={phone}
              className="relative isolate mx-auto w-[220px] sm:w-[280px] lg:w-[min(320px,calc((100svh_-_11rem)_*_0.4615))]"
            >
              <div
                aria-hidden
                className="gloed absolute -inset-12 -z-10 hidden rounded-full lg:block bg-[radial-gradient(closest-side,rgba(0,210,106,0.28),rgba(0,210,106,0))] blur-2xl"
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
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 220px"
                        className={`object-cover object-top transition-[opacity,scale] duration-500 ease-out ${
                          visible ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
                        }`}
                      />
                    );
                  }),
                )}
              </IPhoneFrame>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
