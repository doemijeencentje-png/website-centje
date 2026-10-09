"use client";

import { useEffect, useRef } from "react";

/**
 * Zachte groene lichtvlek die de muis volgt over een vlak. Zet hem als eerste kind in een
 * `relative isolate overflow-hidden` vlak. Alleen met een muis en zonder "minder beweging";
 * op een telefoon blijft hij onzichtbaar. Beweegt met transform, dus goedkoop.
 */
export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const stage = el?.parentElement;
    if (!el || !stage) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });
    };
    const show = () => el.style.setProperty("opacity", "1");
    const hide = () => el.style.setProperty("opacity", "0");

    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerenter", show);
    stage.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerenter", show);
      stage.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute left-0 top-0 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.26),rgba(0,210,106,0))] opacity-0 transition-opacity duration-500 ${className}`}
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
