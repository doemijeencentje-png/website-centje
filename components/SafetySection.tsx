import Image from "next/image";
import { IPhoneFrame } from "./IPhoneFrame";

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
      className="relative scroll-mt-16 overflow-x-clip bg-white py-16 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl lg:max-w-[16ch]"
          >
            Veilig betalen, gewoon via je bank
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-neutral-700 sm:mt-6 sm:text-lg">
            De betalingen lopen via Online Payment Platform, een betaalinstelling met een vergunning
            van De Nederlandsche Bank.
          </p>

          <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-9">
            {POINTS.map(({ title, text }) => (
              <li key={title}>
                <span className="font-heading block text-lg font-extrabold leading-tight text-[#0A0C0A] sm:text-[22px]">
                  {title}
                </span>
                <span className="mt-2 block max-w-[48ch] text-base leading-[1.6] text-neutral-700 sm:text-[17px]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Het moment na het betalen, met eronder wat Centje kost. */}
        <div className="relative mx-auto w-full max-w-[340px]">
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

          {/* Wat Centje kost: hetzelfde groene vlak als "Je vrienden hebben geen app nodig", maar kleiner,
              over de lege onderkant van het scherm. */}
          <aside
            aria-labelledby="kosten-titel"
            id="kosten"
            className="relative mx-auto -mt-14 flex w-full max-w-[320px] scroll-mt-24 items-center gap-4 rounded-[24px] bg-[#00D26A] p-5 shadow-[0_24px_50px_-24px_rgba(0,90,45,0.55)] sm:p-7"
          >
            <div className="min-w-0 flex-1">
              <h3
                id="kosten-titel"
                className="font-heading text-[22px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-2xl"
              >
                Wat kost Centje?
              </h3>
              <p className="mt-2 text-pretty text-base font-medium leading-[1.5] text-[#0A0C0A]/80">
                De app is gratis. Voor je verificatie betaal je eenmalig{" "}
                <strong className="font-bold text-[#0A0C0A]">€&nbsp;1</strong>.
              </p>
            </div>
            <Image
              src="/merk/logo-munt.webp"
              alt=""
              width={1024}
              height={1024}
              sizes="64px"
              loading="eager"
              fetchPriority="low"
              className="pointer-events-none h-12 w-12 shrink-0 drop-shadow-[0_10px_18px_rgba(0,60,30,0.3)] sm:h-16 sm:w-16"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
