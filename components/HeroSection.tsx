"use client";

import { useRef, useEffect } from "react";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const playActive = () => {
      const mobile = mobileRef.current;
      const desktop = desktopRef.current;

      if (mq.matches) {
        mobile?.pause();
        if (desktop) {
          desktop.playbackRate = PLAYBACK_RATE;
          desktop.play().catch(() => {});
        }
      } else {
        desktop?.pause();
        mobile?.play().catch(() => {});
      }
    };

    playActive();
    mq.addEventListener("change", playActive);

    const onTouch = () => {
      if (!mq.matches) mobileRef.current?.play().catch(() => {});
    };
    document.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      mq.removeEventListener("change", playActive);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Mobiel */}
      <video
        ref={mobileRef}
        className="hero-video-mobile absolute inset-0 h-full w-full object-cover object-bottom origin-bottom scale-[1.12]"
        src="/centje-hero-mobile.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Centje munt animatie"
      />

      {/* Desktop — HD-bestand, volle breedte, gecentreerd */}
      <video
        ref={desktopRef}
        className="hero-video-desktop absolute inset-0 h-full w-full"
        src="/centje-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
        aria-label="Centje munt animatie"
      />
    </div>
  );
}
