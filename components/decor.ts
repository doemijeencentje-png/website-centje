import type { CSSProperties } from "react";

/**
 * Vast stippenpatroon van kleine groene stippen, hetzelfde als achter "Hoe Centje werkt".
 * Hele pixels, zodat het tijdens het scrollen niet trilt.
 */
export const DOTS = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,178,90,0.32) 1.25px, transparent 1.75px), radial-gradient(circle, rgba(0,178,90,0.32) 1.25px, transparent 1.75px)",
  backgroundSize: "12px 20px",
  backgroundPosition: "0 0, 6px 10px",
} as const;

/** Het stippenpatroon, zacht uitlopend volgens een masker (bijvoorbeeld een radial-gradient). */
export function fadedDots(mask: string): CSSProperties {
  return { ...DOTS, maskImage: mask, WebkitMaskImage: mask };
}
