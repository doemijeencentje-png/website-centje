"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { HOW_IT_WORKS, HOW_IT_WORKS_LABEL, LEGAL_LINKS, TOP_ITEMS } from "./navigation";
import { inPageId, scrollToId } from "./inPage";
import { Logo } from "./Logo";

export const MOBILE_MENU_ID = "mobiel-menu";

/**
 * Menu voor telefoon en tablet. Vult het hele scherm, houdt de focus binnen het menu
 * en zet de pagina erachter stil zolang het open is.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: (restoreFocus: boolean) => void }) {
  const onHome = usePathname() === "/";
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const go = (event: React.MouseEvent, href: string) => {
    const id = inPageId(href, onHome);
    onClose(false);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    // Eerst het menu dicht en de pagina weer vrij, dan pas scrollen.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose(true);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialog}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E3EAE6] px-4 sm:px-6">
            <div onClickCapture={() => onClose(false)}>
              <Logo />
            </div>
            <button
              ref={closeButton}
              type="button"
              aria-label="Menu sluiten"
              onClick={() => onClose(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F6F4] text-[#0A0C0A] outline-none transition-colors hover:bg-[#E7EDE9] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
            >
              <X weight="bold" aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <motion.nav
            aria-label="Hoofdmenu"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-6 sm:px-6"
          >
            <p className="px-3 text-sm font-semibold text-neutral-500">{HOW_IT_WORKS_LABEL}</p>
            <ul className="mt-2 space-y-1">
              {HOW_IT_WORKS.map(({ label, text, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={(event) => go(event, href)}
                    className="flex items-center gap-4 rounded-[20px] p-3 outline-none transition-colors active:bg-[#F3F6F4] focus-visible:bg-[#F3F6F4] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#E7F8EE] text-[#007F45]">
                      <Icon weight="bold" aria-hidden className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[17px] font-semibold text-[#0A0C0A]">{label}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-neutral-500">{text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-6 divide-y divide-[#E3EAE6] border-t border-[#E3EAE6]">
              {TOP_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(event) => go(event, item.href)}
                    className="font-heading flex items-center justify-between gap-4 px-3 py-4 text-[22px] font-extrabold leading-tight text-[#0A0C0A] outline-none focus-visible:bg-[#F3F6F4] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                  >
                    {item.longLabel ?? item.label}
                    <ArrowRight weight="bold" aria-hidden className="h-5 w-5 shrink-0 text-[#007F45]" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <div className="shrink-0 border-t border-[#E3EAE6] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <Link
              href={DOWNLOAD_ANCHOR}
              onClick={(event) => go(event, DOWNLOAD_ANCHOR)}
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#00D26A] text-base font-semibold text-[#0A0C0A] outline-none transition-transform focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
            >
              Download de app
            </Link>
            <ul className="mt-3 flex justify-center gap-6 text-sm text-neutral-500">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => onClose(false)}
                    className="rounded outline-none hover:text-[#0A0C0A] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
