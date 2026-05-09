import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/icons";

export type StepperStep = {
  id: string;
  label: ReactNode;
};

type StepperProps = {
  steps: StepperStep[];
  current: number;
  className?: string;
};

// Booking flow stepper. 3+1 (last step = confirmation, rendered as "complete").
// Dotted connectors; completed steps show a check. DESIGN.md §5.5.
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol
      className={cn("flex items-center gap-3", className)}
      aria-label="Booking progress"
    >
      {steps.map((step, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <li key={step.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold",
                  isDone &&
                    "bg-[color:var(--color-deep)] text-white",
                  isActive &&
                    "bg-[color:var(--color-deep)] text-white ring-2 ring-[color:var(--color-deep)]/20 ring-offset-2 ring-offset-[color:var(--color-paper)]",
                  !isDone &&
                    !isActive &&
                    "border border-[color:var(--color-line-soft)] text-[color:var(--color-ink-soft)]",
                )}
              >
                {isDone ? <CheckIcon size={14} /> : idx + 1}
              </span>
              <span
                className={cn(
                  "meta uppercase tracking-[0.12em]",
                  isActive
                    ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-ink-soft)]",
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-12",
                  isDone
                    ? "bg-[color:var(--color-deep)]"
                    : "bg-[color:var(--color-line-soft)] [background:repeating-linear-gradient(to_right,currentColor_0,currentColor_2px,transparent_2px,transparent_6px)]",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
