const FACTS = [
  { title: "Betalen met iDEAL", text: "Je rondt af in je eigen bank-app." },
  { title: "Geen app nodig", text: "Je vrienden doen mee via een link." },
  { title: "Eerlijk spel", text: "Iedereen één poging, op hetzelfde level." },
  { title: "Veilig geregeld", text: "Via een betaalinstelling met een DNB-vergunning." },
];

/**
 * Vier feiten direct onder de hero, als vier gelijke vakken in één paneel. De scheidingslijnen
 * zijn de 1px-tussenruimte van het raster; de details staan verderop op de pagina.
 */
export function TrustStrip() {
  return (
    <section aria-label="Centje in het kort" className="bg-white px-4 pb-4 pt-10 sm:px-6 sm:pt-14 lg:pt-16">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#E3EAE6] ring-1 ring-[#E3EAE6] lg:grid-cols-4">
        {FACTS.map(({ title, text }) => (
          <li key={title} className="bg-[#F6F8F7] px-5 py-6 sm:px-8 sm:py-8">
            <span className="font-heading block text-base font-extrabold leading-tight text-[#0A0C0A] sm:text-lg">
              {title}
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-neutral-600 sm:text-[15px]">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
