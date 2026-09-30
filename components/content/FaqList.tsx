"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import type { FaqItem } from "./faq";

export function FaqList({ items, defaultOpen }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <ul className="divide-y divide-[#E3EAE6]">
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
                className="group flex w-full items-center justify-between gap-6 rounded-lg py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-offset-4 sm:py-6"
              >
                <span className="text-base font-semibold leading-snug text-[#0A0C0A] transition-colors group-hover:text-[#007F45] sm:text-lg">
                  {item.question}
                </span>
                <Plus
                  weight="bold"
                  aria-hidden
                  className={`h-5 w-5 shrink-0 transition-[color,rotate] duration-300 ${
                    expanded ? "rotate-45 text-[#007F45]" : "text-neutral-500 group-hover:text-[#007F45]"
                  }`}
                />
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
                <div className="max-w-[62ch] space-y-3 pb-6 text-[15px] leading-relaxed text-neutral-600 sm:text-base">
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
