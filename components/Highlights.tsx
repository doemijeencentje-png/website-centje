import Image from "next/image";

// Beelden laden meteen mee (met lage voorrang), zodat ze klaarstaan als je hier bent.
const EARLY = { loading: "eager", fetchPriority: "low" } as const;

export function Highlights() {
  return (
    <section
      id="spellen"
      aria-labelledby="gemak-titel"
      className="relative scroll-mt-16 bg-white pb-24 pt-20 sm:pb-32 sm:pt-28 lg:scroll-mt-[72px] lg:pb-36 lg:pt-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="gemak-titel"
          className="font-heading max-w-3xl text-balance text-[30px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-5xl"
        >
          Makkelijk voor iedereen aan tafel
        </h2>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(320px,auto))_minmax(300px,auto)]">
          {/* Eerlijk spel: de echte uitslag uit de app */}
          <article
            className="relative isolate flex flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#EEFBF4_0%,#D7F6E5_100%)] px-7 pt-8 sm:px-10 sm:pt-10 md:col-span-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6 lg:row-span-2 lg:flex lg:gap-0"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(255,255,255,0))]"
            />
            <div className="md:pb-9 lg:pb-0">
              <h3 className="font-heading max-w-[18ch] text-[26px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-4xl">
                Eerlijk spel, voor iedereen gelijk
              </h3>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-neutral-600 sm:text-lg">
                Geen geluk, alleen je score telt. Het draait om inzicht, timing en
                vaardigheid, voor iedereen onder dezelfde omstandigheden.
              </p>
            </div>
            <div className="relative mx-auto mt-8 w-full max-w-[380px] self-end md:mt-0 lg:mt-auto lg:max-w-[470px] lg:pt-8">
              <div className="translate-y-6 -rotate-2 overflow-hidden rounded-t-[26px] bg-white shadow-[0_2px_4px_rgba(10,12,10,0.05),0_30px_70px_-26px_rgba(0,90,45,0.45)] ring-1 ring-[#CDEFDB] sm:translate-y-8">
                <Image
                  src="/app/uitslag-score.webp"
                  {...EARLY}
                  alt="Uitslag in de app: Gewonnen, met de scores 34 voor Sanne en 41 voor jou"
                  width={1170}
                  height={1180}
                  quality={90}
                  sizes="(min-width: 1024px) 470px, (min-width: 768px) 45vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </article>

          {/* Overzicht */}
          <article
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#F4F7F5] p-7 sm:p-9"
          >
            <h3 className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
              Alles op één plek
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Zie in één oogopslag wat betaald is en op wie je nog wacht.
            </p>
            <div className="relative mt-7 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,12,10,0.05),0_18px_40px_-22px_rgba(0,70,35,0.35)] ring-1 ring-black/5">
              <Image
                src="/app/fragment-overzicht.webp"
                {...EARLY}
                alt="Twee verzoeken in de app: Etentje wacht op de tegenstander, van Pizza-avond is 2 van de 3 betaald"
                width={1122}
                height={714}
                quality={90}
                sizes="(min-width: 1024px) 330px, (min-width: 768px) 45vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </article>

          {/* Ontvanger ziet wie betaald heeft */}
          <article
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#F4F7F5] p-7 sm:p-9"
          >
            <h3 className="font-heading text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
              Zie wie al betaald heeft
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Per vriend het bedrag en de status. Een herinnering sturen kan
              direct vanuit de app.
            </p>
            <div className="relative mt-7 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,12,10,0.05),0_18px_40px_-22px_rgba(0,70,35,0.35)] ring-1 ring-black/5">
              <Image
                src="/app/fragment-ontvanger.webp"
                {...EARLY}
                alt="Ranglijst van een Groepscentje: Tim en Noor hebben betaald, Daan nog niet, Sanne is de ontvanger"
                width={1098}
                height={740}
                quality={90}
                sizes="(min-width: 1024px) 330px, (min-width: 768px) 45vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </article>

          {/* Geen app nodig */}
          <article
            className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-[#00D26A] p-7 sm:p-9"
          >
            <h3 className="font-heading max-w-[14ch] text-[26px] font-extrabold leading-[1.02] text-[#0A0C0A] sm:text-3xl">
              Je vrienden hebben geen app nodig
            </h3>
            <p className="mt-3 max-w-[30ch] text-[15px] font-medium leading-relaxed text-[#0A0C0A]/80">
              Ze openen je link, spelen in de browser en betalen met iDEAL.
            </p>
            {/* In de flow in plaats van absoluut, zodat de munt nooit over de tekst valt. */}
            <Image
              src="/merk/logo-munt.webp"
              alt=""
              width={1024}
              height={1024}
              sizes="(min-width: 640px) 112px, 96px"
              {...EARLY}
              className="pointer-events-none mt-auto h-24 w-24 shrink-0 self-end drop-shadow-[0_14px_24px_rgba(0,60,30,0.3)] sm:h-28 sm:w-28"
            />
          </article>

          {/* Arcade */}
          <article
            className="relative isolate grid min-h-[280px] overflow-hidden rounded-[28px] bg-[#0A0C0A] p-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-10 md:grid-cols-1 lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.28),rgba(0,210,106,0))]"
            />
            <div>
              <h3 className="font-heading text-[26px] font-extrabold leading-[1.05] text-white sm:text-3xl">
                Oefen in de Arcade
              </h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/70 sm:text-base">
                Speel alle spellen gewoon voor de lol en word beter voordat het om
                de rekening gaat.
              </p>
            </div>
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:mt-0 sm:rotate-2 md:mt-6 lg:mt-0">
              <Image
                src="/app/fragment-arcade.webp"
                {...EARLY}
                alt="Spellen in de Arcade van Centje"
                width={1110}
                height={705}
                quality={90}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
