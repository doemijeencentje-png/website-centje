"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CENTJE_EMAIL_DISPLAY, CENTJE_EMAIL_MAILTO } from "@/lib/centje-contact";
import { rememberHomeScrollForReturn } from "@/components/HomeScrollRestore";

export function Footer() {
  const pathname = usePathname();

  const beforeLegalNavigation = () => {
    if (pathname === "/") rememberHomeScrollForReturn();
  };

  return (
    <footer
      className="border-t border-neutral-200 py-8 sm:py-12 bg-white"
      data-centje-footer
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              centje
            </span>
            <span className="text-xs sm:text-sm text-neutral-400">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-neutral-400"
            aria-label="Footer"
          >
            <Link
              href="/privacy"
              onClick={beforeLegalNavigation}
              className="hover:text-neutral-700 transition-colors"
            >
              Privacy
            </Link>
            <a
              href={CENTJE_EMAIL_MAILTO}
              className="hover:text-neutral-700 transition-colors"
            >
              {CENTJE_EMAIL_DISPLAY}
            </a>
            <Link
              href="/voorwaarden"
              onClick={beforeLegalNavigation}
              className="hover:text-neutral-700 transition-colors font-medium text-neutral-500"
            >
              Voorwaarden
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
