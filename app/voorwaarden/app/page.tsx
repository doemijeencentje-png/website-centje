import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjeAppVoorwaardenContent } from "@/components/legal/CentjeAppVoorwaardenContent";

export const metadata: Metadata = pageMetadata({
  title: "Gebruiksvoorwaarden app",
  description:
    "De gebruiksvoorwaarden van de Centje-app: hoe challenges en betaalverzoeken werken, wat er van je verwacht wordt en waar je aan toe bent.",
  path: "/voorwaarden/app",
});

export default function VoorwaardenAppPage() {
  return (
    <LegalPageShell headerVariant="sub" pageTitle="Gebruiksvoorwaarden app" lastUpdated="21 maart 2026">
      <CentjeAppVoorwaardenContent />
    </LegalPageShell>
  );
}
