"use client";

import { useRef } from "react";
import { User, UsersThree } from "@phosphor-icons/react";
import { FLOWS, type FlowId } from "./flows";

const ICONS = { individueel: User, groep: UsersThree } as const;

interface ModeSwitcherProps {
  mode: FlowId;
  onChange: (mode: FlowId) => void;
}

/**
 * Keuze tussen de twee speelvormen, in de vorm van het venster "Nieuw verzoek" uit de app: een witte
 * kaart met twee uitgerekte, ronde groene knoppen. De gekozen knop is vol groen, de andere wit met een
 * groene rand. Ernaast staat wat de gekozen speelvorm inhoudt.
 */
export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const flow = FLOWS.find((f) => f.id === mode) ?? FLOWS[0];

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const last = FLOWS.length - 1;
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : forward
            ? (index + 1) % FLOWS.length
            : (index + last) % FLOWS.length;
    onChange(FLOWS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16">
      {/* Het venster uit de app */}
      <div className="rounded-[32px] bg-white p-6 shadow-[0_2px_6px_rgba(10,12,10,0.05),0_30px_70px_-30px_rgba(0,90,45,0.35)] ring-1 ring-black/5 sm:p-8">
        <p className="font-heading text-center text-[26px] font-extrabold leading-tight text-[#00B85C] sm:text-3xl">
          Nieuw verzoek
        </p>
        <div role="tablist" aria-label="Kies hoe je speelt" aria-orientation="vertical" className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
          {FLOWS.map((f, index) => {
            const active = f.id === mode;
            const Icon = ICONS[f.id];
            return (
              <button
                key={f.id}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={active}
                aria-controls="stappen-flow"
                tabIndex={active ? 0 : -1}
                onClick={() => onChange(f.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`flex h-16 w-full items-center justify-center gap-3 rounded-full text-lg font-semibold outline-none transition-[background-color,color,box-shadow,transform] duration-300 focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98] sm:h-[72px] sm:text-xl ${
                  active
                    ? "bg-[linear-gradient(90deg,#00B84D_0%,#12C65C_55%,#2ECF70_100%)] text-white shadow-[0_16px_32px_-14px_rgba(0,150,65,0.7)]"
                    : "bg-white text-[#00A852] ring-2 ring-inset ring-[#00C853]/35 hover:bg-[#F0FBF4]"
                }`}
              >
                <Icon weight="bold" aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wat de gekozen speelvorm inhoudt */}
      <div key={mode} className="stap-in min-h-[7.5rem] lg:min-h-0">
        <p className="font-heading text-[26px] font-extrabold leading-tight text-[#0A0C0A] sm:text-4xl">{flow.label}</p>
        <p className="mt-3 max-w-[44ch] text-[17px] leading-[1.6] text-neutral-700 sm:text-xl">{flow.summary}</p>
      </div>
    </div>
  );
}
