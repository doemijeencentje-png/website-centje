"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  /** Sectie op de homepage die dit item actief maakt tijdens het scrollen. */
  section?: string;
  /** Pagina (of beginpad) die dit item actief maakt. */
  page?: string;
  /** Vanaf welke schermbreedte het item in het menu staat. */
  from: "base" | "md" | "lg";
};

const VISIBLE = { base: "flex", md: "hidden md:flex", lg: "hidden lg:flex" } as const;

const NAV: NavItem[] = [
  { label: "Hoe het werkt", href: "/#stappen", section: "stappen", from: "base" },
  { label: "Ons verhaal", href: "/#over-ons", section: "over-ons", from: "md" },
  { label: "Vragen", href: "/veelgestelde-vragen", page: "/veelgestelde-vragen", section: "vragen", from: "base" },
  { label: "Adverteren", href: "/adverteren", page: "/adverteren", from: "lg" },
  { label: "Download", href: "#download", section: "download", from: "base" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;
    const visible = new Map<string, boolean>();
    // Een sectie telt als actief zodra hij de lijn net boven het midden van het scherm raakt.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = ids.filter((id) => visible.get(id)).pop() ?? null;
        setActive(current);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Ankers op dezelfde pagina als gewone link: Next.js zou anders de huidige pagina opnieuw ophalen. */
function NavLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <Link href={href} {...props} />;
}

const SECTION_IDS = NAV.flatMap((item) => (item.section ? [item.section] : []));

export function SiteNav({ tone }: { tone: "dark" | "light" }) {
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);
  const onHome = pathname === "/";

  const sectionItem = NAV.find(
    (item) => item.section && item.section === activeSection && (onHome || item.section === "download"),
  );
  const pageItem = NAV.find((item) => item.page && pathname.startsWith(item.page));
  const activeLabel = sectionItem?.label ?? pageItem?.label ?? null;
  // "page" alleen als dit item de huidige pagina is; een sectie in beeld is een "location".
  const currentKind = sectionItem ? "location" : "page";

  const scrollToSection = (event: React.MouseEvent, item: NavItem) => {
    if (!item.section) return;
    const samePage = item.href.startsWith("#") || (onHome && item.href.startsWith("/#"));
    if (!samePage) return;
    const target = document.getElementById(item.section);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const dark = tone === "dark";

  return (
    <nav aria-label="Hoofdmenu">
      <ul
        className={`flex items-center gap-0.5 rounded-full border p-1 backdrop-blur-md transition-colors duration-500 sm:gap-1 sm:p-1.5 ${
          dark ? "border-white/15 bg-white/10" : "border-neutral-200 bg-neutral-100/60"
        }`}
      >
        {NAV.map((item) => {
          const active = item.label === activeLabel;
          return (
            <li key={item.label} className={VISIBLE[item.from]}>
              <NavLink
                href={item.href}
                onClick={(event) => scrollToSection(event, item)}
                aria-current={active ? currentKind : undefined}
                className={`relative isolate flex h-7 items-center whitespace-nowrap rounded-full px-2.5 text-xs font-medium leading-none outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#00D26A] sm:h-8 sm:px-3.5 sm:text-sm ${
                  active
                    ? dark
                      ? "text-neutral-900"
                      : "text-white"
                    : dark
                      ? "text-white/65 hover:text-white"
                      : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-actief"
                    aria-hidden
                    className={`absolute inset-0 -z-10 rounded-full transition-colors duration-500 ${
                      dark ? "bg-white" : "bg-neutral-900"
                    }`}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
