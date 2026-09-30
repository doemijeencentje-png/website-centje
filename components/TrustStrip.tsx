const FACTS = [
  { title: "Betalen met iDEAL", text: "Je rondt af in je eigen bank-app." },
  { title: "Geen app nodig", text: "Je vrienden doen mee via een link." },
  { title: "Eerlijk spel", text: "Iedereen één poging, op hetzelfde level." },
  { title: "Veilig geregeld", text: "Via een betaalinstelling met een DNB-vergunning." },
];

// Scheidingslijnen per vak: 2 x 2 op telefoon en tablet, 4 naast elkaar vanaf 1024px.
const CELL = [
  "pr-5 lg:pr-8",
  "border-l pl-5 lg:px-8",
  "border-t pr-5 lg:border-l lg:border-t-0 lg:px-8",
  "border-l border-t pl-5 lg:border-t-0 lg:pl-8",
];

/** Vier feiten direct onder de hero; de details staan verderop op de pagina. */
export function TrustStrip() {
  return (
    <section aria-label="Centje in het kort" className="border-b border-[#E3EAE6] bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {FACTS.map(({ title, text }, index) => (
          <li key={title} className={`border-[#E3EAE6] py-7 lg:py-10 ${CELL[index]}`}>
            <span className="font-heading block text-[17px] font-extrabold leading-tight text-[#0A0C0A] sm:text-lg">
              {title}
            </span>
            <span className="mt-1.5 block text-sm leading-snug text-neutral-500 sm:text-[15px]">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
