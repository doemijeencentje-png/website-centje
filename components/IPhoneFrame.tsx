import React from "react";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className = "" }: IPhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[280px] ${className}`}
      style={{ aspectRatio: "9 / 19.5", containerType: "inline-size" }}
    >
      {/* Outer frame — hoeken/knoppen schalen mee met de breedte (cqw)
          zodat het op elk formaat als een echte iPhone oogt */}
      <div className="absolute inset-0 rounded-[15cqw] bg-[#1a1a1a] shadow-[0_0_0_2px_#333,0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(0,0,0,0.1)]" />

      {/* Screen area */}
      <div className="absolute inset-[1cqw] rounded-[14cqw] overflow-hidden bg-white">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-[3.5cqw]">
          <div className="w-[35cqw] h-[10cqw] bg-black rounded-full" />
        </div>

        {/* Screenshot content */}
        <div className="absolute inset-0">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[2cqw] left-0 right-0 z-20 flex justify-center">
          <div className="w-[42cqw] h-[1.4cqw] bg-black/20 rounded-full" />
        </div>
      </div>

      {/* Side button (power) */}
      <div className="absolute -right-[0.7cqw] top-[39cqw] w-[1cqw] h-[15cqw] bg-[#2a2a2a] rounded-r-sm" />

      {/* Volume buttons */}
      <div className="absolute -left-[0.7cqw] top-[32cqw] w-[1cqw] h-[10cqw] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[0.7cqw] top-[45cqw] w-[1cqw] h-[10cqw] bg-[#2a2a2a] rounded-l-sm" />
    </div>
  );
}
