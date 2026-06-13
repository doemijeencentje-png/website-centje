import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeAppVoorwaardenContent } from "@/components/legal/CentjeAppVoorwaardenContent";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden app — Centje",
  description: "Gebruiksvoorwaarden voor de Centje-app.",
};

export default function VoorwaardenAppPage() {
  return (
    <LegalPageShell headerVariant="sub" pageTitle="Gebruiksvoorwaarden app" lastUpdated="21 maart 2026">
      <CentjeAppVoorwaardenContent />
    </LegalPageShell>
  );
}
