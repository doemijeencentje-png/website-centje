import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="over-ons"
      aria-labelledby="verhaal-titel"
      className="relative scroll-mt-16 bg-white py-24 sm:py-32 lg:scroll-mt-[72px]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#0A0C0A] sm:aspect-[16/11] lg:aspect-[4/5]">
          <Image
            src="/foto/groep-gracht.jpg"
            alt="Zes vrienden aan tafel op een terras aan de gracht, met pizza en drinken"
            fill
            loading="eager"
            fetchPriority="low"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[50%_33%]"
          />
        </div>

        <div>
          {/* Kleine groene tekst op wit in #007F45: merkgroen #00D26A haalt daar maar 2:1 contrast. */}
          <span className="block text-sm font-semibold text-[#007F45]">Ons verhaal</span>
          <h2
            id="verhaal-titel"
            className="font-heading mt-3 text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
          >
            Hoe het begon
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              Het begon op een terras. De rekening kwam en daar was het weer: wie
              betaalt wat?
            </p>
            <p>
              Waarom moet zoiets altijd zo droog en zakelijk zijn? Het gaat om
              vrienden. Dat mag ook een beetje leuk zijn.
            </p>
            <p>
              Dus gaven we betaalverzoeken een{" "}
              <strong className="font-semibold text-[#007F45]">sociale twist</strong>: je
              stuurt een challenge in plaats van een kaal verzoek. Win je het
              spelletje, dan betaal je minder.
            </p>
          </div>

          <figure className="mt-10">
            <blockquote className="font-heading text-[22px] font-extrabold leading-[1.15] text-[#0A0C0A] sm:text-[28px]">
              Geen saaie fintech. Gewoon geld terugvragen, maar dan leuker.
            </blockquote>
            <figcaption className="mt-3 text-sm text-neutral-500">Team Centje, 2025</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
