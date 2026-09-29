import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CentjePrivacyContent } from "@/components/legal/CentjePrivacyContent";

export const metadata: Metadata = pageMetadata({
  title: "Privacyverklaring",
  description:
    "Lees hoe Centje omgaat met je persoonsgegevens: welke gegevens we verzamelen, waarvoor we ze gebruiken en wat je rechten zijn.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell headerVariant="hub" pageTitle="Privacyverklaring" lastUpdated="21 maart 2026">
      <CentjePrivacyContent />
    </LegalPageShell>
  );
}
