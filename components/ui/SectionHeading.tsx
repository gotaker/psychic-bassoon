import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Mono } from "./Mono";

type SectionHeadingProps = {
  kicker: ReactNode;
  children: ReactNode;
  rightLink?: { href: string; label: ReactNode };
  size?: "md" | "lg";
  className?: string;
};

// Composed kicker + serif H2 + optional right-aligned link.
// Standard section opener. DESIGN.md §5.1.
export function SectionHeading({
  kicker,
  children,
  rightLink,
  size = "md",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-3", className)}>
      <div>
        <Mono>{kicker}</Mono>
        <h2 className={cn(size === "lg" ? "display-lg" : "display-md", "mt-3 max-w-[18ch]")}>
          {children}
        </h2>
      </div>
      {rightLink ? (
        <a
          href={rightLink.href}
          className="meta inline-flex items-center gap-1.5 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
        >
          {rightLink.label}
        </a>
      ) : null}
    </header>
  );
}
