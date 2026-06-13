"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

export interface AnimatedTabsProps {
  tabs: { label: string; href: string }[];
  variant?: "light" | "dark";
}

export function AnimatedTabs({ tabs, variant = "light" }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const isClickScrolling = useRef(false);

  const updateClipPath = useCallback(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const activeTabElement = activeTabRef.current;

    if (container && wrapper && activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      const pad = parseFloat(getComputedStyle(wrapper).paddingLeft) || 0;

      const clipLeft = offsetLeft + pad;
      const clipRight = offsetLeft + offsetWidth + pad;

      container.style.clipPath = `inset(0 ${Number(
        100 - (clipRight / container.offsetWidth) * 100
      ).toFixed()}% 0 ${Number(
        (clipLeft / container.offsetWidth) * 100
      ).toFixed()}% round 17px)`;
    }
  }, []);

  useEffect(() => {
    updateClipPath();
  }, [activeTab, updateClipPath]);

  // Scroll-spy: update active tab based on which section is in view
  useEffect(() => {
    const sectionIds = tabs.map((t) => t.href.replace("#", ""));

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      // If near the bottom of the page, activate the last tab
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 150;
      if (nearBottom) {
        const lastTab = tabs[tabs.length - 1];
        if (lastTab.label !== activeTab) setActiveTab(lastTab.label);
        return;
      }

      const headerOffset = 120;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= headerOffset) {
            current = id;
          }
        }
      }

      const matchedTab = tabs.find((t) => t.href === `#${current}`);
      if (matchedTab && matchedTab.label !== activeTab) {
        setActiveTab(matchedTab.label);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs, activeTab]);

  const handleClick = (tab: { label: string; href: string }) => {
    setActiveTab(tab.label);
    isClickScrolling.current = true;

    const target = document.querySelector(tab.href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  const isDark = variant === "dark";

  return (
    <div
      ref={wrapperRef}
      className={`relative mx-auto flex w-fit flex-col items-center rounded-full py-1.5 sm:py-2 px-2 sm:px-4 border transition-colors duration-500 ${
        isDark
          ? "bg-white/10 border-white/15 backdrop-blur-md"
          : "bg-neutral-100/50 border-neutral-200"
      }`}
    >
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
      >
        <div
          className={`relative flex w-full items-center justify-center transition-colors duration-500 ${
            isDark ? "bg-white" : "bg-neutral-900"
          }`}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleClick(tab)}
              className={`flex h-7 sm:h-8 items-center rounded-full px-2 sm:p-3 text-xs sm:text-sm font-medium leading-none whitespace-nowrap transition-colors duration-500 ${
                isDark ? "text-neutral-900" : "text-white"
              }`}
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={index}
              ref={isActive ? activeTabRef : null}
              onClick={() => handleClick(tab)}
              className={`flex h-7 sm:h-8 items-center cursor-pointer rounded-full px-2 sm:p-3 text-xs sm:text-sm font-medium leading-none whitespace-nowrap transition-colors duration-500 ${
                isDark ? "text-white/60" : "text-neutral-500"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
