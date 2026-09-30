const FACTS = [
  { title: "Betalen met iDEAL", text: "Je rondt af in je eigen bank-app." },
  { title: "Geen app nodig", text: "Je vrienden doen mee via een link." },
  { title: "Eerlijk spel", text: "Iedereen één poging, op hetzelfde level." },
  { title: "Veilig geregeld", text: "Via een betaalinstelling met een DNB-vergunning." },
];

/** Vier feiten direct onder de hero, zonder vakken of lijnen; de details staan verderop. */
export function TrustStrip() {
  return (
    <section aria-label="Centje in het kort" className="bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-4 lg:gap-x-12">
        {FACTS.map(({ title, text }) => (
          <li key={title}>
            <span className="font-heading block text-base font-extrabold leading-tight text-[#0A0C0A] sm:text-lg">
              {title}
            </span>
            <span className="mt-2 block max-w-[26ch] text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
