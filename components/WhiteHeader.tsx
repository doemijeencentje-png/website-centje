"use client";

import { AnimatedTabs } from "./AnimatedTabs";

export function WhiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 shrink-0">
          CENTJE
        </span>
        <AnimatedTabs
          tabs={[
            { label: "Download", href: "#download" },
            { label: "Over ons", href: "#over-ons" },
            { label: "Stappen", href: "#stappen" },
          ]}
        />
      </div>
    </header>
  );
}
