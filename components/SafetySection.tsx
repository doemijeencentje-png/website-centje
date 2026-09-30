import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

// Alle punten komen uit de veelgestelde vragen (gecontroleerd tegen app en voorwaarden).
const POINTS = [
  {
    title: "Met iDEAL",
    text: "Je rondt elke betaling af in de vertrouwde omgeving van je eigen bank.",
  },
  {
    title: "Geverifieerde ontvangers",
    text: "Wie geld ontvangt, is geverifieerd. Zo weet onze betaalpartner altijd wie er achter een account zit.",
  },
  {
    title: "Snel op je rekening",
    text: "Na een betaling gaat het geld naar je gekoppelde rekening, vaak al de eerstvolgende werkdag.",
  },
  {
    title: "Altijd overzicht",
    text: "Je krijgt een melding zodra iemand betaald heeft, en je ziet per persoon wie nog moet betalen.",
  },
];

export function SafetySection() {
  return (
    <section
      id="veilig"
      aria-labelledby="veilig-titel"
      className="relative scroll-mt-16 bg-white py-24 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <div>
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl lg:max-w-[16ch]"
          >
            Veilig betalen, gewoon via je bank
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">
            De betalingen lopen via Online Payment Platform, een betaalinstelling met een vergunning
            van De Nederlandsche Bank.
          </p>

          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:mt-14 sm:grid-cols-2">
            {POINTS.map(({ title, text }) => (
              <li key={title}>
                <span className="font-heading block text-lg font-extrabold leading-tight text-[#0A0C0A]">
                  {title}
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-neutral-600">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-labelledby="kosten-titel"
          id="kosten"
          className="relative flex w-full max-w-sm scroll-mt-24 flex-col self-start rounded-[24px] bg-[#F4F7F5] p-6 sm:p-7 lg:justify-self-end"
        >
          <Image
            src="/merk/logo-munt.webp"
            alt=""
            width={1024}
            height={1024}
            sizes="48px"
            className="pointer-events-none absolute right-6 top-6 h-12 w-12 sm:right-7 sm:top-7"
          />
          <h3 id="kosten-titel" className="text-sm font-semibold text-neutral-500">
            Wat kost Centje?
          </h3>
          <p className="font-heading mt-3 text-5xl font-extrabold leading-none text-[#007F45]">€&nbsp;1</p>
          <p className="mt-2 text-base font-semibold text-[#0A0C0A]">Eenmalig, voor je verificatie</p>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
            Downloaden is gratis. Wat je bij een verzoek afrekent, zie je altijd vooraf in de app.
          </p>
          <Link
            href="/veelgestelde-vragen#account-en-veiligheid"
            className="group mt-4 inline-flex items-center gap-2 self-start rounded-full text-[15px] font-semibold text-[#007F45] outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-offset-4"
          >
            Meer over verificatie
            <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
