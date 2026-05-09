"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  ariaLabel?: string;
};

// Continuous strip. Pauses on hover/focus and under prefers-reduced-motion.
// DESIGN.md §2.6, §5.1.
export function Marquee({ children, speed = 60, className, ariaLabel }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-12 will-change-transform"
        style={{
          animation: reducedMotion ? "none" : `dnh-marquee ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes dnh-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
