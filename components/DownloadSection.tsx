import Image from "next/image";
import { AndroidLogo, AppleLogo } from "@phosphor-icons/react/ssr";
import { APP_STORE_URL } from "@/lib/links";
import { IPhoneFrame } from "./IPhoneFrame";

// Beelden laden meteen mee (met lage voorrang), zodat ze klaarstaan als je hier bent.
const EARLY = { loading: "eager", fetchPriority: "low" } as const;

/** Kleine vlag van gewone vlakken (geen emoji: die tonen niet overal hetzelfde). */
function Vlag({ land }: { land: "nl" | "be" }) {
  const banen = land === "nl" ? ["bg-[#AE1C28]", "bg-white", "bg-[#21468B]"] : ["bg-black", "bg-[#FDDA24]", "bg-[#EF3340]"];
  return (
    <span
      aria-hidden
      className={`flex h-3 w-[18px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-white/25 ${
        land === "nl" ? "flex-col" : "grayscale"
      }`}
    >
      {banen.map((kleur) => (
        <span key={kleur} className={`flex-1 ${kleur}`} />
      ))}
    </span>
  );
}

/** Waar Centje nu is en wat eraan komt. Wat nog komt staat bewust klein en grijs: een plaagstootje. */
function Beschikbaar({ binnenkort = false, children }: { binnenkort?: boolean; children: React.ReactNode }) {
  return (
    <li
      className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-[13px] font-medium ${
        binnenkort
          ? "border border-dashed border-white/15 text-white/40"
          : "bg-white/[0.07] text-white/85 ring-1 ring-inset ring-white/15"
      }`}
    >
      {children}
    </li>
  );
}

/** Downloadblok onderaan elke pagina; het doel van elke "Download de app"-knop. */
export function DownloadSection() {
  return (
    <section
      id="download"
      data-kop="donker"
      aria-labelledby="download-titel"
      className="relative isolate scroll-mt-16 overflow-hidden bg-[#0A0C0A] text-white lg:scroll-mt-[72px]"
    >
      <div
        aria-hidden
        className="absolute -right-40 top-1/2 -z-10 h-[820px] w-[820px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-32">
        <div>
          <h2
            id="download-titel"
            className="font-heading text-balance text-[36px] font-extrabold leading-[1.02] sm:text-5xl xl:text-[56px]"
          >
            Download Centje. <span className="text-[#00D26A]">Betaal leuker.</span>
          </h2>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-white/70 sm:text-lg">
            Stuur vandaag nog je eerste challenge. Centje is er voor iPhone, en je vrienden hebben
            de app niet eens nodig.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[12px] outline-none transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-[#00D26A]/50 active:scale-[0.98]"
            >
              <Image
                src="/merk/app-store-badge.svg"
                alt="Download in de App Store"
                width={180}
                height={60}
                unoptimized
                {...EARLY}
                className="h-[54px] w-auto sm:h-[60px]"
              />
            </a>

            {/* Op een computer: scan de code met je telefoon. */}
            <div className="hidden items-center gap-5 lg:flex">
              <div className="relative h-[112px] w-[112px] shrink-0 rounded-[14px] bg-white p-3">
                <Image
                  src="/merk/qr-download.svg"
                  alt="QR-code om Centje te downloaden"
                  width={96}
                  height={96}
                  unoptimized
                  {...EARLY}
                  className="h-full w-full"
                />
                <span className="absolute left-1/2 top-1/2 flex h-[27px] w-[27px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
                  <Image src="/merk/logo-munt.webp" alt="" width={1024} height={1024} sizes="22px" {...EARLY} className="h-[21px] w-[21px]" />
                </span>
              </div>
              <p className="text-[15px] leading-snug">
                <span className="block font-semibold text-white">Scan met je iPhone</span>
                <span className="mt-1 block text-white/60">en download Centje meteen</span>
              </p>
            </div>
          </div>

          <ul aria-label="Waar Centje beschikbaar is" className="mt-8 flex flex-wrap gap-2">
            <Beschikbaar>
              <AppleLogo weight="fill" aria-hidden className="h-3.5 w-3.5" />
              iPhone
            </Beschikbaar>
            <Beschikbaar binnenkort>
              <AndroidLogo weight="fill" aria-hidden className="h-3.5 w-3.5" />
              Android · binnenkort
            </Beschikbaar>
            <Beschikbaar>
              <Vlag land="nl" />
              Nederland
            </Beschikbaar>
            <Beschikbaar binnenkort>
              <span className="opacity-60">
                <Vlag land="be" />
              </span>
              België · binnenkort
            </Beschikbaar>
          </ul>
        </div>

        <div className="relative mx-auto w-[240px] sm:w-[270px] lg:w-[300px]">
          <div
            aria-hidden
            className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.25),rgba(0,210,106,0))]"
          />
          <IPhoneFrame>
            <Image
              src="/app/overzicht.webp"
              alt="Overzicht in de Centje-app met verzoeken zoals Etentje, Pizza-avond en Taxi, en wie er al betaald heeft"
              fill
              quality={90}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 270px, 240px"
              {...EARLY}
              className="object-cover object-top"
            />
          </IPhoneFrame>
        </div>
      </div>
    </section>
  );
}
