"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

type Options = {
  enabled?: boolean;
  lerp?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function useGsapSmoothScroll({ enabled = true, lerp = 0.12 }: Options = {}) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    let target = window.scrollY;
    let current = window.scrollY;
    let rafLock = false;
    let wheelActive = false;

    const syncFromWindow = () => {
      target = window.scrollY;
      current = window.scrollY;
    };

    // After loading overlays or overflow locks, layout/scrollHeight can settle one frame late.
    syncFromWindow();
    let raf0 = 0;
    let raf1 = 0;
    raf0 = requestAnimationFrame(() => {
      raf1 = requestAnimationFrame(syncFromWindow);
    });

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // allow browser zoom
      e.preventDefault();
      target += e.deltaY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      target = clamp(target, 0, maxScroll);
      rafLock = true;
      wheelActive = true;
    };

    const onScroll = () => {
      // If scroll position changes from non-wheel sources (e.g. GSAP scrollTo, anchor jumps),
      // sync targets so the next wheel doesn't "snap" from an outdated value.
      if (!wheelActive && !rafLock) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    const tick = () => {
      if (!rafLock) return;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      target = clamp(target, 0, maxScroll);
      current += (target - current) * lerp;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        rafLock = false;
        wheelActive = false;
      }
      window.scrollTo(0, current);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf1);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(tick);
    };
  }, [enabled, lerp]);
}

