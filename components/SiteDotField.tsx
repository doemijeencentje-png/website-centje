"use client";

import { useEffect, useRef } from "react";

// Stippen op een raster van 16 px; de groene laag valt precies op de grijze.
const CELL = 16;
// Straal in px van het gebied rond de muis waarin de stippen groen worden.
const REVEAL = 200;
const dots = (color: string, radius: number) =>
  `radial-gradient(circle, ${color} ${radius}px, transparent ${radius + 0.5}px)`;
const mod = (value: number) => ((value % CELL) + CELL) % CELL;

/**
 * Licht stippenraster achter de hele site, vast in beeld. Met de muis erboven kleuren de stippen
 * rond de aanwijzer groen en schuift er een zachte groene lichtvlek mee, zoals in de hero.
 * Alleen zichtbaar waar een sectie geen eigen achtergrond heeft. De groene laag is een klein vlak
 * dat met transform meebeweegt, dus elke muisbeweging kost weinig.
 */
export function SiteDotField() {
  const blob = useRef<HTMLDivElement>(null);
  const lit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = blob.current;
    const spot = lit.current;
    if (!light || !spot) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const left = Math.round(x - REVEAL);
      const top = Math.round(y - REVEAL);
      spot.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      spot.style.backgroundPosition = `${-mod(left)}px ${-mod(top)}px`;
    };
    const show = (on: boolean) => {
      light.style.opacity = on ? "1" : "0";
      spot.style.opacity = on ? "1" : "0";
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      show(true);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // Muis het venster uit: lichtvlek weg.
    const out = (event: MouseEvent) => {
      if (!event.relatedTarget) show(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseout", out);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: dots("rgba(10,12,10,0.085)", 1), backgroundSize: `${CELL}px ${CELL}px` }}
      />
      <div
        ref={blob}
        className="absolute left-0 top-0 h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(closest-side, rgba(0,210,106,0.11), rgba(0,210,106,0))",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={lit}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-500"
        style={{
          width: REVEAL * 2,
          height: REVEAL * 2,
          backgroundImage: dots("rgba(0,184,92,0.85)", 1.25),
          backgroundSize: `${CELL}px ${CELL}px`,
          maskImage: "radial-gradient(closest-side, #000 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, #000 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
