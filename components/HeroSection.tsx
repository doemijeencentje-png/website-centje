"use client";

import { useRef, useEffect, useState } from "react";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);
  // iOS/macOS blokkeren <video>-autoplay in energiebesparingsmodus volledig —
  // ook muted+inline — waardoor er een play-knop verschijnt. Zodra we merken
  // dat de actieve video niet speelt, tonen we een geanimeerde WebP over de
  // video heen. Die telt als afbeelding en loopt WEL altijd door, zonder tik.
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const activeVideo = () =>
      mq.matches ? desktopRef.current : mobileRef.current;

    const tryPlay = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const p = video.play();
      // In energiebesparingsmodus wijst play() de belofte af → val terug op WebP.
      if (p && typeof p.then === "function") {
        p.then(
          () => {},
          () => setBlocked(true),
        );
      }
    };

    const playActive = () => {
      const mobile = mobileRef.current;
      const desktop = desktopRef.current;

      if (mq.matches) {
        mobile?.pause();
        if (desktop) {
          desktop.playbackRate = PLAYBACK_RATE;
          tryPlay(desktop);
        }
      } else {
        desktop?.pause();
        tryPlay(mobile);
      }
    };

    playActive();
    mq.addEventListener("change", playActive);

    // Vangnet: op sommige iOS-versies wijst play() niet af maar blijft de video
    // gewoon gepauzeerd staan. Als de actieve video na ~1s nog niet loopt,
    // beschouwen we dat als geblokkeerd en tonen we de WebP.
    const grace = window.setTimeout(() => {
      const v = activeVideo();
      if (v && v.paused) setBlocked(true);
    }, 1000);

    const onTouch = () => {
      if (!mq.matches) mobileRef.current?.play().catch(() => {});
    };
    document.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      window.clearTimeout(grace);
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

      {/* Energiebesparingsmodus-fallback: geanimeerde WebP's die altijd
          doorlopen. Ze dragen dezelfde hero-video-klassen, dus mobiel/desktop
          wisselen precies als de video's, en liggen erbovenop om de native
          play-knop te bedekken. Worden alleen geladen als het echt nodig is. */}
      {blocked && (
        <>
          <img
            className="hero-video-mobile absolute inset-0 h-full w-full object-cover object-bottom origin-bottom scale-[1.12]"
            src="/centje-hero-mobile.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-video-desktop absolute inset-0 h-full w-full"
            src="/centje-hero.webp"
            alt=""
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
