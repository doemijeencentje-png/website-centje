"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { followLink } from "./site/inPage";
import { IPhoneFrame } from "./IPhoneFrame";
import { DotField } from "./DotField";
import { FLOWS } from "./how-it-works/flows";

// De poster is dit moment uit de video; de video begint daar, zodat er niets verspringt.
const POSTER_TIME = 2.2;
const VIDEO_SRC = "/hero/munt-intro.mp4";
// Zo lang blijft elke stap van de demo staan.
const SLIDE_MS = 3400;
const STEPS = FLOWS[0].steps;

type NetworkInfo = { saveData?: boolean };

/** De muntanimatie: poster meteen, video pas als de pagina klaar is; stil buiten beeld. */
function CoinVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = video.current;
    if (!el || reduceMotion) return;
    // Met databesparing aan blijft het bij de poster.
    if ((navigator as Navigator & { connection?: NetworkInfo }).connection?.saveData) return;

    let inView = true;
    // Geen loop: de video eindigt stil op het logo, in plaats van elke zeven seconden naar zwart te knippen.
    const play = () => {
      if (inView && !el.ended) el.play().catch(() => {});
    };
    const onMetadata = () => {
      if (el.currentTime < POSTER_TIME) el.currentTime = POSTER_TIME;
      play();
    };
    // Pas laden als de pagina zelf klaar is: de poster staat er al en is het eerste beeld.
    const load = () => {
      el.muted = true;
      el.addEventListener("loadedmetadata", onMetadata, { once: true });
      el.src = VIDEO_SRC;
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });

    // Buiten beeld stilzetten; dat scheelt stroom en rekenwerk verderop op de pagina.
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!el.src) return;
      if (inView) play();
      else el.pause();
    });
    observer.observe(el);

    return () => {
      window.removeEventListener("load", load);
      el.removeEventListener("loadedmetadata", onMetadata);
      observer.disconnect();
      el.pause();
    };
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[24px] bg-black ring-1 ring-white/10 lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:w-auto lg:max-w-none lg:rounded-none lg:border-l lg:border-white/10 lg:ring-0">
      {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
      <Image
        src="/hero/munt-intro-poster.webp"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={90}
        sizes="(min-width: 1024px) 44vw, (min-width: 640px) 460px, 100vw"
        className="object-cover"
      />
      <video
        ref={video}
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
      />
      {/* Zachte overgang onderaan, die de vloerreflectie van de video verbergt. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(to_top,#050605_0%,rgba(5,6,5,0.55)_45%,transparent_100%)]"
      />
    </div>
  );
}

type Demo = { index: number; run: number; moving: boolean; show: (i: number) => void };

/** Stand van de demo: welke stap, en of hij loopt (alleen in beeld en zonder "minder beweging"). */
function useDemo(target: React.RefObject<HTMLElement | null>): Demo {
  const [index, setIndex] = useState(0);
  // Telt mee bij elke klik, zodat het streepje ook bij dezelfde stap opnieuw begint.
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const moving = inView && !reduceMotion;

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % STEPS.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [moving, index, run]);

  const show = (i: number) => {
    setIndex(i);
    setRun((r) => r + 1);
  };

  return { index, run, moving, show };
}

/** Kaartje met de stap: vijf streepjes die per stap vollopen (klikbaar) en de naam van de stap. */
function StepCard({ demo, className = "" }: { demo: Demo; className?: string }) {
  const { index, run, moving, show } = demo;
  return (
    <div
      className={`rounded-[20px] bg-white p-5 text-[#0A0C0A] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] ring-1 ring-black/5 ${className}`}
    >
      <div className="flex gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => show(i)}
            aria-label={`Stap ${i + 1}: ${s.title}`}
            aria-current={i === index ? "step" : undefined}
            className="group relative flex-1 py-2 outline-none before:absolute before:inset-x-0 before:-inset-y-2 before:content-['']"
          >
            <span className="block h-1.5 overflow-hidden rounded-full bg-[#E3EAE6] ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-[#00D26A]">
              {i < index || (i === index && !moving) ? (
                <span className="block h-full w-full bg-[#00D26A]" />
              ) : i === index ? (
                <span
                  key={`${index}-${run}`}
                  className="vul block h-full w-full bg-[#00D26A]"
                  style={{ "--duur": `${SLIDE_MS}ms` } as React.CSSProperties}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <p key={index} className="stap-in mt-3 flex min-h-[3.25rem] items-center gap-3">
        <span className="font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00D26A] text-base font-extrabold">
          {index + 1}
        </span>
        <span className="font-heading text-lg font-extrabold leading-[1.15]">{STEPS[index].title}</span>
      </p>
    </div>
  );
}

/** De telefoon met het scherm van de huidige stap; de vijf schermen wisselen met een korte overgang. */
function DemoPhone({ index }: { index: number }) {
  return (
    <IPhoneFrame>
      {STEPS.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          fill
          quality={90}
          // Lazy: op telefoon en tablet staat de telefoon verborgen en worden deze schermen niet geladen.
          loading="lazy"
          sizes="210px"
          className={`object-cover object-top transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </IPhoneFrame>
  );
}

export default function HeroSection() {
  const box = useRef<HTMLDivElement>(null);
  const demo = useDemo(box);

  return (
    <section id="hero" data-kop="donker" aria-labelledby="hero-titel">
      {/* Bovenin zwart, ook achter de kopbalk; daarin het grote vak met ronde hoeken. */}
      <div className="bg-[#050605] px-3 pb-3 pt-[76px] sm:px-4 sm:pb-4 sm:pt-20 lg:px-3 lg:pb-3 lg:pt-[84px]">
        <div
          ref={box}
          className="relative isolate overflow-hidden rounded-[28px] bg-[#0B110E] text-white ring-1 ring-white/10 lg:grid lg:min-h-[calc(100svh_-_96px)] lg:grid-cols-[minmax(0,1fr)_44%] lg:rounded-[36px]"
        >
          {/* Stippenraster; met de muis erover kleuren de stippen groen en schuift er een lichtvlek mee. */}
          <DotField dark glowAlpha={0.22} reveal={220} glow={720} />

          {/* Links de tekst, op één lijn met het logo in de kopbalk, met in de hoek eronder de stappen:
              een schuine telefoon die uit de onderrand opduikt. */}
          <div className="flex min-w-0 flex-col px-5 pt-5 sm:px-8 sm:pt-8 lg:py-14 lg:pl-14 lg:pr-10 xl:pl-[max(3.5rem,calc((100vw_-_1104px)/2_-_12px))] [@media(max-height:820px)]:lg:py-10">
            <h1
              id="hero-titel"
              className="font-heading text-balance text-[38px] font-extrabold leading-[1.02] min-[380px]:text-[44px] sm:text-[60px] lg:text-[52px] xl:text-[56px] [@media(max-height:820px)]:lg:text-[50px]"
            >
              Splits de rekening.
              {/* Tweede zin op een groene markering die er één keer van links naar rechts onder schuift. */}
              <span className="mt-2 block">
                <span className="relative inline-block -rotate-1 whitespace-nowrap">
                  <span className="block px-2 pb-[0.1em]">Speel erom.</span>
                  <span
                    aria-hidden
                    className="veeg absolute inset-0 block rounded-[10px] bg-[#00D26A] px-2 pb-[0.1em] text-[#0A0C0A]"
                  >
                    Speel erom.
                  </span>
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-pretty text-[17px] leading-[1.55] text-white/70 sm:text-xl lg:text-[19px] [@media(max-height:820px)]:lg:mt-4">
              Stuur je vrienden een challenge in plaats van een kaal betaalverzoek. Wie het best speelt, betaalt het minst.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [@media(max-height:820px)]:lg:mt-6">
              <Link
                href={DOWNLOAD_ANCHOR}
                onClick={(event) => followLink(event, DOWNLOAD_ANCHOR, true)}
                className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#00D26A] px-8 text-[17px] font-semibold text-[#0A0C0A] outline-none transition-[background-color,transform] duration-200 hover:bg-[#1FDC7C] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
              >
                Download de app
              </Link>
              <Link
                href="/#stappen"
                onClick={(event) => followLink(event, "/#stappen", true)}
                className="group inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-white/10 px-7 text-[17px] font-semibold text-white outline-none ring-1 ring-inset ring-white/20 transition-colors duration-200 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#00D26A]"
              >
                Zo werkt het
                <ArrowDown
                  weight="bold"
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </Link>
            </div>

            {/* Desktop: de stappen in de hoek. De telefoon loopt door tot onder de rand van het vak. */}
            <div
              role="group"
              aria-label="Voorbeeld van een individueel verzoek in de app"
              className="relative mt-auto hidden h-[240px] lg:block [@media(max-height:820px)]:lg:h-[176px]"
            >
              <div className="absolute left-1 top-8 w-[196px] -rotate-[8deg] [@media(max-height:820px)]:lg:top-5 [@media(max-height:820px)]:lg:w-[168px]">
                <div
                  aria-hidden
                  className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.35),rgba(0,210,106,0))] blur-xl"
                />
                <DemoPhone index={demo.index} />
              </div>
              <StepCard
                demo={demo}
                className="absolute left-[172px] top-16 w-[300px] [@media(max-height:820px)]:lg:left-[148px] [@media(max-height:820px)]:lg:top-8"
              />
            </div>
          </div>

          {/* Rechts de munt, groot, van de boven- tot de onderrand van het vak; de ronde hoeken van het vak
              lopen erover door. Op telefoon en tablet staat hij onder de tekst en schuift het
              stappenkaartje over de onderkant. */}
          <div className="min-w-0 px-5 pb-6 pt-8 sm:px-8 lg:relative lg:p-0">
            <CoinVideo />
            <StepCard demo={demo} className="relative z-10 mx-3 -mt-14 sm:mx-auto sm:max-w-[380px] lg:hidden" />
          </div>
        </div>
      </div>
      {/* Het zwart loopt zacht over in het wit van de rest van de site. */}
      <div
        aria-hidden
        className="h-40 bg-[linear-gradient(to_bottom,#050605_0%,rgba(5,6,5,0.74)_19%,rgba(5,6,5,0.54)_34%,rgba(5,6,5,0.38)_47%,rgba(5,6,5,0.19)_65%,rgba(5,6,5,0.08)_80%,rgba(5,6,5,0.02)_91%,rgba(5,6,5,0)_100%)] sm:h-56"
      />
    </section>
  );
}
