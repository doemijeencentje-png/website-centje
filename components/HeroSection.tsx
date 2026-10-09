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
    <section id="hero" aria-labelledby="hero-titel" className="relative isolate overflow-hidden bg-white">
      {/* Licht en rustig: zwarte tekst op wit, met alleen een zachte groene gloed achter de munt. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_80%_45%,rgba(0,210,106,0.14),rgba(0,210,106,0)_70%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20 lg:pt-24">
        <div>
          <h1
            id="hero-titel"
            className="font-heading text-balance text-[44px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-6xl xl:text-[64px]"
          >
            Splits de rekening. Speel erom.
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-neutral-600 sm:mt-8 sm:text-[21px]">
            Stuur je vrienden een challenge in plaats van een kaal betaalverzoek. Wie het best
            speelt, betaalt het minst.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 sm:mt-11">
            <Link
              href={DOWNLOAD_ANCHOR}
              onClick={(event) => followLink(event, DOWNLOAD_ANCHOR, true)}
              className="inline-flex h-[54px] items-center rounded-full bg-[#00D26A] px-7 text-[17px] font-semibold text-[#0A0C0A] outline-none transition-[background-color,transform] duration-200 hover:bg-[#1FDC7C] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
            >
              Download de app
            </Link>
            <Link
              href="/#stappen"
              onClick={(event) => followLink(event, "/#stappen", true)}
              className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-white px-6 text-[17px] font-semibold text-[#0A0C0A] outline-none ring-1 ring-inset ring-black/10 transition-colors duration-200 hover:bg-[#F4F7F5] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
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

        {/* De munt, groot: op desktop zo hoog als het scherm toelaat. */}
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto lg:w-[min(100%,540px,calc((100svh-11rem)*0.8))] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black shadow-[0_2px_6px_rgba(10,12,10,0.06),0_40px_90px_-36px_rgba(0,60,30,0.5)] ring-1 ring-black/5">
            {/* Geen preload: die zou via het vooraf laden van de homepage ook op andere pagina's afgaan. */}
            <Image
              src="/hero/munt-intro-poster.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1024px) 540px, (min-width: 640px) 440px, 100vw"
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
