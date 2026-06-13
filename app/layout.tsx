import type { Metadata } from "next";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Centje — Speel & pak je voordeel",
  description:
    "Maak betaalverzoeken leuker met games. Speel, win en betaal minder. Beschikbaar voor iPhone.",
  keywords: ["centje", "betaalverzoek", "fintech", "gamification", "betalen", "app"],
  metadataBase: new URL("https://centje.app"),
  openGraph: {
    title: "Centje — Speel & pak je voordeel",
    description:
      "Maak betaalverzoeken leuker met games. Speel, win en betaal minder.",
    url: "https://centje.app",
    siteName: "Centje",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Centje — groene munt logo",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centje — Speel & pak je voordeel",
    description:
      "Maak betaalverzoeken leuker met games. Speel, win en betaal minder.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="preload"
          href="/centje-hero-mobile.mp4"
          as="video"
          type="video/mp4"
          media="(max-width: 639px)"
        />
      </head>
      <body className="antialiased bg-white">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
