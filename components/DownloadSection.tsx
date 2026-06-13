"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IPhoneFrame } from "./IPhoneFrame";
import { CENTJE_EMAIL_DISPLAY, CENTJE_EMAIL_MAILTO } from "@/lib/centje-contact";

const APP_STORE_URL = "https://apps.apple.com/app/centje/id000000000"; // Vervang met echte App Store-link

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function DownloadSection() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-[#0A0C0A] scroll-mt-20"
    >
      {/* Subtiel stippenraster */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Groene glow rechts */}
      <div
        className="pointer-events-none absolute right-[-25%] top-1/2 hidden h-[900px] w-[900px] -translate-y-1/2 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(0,210,106,0.30), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-[1.3fr_1fr] items-center gap-5 px-4 py-20 sm:gap-10 sm:px-6 sm:py-28 md:grid-cols-2 md:gap-16 md:py-36">
        {/* CTA-kolom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#00D26A] sm:text-sm">
            Klaar om te beginnen?
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:mt-5 sm:text-5xl md:text-6xl">
            Download Centje.
            <br />
            <span className="text-[#00D26A]">Betaal leuker.</span>
          </h2>
          <p className="mt-4 max-w-[540px] text-xs leading-relaxed text-white/60 sm:mt-7 sm:text-xl">
            Maak je betaalverzoeken leuker met games. Speel, win en betaal
            minder. Beschikbaar voor iPhone.
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#2a2e2a] bg-black px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,.5)] transition-transform hover:scale-[1.03] sm:gap-3.5 sm:rounded-[18px] sm:px-7 sm:py-4"
            >
              <AppleLogo className="h-6 w-6 shrink-0 text-white sm:h-9 sm:w-9" />
              <span className="text-left text-white">
                <span className="block text-[10px] opacity-80 sm:text-[13px]">
                  Download on the
                </span>
                <span className="block text-base font-bold leading-tight sm:text-2xl">
                  App Store
                </span>
              </span>
            </a>
            <span className="text-[11px] text-white/50 sm:text-sm">
              Gratis · Beschikbaar voor iPhone
            </span>
          </div>
        </motion.div>

        {/* Echte Centje-app in de telefoon */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center"
          style={{ perspective: 1500 }}
        >
          <div
            className="w-[120px] sm:w-[240px] md:w-[300px]"
            style={{
              transform: "rotateY(-18deg) rotateX(5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <IPhoneFrame>
              <Image
                src="/steps/step-1.png"
                alt="Centje app"
                fill
                className="object-cover object-top"
                sizes="300px"
              />
            </IPhoneFrame>
          </div>
        </motion.div>
      </div>

      {/* Footer-balk geïntegreerd in de donkere finale */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <div className="relative h-5 w-[60px]">
              <Image
                src="/centje-wordmark.png"
                alt="Centje"
                fill
                className="object-contain object-left"
                sizes="60px"
              />
            </div>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/50">
            <a
              href={CENTJE_EMAIL_MAILTO}
              className="transition-colors hover:text-white"
            >
              {CENTJE_EMAIL_DISPLAY}
            </a>
            <Link
              href="/voorwaarden"
              className="font-medium text-white transition-colors hover:text-white/80"
            >
              Voorwaarden
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
