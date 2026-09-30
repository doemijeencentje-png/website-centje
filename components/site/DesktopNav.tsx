"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { HOW_IT_WORKS, HOW_IT_WORKS_LABEL, HOW_IT_WORKS_SECTIONS, TOP_ITEMS } from "./navigation";
import { followLink } from "./inPage";

export type Tone = "dark" | "light";

const EASE = [0.22, 1, 0.36, 1] as const;

function Underline() {
  return (
    <motion.span
      layoutId="menu-streep"
      aria-hidden
      className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[#00D26A]"
      transition={{ type: "spring", stiffness: 480, damping: 38 }}
    />
  );
}

function itemClass(tone: Tone, active: boolean) {
  const base =
    "relative flex h-10 items-center gap-1.5 rounded-full px-3 text-[15px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#00D26A]";
  if (tone === "dark") return `${base} ${active ? "text-white" : "text-white/70 hover:text-white"}`;
  return `${base} ${active ? "text-[#0A0C0A]" : "text-neutral-600 hover:text-[#0A0C0A]"}`;
}

function HowItWorksMenu({ tone, active, onHome }: { tone: Tone; active: boolean; onHome: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);
  const panelId = useId();

  const clearTimer = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const setSoon = (next: boolean, delay: number) => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(next), delay);
  };

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (event: React.MouseEvent, href: string) => {
    clearTimer();
    setOpen(false);
    followLink(event, href, onHome);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && setSoon(true, 60)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setSoon(false, 180)}
      onBlur={(event) => {
        if (!wrap.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearTimer();
          setOpen((value) => !value);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => wrap.current?.querySelector<HTMLElement>("[data-menu-item]")?.focus());
        }}
        className={itemClass(tone, active || open)}
      >
        {HOW_IT_WORKS_LABEL}
        <CaretDown
          weight="bold"
          aria-hidden
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        {active ? <Underline /> : null}
      </button>

      <AnimatePresence>
        {open ? (
          <div id={panelId} className="absolute -left-4 top-full pt-3">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="grid w-[700px] origin-top-left grid-cols-[minmax(0,1fr)_220px] gap-2 rounded-[28px] bg-white p-2 shadow-[0_2px_6px_rgba(10,12,10,0.06),0_30px_80px_-24px_rgba(0,60,30,0.35)] ring-1 ring-black/[0.06]"
            >
              <ul className="p-1">
                {HOW_IT_WORKS.map(({ label, text, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      data-menu-item
                      onClick={(event) => choose(event, href)}
                      className="group flex items-start gap-3.5 rounded-[20px] p-3 outline-none transition-colors hover:bg-[#F4F7F5] focus-visible:bg-[#F4F7F5] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                    >
                      <Icon
                        weight="bold"
                        aria-hidden
                        className="mt-px h-[22px] w-[22px] shrink-0 text-[#007F45] transition-colors group-hover:text-[#0A0C0A]"
                      />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-[#0A0C0A]">{label}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-neutral-500">{text}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={DOWNLOAD_ANCHOR}
                data-menu-item
                onClick={(event) => choose(event, DOWNLOAD_ANCHOR)}
                className="group relative isolate flex flex-col justify-end overflow-hidden rounded-[22px] bg-[#0A0C0A] p-5 outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
              >
                <span
                  aria-hidden
                  className="absolute -right-10 -top-12 -z-10 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.35),rgba(0,210,106,0))]"
                />
                <Image
                  src="/merk/logo-munt.webp"
                  alt=""
                  width={1024}
                  height={1024}
                  sizes="80px"
                  className="absolute right-5 top-5 h-20 w-20 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="font-heading block text-lg font-extrabold leading-tight text-white">Download de app</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm text-white/65">
                  Gratis downloaden
                  <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Menu voor schermen vanaf 1024px. activeSection is de sectie van de homepage in beeld. */
export function DesktopNav({ tone, activeSection }: { tone: Tone; activeSection: string | null }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const sectionLabel =
    onHome && activeSection
      ? HOW_IT_WORKS_SECTIONS.includes(activeSection)
        ? HOW_IT_WORKS_LABEL
        : TOP_ITEMS.find((item) => item.sections?.includes(activeSection))?.label
      : undefined;
  const pageLabel = TOP_ITEMS.find((item) => item.page && pathname.startsWith(item.page))?.label;
  const activeLabel = sectionLabel ?? pageLabel ?? null;

  return (
    <nav aria-label="Hoofdmenu">
      <ul className="flex items-center gap-1">
        <li>
          <HowItWorksMenu tone={tone} active={activeLabel === HOW_IT_WORKS_LABEL} onHome={onHome} />
        </li>
        {TOP_ITEMS.map((item) => {
          const active = item.label === activeLabel;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(event) => followLink(event, item.href, onHome)}
                aria-current={active ? (sectionLabel ? "location" : "page") : undefined}
                className={itemClass(tone, active)}
              >
                {item.label}
                {active ? <Underline /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
