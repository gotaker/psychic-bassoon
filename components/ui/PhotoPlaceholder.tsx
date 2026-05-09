import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type PhotoTone = "mocha" | "slate" | "sand" | "sage" | "clay";

const gradients: Record<PhotoTone, string> = {
  mocha: "linear-gradient(155deg, #b3a283 0%, #6e5d44 45%, #2c2418 100%)",
  slate: "radial-gradient(120% 90% at 70% 40%, #b8c8c8, #5a7a82 55%, #1d3438 100%)",
  sand: "radial-gradient(110% 80% at 30% 30%, #d9c9a8, #8a7355 60%, #4a3a28 100%)",
  sage: "radial-gradient(120% 90% at 50% 70%, #c8b89a, #7a8868 50%, #2e3a28 100%)",
  clay: "linear-gradient(155deg, #e6c8a8 0%, #b88a5e 35%, #4a3520 100%)",
};

type PhotoPlaceholderProps = {
  tone: PhotoTone;
  caption: ReactNode;
  overlay?: ReactNode;
  ratio?: "tall" | "wide" | "square" | "hero";
  radius?: "sm" | "md" | "lg";
  className?: string;
};

const ratioClasses = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  hero: "aspect-[4/5]",
} as const;

const radiusClasses = {
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
} as const;

// Photographic surface placeholder (DESIGN.md §4.2). Until real photography
// arrives, every photographic surface uses this. Five approved tones; never
// invent new ones.
export function PhotoPlaceholder({
  tone,
  caption,
  overlay,
  ratio = "tall",
  radius = "sm",
  className,
}: PhotoPlaceholderProps) {
  return (
    <figure
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden",
        ratioClasses[ratio],
        radiusClasses[radius],
        className,
      )}
      style={{ background: gradients[tone] }}
    >
      <span className="mono-tag absolute left-4 top-4 z-10 rounded-sm bg-black/30 px-2 py-1 text-white">
        {caption}
      </span>
      {overlay ? (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)",
            }}
          />
          <figcaption className="absolute bottom-5 left-5 right-5 z-10 max-w-[24ch] text-white">
            <span className="display-sm">{overlay}</span>
          </figcaption>
        </>
      ) : null}
    </figure>
  );
}
