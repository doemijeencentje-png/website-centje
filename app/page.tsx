import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";

const GradientDots = dynamic(() =>
  import("@/components/GradientDots").then((m) => ({ default: m.GradientDots }))
);
const HowItWorks = dynamic(() =>
  import("@/components/how-it-works/HowItWorks").then((m) => ({ default: m.HowItWorks }))
);
const Highlights = dynamic(() =>
  import("@/components/Highlights").then((m) => ({ default: m.Highlights }))
);
const SafetySection = dynamic(() =>
  import("@/components/SafetySection").then((m) => ({ default: m.SafetySection }))
);
const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const FaqTeaser = dynamic(() =>
  import("@/components/FaqTeaser").then((m) => ({ default: m.FaqTeaser }))
);
const DownloadSection = dynamic(() =>
  import("@/components/DownloadSection").then((m) => ({ default: m.DownloadSection }))
);

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TrustStrip />

        <div className="relative bg-white">
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
        <SafetySection />
        <AboutSection />
        <FaqTeaser />
        <DownloadSection />
      </main>
    </>
  );
}
