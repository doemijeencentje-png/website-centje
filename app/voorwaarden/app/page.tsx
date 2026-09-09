import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeAppVoorwaardenContent } from "@/components/legal/CentjeAppVoorwaardenContent";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden app",
  description:
    "De gebruiksvoorwaarden van de Centje-app: hoe challenges en betaalverzoeken werken, wat er van je verwacht wordt en waar je aan toe bent.",
  alternates: { canonical: "/voorwaarden/app" },
};

export default function VoorwaardenAppPage() {
  return (
    <LegalPageShell headerVariant="sub" pageTitle="Gebruiksvoorwaarden app" lastUpdated="21 maart 2026">
      <CentjeAppVoorwaardenContent />
    </LegalPageShell>
  );
}
