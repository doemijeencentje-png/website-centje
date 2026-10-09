"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { followLink } from "./site/inPage";

// De poster is dit moment uit de video; de video begint daar, zodat er niets verspringt.
const POSTER_TIME = 2.2;
const VIDEO_SRC = "/hero/munt-intro.mp4";

type NetworkInfo = { saveData?: boolean };

export default function HeroSection() {
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
    <section id="hero" aria-labelledby="hero-titel" className="relative isolate overflow-hidden bg-white">
      {/* Eén zachte mintgloed achter de munt; verder wit en rustig. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_78%_50%,rgba(0,210,106,0.14),rgba(0,210,106,0)_70%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-28 lg:pt-36">
        {/* Links: in één keer duidelijk wat Centje is, zonder uitleg eronder. */}
        <div className="min-w-0">
          <h1
            id="hero-titel"
            className="font-heading text-balance text-[34px] font-extrabold leading-[1.02] text-[#0A0C0A] min-[380px]:text-[40px] sm:text-[56px] lg:text-[52px] xl:text-[60px]"
          >
            Betaalverzoek met een spel.
            {/* Tweede zin op een eigen regel, met een groene markeerstreep eronder. */}
            <span className="mt-2 block">
              <span className="bg-[linear-gradient(transparent_64%,rgba(0,210,106,0.5)_64%)] px-1">
                De winnaar betaalt minder.
              </span>
            </span>
          </h1>
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
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

        {/* Rechts: de munt in een kaart, niet van rand tot rand. */}
        <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto lg:w-[min(100%,520px,calc((100svh-14rem)*0.8))] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black shadow-[0_2px_6px_rgba(10,12,10,0.06),0_40px_90px_-36px_rgba(0,60,30,0.45)] ring-1 ring-black/5">
            {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
            <Image
              src="/hero/munt-intro-poster.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 460px, 100vw"
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
        </div>
      </div>
    </section>
  );
}
