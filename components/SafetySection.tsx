import Image from "next/image";
import { IPhoneFrame } from "./IPhoneFrame";

const DNB_REGISTER = "https://www.dnb.nl/openbaar-register/";

// Drie merken, elk met één regel. Geen uitleg: het logo zegt het.
const CARD =
  "flex items-center gap-6 rounded-[24px] border border-[#E3EAE6] bg-white p-5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,60,30,0.35)] sm:p-6";
const MARK = "flex h-16 w-24 shrink-0 items-center justify-center";
const TITLE = "font-heading text-[22px] font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl";

export function SafetySection() {
  return (
    <section
      id="veilig"
      aria-labelledby="veilig-titel"
      className="relative scroll-mt-16 overflow-x-clip bg-white py-16 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <div>
          <h2
            id="veilig-titel"
            className="font-heading text-balance text-[36px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-[56px]"
          >
            Veilig betalen, gewoon via je bank
          </h2>

          <ul className="mt-10 space-y-4 sm:mt-12">
            <li className={CARD}>
              <span className={MARK}>
                <Image src="/merk/ideal-wero.svg" alt="" width={40} height={26} unoptimized className="h-16 w-auto rounded-[8px]" />
              </span>
              <span className={TITLE}>Betalen met iDEAL | Wero</span>
            </li>
            <li className={CARD}>
              <span className={MARK}>
                <Image src="/merk/opp-merk.svg" alt="" width={256} height={256} unoptimized className="h-16 w-16" />
              </span>
              <span className={TITLE}>
                Betaalpartner <span className="text-[#4642FF]">Online Payment Platform</span>
              </span>
            </li>
            <li className={CARD}>
              <span className={`${MARK} font-heading text-[30px] font-extrabold leading-none text-[#0A0C0A]`}>DNB</span>
              <span className={TITLE}>
                OPP staat onder toezicht van De Nederlandsche Bank{" "}
                <a
                  href={DNB_REGISTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2 inline-block py-2 text-base font-semibold text-[#007F45] underline-offset-2 hover:underline"
                >
                  Register
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Het moment na het betalen, met eronder wat Centje kost. Eigen laag (isolate), zodat de gloed zichtbaar is. */}
        <div className="relative isolate mx-auto w-full max-w-[340px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-[36%] -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.24),rgba(0,210,106,0))]"
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
