import React from "react";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className = "" }: IPhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[280px] ${className}`}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      {/* Outer frame */}
      <div className="absolute inset-0 rounded-[44px] bg-[#1a1a1a] shadow-[0_0_0_2px_#333,0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(0,0,0,0.1)]" />

      {/* Screen area */}
      <div className="absolute inset-[3px] rounded-[42px] overflow-hidden bg-white">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-[10px]">
          <div className="w-[100px] h-[28px] bg-black rounded-full" />
        </div>

        {/* Screenshot content */}
        <div className="absolute inset-0">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[6px] left-0 right-0 z-20 flex justify-center">
          <div className="w-[120px] h-[4px] bg-black/20 rounded-full" />
        </div>
      </div>

      {/* Side button (power) */}
      <div className="absolute -right-[2px] top-[110px] w-[3px] h-[44px] bg-[#2a2a2a] rounded-r-sm" />

      {/* Volume buttons */}
      <div className="absolute -left-[2px] top-[90px] w-[3px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[2px] top-[126px] w-[3px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
    </div>
  );
}
