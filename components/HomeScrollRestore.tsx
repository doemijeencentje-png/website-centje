"use client";

import { useEffect } from "react";

const KEY = "centje-home-scroll-y";

export function rememberHomeScrollForReturn() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, String(Math.round(window.scrollY)));
}

export function HomeScrollRestore() {
  useEffect(() => {
    const raw = sessionStorage.getItem(KEY);
    if (raw == null) return;
    const y = Number(raw);
    sessionStorage.removeItem(KEY);
    if (!Number.isFinite(y)) return;
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  }, []);
  return null;
}
