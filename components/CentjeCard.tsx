"use client";

import React, { useEffect, useState } from "react";
import { GlowingEffect } from "./GlowingEffect";

interface CentjeCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CentjeCard({ children, className = "" }: CentjeCardProps) {
  const [disableGlow, setDisableGlow] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px) and (pointer: fine)");
    const update = () => setDisableGlow(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className={`relative rounded-[20px] ${className}`}>
      <GlowingEffect
        spread={40}
        glow
        disabled={disableGlow}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative rounded-[20px] border border-[#E8F5E9] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,210,106,0.04)] sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
