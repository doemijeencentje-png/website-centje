import Image from "next/image";

// De bekende banken waarmee je via iDEAL | Wero betaalt (lijst: ideal.nl/issuers, okt 2026); de kleine,
// onbekende staan er bewust niet bij. Geen "partners": Centje werkt niet met deze banken samen.
const BANKS = [
  { name: "ABN AMRO", logo: "abn-amro" },
  { name: "ING", logo: "ing" },
  { name: "Rabobank", logo: "rabobank" },
  { name: "SNS Bank", logo: "sns" },
  { name: "ASN Bank", logo: "asn-bank" },
  { name: "bunq", logo: "bunq", wordmark: true },
  { name: "Revolut", logo: "revolut" },
  { name: "Knab", logo: "knab", wordmark: true },
  { name: "N26", logo: "n26", wordmark: true },
  { name: "RegioBank", logo: "regiobank", wordmark: true },
];

// Eén rondje is twee keer de rij, zodat het ook op een breed scherm breder is dan het beeld.
const LAP = [...BANKS, ...BANKS];

/** Een bank als los kaartje: logo met de naam ernaast; is het logo zelf de naam, dan alleen het logo. */
function BankChip({ name, logo, wordmark = false }: { name: string; logo: string; wordmark?: boolean }) {
  return (
    <span
      className={`inline-flex h-14 shrink-0 items-center gap-3 rounded-2xl border border-[#E3EAE6] bg-white py-2 shadow-[0_1px_2px_rgba(10,12,10,0.04)] ${
        wordmark ? "px-3" : "pl-2 pr-5"
      }`}
    >
      <Image
        src={`/merk/banken/${logo}.svg`}
        alt=""
        width={40}
        height={26}
        unoptimized
        className={wordmark ? "h-12 w-auto" : "h-10 w-auto"}
      />
      {wordmark ? null : <span className="whitespace-nowrap text-base font-semibold text-[#0A0C0A]">{name}</span>}
    </span>
  );
}

/**
 * Direct onder de hero: iDEAL | Wero en Online Payment Platform groot, met daaronder een balk
 * die langzaam doorloopt met de grote banken waarmee je via iDEAL betaalt.
 */
export function PaymentBar() {
  return (
    <section aria-label="Betalen via" className="border-b border-[#E3EAE6]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4 pt-4 sm:px-6 sm:pt-5">
        <p className="basis-full text-center text-lg font-semibold text-neutral-700 sm:basis-auto">Veilig betalen via</p>
        <Image
          src="/merk/ideal-wero.svg"
          alt="iDEAL | Wero"
          width={40}
          height={26}
          unoptimized
          className="h-14 w-auto rounded-[8px] sm:h-16"
        />
        <span className="flex items-center gap-3">
          <Image src="/merk/opp-merk.svg" alt="" width={172} height={88} unoptimized className="h-9 w-auto sm:h-11" />
          <span className="text-base font-semibold leading-tight tracking-tight text-[#4642FF] sm:text-2xl">
            Online Payment Platform
          </span>
        </span>
      </div>

      {/* De banken: twee gelijke rijen achter elkaar, de helft opschuiven is één rondje. Stilstaan bij aanwijzen. */}
      <div className="mt-6 pb-7 sm:mt-7 sm:pb-8">
        <p className="mb-4 text-center text-base font-medium text-neutral-600">Met je eigen bank</p>
        <div
          role="img"
          aria-label={`Betalen met je eigen bank, bijvoorbeeld ${BANKS.map((b) => b.name).join(", ")}`}
          className="band relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        >
          <div className="band-baan flex w-max gap-3 pr-3">
            {[...LAP, ...LAP].map((bank, i) => (
              <BankChip key={`${bank.logo}-${i}`} {...bank} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
