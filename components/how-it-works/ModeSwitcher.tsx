"use client";

import { useRef } from "react";
import { User, UsersThree } from "@phosphor-icons/react";
import { FLOWS, type FlowId } from "./flows";
import { PanelArt } from "./PanelArt";

const ICONS = { individueel: User, groep: UsersThree } as const;
// Harde spaties: in het smalle paneel blijft het label op één regel.
const SHORT_LABEL = { individueel: "1\u00a0op\u00a01", groep: "Groep" } as const;

// Breedte van een paneel in actieve toestand. De tekst krijgt die vaste breedte, zodat
// het paneel hem bij het krimpen alleen afdekt in plaats van hem opnieuw af te breken.
const ACTIVE_WIDTH = "calc((100cqw - var(--gap)) * var(--grow) / (var(--grow) + 1))";

interface ModeSwitcherProps {
  mode: FlowId;
  onChange: (mode: FlowId) => void;
}

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const last = FLOWS.length - 1;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : event.key === "ArrowRight"
            ? (index + 1) % FLOWS.length
            : (index + last) % FLOWS.length;
    onChange(FLOWS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Kies hoe u speelt"
      className="@container flex h-[280px] gap-3 [--gap:0.75rem] [--grow:2.6] sm:h-[380px] sm:gap-4 sm:[--gap:1rem] sm:[--grow:1.8] lg:h-[440px]"
    >
      {FLOWS.map((flow, index) => {
        const active = flow.id === mode;
        const Icon = ICONS[flow.id];
        const isLeft = index === 0;
        const edge = isLeft ? "left-0" : "right-0";

        return (
          <button
            key={flow.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${flow.id}`}
            aria-selected={active}
            aria-controls="stappen-flow"
            aria-labelledby={`tab-${flow.id}-naam`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(flow.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            style={{ flexGrow: active ? "var(--grow)" : 1 }}
            className={`group relative isolate min-w-0 basis-0 overflow-hidden rounded-[28px] text-left outline-none transition-[flex-grow,scale,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-4 focus-visible:ring-[#00D26A]/70 focus-visible:ring-offset-2 ${
              isLeft ? "origin-left" : "origin-right"
            } ${
              active
                ? "scale-100 bg-[#00D26A] shadow-[0_30px_70px_-30px_rgba(0,120,60,0.6)]"
                : "scale-[0.96] cursor-pointer bg-[#0A0C0A] hover:scale-[0.975]"
            }`}
          >
            {/* Zachte lichtval over het groene vlak */}
            <span
              aria-hidden
              className={`absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_80%_20%,rgba(255,255,255,0.28),rgba(255,255,255,0)_55%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,70,35,0.18))] transition-opacity duration-700 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Illustratie: alleen in het actieve paneel */}
            <span
              aria-hidden
              className={`absolute inset-0 -z-10 transition-[opacity,scale] ${
                active
                  ? "scale-100 opacity-100 duration-700 delay-200"
                  : "hidden scale-[0.8] opacity-25 duration-300 sm:block"
              } ${isLeft ? "origin-right" : "origin-center"}`}
            >
              <PanelArt mode={flow.id} />
            </span>

            {/* Actief: omschrijving van de speelvorm */}
            <span
              className={`absolute bottom-0 ${edge} block p-5 transition-[opacity,translate] sm:p-8 lg:p-10 ${
                active
                  ? "translate-y-0 opacity-100 duration-500 delay-300"
                  : "pointer-events-none translate-y-3 opacity-0 duration-150"
              }`}
              style={{ width: ACTIVE_WIDTH }}
            >
              <span
                id={`tab-${flow.id}-naam`}
                className="font-heading block text-[clamp(18px,calc(9cqw_-_7px),26px)] font-extrabold leading-[1.02] text-[#0A0C0A] sm:mt-3 sm:text-4xl lg:text-5xl"
              >
                {flow.label}
              </span>
              <span className="mt-3 hidden max-w-[40ch] text-[17px] font-medium leading-relaxed text-[#0A0C0A]/75 sm:block">
                {flow.summary}
              </span>
            </span>

            {/* Inactief: korte uitnodiging om te wisselen */}
            <span
              aria-hidden
              className={`absolute inset-0 flex flex-col justify-center p-4 transition-opacity sm:justify-end sm:p-8 ${
                isLeft ? "items-start" : "items-end text-right"
              } ${active ? "opacity-0 duration-150" : "opacity-100 duration-300 delay-300"}`}
            >
              <Icon
                weight="bold"
                className="h-7 w-7 text-white transition-colors group-hover:text-[#00D26A] sm:h-8 sm:w-8"
              />
              <span className="font-heading mt-3 block text-[15px] font-extrabold leading-tight text-white sm:hidden">
                {SHORT_LABEL[flow.id]}
              </span>
              <span className="font-heading mt-4 hidden text-2xl font-extrabold leading-tight text-white sm:block">
                {flow.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
