"use client";

import Link from "next/link";

type LegalHeaderBarProps = {
  variant: "hub" | "sub";
};

export function LegalHeaderBar({ variant }: LegalHeaderBarProps) {
  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-neutral-900 uppercase"
          aria-label="Centje home"
        >
          Centje
        </Link>
        {variant === "hub" ? (
          <Link
            href="/"
            className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Terug naar home
          </Link>
        ) : (
          <Link
            href="/voorwaarden"
            className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Terug naar overzicht
          </Link>
        )}
      </div>
    </header>
  );
}
