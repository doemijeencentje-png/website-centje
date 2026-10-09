import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="over-ons"
      aria-labelledby="verhaal-titel"
      className="relative scroll-mt-16 bg-white py-16 sm:py-24 lg:scroll-mt-[72px]"
    >
      {/* De tekst in een witte kaart die over de foto schuift: op desktop over de rechterrand,
          op mobiel over de onderkant. */}
      <div className="mx-auto grid max-w-6xl items-center px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#0A0C0A] sm:aspect-[16/11] lg:aspect-[4/5]">
          {/* Echte foto: terras aan de Egelantiersgracht in Amsterdam (bron in FOTO-BRONNEN.md). */}
          <Image
            src="/foto/terras-gracht.jpg"
            alt="Terras aan een Amsterdamse gracht in de herfst, met vrienden aan tafel"
            fill
            loading="eager"
            fetchPriority="low"
            quality={85}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[50%_70%] lg:object-center"
          />
        </div>

        <div className="relative mx-3 -mt-20 rounded-[28px] bg-white p-6 shadow-[0_2px_4px_rgba(10,12,10,0.04),0_30px_80px_-30px_rgba(0,70,35,0.35)] ring-1 ring-black/5 sm:mx-10 sm:-mt-28 sm:p-10 lg:mx-0 lg:-ml-16 lg:mt-0 lg:p-12">
          <h2
            id="verhaal-titel"
            className="font-heading text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-[48px]"
          >
            Hoe het begon
          </h2>

          <div className="mt-6 space-y-4 text-[17px] leading-[1.65] text-neutral-700 sm:mt-7 sm:text-lg">
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

          <figure className="mt-8 border-l-4 border-[#00D26A] pl-5 sm:mt-10 sm:pl-6">
            <blockquote className="font-heading text-[22px] font-extrabold leading-[1.15] text-[#0A0C0A] sm:text-[28px]">
              Geen saaie fintech. Gewoon geld terugvragen, maar dan leuker.
            </blockquote>
            <figcaption className="mt-3 text-base text-neutral-500">Team Centje, 2025</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
