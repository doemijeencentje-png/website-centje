"use client";

import { AnimatedTabs } from "./AnimatedTabs";

export function Navbar() {
  return (
    <nav className="absolute top-4 right-4 z-40">
      <AnimatedTabs
        tabs={[
          { label: "Download", href: "#download" },
          { label: "Over ons", href: "#over-ons" },
          { label: "Stappen", href: "#stappen" },
        ]}
      />
    </nav>
  );
}
