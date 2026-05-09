import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "paper" | "paper-2" | "white" | "deep";

type SectionProps = {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

const toneClasses: Record<Tone, string> = {
  paper: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)]",
  "paper-2": "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]",
  white: "bg-white text-[color:var(--color-ink)]",
  deep: "bg-[color:var(--color-deep)] text-white",
};

export function Section({
  tone = "paper",
  children,
  className,
  innerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("section-y", toneClasses[tone], className)}
      {...rest}
    >
      <div
        className={cn(
          "page-gutter mx-auto w-full max-w-[var(--content-max)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
