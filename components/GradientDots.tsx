import React from "react";

type GradientDotsProps = React.HTMLAttributes<HTMLDivElement> & {
  dotSize?: number;
  spacing?: number;
  duration?: number;
  backgroundColor?: string;
};

export function GradientDots({
  dotSize = 8,
  spacing = 10,
  duration = 30,
  backgroundColor = "#ffffff",
  className,
  style,
  ...props
}: GradientDotsProps) {
  const hexSpacing = spacing * 1.732;

  return (
    <div
      className={`gradient-dots absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, #00D26A, transparent 60%),
          radial-gradient(circle at 50% 50%, #00A855, transparent 60%),
          radial-gradient(circle at 50% 50%, #00FF7F, transparent 60%),
          radial-gradient(ellipse at 50% 50%, #00B050, transparent 60%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
        animationDuration: `${duration}s`,
        ...style,
      }}
      {...props}
    />
  );
}
