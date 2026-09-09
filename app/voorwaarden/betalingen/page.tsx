import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeBetalingenVoorwaardenContent } from "@/components/legal/CentjeBetalingenVoorwaardenContent";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden betalingen",
  description:
    "De voorwaarden voor eenmalige betalingen via Centje, bijvoorbeeld wanneer iemand je een betaallink of betaalverzoek stuurt.",
  alternates: { canonical: "/voorwaarden/betalingen" },
};

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
