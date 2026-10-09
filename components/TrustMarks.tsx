import Image from "next/image";

/**
 * Waar de betalingen op rusten, met de officiële merken: iDEAL | Wero (de betaalmethode in de
 * app), Online Payment Platform (de betaalpartner) en het toezicht van De Nederlandsche Bank.
 * Let op de formulering: de vergunning is van OPP, niet van Centje.
 */
const DNB_REGISTER = "https://www.dnb.nl/openbaar-register/";

const TILE = "flex items-center gap-5 rounded-[20px] border border-[#E3EAE6] bg-white p-5 sm:p-6";
const MARK = "flex h-14 w-20 shrink-0 items-center justify-center";

export function TrustMarks({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul aria-label="Betaalpartners" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <li className="flex items-center gap-3 text-sm text-white/60">
          <Image src="/merk/ideal-wero.svg" alt="iDEAL | Wero" width={40} height={26} unoptimized className="h-7 w-auto rounded-[4px]" />
          Betalen met iDEAL | Wero
        </li>
        <li className="flex items-center gap-3 text-sm text-white/60">
          <Image src="/merk/opp-merk.svg" alt="" width={256} height={256} unoptimized className="h-7 w-7 rounded-full bg-white p-0.5" />
          Via Online Payment Platform, onder toezicht van De Nederlandsche Bank
        </li>
      </ul>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      <li className={TILE}>
        <span className={MARK}>
          <Image src="/merk/ideal-wero.svg" alt="iDEAL | Wero" width={40} height={26} unoptimized className="h-12 w-auto rounded-[6px]" />
        </span>
        <span className="text-[15px] leading-snug text-neutral-700">
          <span className="block text-base font-semibold text-[#0A0C0A]">Betalen met iDEAL | Wero</span>
          In de vertrouwde omgeving van je eigen bank.
        </span>
      </li>
      <li className={TILE}>
        <span className={MARK}>
          <Image src="/merk/opp-merk.svg" alt="Online Payment Platform" width={256} height={256} unoptimized className="h-12 w-12" />
        </span>
        <span className="text-[15px] leading-snug text-neutral-700">
          <span className="block text-base font-semibold text-[#0A0C0A]">Online Payment Platform</span>
          Onze betaalpartner verwerkt elke betaling en betaalt uit op je rekening.
        </span>
      </li>
      <li className={TILE}>
        <span className={`${MARK} font-heading text-center text-[15px] font-extrabold leading-tight text-[#0A0C0A]`}>
          DNB
        </span>
        <span className="text-[15px] leading-snug text-neutral-700">
          <span className="block text-base font-semibold text-[#0A0C0A]">Onder toezicht van De Nederlandsche Bank</span>
          OPP is een betaalinstelling met een vergunning van DNB.{" "}
          <a
            href={DNB_REGISTER}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#007F45] underline-offset-2 hover:underline"
          >
            Bekijk het register
          </a>
          .
        </span>
      </li>
    </ul>
  );
}
