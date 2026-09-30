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
                  <Link href={crumb.href} className="transition-colors hover:text-[#007F45]">
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
  children,
}: {
  /** Leeg = geen kruimelpad (bijvoorbeeld op de 404-pagina). */
  crumbs: Crumb[];
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const showTrail = crumbs.length > 0;

  return (
    <>
      <main className="bg-white pt-16 lg:pt-[72px]">
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

        <header className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-20">
            {showTrail ? <Breadcrumbs trail={trail} /> : null}
            <h1 className="font-heading max-w-3xl text-balance text-[34px] font-extrabold leading-[1.04] text-[#0A0C0A] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {intro ? (
              <div className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">{intro}</div>
            ) : null}
          </div>
        </header>

        {children}

        <DownloadSection />
      </main>
    </>
  );
}
