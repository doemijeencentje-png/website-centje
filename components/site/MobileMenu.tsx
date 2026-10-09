"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { DOWNLOAD_ANCHOR } from "@/lib/links";
import { HOW_IT_WORKS, HOW_IT_WORKS_LABEL, TOP_ITEMS } from "./navigation";
import { inPageId, scrollToId } from "./inPage";
import { Logo } from "./Logo";

export const MOBILE_MENU_ID = "mobiel-menu";

const MENU = [
  { label: HOW_IT_WORKS_LABEL, href: "/#stappen" },
  ...HOW_IT_WORKS.map(({ label, href }) => ({ label, href })),
  ...TOP_ITEMS.map((item) => ({ label: item.longLabel ?? item.label, href: item.href })),
];

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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F7F5] text-[#0A0C0A] outline-none transition-colors hover:bg-[#E7EDE9] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
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
            {/* Eén lijst, alles in dezelfde stijl: eerst Hoe het werkt met de drie onderdelen, dan de rest. */}
            <ul className="divide-y divide-[#E3EAE6]">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(event) => go(event, item.href)}
                    className="font-heading block px-3 py-4 text-[22px] font-extrabold leading-tight text-[#0A0C0A] outline-none focus-visible:bg-[#F4F7F5] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                  >
                    {item.label}
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
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
