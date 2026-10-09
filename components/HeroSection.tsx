"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { followLink } from "./site/inPage";
import { IPhoneFrame } from "./IPhoneFrame";
import { Spotlight } from "./Spotlight";
import { FLOWS } from "./how-it-works/flows";

// De poster is dit moment uit de video; de video begint daar, zodat er niets verspringt.
const POSTER_TIME = 2.2;
const VIDEO_SRC = "/hero/munt-intro.mp4";
// Zo lang blijft elk scherm van de app-demo staan.
const SLIDE_MS = 3400;

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
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[20px] bg-black ring-1 ring-black/5 lg:mx-0 lg:w-[384px] lg:max-w-none xl:w-[420px] [@media(max-height:820px)]:lg:w-[352px]">
      {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
      <Image
        src="/hero/munt-intro-poster.webp"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={90}
        sizes="(min-width: 1280px) 420px, (min-width: 1024px) 384px, (min-width: 640px) 460px, 100vw"
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

/**
 * De app zelf: de vijf schermen van een individueel verzoek, na elkaar, met een kaartje
 * ernaast dat de stap noemt en per scherm volloopt. Alleen in beweging zolang het in beeld is.
 */
function AppDemo() {
  const steps = FLOWS[0].steps;
  const [index, setIndex] = useState(0);
  // Telt mee bij elke herstart, zodat het streepje ook bij dezelfde stap opnieuw begint.
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const moving = inView && !reduceMotion;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % steps.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [moving, index, run, steps.length]);

  const show = (i: number) => {
    setIndex(i);
    setRun((r) => r + 1);
  };

  const step = steps[index];

  return (
    <div ref={wrap} role="group" aria-label="Voorbeeld van een individueel verzoek in de app" className="relative h-full">
      {/* De telefoon loopt onder de onderrand van het podium door. */}
      <div className="absolute right-[6%] top-0 w-[240px] xl:right-[10%] xl:w-[268px] [@media(max-height:820px)]:lg:w-[228px]">
        <IPhoneFrame>
          {steps.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt={i === index ? s.alt : ""}
              aria-hidden={i !== index}
              fill
              quality={90}
              // Lazy: op telefoon en tablet staat de demo verborgen en worden deze schermen niet geladen.
              loading="lazy"
              sizes="268px"
              className={`object-cover object-top transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </IPhoneFrame>
      </div>

      {/* Kaartje met de stap, half over de telefoon, zoals een los paneel in een schermafbeelding. */}
      <div className="absolute left-0 top-[34%] z-10 w-[268px] rounded-[20px] border border-[#E3EAE6] bg-white p-5 shadow-[0_2px_4px_rgba(10,12,10,0.04),0_24px_60px_-28px_rgba(0,60,30,0.4)] xl:left-[2%] xl:w-[292px]">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
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
          <span className="font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00D26A] text-base font-extrabold text-[#0A0C0A]">
            {index + 1}
          </span>
          <span className="font-heading text-lg font-extrabold leading-[1.15] text-[#0A0C0A]">{step.title}</span>
        </p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-titel"
      className="bg-white pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pt-32 [@media(max-height:820px)]:lg:pt-28"
    >
      {/* Eerst in één keer wat Centje is, links uitgelijnd zoals een krantenkop. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1
          id="hero-titel"
          className="font-heading text-balance text-[34px] font-extrabold leading-[1.02] text-[#0A0C0A] min-[380px]:text-[40px] sm:text-[56px] lg:text-[52px] xl:text-[60px] [@media(max-height:820px)]:lg:text-[50px]"
        >
          Betaalverzoek met een spel.
          {/* Tweede zin op een eigen regel; de groene markeerstift trekt er één keer onderdoor. */}
          <span className="mt-2 block">
            <span className="markeer px-1">De winnaar betaalt minder.</span>
          </span>
        </h1>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap lg:mt-8 [@media(max-height:820px)]:lg:mt-7">
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
            className="group inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[17px] font-semibold text-[#0A0C0A] outline-none ring-1 ring-inset ring-black/10 transition-colors duration-200 hover:bg-[#F4F7F5] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
          >
            Zo werkt het
            <ArrowDown
              weight="bold"
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Het podium: de munt en de app naast elkaar op een stippenraster (zoals millimeterpapier),
          waar een groene lichtvlek de muis volgt. Op telefoon en tablet alleen de munt, zonder kader. */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:mt-12 sm:px-6 lg:mt-10 [@media(max-height:820px)]:lg:mt-8">
        <div className="relative isolate overflow-hidden lg:rounded-[28px] lg:border lg:border-[#E3EAE6] lg:bg-[#F4F7F5] lg:[background-image:radial-gradient(circle,rgba(10,12,10,0.13)_1px,transparent_1.5px)] lg:[background-size:16px_16px]">
          <Spotlight className="hidden lg:block" />
          <div className="grid lg:h-[544px] lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8 lg:p-8 xl:h-[589px] [@media(max-height:820px)]:lg:h-[504px]">
            <CoinVideo />
            <div className="hidden lg:block">
              <AppDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
