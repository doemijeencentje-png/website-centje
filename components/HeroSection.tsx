"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

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
  const [webpFallback, setWebpFallback] = useState(false);

  const applyPlaybackRate = useCallback((video: HTMLVideoElement) => {
    video.playbackRate = PLAYBACK_RATE;
  }, []);

  useEffect(() => {
    if (webpFallback) return;

    const v = videoRef.current;
    if (!v) return;

    v.muted = true;

    const tryPlay = () => {
      applyPlaybackRate(v);
      const p = v.play();
      if (p) {
        p.catch(() => {
          if (window.matchMedia(MOBILE_QUERY).matches) setWebpFallback(true);
        });
      }
    };

    tryPlay();

    const onInteract = () => tryPlay();
    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };

    document.addEventListener("touchstart", onInteract, { passive: true });
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [webpFallback, isMobile, applyPlaybackRate]);

  const videoClass =
    "absolute inset-0 h-full w-full object-cover object-bottom origin-bottom scale-[1.12] transform-gpu sm:scale-100 sm:object-center";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {isMobile !== false && webpFallback ? (
        <Image
          src="/centje-hero.webp"
          alt="Centje munt animatie"
          fill
          unoptimized
          priority
          sizes="100vw"
          className={videoClass}
        />
      ) : (
        <video
          ref={videoRef}
          className={videoClass}
          src="/centje-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
          onCanPlay={(e) => {
            applyPlaybackRate(e.currentTarget);
            e.currentTarget.play().catch(() => {
              if (window.matchMedia(MOBILE_QUERY).matches) setWebpFallback(true);
            });
          }}
          onError={() => {
            if (window.matchMedia(MOBILE_QUERY).matches) setWebpFallback(true);
          }}
          aria-label="Centje munt animatie"
        />
      )}
    </div>
  );
}
