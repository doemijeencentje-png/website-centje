"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Het officiële logo (munt + woordmerk) als link naar de homepage; op de homepage terug naar boven. */
export function Logo({ className = "" }: { className?: string }) {
  const onHome = usePathname() === "/";

  return (
    <Link
      href="/"
      aria-label={onHome ? "Centje, terug naar boven" : "Centje, naar de homepage"}
      onClick={(event) => {
        if (!onHome) return;
        event.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        history.replaceState(null, "", "/");
      }}
      className={`block shrink-0 rounded-md py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] ${className}`}
    >
      {/* Verhouding van merk/logo.webp: 1950 x 522. */}
      <Image
        src="/merk/logo.webp"
        alt=""
        width={1950}
        height={522}
        priority
        sizes="(min-width: 1024px) 128px, 112px"
        className="h-[30px] w-auto lg:h-[34px]"
      />
    </Link>
  );
}
