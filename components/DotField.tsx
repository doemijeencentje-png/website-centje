"use client";

import { useEffect, useRef } from "react";

// Eén stip per vakje van 16 px; de groene laag ligt precies op de grijze.
const GRID = "16px 16px";
const dots = (color: string, radius: number) =>
  `radial-gradient(circle, ${color} ${radius}px, transparent ${radius + 0.5}px)`;

/**
 * Stippenraster als achtergrond van een vlak. Met de muis erboven kleuren de stippen rond de
 * aanwijzer groen en schuift er een zachte groene lichtvlek mee. Zet het als eerste kind in een
 * `relative isolate overflow-hidden` vlak. Alleen met een muis en zonder "minder beweging";
 * anders blijft het een rustig grijs raster.
 */
export function DotField({
  className = "",
  fade,
  reveal = 200,
  glow = 620,
  glowAlpha = 0.26,
}: {
  className?: string;
  /** Masker voor het grijze raster, bijvoorbeeld zodat het naar één kant uitloopt. */
  fade?: string;
  /** Straal in px van het gebied waarin de stippen groen worden. */
  reveal?: number;
  /** Doorsnede in px van de lichtvlek. */
  glow?: number;
  glowAlpha?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const green = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const stage = el?.parentElement;
    if (!el || !stage || !blob.current || !green.current) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const light = blob.current;
    const lit = green.current;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const show = (on: boolean) => () => {
      light.style.opacity = on ? "1" : "0";
      lit.style.opacity = on ? "1" : "0";
    };
    const enter = show(true);
    const leave = show(false);

    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  const spot = `radial-gradient(circle ${reveal}px at var(--mx) var(--my), #000 0%, transparent 100%)`;

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] ${className}`}
      style={{ "--mx": "-9999px", "--my": "-9999px" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: dots("rgba(10,12,10,0.13)", 1), backgroundSize: GRID, maskImage: fade, WebkitMaskImage: fade }}
      />
      <div
        ref={blob}
        className="absolute left-0 top-0 rounded-full opacity-0 transition-opacity duration-500"
        style={{
          width: glow,
          height: glow,
          background: `radial-gradient(closest-side, rgba(0,210,106,${glowAlpha}), rgba(0,210,106,0))`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={green}
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{ backgroundImage: dots("rgba(0,184,92,0.9)", 1.25), backgroundSize: GRID, maskImage: spot, WebkitMaskImage: spot }}
      />
    </div>
  );
}
