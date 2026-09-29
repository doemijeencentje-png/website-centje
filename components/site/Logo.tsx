"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Woordmerk als link naar de homepage; op de homepage zelf terug naar boven. */
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
      className={`block shrink-0 rounded-md py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] ${className}`}
    >
      <span className="relative block h-[19px] w-[84px] lg:h-6 lg:w-[107px]">
        <Image
          src="/merk/woordmerk.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 107px, 84px"
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
