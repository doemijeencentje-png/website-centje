import { AboutSection } from "@/components/AboutSection";
import { DownloadSection } from "@/components/DownloadSection";
import { FaqTeaser } from "@/components/FaqTeaser";
import HeroSection from "@/components/HeroSection";
import { PaymentBar } from "@/components/PaymentBar";
import { Highlights } from "@/components/Highlights";
import { SafetySection } from "@/components/SafetySection";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PaymentBar />
      <HowItWorks />
      <Highlights />
      <SafetySection />
      <AboutSection />
      <FaqTeaser />
      <DownloadSection />
    </main>
  );
}
