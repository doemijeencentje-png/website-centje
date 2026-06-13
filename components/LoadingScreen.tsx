"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => setMounted(false), 550);
      }, 400);
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      finish();
    } else {
      document.addEventListener("DOMContentLoaded", finish, { once: true });
      window.addEventListener("load", finish, { once: true });
    }

    const maxTimer = window.setTimeout(finish, 2500);

    return () => {
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
        <div className="loading-progress h-full rounded-full bg-[#00D26A]" />
      </div>
      <span className="mt-4 text-xs font-medium tracking-wide text-white/40">
        Laden…
      </span>
    </div>
  );
}
