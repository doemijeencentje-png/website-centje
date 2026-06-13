"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative bg-white pt-8 pb-20 md:pb-28 px-6" aria-label="Download">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <h3
          className="text-2xl sm:text-3xl font-bold text-[#0B0F12] tracking-tight mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Klaar om te beginnen?
        </h3>
        <p className="text-base text-[#6B7280] mb-8 leading-relaxed">
          Download Centje en ontdek een nieuwe manier van betalen.
        </p>

        <motion.a
          href="#"
          className="inline-flex items-center gap-3 bg-[#0B0F12] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(11,15,18,0.35)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Download on the App Store"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.57 5.72C13.36 5.72 14.85 4.62 16.4 4.8C17.07 4.83 18.84 5.08 19.97 6.73C19.87 6.79 17.72 8.02 17.75 10.63C17.78 13.76 20.47 14.8 20.5 14.81C20.47 14.88 20.07 16.24 19.07 17.65L18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
          Download in de App Store
        </motion.a>
      </motion.div>
    </section>
  );
}
