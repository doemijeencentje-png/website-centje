"use client";

import { useEffect, useState } from "react";
import { AnimatedTabs } from "./AnimatedTabs";

const NAV_TABS = [
  { label: "Hoe het werkt", href: "#stappen" },
  { label: "Ons verhaal", href: "#over-ons" },
  { label: "Download", href: "#download" },
];

export function SiteHeader() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 1.1;
      setIsLight(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isLight
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-200/60 shadow-sm"
          : "bg-black/20 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        <span
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 cursor-pointer shrink-0 ${
            isLight ? "text-neutral-900" : "text-white"
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          CENTJE
        </span>
        <AnimatedTabs tabs={NAV_TABS} variant={isLight ? "light" : "dark"} />
      </div>
    </header>
  );
}
