import { User } from "@phosphor-icons/react";
import type { FlowId } from "./flows";

type Tone = "dark" | "light" | "mint";

const CIRCLE: Record<Tone, string> = {
  dark: "bg-[#0A0C0A] text-[#00D26A]",
  light: "bg-white text-[#0A0C0A]",
  mint: "bg-[#C4F4DA] text-[#0A0C0A]",
};

/** Rond "poppetje", zoals de persoon-iconen op de knoppen in de app. */
function Person({ tone, style }: { tone: Tone; style: React.CSSProperties }) {
  return (
    <span
      style={style}
      className={`absolute flex aspect-square items-center justify-center rounded-full shadow-[0_16px_34px_-16px_rgba(0,50,25,0.55)] ring-4 ring-[#00D26A] ${CIRCLE[tone]}`}
    >
      <User weight="fill" aria-hidden className="h-[54%] w-[54%] translate-y-[3%]" />
    </span>
  );
}

/**
 * Illustratie rechtsboven in het actieve paneel, boven de tekst: één figuur voor
 * Individueel, een groepje voor Groepscentje. Vaste maten per schermbreedte, zodat
 * de figuren nooit over de kop vallen.
 */
export function PanelArt({ mode }: { mode: FlowId }) {
  if (mode === "individueel") {
    return (
      <span className="absolute right-5 top-5 block h-[112px] w-[112px] sm:right-8 sm:top-7 sm:h-[116px] sm:w-[116px] lg:right-10 lg:top-10 lg:h-[220px] lg:w-[220px]">
        <span className="absolute inset-[-16%] rounded-full border border-[#0A0C0A]/10" />
        <span className="absolute inset-[-36%] rounded-full border border-[#0A0C0A]/[0.06]" />
        <span className="absolute inset-[-60%] rounded-full border border-[#0A0C0A]/[0.04]" />
        <Person tone="dark" style={{ inset: 0 }} />
      </span>
    );
  }

  return (
    <span className="absolute right-4 top-5 block h-[112px] w-[150px] sm:right-7 sm:top-7 sm:h-[118px] sm:w-[158px] lg:right-9 lg:top-9 lg:h-[230px] lg:w-[300px]">
      <Person tone="light" style={{ left: "0%", top: "6%", height: "50%" }} />
      <Person tone="mint" style={{ right: "0%", top: "0%", height: "47%" }} />
      <Person tone="dark" style={{ left: "8%", bottom: "0%", height: "40%" }} />
      <Person tone="light" style={{ right: "6%", bottom: "0%", height: "43%" }} />
      <Person tone="dark" style={{ left: "27%", top: "17%", height: "62%" }} />
    </span>
  );
}
