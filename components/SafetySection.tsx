import Image from "next/image";
import { IPhoneFrame } from "./IPhoneFrame";

const DNB_REGISTER = "https://www.dnb.nl/openbaar-register/";

// Vier kaarten, met de officiële merken erbij waar dat kan. Alle punten komen uit de
// veelgestelde vragen (gecontroleerd tegen app en voorwaarden).
const CARD = "flex flex-col gap-5 rounded-[24px] border border-[#E3EAE6] bg-white p-6 sm:p-7";
const TITLE = "font-heading text-[22px] font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl";
const TEXT = "text-base leading-[1.6] text-neutral-700 sm:text-[17px]";

export function SafetySection() {
  return (
    <section
      id="veilig"
      aria-labelledby="veilig-titel"
      className="relative scroll-mt-16 overflow-x-clip bg-white py-16 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-[56px]"
          >
            Veilig betalen, gewoon via je bank
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-neutral-700 sm:mt-6 sm:text-lg">
            De betalingen lopen via Online Payment Platform, een betaalinstelling met een vergunning
            van De Nederlandsche Bank.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className={CARD}>
              <Image src="/merk/ideal-wero.svg" alt="iDEAL | Wero" width={40} height={26} unoptimized className="h-14 w-auto self-start rounded-[8px]" />
              <span>
                <span className={TITLE}>Met iDEAL | Wero</span>
                <span className={`mt-2 block ${TEXT}`}>
                  Je rondt elke betaling af in de vertrouwde omgeving van je eigen bank.
                </span>
              </span>
            </li>
            <li className={CARD}>
              <span className="flex h-14 items-center gap-3">
                <Image src="/merk/opp-merk.svg" alt="" width={256} height={256} unoptimized className="h-12 w-12" />
                <span className="font-semibold leading-tight text-[#4642FF]">
                  Online Payment
                  <br />
                  Platform
                </span>
              </span>
              <span>
                <span className={TITLE}>Geverifieerde ontvangers</span>
                <span className={`mt-2 block ${TEXT}`}>
                  Wie geld ontvangt, is geverifieerd door onze betaalpartner. Zo is altijd bekend wie
                  er achter een account zit.
                </span>
              </span>
            </li>
            <li className={CARD}>
              <span className="font-heading flex h-14 items-center text-[40px] font-extrabold leading-none text-[#00A855]">
                Direct
              </span>
              <span>
                <span className={TITLE}>Snel op je rekening</span>
                <span className={`mt-2 block ${TEXT}`}>
                  Na een betaling wordt het geld direct overgemaakt en staat het binnen een paar
                  seconden op je gekoppelde rekening. Je krijgt een melding zodra iemand betaald heeft.
                </span>
              </span>
            </li>
            <li className={CARD}>
              <span className="font-heading flex h-14 items-center text-[40px] font-extrabold leading-none text-[#0A0C0A]">
                DNB
              </span>
              <span>
                <span className={TITLE}>Onder toezicht</span>
                <span className={`mt-2 block ${TEXT}`}>
                  OPP is een betaalinstelling met een vergunning van De Nederlandsche Bank.{" "}
                  <a
                    href={DNB_REGISTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-2 inline-block py-2 font-semibold text-[#007F45] underline-offset-2 hover:underline"
                  >
                    Bekijk het register
                  </a>
                  .
                </span>
              </span>
            </li>
          </ul>

          {/* Het moment na het betalen, met eronder wat Centje kost. Eigen laag (isolate), zodat de gloed zichtbaar is. */}
          <div className="relative isolate mx-auto w-full max-w-[340px] lg:mx-0 lg:justify-self-end">
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
      </div>
    </section>
  );
}
