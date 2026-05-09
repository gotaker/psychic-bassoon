import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Ratio = "1-1" | "1.15-1" | "1.4-1";

type EditorialSplitProps = {
  ratio?: Ratio;
  left: ReactNode;
  right: ReactNode;
  reverseOnMobile?: boolean;
  className?: string;
};

const ratioStyles: Record<Ratio, string> = {
  "1-1": "md:grid-cols-[1fr_1fr]",
  "1.15-1": "md:grid-cols-[1.15fr_1fr]",
  "1.4-1": "md:grid-cols-[1.4fr_1fr]",
};

// 1fr/1fr or 1.15fr/1fr or 1.4fr/1fr split with 64px gap.
// Used by Hero, FeaturedStory, VisitPanel, CollegeSplit, DepartmentHero. DESIGN.md §9.2.
export function EditorialSplit({
  ratio = "1-1",
  left,
  right,
  reverseOnMobile,
  className,
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-16 gap-y-10",
        ratioStyles[ratio],
        reverseOnMobile && "[&>:first-child]:order-2 md:[&>:first-child]:order-none",
        className,
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
