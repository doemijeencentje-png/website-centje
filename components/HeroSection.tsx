"use client";

import { useRef, useEffect, useState } from "react";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 640px)").matches
      : null
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;

    const tryPlay = () => {
      if (isDesktop === true) v.playbackRate = PLAYBACK_RATE;
      v.play().catch(() => {});
    };

    tryPlay();

    if (isDesktop !== true) {
      document.addEventListener("touchstart", tryPlay, { passive: true });
      return () => document.removeEventListener("touchstart", tryPlay);
    }
  }, [isDesktop]);

  const mobileClass =
    "absolute inset-0 h-full w-full object-cover object-bottom origin-bottom scale-[1.12]";
  const desktopClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {isDesktop !== true && (
        <video
          ref={videoRef}
          className={mobileClass}
          src="/centje-hero-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Centje munt animatie"
        />
      )}

      {isDesktop === true && (
        <video
          ref={videoRef}
          className={desktopClass}
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
      )}
    </div>
  );
}
