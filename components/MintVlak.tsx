import { fadedDots } from "./decor";

/**
 * Achtergrond van een sectie: zacht mint met de stippen van "Hoe Centje werkt", boven en onder
 * uitlopend in wit (zoals op /adverteren). De sectie zelf is `relative isolate`.
 */
export function MintVlak() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F2FAF5_14%,#F2FAF5_86%,#FFFFFF_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={fadedDots("linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)")}
      />
    </>
  );
}
