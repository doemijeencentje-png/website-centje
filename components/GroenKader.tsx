"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

/*
 * Kaart met een groene rand die oplicht aan de kant waar de muis is, zoals de uitleg
 * op de oude site (CentjeCard met GlowingEffect). Alleen op schermen met een muis en
 * zonder "minder beweging"; anders blijft het een rustige witte kaart met groene rand.
 * Verschil met de oude versie: geen background-attachment: fixed, want dat laat de
 * browser bij elke scrollstap opnieuw tekenen.
 */

const SPREAD = 40; // halve breedte van de oplichtende boog, in graden
const PROXIMITY = 64; // tot zo ver buiten de kaart reageert de rand op de muis
const INACTIVE_ZONE = 0.01;
const BORDER = 2;

const GRADIENT = [
  "radial-gradient(circle, #00D26A 10%, #00D26A00 20%)",
  "radial-gradient(circle at 40% 40%, #00FF7F 5%, #00FF7F00 15%)",
  "radial-gradient(circle at 60% 60%, #00A855 10%, #00A85500 20%)",
  "radial-gradient(circle at 40% 60%, #00B050 10%, #00B05000 20%)",
  "repeating-conic-gradient(from 236.84deg at 50% 50%, #00D26A 0%, #00FF7F 5%, #00A855 10%, #00B050 15%, #00D26A 20%)",
].join(", ");

function Gloeirand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let last = { x: -9999, y: -9999 };
    let turning: ReturnType<typeof animate> | undefined;

    const update = (point?: { x: number; y: number }) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (point) last = point;
        const { left, top, width, height } = element.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;
        if (Math.hypot(last.x - cx, last.y - cy) < 0.5 * Math.min(width, height) * INACTIVE_ZONE) {
          element.style.setProperty("--active", "0");
          return;
        }
        const active =
          last.x > left - PROXIMITY &&
          last.x < left + width + PROXIMITY &&
          last.y > top - PROXIMITY &&
          last.y < top + height + PROXIMITY;
        element.style.setProperty("--active", active ? "1" : "0");
        if (!active) return;
        const current = parseFloat(element.style.getPropertyValue("--start")) || 0;
        const target = (180 * Math.atan2(last.y - cy, last.x - cx)) / Math.PI + 90;
        const diff = ((target - current + 180) % 360) - 180;
        turning?.stop();
        turning = animate(current, current + diff, {
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => element.style.setProperty("--start", String(value)),
        });
      });
    };

    const onPointer = (event: PointerEvent) => update({ x: event.clientX, y: event.clientY });
    const onScroll = () => update();
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      turning?.stop();
      document.body.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={
        {
          "--start": "0",
          "--active": "0",
          "--spread": SPREAD,
          "--rand": `${BORDER}px`,
          "--gradient": GRADIENT,
        } as React.CSSProperties
      }
    >
      <div className="rounded-[inherit] after:absolute after:inset-[calc(-1*var(--rand))] after:rounded-[inherit] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:content-[''] after:[background:var(--gradient)] after:[border:var(--rand)_solid_transparent] after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]" />
    </div>
  );
}

export function GroenKader({
  children,
  className = "",
  padding = "p-7 sm:p-10 lg:p-12",
}: {
  children: React.ReactNode;
  className?: string;
  /** Binnenruimte van de kaart; lijsten met eigen ruimte (vragen, stappen) krijgen minder. */
  padding?: string;
}) {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setGlow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={`relative rounded-[28px] ${className}`}>
      {glow ? <Gloeirand /> : null}
      <div className={`relative rounded-[28px] border border-[#CDEFDB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,210,106,0.06)] ${padding}`}>
        {children}
      </div>
    </div>
  );
}
