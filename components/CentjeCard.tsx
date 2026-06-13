import React from "react";
import { GlowingEffect } from "./GlowingEffect";

interface CentjeCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CentjeCard({ children, className = "" }: CentjeCardProps) {
  return (
    <div className={`relative rounded-[20px] ${className}`}>
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative bg-white rounded-[20px] border border-[#E8F5E9] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,210,106,0.04)] p-3 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
