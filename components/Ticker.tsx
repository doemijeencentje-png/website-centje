import Image from "next/image";

const ITEMS = [
  "Betaal leuker",
  "Win en betaal minder",
  "Individueel of met de hele groep",
  "Afrekenen met iDEAL",
  "Je vrienden hebben geen app nodig",
  "Iedereen speelt hetzelfde level",
];

// De band staat in hoofdletters; de merknaam iDEAL blijft zoals hij hoort.
function Item({ text }: { text: string }) {
  const [before, after] = text.split("iDEAL");
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <span className="normal-case">iDEAL</span>
      {after}
    </>
  );
}

function Row({ copy }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : "Centje in het kort"}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((item) => (
        <li key={item} className="flex shrink-0 items-center">
          <span className="font-heading whitespace-nowrap px-5 text-[15px] font-extrabold uppercase tracking-[0.01em] text-[#0A0C0A] sm:px-8 sm:text-xl">
            <Item text={item} />
          </span>
          <Image src="/munt.webp" alt="" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7" />
        </li>
      ))}
    </ul>
  );
}

// Groene band die over de naad tussen de zwarte hero en de witte inhoud ligt.
export function Ticker() {
  return (
    <div className="relative z-10 overflow-hidden bg-[linear-gradient(to_bottom,#000_50%,#fff_50%)] py-[max(1.75rem,2.2vw)]">
      <div className="-mx-8 -rotate-2 bg-[#00D26A] py-3 shadow-[0_14px_30px_-18px_rgba(0,90,45,0.45)] sm:py-4">
        <div className="ticker-track flex w-max">
          <Row />
          <Row copy />
        </div>
      </div>
    </div>
  );
}
