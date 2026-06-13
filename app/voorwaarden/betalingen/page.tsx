import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeBetalingenVoorwaardenContent } from "@/components/legal/CentjeBetalingenVoorwaardenContent";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden Centje betalingen — Centje",
  description: "Gebruiksvoorwaarden voor eenmalige betalingen via Centje.",
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
