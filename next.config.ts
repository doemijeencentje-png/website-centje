import type { NextConfig } from "next";

// Het interne dashboard (repo doemijeencentje-png/Dashboard, eigen
// Vercel-project) wordt onder centje.app/intern geserveerd via een rewrite.
// De browser blijft op centje.app, dus de Supabase-sessie van het dashboard
// leeft op dit domein. Het dashboard zelf is gebouwd met base "/intern/".
const INTERN_UPSTREAM =
  process.env.INTERN_UPSTREAM ?? "https://dashboard-rouge-nine-29.vercel.app";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 voor app-schermen: bij de standaard 75 worden kleine letters in de schermen vlekkerig.
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  compress: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/intern", destination: `${INTERN_UPSTREAM}/intern` },
        { source: "/intern/:path*", destination: `${INTERN_UPSTREAM}/intern/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
