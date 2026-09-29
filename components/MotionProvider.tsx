"use client";

import { MotionConfig } from "framer-motion";

// Bij 'minder beweging' in het besturingssysteem slaat framer-motion verschuivingen
// over en houdt alleen het vervagen aan. Server en browser renderen daardoor dezelfde
// beginstijl, wat bij een eigen uitzondering per component niet zo is.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
