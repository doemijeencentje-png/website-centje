import Image from "next/image";

// Beelden laden meteen mee (met lage voorrang), zodat ze klaarstaan als je hier bent.
const EARLY = { loading: "eager", fetchPriority: "low" } as const;

const CARDS = [
  {
    title: "Eerlijk spel, voor iedereen gelijk",
    text: "Geen geluk, alleen je score telt. Het draait om inzicht, timing en vaardigheid.",
    image: "/app/uitslag-score.webp",
    // Net onder de beker, zodat er niets half aan de bovenrand hangt.
    position: "50% 67%",
    alt: "Uitslag in de app: Gewonnen, met de scores 34 voor Sanne en 41 voor jou",
  },
  {
    title: "Alles op één plek",
    text: "Zie in één oogopslag wat betaald is en op wie je nog wacht.",
    image: "/app/fragment-overzicht.webp",
    position: "50% 50%",
    alt: "Twee verzoeken in de app: Etentje wacht op de tegenstander, van Pizza-avond is 2 van de 3 betaald",
  },
  {
    title: "Zie wie al betaald heeft",
    text: "Per vriend het bedrag en de status. Een herinnering sturen kan direct vanuit de app.",
    image: "/app/fragment-ontvanger.webp",
    // Past niet in 16:10 zonder "Ranglijst" af te snijden; de witte achtergrond valt weg in het witte kader.
    fit: "contain",
    position: "50% 50%",
    alt: "Ranglijst van een Groepscentje: Tim en Noor hebben betaald, Daan nog niet, Sanne is de ontvanger",
  },
  {
    title: "Oefen in de Arcade",
    text: "Speel alle spellen voor de lol en word beter voordat het om de rekening gaat.",
    image: "/app/fragment-arcade.webp",
    position: "50% 50%",
    alt: "Spellen in de Arcade van Centje",
  },
];

export function Highlights() {
  return (
    <section
      id="spellen"
      aria-labelledby="gemak-titel"
      className="relative scroll-mt-16 bg-white py-24 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="gemak-titel"
          className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
        >
          Makkelijk voor iedereen aan tafel
        </h2>

        <ul className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <li key={card.title} className="flex flex-col rounded-[28px] bg-[#F4F7F5] p-7 sm:p-10">
              <h3 className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                {card.text}
              </p>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-30px_rgba(10,40,25,0.35)] sm:mt-10">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1152px) 490px, (min-width: 768px) 45vw, 90vw"
                  {...EARLY}
                  className={card.fit === "contain" ? "object-contain" : "object-cover"}
                  style={{ objectPosition: card.position }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
