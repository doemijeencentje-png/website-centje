"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { List } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { DesktopNav, type Tone } from "./DesktopNav";
import { MOBILE_MENU_ID, MobileMenu } from "./MobileMenu";
import { HOME_SECTIONS } from "./navigation";
import { followLink } from "./inPage";
import { Logo } from "./Logo";

/** Hoogte waarop we kijken welke sectie onder de kopbalk ligt (het midden van de balk). */
const PROBE_Y = 32;

/** Donkere secties (hero, downloadblok, voettekst) dragen data-kop="donker". */
function overDarkSection() {
  for (const el of document.querySelectorAll<HTMLElement>('[data-kop="donker"]')) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) return true;
  }
  return false;
}

/** De sectie van de homepage die net boven het midden van het scherm staat. */
function sectionInView() {
  const line = window.innerHeight * 0.42;
  let current: string | null = null;
  for (const id of HOME_SECTIONS) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && rect.top <= line && rect.bottom > line) current = id;
  }
  return current;
}

/**
 * Vaste kopbalk van de hele site. Kleurt mee met wat eronder ligt: doorzichtig boven
 * de hero, donker glas boven donkere secties en licht glas boven de rest.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Beginstand gelijk aan wat de server rendert: bovenaan, boven de hero of een lichte paginakop.
  const [tone, setTone] = useState<Tone>(onHome ? "dark" : "light");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Het menu hoort bij de pagina waarop het openging; na navigeren is het vanzelf dicht.
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const menuOpen = menuAt === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);

  const update = useCallback(() => {
    setScrolled(window.scrollY > 8);
    setTone(overDarkSection() ? "dark" : "light");
    setActiveSection(window.location.pathname === "/" ? sectionInView() : null);
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    // Na navigeren (of herladen midden op de pagina) meteen de juiste stand; secties die
    // later binnenkomen worden met de tweede meting nog meegenomen.
    const frame = requestAnimationFrame(update);
    const late = window.setTimeout(update, 400);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.removeEventListener("resize", update);
    };
  }, [pathname, update]);

  const surface =
    tone === "light"
      ? "border-[#E3EAE6]/80 bg-white/90 backdrop-blur-md"
      : scrolled
        ? "border-white/10 bg-[#0A0C0A]/85 backdrop-blur-md"
        : "border-transparent bg-transparent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${surface}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:h-[72px]">
          <Logo />

          <div className="hidden flex-1 justify-center lg:flex">
            <DesktopNav tone={tone} activeSection={activeSection} />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Link
              href={DOWNLOAD_ANCHOR}
              onClick={(event) => followLink(event, DOWNLOAD_ANCHOR, onHome)}
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-[#00D26A] px-4 text-sm font-semibold text-[#0A0C0A] outline-none transition-[background-color,transform] duration-200 hover:bg-[#1FDC7C] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.97] max-[359px]:hidden lg:h-11 lg:px-5 lg:text-[15px]"
            >
              Download de app
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-label="Menu openen"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              onClick={() => setMenuAt(pathname)}
              className={`flex h-10 w-10 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#00D26A] lg:hidden ${
                tone === "dark"
                  ? "bg-white/10 text-white ring-1 ring-inset ring-white/15 hover:bg-white/15"
                  : "bg-[#F3F6F4] text-[#0A0C0A] hover:bg-[#E7EDE9]"
              }`}
            >
              <List weight="bold" aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={(restoreFocus) => {
          setMenuAt(null);
          if (restoreFocus) requestAnimationFrame(() => menuButton.current?.focus());
        }}
      />
    </>
  );
}
