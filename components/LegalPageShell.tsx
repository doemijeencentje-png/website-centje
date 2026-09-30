import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { DownloadSection } from "./DownloadSection";

/** Juridische pagina's in de opmaak van de rest van de site; de tekst zelf is onveranderd. */
export function LegalPageShell({
  headerVariant,
  pageTitle,
  lastUpdated,
  children,
}: {
  /** "sub" = onderdeel van de voorwaarden, met een link terug naar het overzicht. */
  headerVariant: "hub" | "sub";
  pageTitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white pt-16 text-neutral-900 lg:pt-[72px]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        {headerVariant === "sub" ? (
          <Link
            href="/voorwaarden"
            className="group -my-2 mb-4 inline-flex items-center gap-2 rounded py-2 text-sm font-medium text-neutral-600 outline-none transition-colors hover:text-[#0A0C0A] focus-visible:ring-2 focus-visible:ring-[#00D26A]"
          >
            <ArrowLeft weight="bold" aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Alle voorwaarden
          </Link>
        ) : null}
        <h1 className="font-heading mb-3 break-words text-[26px] font-extrabold leading-[1.1] text-[#0A0C0A] hyphens-auto sm:text-4xl">
          {pageTitle}
        </h1>
        {lastUpdated ? (
          <p className="mb-10 text-sm text-neutral-500">Laatst bijgewerkt: {lastUpdated}</p>
        ) : (
          <div className="mb-10" />
        )}
        {children}
      </div>
      <DownloadSection />
    </main>
  );
}
