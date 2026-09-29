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
      data-kop="donker"
      aria-labelledby="hero-titel"
      className="relative isolate overflow-hidden bg-[#060807] text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_78%_50%,rgba(0,210,106,0.17),rgba(0,210,106,0)_70%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12 lg:pb-16 lg:pt-24">
        <div>
          <h1
            id="hero-titel"
            className="hero-rise font-heading text-balance text-[42px] font-extrabold leading-[1.02] sm:text-6xl lg:text-[50px] xl:text-[58px]"
          >
            Splits de rekening.{" "}
            <span className="text-[#00D26A]">Speel erom.</span>
          </h1>
          <p
            style={{ animationDelay: "0.1s" }}
            className="hero-rise mt-6 max-w-[36ch] text-[17px] leading-relaxed text-white/70 sm:mt-7 sm:text-xl"
          >
            Stuur je vrienden een challenge in plaats van een kaal betaalverzoek. Wie het best
            speelt, betaalt het minst.
          </p>
          <div style={{ animationDelay: "0.2s" }} className="hero-rise mt-8 flex flex-wrap gap-3 sm:mt-10">
            <Link
              href={DOWNLOAD_ANCHOR}
              onClick={(event) => followLink(event, DOWNLOAD_ANCHOR, true)}
              className="inline-flex h-[52px] items-center rounded-full bg-[#00D26A] px-7 text-base font-semibold text-[#0A0C0A] outline-none transition-[background-color,transform] duration-200 hover:bg-[#1FDC7C] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
            >
              Download de app
            </Link>
            <Link
              href="/#stappen"
              onClick={(event) => followLink(event, "/#stappen", true)}
              className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-white/[0.08] px-6 text-base font-semibold text-white outline-none ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/[0.14] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
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

        <div
          style={{ animationDelay: "0.1s" }}
          className="hero-pop relative mx-auto w-[min(100%,340px)] sm:w-[min(100%,400px)] lg:mx-0 lg:ml-auto lg:w-[min(100%,400px,calc((100svh-12rem)*0.8))]"
        >
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.28),rgba(0,210,106,0))] blur-2xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
            <Image
              src="/hero/munt-intro-poster.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 640px) 400px, 340px"
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
      </div>
    </section>
  );
}
