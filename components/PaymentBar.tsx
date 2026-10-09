import Image from "next/image";

/** Direct onder de hero: de officiële merken groot, zonder uitleg. */
export function PaymentBar() {
  return (
    <section aria-label="Betalen via" className="border-y border-[#E3EAE6] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4 py-7 sm:px-6 sm:py-8">
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
    </section>
  );
}
