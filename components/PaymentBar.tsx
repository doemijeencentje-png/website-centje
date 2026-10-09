import Image from "next/image";

/** Direct onder de hero: de officiële merken groot, zonder uitleg. */
export function PaymentBar() {
  return (
    <section aria-label="Betalen via" className="border-y border-[#E3EAE6] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-4 py-8 sm:px-6 sm:py-9">
        <p className="font-heading text-xl font-extrabold text-[#0A0C0A] sm:text-2xl">Veilig betalen via</p>
        <Image
          src="/merk/ideal-wero.svg"
          alt="iDEAL | Wero"
          width={40}
          height={26}
          unoptimized
          className="h-14 w-auto rounded-[8px] sm:h-16"
        />
        <span className="flex items-center gap-3">
          <Image
            src="/merk/opp-merk.svg"
            alt=""
            width={256}
            height={256}
            unoptimized
            className="h-14 w-14 sm:h-16 sm:w-16"
          />
          <span className="font-heading text-xl font-extrabold leading-tight text-[#4642FF] sm:text-2xl">
            Online Payment
            <br />
            Platform
          </span>
        </span>
      </div>
    </section>
  );
}
