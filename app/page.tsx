import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeScrollRestore } from "@/components/HomeScrollRestore";
import { Ticker } from "@/components/Ticker";

const GradientDots = dynamic(() =>
  import("@/components/GradientDots").then((m) => ({ default: m.GradientDots }))
);
const HowItWorks = dynamic(() =>
  import("@/components/how-it-works/HowItWorks").then((m) => ({ default: m.HowItWorks }))
);
const Highlights = dynamic(() =>
  import("@/components/Highlights").then((m) => ({ default: m.Highlights }))
);
const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const DownloadSection = dynamic(() =>
  import("@/components/DownloadSection").then((m) => ({
    default: m.DownloadSection,
  }))
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeScrollRestore />
      <SiteHeader />

      <HeroSection />

      <Ticker />

      <div className="relative bg-white">
        <div className="relative">
          {/* Stippen alleen achter Hoe het werkt, zacht uitlopend naar onderen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
            }}
          >
            <GradientDots className="!absolute inset-0" />
          </div>
          <div className="relative">
            <HowItWorks />
          </div>
        </div>
        <Highlights />
        <AboutSection />
      </div>

      <DownloadSection />
    </main>
  );
}
