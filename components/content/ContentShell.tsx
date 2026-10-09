import Link from "next/link";
import { DownloadSection } from "../DownloadSection";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

const SITE = "https://centje.app";

function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          // Op mobiel staat een lange paginatitel al groot eronder; alleen het pad erheen tonen.
          const hideOnMobile = last && trail.length > 2;
          return (
            <li key={crumb.href} className={`${hideOnMobile ? "hidden sm:flex" : "flex"} items-center gap-1.5`}>
              {last ? (
                <span aria-current="page" className="font-medium text-neutral-700">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="-my-2 inline-block py-2 transition-colors hover:text-[#007F45]">
                    {crumb.label}
                  </Link>
                  <span aria-hidden className="text-neutral-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Opmaak van de losse pagina's: paginakop met kruimelpad, inhoud en het downloadblok. */
export function ContentShell({
  crumbs,
  title,
  intro,
  actions,
  decor = false,
  children,
}: {
  /** Leeg = geen kruimelpad (bijvoorbeeld op de 404-pagina). */
  crumbs: Crumb[];
  title: string;
  intro?: React.ReactNode;
  /** Knoppen onder de intro. */
  actions?: React.ReactNode;
  /** Een groene gloed rechtsboven in de paginakop (de stippen lopen over de hele site). */
  decor?: boolean;
  children: React.ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const showTrail = crumbs.length > 0;

  return (
    <>
      <main className="pt-16 lg:pt-[72px]">
        {showTrail ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: trail.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.label,
                item: `${SITE}${crumb.href === "/" ? "" : crumb.href}`,
              })),
            }}
          />
        ) : null}

        <header className={decor ? "relative isolate overflow-hidden" : undefined}>
          {decor ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(0,210,106,0.16),rgba(0,210,106,0))]"
            />
          ) : null}
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-20">
            {showTrail ? <Breadcrumbs trail={trail} /> : null}
            <h1 className="font-heading max-w-3xl text-balance text-[34px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {intro ? (
              <div className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-neutral-700 sm:mt-6 sm:text-xl">{intro}</div>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </header>

        {children}

        <DownloadSection />
      </main>
    </>
  );
}
