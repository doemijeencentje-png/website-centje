"use client";

import { motion } from "framer-motion";

const REQUESTS = [
  { emoji: "🤑", title: "Tikkie", amount: "€ 5,00", status: "Niet betaald", statusType: "red" as const, date: "20 feb" },
  { emoji: "🥂", title: "Drank", amount: "€ 6,00", status: "Niet betaald", statusType: "red" as const, date: "1 feb" },
  { emoji: "🥂", title: "Drank", amount: "€ 85,00", status: "Niet betaald", statusType: "red" as const, date: "31 jan" },
  { emoji: "☕", title: "Café", amount: "€ 12,00", status: "Niet betaald", statusType: "red" as const, date: "26 jan" },
  { emoji: "🍺", title: "Heineken", amount: "€ 50,00", status: "Wacht op tegenstander", statusType: "orange" as const, date: "24 jan" },
  { emoji: "✂️", title: "Kapsalon", amount: "€ 25,00", status: "Wacht op tegenstander", statusType: "orange" as const, date: "20 jan" },
];

function StatusBadge({ text, type }: { text: string; type: "red" | "orange" | "green" }) {
  const styles = {
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium ${styles[type]}`}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 5v3.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </span>
  );
}

function RequestCard({ emoji, title, amount, status, statusType, date, index }: {
  emoji: string; title: string; amount: string; status: string; statusType: "red" | "orange" | "green"; date: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="bg-white rounded-xl border border-gray-100 px-3 py-2.5 relative"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
          <span className="text-base">{emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="text-[13px] font-semibold text-gray-900">{title}</h4>
            <span className="text-[13px] font-bold text-gray-900 ml-2">{amount}</span>
          </div>
          <div className="flex items-end justify-between mt-1.5">
            <StatusBadge text={status} type={statusType} />
            <span className="text-[9px] text-gray-400">{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AppShowcase() {
  return (
    <section className="relative bg-white py-16 md:py-24 px-6" aria-label="App preview">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-[#00B050] mb-3 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Bekijk de app
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F12] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Alles in één overzicht
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          {/* iPhone Frame */}
          <div className="relative w-[280px] sm:w-[320px] mx-auto">
            {/* Phone shell */}
            <div className="relative rounded-[40px] bg-[#1a1a1a] p-[10px] shadow-[0_25px_80px_-12px_rgba(0,0,0,0.35)]">
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[90px] h-[28px] bg-[#1a1a1a] rounded-b-[16px]" />

              {/* Screen */}
              <div className="relative rounded-[30px] overflow-hidden bg-[#f0f8f0]" style={{ aspectRatio: "9 / 19.5" }}>
                {/* Status bar spacer */}
                <div className="h-11 bg-white/60" />

                {/* App Header */}
                <div className="flex items-center justify-between px-3.5 h-10 bg-white/60 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-[#00B050] flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">C</span>
                    </div>
                    <span className="text-[13px] font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      centje
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                    </svg>
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Request Cards */}
                <div className="px-2.5 pt-2 pb-20 space-y-2 overflow-hidden">
                  {REQUESTS.map((req, i) => (
                    <RequestCard key={i} index={i} {...req} />
                  ))}
                </div>

                {/* FAB */}
                <div className="absolute bottom-14 right-3 z-20">
                  <div className="w-11 h-11 rounded-full bg-[#00B050] flex items-center justify-center shadow-[0_4px_20px_-2px_rgba(0,176,80,0.5)]">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
                  <div className="flex items-center justify-around h-12 px-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <svg className="w-5 h-5 text-[#00B050]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 9.5c-.8-1.1-2-1.5-3-1.5-2.2 0-4 1.8-4 4s1.8 4 4 4c1 0 2.2-.4 3-1.5" />
                        <line x1="12" y1="6" x2="12" y2="7.5" />
                        <line x1="12" y1="16.5" x2="12" y2="18" />
                      </svg>
                      <span className="text-[8px] font-medium text-[#00B050]">Verzoeken</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="11" width="4" height="6" rx="1" /><rect x="14" y="11" width="4" height="6" rx="1" />
                        <path d="M6 11V9a6 6 0 0 1 12 0v2" /><line x1="8" y1="14" x2="8" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" />
                      </svg>
                      <span className="text-[8px] font-medium text-gray-400">Arcade</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="text-[8px] font-medium text-gray-400">Shop</span>
                    </div>
                  </div>
                  {/* Home indicator */}
                  <div className="flex justify-center pb-1.5">
                    <div className="w-24 h-1 rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
