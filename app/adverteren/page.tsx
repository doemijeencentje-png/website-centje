import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Confetti, FlagCheckered, Globe } from "@phosphor-icons/react/ssr";
import { ContentShell } from "@/components/content/ContentShell";
import { IPhoneFrame } from "@/components/IPhoneFrame";
import { ADVERTEREN_CONTACT } from "@/lib/centje-contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Adverteren",
  description:
    "Adverteren in de Centje-app: je merk op de reclameborden en de sponsorbrug van Centje Kart en op het bedankscherm na een betaling.",
  path: "/adverteren",
  image: {
    url: "/adverteren/og-adverteren.jpg",
    alt: "De start van GP Oostenrijk in Centje Kart, met reclameborden langs de baan",
  },
});

const REASONS = [
  {
    icon: Confetti,
    title: "Op positieve momenten",
    text: "Centje draait om samen plezier maken: spelen, winnen en de rekening afronden. Daar hoort je merk bij.",
  },
  {
    icon: FlagCheckered,
    title: "Passend in de beleving",
    text: "Je merk krijgt een vanzelfsprekende plek in de spelwereld, zoals de borden langs een echt circuit.",
  },
  {
    icon: Globe,
    title: "Ook buiten de app",
    text: "Wie via een link betaalt, heeft de app niet nodig en ziet het bedankscherm toch. Zo bereik je ook mensen die Centje nog niet kennen.",
  },
];

export default function AdverterenPage() {
  return (
    <ContentShell
      crumbs={[{ label: "Adverteren", href: "/adverteren" }]}
      title="Adverteren bij Centje"
      intro="Laat je merk zien op de leukste momenten: als vrienden samen spelen, en als de rekening net is geregeld."
    >
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#0A0C0A] sm:aspect-[16/9]">
            <Image
              src="/adverteren/kart-start.webp"
              alt="De start van GP Oostenrijk in Centje Kart, met reclameborden langs de baan en een startboog met het Centje-logo"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-neutral-500">
            De start van GP Oostenrijk in Centje Kart, ons eigen racespel.
          </figcaption>
        </figure>
      </div>

      {/* In de spellen */}
      <section aria-labelledby="in-de-spellen" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h2
              id="in-de-spellen"
              className="font-heading text-[30px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-5xl"
            >
              In de spellen
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
              In Centje Kart staan reclameborden langs de baan en hangt er een sponsorbrug over het
              circuit, net als bij een echte Grand Prix. Je merk wordt onderdeel van de race.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
              {[
                "Borden langs de baan, op de rechte stukken en in de bochten",
                "Eén sponsorbrug per circuit, groot en goed zichtbaar",
                "Drie circuits: GP Muntbaai, GP Oostenrijk en GP Nederland",
              ].map((item) => (
                <li key={item} className="relative pl-6">
                  <span aria-hidden className="absolute left-0 top-[0.6em] h-2 w-2 rounded-full bg-[#00D26A]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#0A0C0A]">
              <Image
                src="/adverteren/kart-brug.webp"
                alt="Sponsorbrug met het Centje-logo over het circuit van GP Muntbaai"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-neutral-500">
              Nu staat hier het Centje-logo. Dit kan jouw merk zijn.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Op het bedankscherm */}
      <section aria-labelledby="bedankscherm" className="overflow-hidden border-y border-[#E3EAE6] bg-[#F3F6F4]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="relative mx-auto w-[230px] sm:w-[260px] lg:order-first">
            <div
              aria-hidden
              className="absolute -inset-14 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
            />
            <IPhoneFrame>
              <Image
                src="/app/bedankscherm.webp"
                alt="Bedankscherm na een betaling: Sanne bedankt je dat je hebt betaald, betaald bedrag 14 euro"
                fill
                quality={90}
                sizes="260px"
                className="object-cover object-top"
              />
            </IPhoneFrame>
          </div>
          <div>
            <h2
              id="bedankscherm"
              className="font-heading text-[30px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-5xl"
            >
              Op het bedankscherm
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
              Na elke betaling verschijnt een bedankscherm. Een fijn moment: de rekening is geregeld.
              Hier kan je merk rustig in beeld komen.
            </p>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-neutral-600 sm:text-lg">
              Dit scherm zien ook vrienden zonder de app, want zij betalen gewoon via de link in hun
              browser.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom */}
      <section aria-labelledby="waarom" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0C0A] px-6 py-10 sm:px-12 sm:py-14 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div
            aria-hidden
            className="absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.22),rgba(0,210,106,0))]"
          />
          <h2
            id="waarom"
            className="font-heading text-[30px] font-extrabold leading-[1.05] text-white sm:text-4xl"
          >
            Waarom adverteren bij Centje
          </h2>
          <ul className="mt-8 divide-y divide-white/10 lg:mt-0">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00D26A]/15 text-[#00D26A]">
                  <Icon weight="bold" aria-hidden className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white">{title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-white/70 sm:text-base">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="interesse" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="relative overflow-hidden rounded-[28px] bg-[#00D26A] px-6 py-12 sm:px-12 sm:py-16">
          <Image
            src="/merk/munt.webp"
            alt=""
            width={384}
            height={384}
            sizes="192px"
            className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rotate-12 opacity-90 drop-shadow-[0_18px_30px_rgba(0,60,30,0.35)] sm:bottom-auto sm:right-10 sm:top-1/2 sm:h-48 sm:w-48 sm:-translate-y-1/2"
          />
          <div className="relative max-w-xl">
            <h2
              id="interesse"
              className="font-heading text-[30px] font-extrabold leading-[1.05] text-[#0A0C0A] sm:text-5xl"
            >
              Interesse?
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-[#0A0C0A]/80 sm:text-lg">
              Vertel ons over je merk en je idee, ook als het iets anders is dan hierboven. We denken
              graag met je mee over de mogelijkheden.
            </p>
            <a
              href={ADVERTEREN_CONTACT.href}
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0C0A] px-6 text-[15px] font-semibold text-white outline-none transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#0A0C0A]/30 active:scale-[0.98]"
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
