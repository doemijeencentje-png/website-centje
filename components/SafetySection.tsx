import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { GroenKader } from "./GroenKader";
import { IPhoneFrame } from "./IPhoneFrame";
import { MintVlak } from "./MintVlak";

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
    text: "Na een betaling wordt het geld direct overgemaakt en staat het binnen een paar seconden op je gekoppelde rekening.",
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
      className="relative isolate scroll-mt-16 overflow-x-clip py-24 sm:py-32 lg:scroll-mt-[72px]"
    >
      <MintVlak />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <GroenKader>
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[30px] font-extrabold leading-[1.08] text-[#0A0C0A] sm:text-[40px]"
          >
            Veilig betalen, gewoon via je bank
          </h2>
          <p className="mt-6 max-w-[48ch] text-base leading-[1.75] text-neutral-600 sm:text-[17px]">
            De betalingen lopen via Online Payment Platform, een betaalinstelling met een vergunning
            van De Nederlandsche Bank.
          </p>

          <ul className="mt-10 space-y-7">
            {POINTS.map(({ title, text }) => (
              <li key={title}>
                <span className="block text-base font-semibold text-[#0A0C0A] sm:text-[17px]">{title}</span>
                <span className="mt-1.5 block max-w-[50ch] text-[15px] leading-[1.7] text-neutral-600">{text}</span>
              </li>
            ))}
          </ul>
        </GroenKader>

        {/* Het moment na het betalen, met eronder wat Centje kost. Eigen laag (isolate), zodat de gloed zichtbaar is. */}
        <div className="relative isolate mx-auto w-full max-w-[340px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-[36%] -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.2),rgba(0,210,106,0))]"
          />
          {/* Eigen laag: de knoppen en balk van het toestel blijven onder het blokje eronder. */}
          <div className="isolate mx-auto w-[250px] sm:w-[270px]">
            <IPhoneFrame>
              <Image
                src="/app/bedankscherm.webp"
                alt="Bedankscherm na een betaling: Sanne bedankt je dat je hebt betaald, betaald bedrag 14 euro"
                fill
                quality={90}
                loading="eager"
                fetchPriority="low"
                sizes="(min-width: 640px) 270px, 250px"
                className="object-cover object-top"
              />
            </IPhoneFrame>
          </div>

          {/* Schuift over de lege onderkant van het scherm, onder het betaalde bedrag. */}
          <aside
            aria-labelledby="kosten-titel"
            id="kosten"
            className="relative -mt-16 flex scroll-mt-24 flex-col rounded-[24px] bg-white p-6 shadow-[0_2px_6px_rgba(10,12,10,0.06),0_30px_70px_-28px_rgba(10,40,25,0.45)] sm:p-7"
          >
            <Image
              src="/merk/logo-munt.webp"
              alt=""
              width={1024}
              height={1024}
              sizes="44px"
              className="pointer-events-none absolute right-6 top-6 h-11 w-11 sm:right-7 sm:top-7"
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
      </div>
    </section>
  );
}
