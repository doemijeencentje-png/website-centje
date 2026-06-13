"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [progress, setProgress] = useState(8);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const start = Date.now();
    let raf = 0;
    let done = false;

    // Voortgang langzaam laten oplopen tot ~92% terwijl de site laadt
    const tick = () => {
      setProgress((p) => (p < 92 ? p + (92 - p) * 0.035 + 0.3 : p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 600 - elapsed); // minimale weergave
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => setMounted(false), 550); // unmount na fade
      }, wait + 200);
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      finish();
    } else {
      document.addEventListener("DOMContentLoaded", finish);
      window.addEventListener("load", finish);
    }
    // Vangnet: laadscherm max ~2,5s — wacht niet op alle grote assets
    const maxTimer = window.setTimeout(finish, 2500);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("DOMContentLoaded", finish);
      window.removeEventListener("load", finish);
      clearTimeout(maxTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0C0A] transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <div className="relative mb-8 aspect-[2172/724] w-64 sm:w-80">
        <Image
          src="/centje-logo-sm.webp"
          alt="Centje"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 256px, 320px"
          unoptimized
          priority
        />
      </div>
      <div className="h-1.5 w-44 overflow-hidden rounded-full bg-white/10 sm:w-56">
        <div
          className="h-full rounded-full bg-[#00D26A] transition-[width] duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className="mt-4 text-xs font-medium tracking-wide text-white/40">
        Laden…
      </span>
    </div>
  );
}
