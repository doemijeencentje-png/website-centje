"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, User, UsersThree } from "@phosphor-icons/react";
import { FLOWS, type FlowId } from "./flows";

const ICONS = { individueel: User, groep: UsersThree } as const;
const SHORT_LABEL = { individueel: "1 tegen 1", groep: "Groep" } as const;

// Breedte van een paneel in actieve toestand. Beeld en tekst krijgen die vaste
// breedte, zodat het paneel ze bij het krimpen alleen afdekt in plaats van ze
// te laten meeschalen of opnieuw af te breken.
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
      aria-label="Kies hoe je speelt"
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
            className={`group relative min-w-0 basis-0 overflow-hidden rounded-[28px] bg-[#0A0C0A] text-left outline-none transition-[flex-grow,scale,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-4 focus-visible:ring-[#00D26A]/70 focus-visible:ring-offset-2 ${
              isLeft ? "origin-left" : "origin-right"
            } ${
              active
                ? "scale-100 shadow-[0_28px_70px_-28px_rgba(0,80,40,0.55)]"
                : "scale-[0.96] cursor-pointer hover:scale-[0.975]"
            }`}
          >
            <span
              aria-hidden
              className={`absolute inset-y-0 ${edge} block`}
              style={{ width: ACTIVE_WIDTH }}
            >
              <Image
                src={flow.photo.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 740px, (min-width: 640px) 64vw, 76vw"
                className={`object-cover transition-[filter,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active
                    ? "scale-100"
                    : "scale-105 brightness-[0.5] grayscale group-hover:brightness-[0.62]"
                }`}
                style={{ objectPosition: flow.photo.position }}
              />
            </span>

            <span
              aria-hidden
              className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/5 transition-opacity duration-700 ${
                active ? "opacity-100" : "opacity-70"
              }`}
            />

            {/* Actief: omschrijving van de speelvorm */}
            <span
              className={`absolute bottom-0 ${edge} block p-5 transition-[opacity,translate] sm:p-8 lg:p-10 ${
                active
                  ? "translate-y-0 opacity-100 duration-500 delay-300"
                  : "pointer-events-none translate-y-3 opacity-0 duration-150"
              }`}
              style={{ width: ACTIVE_WIDTH }}
            >
              <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85 sm:text-sm">
                <Icon weight="bold" className="h-4 w-4" aria-hidden />
                {flow.tagline}
              </span>
              <span
                id={`tab-${flow.id}-naam`}
                className="font-heading mt-2 block text-[26px] font-extrabold leading-[1.02] text-white sm:mt-3 sm:text-4xl lg:text-5xl"
              >
                {flow.label}
              </span>
              <span className="mt-3 hidden max-w-[42ch] text-base leading-relaxed text-white/85 sm:block">
                {flow.summary}
              </span>
            </span>

            {/* Inactief: korte uitnodiging om te wisselen */}
            <span
              aria-hidden
              className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity sm:p-8 ${
                isLeft ? "items-start" : "items-end text-right"
              } ${active ? "opacity-0 duration-150" : "opacity-100 duration-300 delay-300"}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-colors group-hover:bg-white/25 sm:h-14 sm:w-14">
                <Icon weight="bold" className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <span className="font-heading mt-3 block text-[15px] font-extrabold leading-tight text-white sm:hidden">
                {SHORT_LABEL[flow.id]}
              </span>
              <span className="font-heading mt-4 hidden text-2xl font-extrabold leading-tight text-white sm:block">
                {flow.label}
              </span>
              <span className="mt-1.5 hidden items-center gap-1.5 text-sm font-medium text-white/75 sm:inline-flex">
                Bekijk hoe het werkt
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
