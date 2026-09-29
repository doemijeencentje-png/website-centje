import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MotionProvider } from "@/components/MotionProvider";

// De wdth-as is nodig voor de brede koppen (font-stretch in .font-heading).
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: {
    default: "Centje | Betaalverzoeken leuker maken met games",
    template: "%s | Centje",
  },
  description:
    "Centje is de Nederlandse app die betaalverzoeken leuk maakt. Stuur een challenge in plaats van een kaal verzoek: speel een spelletje, win en betaal minder. Gratis voor iPhone.",
  keywords: [
    "centje",
    "betaalverzoek",
    "betaalverzoek app",
    "geld terugvragen",
    "rekening splitsen",
    "geld terugvragen vrienden",
    "groepsbetaling",
    "betaalverzoek met spelletje",
    "leuker betalen",
    "fintech app Nederland",
    "iDEAL betaalverzoek",
  ],
  metadataBase: new URL("https://centje.app"),
  applicationName: "Centje",
  category: "finance",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Centje | Betaalverzoeken leuker maken met games",
    description:
      "Stuur een challenge in plaats van een kaal betaalverzoek. Speel een spelletje, win en betaal minder. Gratis voor iPhone.",
    url: "https://centje.app",
    siteName: "Centje",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Centje, de app die betaalverzoeken leuker maakt",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centje | Betaalverzoeken leuker maken met games",
    description:
      "Stuur een challenge in plaats van een kaal betaalverzoek. Speel een spelletje, win en betaal minder.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://centje.app/#organization",
      name: "Centje",
      url: "https://centje.app",
      logo: "https://centje.app/centje-logo.png",
      description:
        "Centje is een Nederlandse fintech-app die betaalverzoeken leuker maakt met vaardigheidsspelletjes.",
    },
    {
      "@type": "WebSite",
      "@id": "https://centje.app/#website",
      name: "Centje",
      url: "https://centje.app",
      inLanguage: "nl-NL",
      publisher: { "@id": "https://centje.app/#organization" },
    },
    {
      "@type": "MobileApplication",
      "@id": "https://centje.app/#app",
      name: "Centje",
      operatingSystem: "iOS",
      applicationCategory: "FinanceApplication",
      inLanguage: "nl-NL",
      description:
        "Met Centje stuur je een betaalverzoek als challenge: je speelt hetzelfde vaardigheidsspelletje en wie beter speelt, betaalt minder. Individueel met één vriend of als Groepscentje met de hele groep, betalen via iDEAL.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      publisher: { "@id": "https://centje.app/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`light ${archivo.variable}`}>
      <head>
        <link
          rel="preload"
          href="/centje-hero-mobile.mp4"
          as="video"
          type="video/mp4"
          media="(max-width: 639px)"
        />
        <link
          rel="preload"
          href="/centje-hero.mp4"
          as="video"
          type="video/mp4"
          media="(min-width: 640px)"
        />
      </head>
      <body className="antialiased bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LoadingScreen />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
