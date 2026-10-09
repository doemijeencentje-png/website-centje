import Image from "next/image";

/**
 * Direct onder de hero: waarmee en via wie je betaalt, met de officiële merken groot in beeld.
 * De vergunning is van Online Payment Platform (OPP), niet van Centje; de tekst zegt dat ook.
 */
export function PaymentBar() {
  return (
    <section aria-label="Betalen via" className="border-y border-[#E3EAE6] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:py-7">
        <p className="text-center text-base font-semibold text-[#0A0C0A] lg:text-left">
          Veilig betalen via je eigen bank
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          <li className="flex items-center gap-3">
            <Image src="/merk/ideal-wero.svg" alt="iDEAL | Wero" width={40} height={26} unoptimized className="h-11 w-auto rounded-[6px]" />
            <span className="text-[15px] leading-tight text-neutral-600">
              Betalen met
              <br />
              <span className="font-semibold text-[#0A0C0A]">iDEAL | Wero</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/merk/opp-merk.svg" alt="Online Payment Platform" width={256} height={256} unoptimized className="h-11 w-11" />
            <span className="text-[15px] leading-tight text-neutral-600">
              Betaalpartner
              <br />
              <span className="font-semibold text-[#0A0C0A]">Online Payment Platform</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="font-heading flex h-11 items-center rounded-[6px] border border-[#0A0C0A] px-2.5 text-[15px] font-extrabold text-[#0A0C0A]">
              DNB
            </span>
            <span className="text-[15px] leading-tight text-neutral-600">
              OPP onder toezicht van
              <br />
              <span className="font-semibold text-[#0A0C0A]">De Nederlandsche Bank</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
