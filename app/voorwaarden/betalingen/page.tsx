import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeBetalingenVoorwaardenContent } from "@/components/legal/CentjeBetalingenVoorwaardenContent";

export const metadata: Metadata = pageMetadata({
  title: "Gebruiksvoorwaarden betalingen",
  description:
    "De voorwaarden voor eenmalige betalingen via Centje, bijvoorbeeld wanneer iemand je een betaallink of betaalverzoek stuurt.",
  path: "/voorwaarden/betalingen",
});

export default function VoorwaardenBetalingenPage() {
  return (
    <LegalPageShell
      headerVariant="sub"
      pageTitle="Gebruiksvoorwaarden Centje betalingen"
      lastUpdated="21 maart 2026"
    >
      <CentjeBetalingenVoorwaardenContent />
    </LegalPageShell>
  );
}
