"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { SiteNav } from "./SiteNav";

/**
 * Vaste kopbalk. Op de homepage donker boven de hero-video en licht daaronder;
 * op de overige pagina's altijd licht.
 */
export function SiteHeader({ variant = "home" }: { variant?: "home" | "page" }) {
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 1.1));
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPastHero(window.scrollY > window.innerHeight * 1.1));
    return () => cancelAnimationFrame(frame);
  }, []);

  const light = variant === "page" || pastHero;

  const logo = (
    <Image
      src="/centje-wordmark.png"
      alt="Centje"
      fill
      className="object-contain object-left"
      sizes="(max-width: 640px) 84px, 142px"
      priority
    />
  );
  const logoBox = "relative h-[28px] w-[84px] shrink-0 sm:h-[48px] sm:w-[142px]";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        light
          ? "border-b border-neutral-200/60 bg-white/80 shadow-sm backdrop-blur-md"
          : "border-b border-white/5 bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6">
        {variant === "home" ? (
          <button
            type="button"
            aria-label="Centje, naar boven"
            className={`${logoBox} cursor-pointer`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {logo}
          </button>
        ) : (
          <Link href="/" aria-label="Centje, naar de homepage" className={logoBox}>
            {logo}
          </Link>
        )}
        <SiteNav tone={light ? "light" : "dark"} />
      </div>
    </header>
  );
}
