import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ContentShell } from "@/components/content/ContentShell";
import { GroenKader } from "@/components/GroenKader";
import { IPhoneFrame } from "@/components/IPhoneFrame";
import { fadedDots } from "@/components/decor";
import { ADVERTEREN_CONTACT } from "@/lib/centje-contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Adverteren",
  description:
    "Adverteren bij Centje: je merk op het bedankscherm na elke betaling, dat ook mensen zonder de app zien, door de hele app en in de spellen.",
  path: "/adverteren",
  image: {
    url: "/adverteren/og-adverteren.jpg",
    alt: "Adverteren bij Centje: je merk op het bedankscherm na een betaling",
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

// Beeld dat bij aanwijzen met de muis een fractie omhoog komt.
const OPTIL = "transition-transform duration-500 ease-out hover:-translate-y-1.5";

/** Groene gloed met zacht uitlopende stippen achter een beeld; de ouder is `relative isolate`. */
function Gloed({ className }: { className: string }) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute -z-10 ${className}`}
        style={fadedDots("radial-gradient(closest-side, #000 35%, transparent 100%)")}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.18),rgba(0,210,106,0))] ${className}`}
      />
    </>
  );
}

function MailKnop() {
  return (
    <a
      href={ADVERTEREN_CONTACT.href}
      className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0C0A] px-6 text-[15px] font-semibold text-white outline-none transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#00D26A]/40 active:scale-[0.98]"
    >
      {ADVERTEREN_CONTACT.label}
      <ArrowRight weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

// Een plaats in de app zelf; de exacte plekken spreken we per merk af.
function Scherm({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`w-[clamp(128px,40vw,200px)] sm:w-[230px] ${className}`}>
      <IPhoneFrame className={OPTIL}>
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
      actions={<MailKnop />}
      decor
    >
      {/* Gloed, stippen en schaduwen mogen buiten de inhoudskolom vallen; alleen de schermrand knipt ze af. */}
      <div className="overflow-x-clip">
        {/* Het bedankscherm: tekst links, beeld rechts */}
        <section aria-labelledby="bedankscherm" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <GroenKader>
              <h2
                id="bedankscherm"
                className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
              >
                Op het bedankscherm na elke betaling
              </h2>
              <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
                Zodra een verzoek betaald is, verschijnt het bedankscherm. De rekening is geregeld en de
                sfeer is goed: het moment waarop je merk het meest positief binnenkomt. Je merk kan het
                volledige scherm krijgen: in het midden en onderaan, onder het betaalde bedrag.
              </p>
              <ul className="mt-10 space-y-8">
                {BEDANKSCHERM.map(({ title, text }) => (
                  <li key={title}>
                    <span className="font-heading block text-lg font-extrabold leading-tight text-[#0A0C0A]">
                      {title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </GroenKader>

            <figure className="relative isolate mx-auto w-[250px] sm:w-[280px]">
              <Gloed className="-inset-x-24 -inset-y-12" />
              <IPhoneFrame className={OPTIL}>
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
                {/* Plek in het midden, precies over de binnenste cirkel; de ringen eromheen blijven zichtbaar. */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[37.05%] flex aspect-square w-[37.2cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-dashed border-[#00A855] bg-white text-[3.8cqw] font-semibold text-[#007F45]"
                >
                  Jouw logo
                </span>
                {/* De advertentieplek onderaan het scherm, onder het betaalde bedrag. */}
                <span className="absolute inset-x-[7%] top-[88.5%] flex h-[8%] items-center justify-center rounded-[3.5cqw] border-2 border-dashed border-[#00A855] bg-white/90 text-[3.8cqw] font-semibold text-[#007F45]">
                  Jouw merk hier
                </span>
              </IPhoneFrame>
              <figcaption className="mt-5 text-center text-sm text-neutral-500">
                Het bedankscherm, met in het midden en onderaan de plek voor je merk.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Vanaf hier om en om: beeld links, dan rechts. Op mobiel steeds eerst de tekst. */}

        {/* Bereik: beeld links, tekst rechts */}
        <section aria-labelledby="bereik" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <GroenKader>
              <h2
                id="bereik"
                className="font-heading text-balance text-[32px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl"
              >
                Je bereikt ook mensen zonder de app
              </h2>
              <ul className="mt-10 space-y-8">
                {BEREIK.map(({ title, text }) => (
                  <li key={title}>
                    <span className="font-heading block text-lg font-extrabold leading-tight text-[#0A0C0A]">
                      {title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </GroenKader>
            <div className="relative isolate mx-auto w-[250px] sm:w-[280px] lg:order-first">
              <Gloed className="-inset-x-24 -inset-y-12" />
              <IPhoneFrame className={OPTIL}>
                <Image
                  src="/app/individueel-4-delen.webp"
                  alt="Een challenge delen in de Centje-app, via WhatsApp of met een QR-code"
                  fill
                  quality={90}
                  sizes="280px"
                  className="object-cover object-top"
                />
              </IPhoneFrame>
            </div>
          </div>
        </section>

        {/* Door de hele app: tekst links, beeld rechts */}
        <section aria-labelledby="in-de-app" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <GroenKader>
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
            </GroenKader>
            <div className="relative isolate flex justify-center gap-3 sm:gap-6">
              {/* Smaller dan bij één telefoon: dit blok vult de kolom al, anders loopt de gloed tegen de rand van de pagina. */}
              <Gloed className="-inset-x-6 -inset-y-12" />
              <Scherm src="/app/overzicht.webp" alt="Overzicht van verzoeken in de Centje-app" />
              <Scherm src="/app/arcade.webp" alt="De Arcade in de Centje-app met alle spellen" className="mt-12" />
            </div>
          </div>
        </section>

        {/* Bijzaak, in de spellen: beeld links, tekst rechts */}
        <section aria-labelledby="in-de-spellen" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
            <GroenKader>
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
            </GroenKader>
            {/* Twee echte spellen: de racebaan, met een tweede spel in de telefoon ervoor. */}
            <div className="group relative pb-8 pr-6 sm:pb-10 sm:pr-8 md:order-first">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#0A0C0A]">
                <Image
                  src="/adverteren/kart-start.webp"
                  alt="Racespel in Centje: de start, met reclameborden langs de baan en een sponsorbrug met het Centje-logo"
                  fill
                  sizes="(min-width: 1152px) 510px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover object-[50%_40%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[24%] min-w-[84px] max-w-[132px]">
                <IPhoneFrame className={OPTIL}>
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
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="interesse" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#EEFBF4_0%,#D7F6E5_100%)] px-7 py-12 sm:px-12 sm:py-16">
            {/* Stippen rechts die zacht uitlopen, met de munt uit het logo; op smalle schermen alleen de stippen. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={fadedDots("radial-gradient(45% 85% at 85% 50%, #000 0%, transparent 100%)")}
            />
            <Image
              src="/merk/logo-munt.webp"
              alt=""
              width={1024}
              height={1024}
              sizes="208px"
              className="pointer-events-none absolute right-20 top-1/2 hidden h-52 w-52 -translate-y-1/2 -rotate-12 drop-shadow-[0_24px_40px_rgba(0,60,30,0.3)] lg:block"
            />
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
              <div className="mt-8">
                <MailKnop />
              </div>
            </div>
          </div>
        </section>
      </div>
    </ContentShell>
  );
}
