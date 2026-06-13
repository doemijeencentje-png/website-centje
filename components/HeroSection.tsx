"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const PLAYBACK_RATE = 0.75;
const MOBILE_QUERY = "(max-width: 639px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : null
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const [needsPlay, setNeedsPlay] = useState(false);

  const applyPlaybackRate = useCallback((video: HTMLVideoElement) => {
    // Mobiele mp4 heeft 0,75× al ingebakken
    video.playbackRate = window.matchMedia(MOBILE_QUERY).matches ? 1 : PLAYBACK_RATE;
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;

    const tryPlay = () => {
      applyPlaybackRate(v);
      const p = v.play();
      if (p) {
        p.then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true));
      }
    };

    tryPlay();

    const onInteract = () => tryPlay();
    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };

    document.addEventListener("touchstart", onInteract, { passive: true });
    document.addEventListener("click", onInteract);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("click", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [isMobile, applyPlaybackRate]);

  const videoClass =
    "absolute inset-0 h-full w-full object-cover object-bottom origin-bottom scale-[1.12] transform-gpu sm:scale-100 sm:object-center";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={videoClass}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
        onCanPlay={(e) => {
          applyPlaybackRate(e.currentTarget);
          e.currentTarget.play().catch(() => setNeedsPlay(true));
        }}
        onPlay={() => setNeedsPlay(false)}
        aria-label="Centje munt animatie"
      >
        <source
          src="/centje-hero-mobile.mp4"
          type="video/mp4"
          media="(max-width: 639px)"
        />
        <source
          src="/centje-hero.mp4"
          type="video/mp4"
          media="(min-width: 640px)"
        />
      </video>

      {needsPlay && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30"
          aria-label="Animatie afspelen"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-lg">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
