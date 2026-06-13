import { LegalHeaderBar } from "./LegalHeaderBar";

export function LegalPageShell({
  headerVariant,
  pageTitle,
  lastUpdated,
  children,
}: {
  headerVariant: "hub" | "sub";
  pageTitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <LegalHeaderBar variant={headerVariant} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
          {pageTitle}
        </h1>
        {lastUpdated ? (
          <p className="text-xs text-neutral-400 mb-10">Laatst bijgewerkt: {lastUpdated}</p>
        ) : (
          <div className="mb-10" />
        )}
        {children}
      </main>
    </div>
  );
}
