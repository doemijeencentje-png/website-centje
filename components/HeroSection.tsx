"use client";

import { useRef, useEffect } from "react";

const PLAYBACK_RATE = 0.75;

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Doorlopende coin-video — vult het scherm (portret op mobiel, breed op desktop)
          en loopt continu door op 0.75x snelheid */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
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
