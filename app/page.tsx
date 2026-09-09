import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeScrollRestore } from "@/components/HomeScrollRestore";

const GradientDots = dynamic(() =>
  import("@/components/GradientDots").then((m) => ({ default: m.GradientDots }))
);
const Steps = dynamic(() =>
  import("@/components/Steps").then((m) => ({ default: m.Steps }))
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

      {/* Section 1: Fullscreen black hero */}
      <HeroSection />

      {/* Section 2: Gradient transition zwart tot aan de bolletjes — ingekort naar 70% */}
      <div
        className="relative h-[28vh]"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, #000000 10%, #0B0F12 18%, #11161b 26%, #181f26 36%, #222b34 48%, #2f3a45 60%, #45515f 74%, #6b7686 86%, #9ca3b0 95%, #ffffff 100%)",
        }}
      />

      {/* Section 3: White content — stipjes faden zacht uit naar onderen */}
      <div className="relative bg-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 88%)",
          }}
        >
          <GradientDots className="!absolute inset-0" />
        </div>
        <div className="relative">
          <Steps />
          <AboutSection />
        </div>
      </div>

      {/* Section 4: Donkere download-finale met geïntegreerde footer */}
      <DownloadSection />
    </main>
  );
}
