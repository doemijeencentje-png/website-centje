"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playbackRate = PLAYBACK_RATE;

    const tryPlay = () => {
      v.playbackRate = PLAYBACK_RATE;
      const p = v.play();
      if (p) p.catch(() => {});
    };

    tryPlay();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Mobiel: geanimeerde WebP — loopt altijd, ook in iOS-energiebesparingsmodus */}
      <Image
        src="/centje-hero-mobile.webp"
        alt="Centje munt animatie"
        fill
        unoptimized
        priority
        sizes="100vw"
        className="object-cover object-bottom origin-bottom scale-[1.12] sm:hidden"
      />

      {/* Desktop: mp4 — zelfde snelheid, vol scherm (boven/onder mag weg) */}
      <video
        ref={videoRef}
        className="absolute inset-0 hidden h-full w-full object-cover sm:block"
        src="/centje-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
        onCanPlay={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
          const p = e.currentTarget.play();
          if (p) p.catch(() => {});
        }}
        aria-label="Centje munt animatie"
      />
    </div>
  );
}
