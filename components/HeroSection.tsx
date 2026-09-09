"use client";

import { useRef, useEffect } from "react";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const prepareVideo = (video: HTMLVideoElement | null, isDesktop: boolean) => {
      if (!video) return;
      video.preload = "auto";
      if (isDesktop) video.playbackRate = PLAYBACK_RATE;
      video.load();
      video.play().catch(() => {});
    };

    const playActive = () => {
      const mobile = mobileRef.current;
      const desktop = desktopRef.current;

      if (mq.matches) {
        mobile?.pause();
        prepareVideo(desktop, true);
      } else {
        desktop?.pause();
        prepareVideo(mobile, false);
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
        preload="none"
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
        preload="none"
        aria-label="Centje munt animatie"
      />
    </div>
  );
}
