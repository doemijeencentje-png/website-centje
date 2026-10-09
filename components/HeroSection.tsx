"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { fadedDots } from "./decor";
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
    const play = () => {
      if (inView) el.play().catch(() => {});
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
    <section
      id="hero"
      aria-labelledby="hero-titel"
      className="relative isolate overflow-hidden bg-white lg:grid lg:min-h-[100svh] lg:grid-cols-2"
    >
      {/* Achtergrond links: zachte mintgloed en stippen die naar de randen uitlopen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 lg:right-1/2"
        style={fadedDots("radial-gradient(70% 70% at 30% 40%, #000 0%, transparent 100%)")}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.16),rgba(0,210,106,0))] blur-2xl lg:left-[15%]"
      />

      {/* Links: in één keer duidelijk wat Centje is, zonder uitleg eronder. */}
      <div className="flex items-center px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:pb-24 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-10 lg:pt-28">
        <div className="min-w-0 max-w-[36rem]">
          <h1
            id="hero-titel"
            className="font-heading text-balance text-[34px] font-extrabold leading-[1.02] text-[#0A0C0A] min-[380px]:text-[40px] sm:text-[56px] xl:text-[64px]"
          >
            Betaalverzoek met een spelletje.
            {/* Tweede zin op een eigen regel, met een groene markeerstreep eronder. */}
            <span className="mt-2 block">
              <span className="bg-[linear-gradient(transparent_64%,rgba(0,210,106,0.5)_64%)] px-1">
                Wie wint, betaalt minder.
              </span>
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
            <Link
              href={DOWNLOAD_ANCHOR}
              onClick={(event) => followLink(event, DOWNLOAD_ANCHOR, true)}
              className="inline-flex h-[58px] items-center rounded-full bg-[#00D26A] px-8 text-lg font-semibold text-[#0A0C0A] shadow-[0_18px_40px_-18px_rgba(0,210,106,0.9)] outline-none transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#1FDC7C] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
            >
              Download de app
            </Link>
            <Link
              href="/#stappen"
              onClick={(event) => followLink(event, "/#stappen", true)}
              className="group inline-flex h-[58px] items-center gap-2 rounded-full bg-white/80 px-7 text-lg font-semibold text-[#0A0C0A] outline-none ring-1 ring-inset ring-black/10 backdrop-blur transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#00D26A]"
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
      </div>

      {/* Rechts: de munt, op desktop van rand tot rand en zo hoog als het scherm; op mobiel een kaart. */}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:p-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black lg:h-full lg:min-h-[100svh] lg:rounded-none">
          {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
          <Image
            src="/hero/munt-intro-poster.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <video
            ref={video}
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
          />
        </div>
      </div>
    </section>
  );
}
