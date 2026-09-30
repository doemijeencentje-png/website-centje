import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ContentShell } from "@/components/content/ContentShell";
import { IPhoneFrame } from "@/components/IPhoneFrame";
import { ADVERTEREN_CONTACT } from "@/lib/centje-contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Adverteren",
  description:
    "Adverteren bij Centje: je merk op het volledige bedankscherm na elke betaling, dat ook mensen zonder de app zien, in de app en in de spellen.",
  path: "/adverteren",
  image: {
    url: "/adverteren/og-adverteren.jpg",
    alt: "Adverteren bij Centje: je merk op het volledige bedankscherm na een betaling",
  },
});

const BEDANKSCHERM = [
  {
    title: "Voor iedereen die betaalt",
    text: "Ook vrienden zonder de app zien het scherm: zij betalen via de link in hun browser.",
  },
  {
    title: "Na elke betaling",
    text: "Bij individuele verzoeken en bij Groepscentjes, telkens als iemand betaalt.",
  },
  {
    title: "Op het beste moment",
    text: "Geen onderbreking: je merk verschijnt als de rekening net geregeld is.",
  },
];

const BEREIK = [
  {
    title: "Met de app",
    text: "Wie Centje gebruikt, ziet je merk in de app en na elke betaling.",
  },
  {
    title: "Zonder de app",
    text: "Vrienden die via een link spelen en betalen, zien het bedankscherm in hun browser. Zo bereik je ook mensen die Centje nog niet kennen.",
  },
];

// Een plaats in de app zelf; de exacte plekken spreken we per merk af.
function Scherm({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`w-[clamp(128px,40vw,200px)] sm:w-[230px] ${className}`}>
      <IPhoneFrame>
        <Image src={src} alt={alt} fill quality={90} sizes="(min-width: 640px) 230px, 40vw" className="object-cover object-top" />
      </IPhoneFrame>
    </div>
  );
}

export default function AdverterenPage() {
  return (
    <ContentShell
      crumbs={[{ label: "Adverteren", href: "/adverteren" }]}
      title="Adverteren bij Centje"
      intro="Laat je merk zien op het moment dat de rekening geregeld is: na elke betaling, in de app en in de browser."
    >
      {/* Hoofdplaatsing: het hele bedankscherm, op donker zodat het scherm en de plekken eruit springen. */}
      <section
        aria-labelledby="bedankscherm"
        data-kop="donker"
        className="relative isolate mt-6 overflow-hidden bg-[#060807] text-white sm:mt-10"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_65%_at_76%_50%,rgba(0,210,106,0.17),rgba(0,210,106,0)_70%)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-[#00D26A]">Hoofdplaatsing</p>
            <h2
              id="bedankscherm"
              className="font-heading mt-3 text-balance text-[32px] font-extrabold leading-[1.04] sm:text-5xl"
            >
              Het hele bedankscherm, na elke betaling
            </h2>
            <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Zodra een verzoek betaald is, verschijnt het bedankscherm. De rekening is geregeld en de
              sfeer is goed: het moment waarop je merk het meest positief binnenkomt. Je merk krijgt
              het volledige scherm: groot in het midden en onderaan, onder het betaalde bedrag.
            </p>
            <ul className="mt-10 space-y-8">
              {BEDANKSCHERM.map(({ title, text }) => (
                <li key={title}>
                  <span className="font-heading block text-lg font-extrabold leading-tight text-white">
                    {title}
                  </span>
                  <span className="mt-2 block max-w-[52ch] text-[15px] leading-relaxed text-white/65 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mx-auto w-[250px] sm:w-[280px]">
            <div
              aria-hidden
              className="absolute -inset-14 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.26),rgba(0,210,106,0))] blur-2xl"
            />
            <IPhoneFrame>
              <Image
                src="/app/bedankscherm.webp"
                alt="Bedankscherm na een betaling: Sanne bedankt je dat je hebt betaald, betaald bedrag 14 euro"
                fill
                quality={90}
                loading="eager"
                fetchPriority="high"
                sizes="280px"
                className="object-cover object-top"
              />
              {/* Plek 1: groot in het midden, precies over de binnenste cirkel; de ringen eromheen blijven zichtbaar. */}
              <span
                aria-hidden
                className="font-heading absolute left-1/2 top-[37.05%] flex aspect-square w-[37.2cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A0C0A] text-center text-[5cqw] font-extrabold leading-[1.1] text-white"
              >
                Jouw
                <br />
                logo
              </span>
              {/* Plek 2: onderaan, onder het betaalde bedrag; even breed en even rond als dat blok. */}
              <span
                aria-hidden
                className="font-heading absolute inset-x-[5.6%] top-[88.5%] flex h-[8%] items-center justify-center rounded-[4.75cqw] bg-[#0A0C0A] text-[4.4cqw] font-extrabold text-white"
              >
                Jouw merk hier
              </span>
            </IPhoneFrame>
            <figcaption className="mt-5 text-center text-sm text-white/55">
              Het bedankscherm, met je merk in het midden en onderaan.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Bereik */}
      <section aria-labelledby="bereik" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2
            id="bereik"
            className="font-heading max-w-[20ch] text-balance text-[28px] font-extrabold leading-[1.06] text-[#0A0C0A] sm:text-4xl"
          >
            Je bereikt ook mensen zonder de app
          </h2>
          {/* Zonder de app in merkgroen, net als "Je vrienden hebben geen app nodig" op de homepage. */}
          <ul className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
            {BEREIK.map(({ title, text }, index) => (
              <li
                key={title}
                className={`rounded-[28px] p-7 sm:p-10 ${index === 1 ? "bg-[#00D26A]" : "bg-[#F4F7F5]"}`}
              >
                <span className="font-heading block text-xl font-extrabold leading-tight text-[#0A0C0A] sm:text-2xl">
                  {title}
                </span>
                <span
                  className={`mt-3 block max-w-[46ch] text-[15px] leading-relaxed sm:text-base ${
                    index === 1 ? "font-medium text-[#0A0C0A]/80" : "text-neutral-600"
                  }`}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Door de hele app */}
      <section aria-labelledby="in-de-app" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="flex justify-center gap-3 sm:gap-6 lg:order-first">
            <Scherm src="/app/overzicht.webp" alt="Overzicht van verzoeken in de Centje-app" />
            <Scherm src="/app/arcade.webp" alt="De Arcade in de Centje-app met alle spellen" className="mt-12" />
          </div>
          <div>
            <h2
              id="in-de-app"
              className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
            >
              Door de hele app
            </h2>
            <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
              Ook in de app zelf is ruimte voor je merk, bijvoorbeeld in het overzicht van verzoeken en
              in de Arcade. Welke plek het beste bij je merk past, bepalen we samen.
            </p>
          </div>
        </div>
      </section>

      {/* Bijzaak: in de spellen */}
      <section aria-labelledby="in-de-spellen" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          {/* Twee echte spellen: de racebaan, met een tweede spel in de telefoon ervoor. */}
          <div className="relative pb-8 pr-6 sm:pb-10 sm:pr-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#0A0C0A]">
              <Image
                src="/adverteren/kart-start.webp"
                alt="Racespel in Centje: de start, met reclameborden langs de baan en een sponsorbrug met het Centje-logo"
                fill
                sizes="(min-width: 1152px) 510px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[24%] min-w-[84px] max-w-[132px]">
              <IPhoneFrame>
                <Image
                  src="/adverteren/flappy.webp"
                  alt="Behendigheidsspel in Centje: een vogeltje vliegt tussen buizen door"
                  fill
                  quality={90}
                  sizes="132px"
                  className="object-cover object-top"
                />
              </IPhoneFrame>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-500">Ook mogelijk</p>
            <h2
              id="in-de-spellen"
              className="font-heading mt-2 text-2xl font-extrabold leading-tight text-[#0A0C0A] sm:text-3xl"
            >
              In de spellen
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
              Alle spellen in Centje maken we zelf. Daardoor kan je merk ook in de spelwereld een plek
              krijgen, bijvoorbeeld op de reclameborden langs een racebaan of in het decor van een ander
              spel. Welke plek het beste past, bepalen we samen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="interesse" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="rounded-[28px] bg-[#F4F7F5] px-7 py-12 sm:px-12 sm:py-16">
          <div className="max-w-xl">
            <h2
              id="interesse"
              className="font-heading text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
            >
              Interesse?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Vertel ons over je merk en wat je zoekt. We denken graag mee over de plek die het beste
              past: op het bedankscherm, in de app of in de spellen.
            </p>
            <a
              href={ADVERTEREN_CONTACT.href}
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0C0A] px-6 text-[15px] font-semibold text-white outline-none transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
            >
              {ADVERTEREN_CONTACT.label}
              <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </ContentShell>
  );
}
