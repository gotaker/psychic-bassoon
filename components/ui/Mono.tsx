import { cn } from "@/lib/cn";

type MonoProps = React.HTMLAttributes<HTMLSpanElement>;

// Uppercase mono kicker. 11 / 0.18em / weight 500. DESIGN.md §5.1.
// On dark surfaces (data-tone="deep") the kicker shifts to --color-accent
// via the .mono-kicker rule in globals.css.
export function Mono({ className, children, ...rest }: MonoProps) {
  return (
    <span className={cn("mono-kicker", className)} {...rest}>
      {children}
    </span>
  );
}

// Semantic alias — the same primitive, named for clarity at use-sites.
export function Eyebrow({ className, children, ...rest }: MonoProps) {
  return (
    <span className={cn("mono-kicker", className)} {...rest}>
      {children}
    </span>
  );
}
