"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import type { FaqItem } from "./faq";

export function FaqList({ items, defaultOpen }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <ul className="divide-y divide-[#E3EAE6] overflow-hidden rounded-[24px] bg-white ring-1 ring-[#E3EAE6]">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-vraag-${index}`;
        const panelId = `${baseId}-antwoord-${index}`;
        return (
          <li key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left outline-none transition-colors hover:bg-[#F6F9F7] focus-visible:bg-[#F6F9F7] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A] sm:px-7 sm:py-6"
              >
                <span className="text-base font-semibold leading-snug text-[#0A0C0A] sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,rotate] duration-300 ${
                    expanded ? "rotate-45 bg-[#00D26A] text-[#0A0C0A]" : "bg-[#EEF3F0] text-neutral-600"
                  }`}
                >
                  <Plus weight="bold" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!expanded}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 px-5 pb-6 text-[15px] leading-relaxed text-neutral-600 sm:px-7 sm:text-base">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
