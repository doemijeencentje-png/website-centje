/**
 * Achtergrond van een sectie: zacht doorschijnend mint, boven en onder uitlopend, zodat het
 * stippenraster van de site (SiteDotField) erdoorheen schijnt. De sectie zelf is `relative isolate`.
 */
export function MintVlak() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(242,250,245,0)_0%,rgba(242,250,245,0.75)_14%,rgba(242,250,245,0.75)_86%,rgba(242,250,245,0)_100%)]"
    />
  );
}
