import { Bank, LinkSimple, Scales, ShieldCheck } from "@phosphor-icons/react/ssr";

const FACTS = [
  { icon: Bank, title: "Betalen met iDEAL", text: "Je rondt af in je eigen bank-app." },
  { icon: LinkSimple, title: "Geen app nodig", text: "Je vrienden doen mee via een link." },
  { icon: Scales, title: "Eerlijk spel", text: "Iedereen één poging, op hetzelfde level." },
  { icon: ShieldCheck, title: "Veilig geregeld", text: "Via een betaalinstelling met een DNB-vergunning." },
];

/** Vier feiten direct onder de hero; de details staan verderop op de pagina. */
export function TrustStrip() {
  return (
    <section aria-label="Centje in het kort" className="border-b border-[#E3EAE6] bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-7 px-4 py-9 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#E3EAE6] lg:py-11">
        {FACTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:px-7 lg:first:pl-0 lg:last:pr-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F8EE] text-[#007F45]">
              <Icon weight="bold" aria-hidden className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold text-[#0A0C0A]">{title}</span>
              <span className="mt-1 block text-sm leading-snug text-neutral-500">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
