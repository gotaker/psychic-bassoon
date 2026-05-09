import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "accent" | "emergency";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-deep)] text-white hover:bg-[color:var(--color-primary)] focus-visible:bg-[color:var(--color-primary)]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-line-soft)] hover:border-[color:var(--color-deep)]",
  accent:
    "bg-[color:var(--color-accent)] text-[color:var(--color-deep)] hover:bg-[color:var(--color-accent-2)]",
  emergency: "bg-[color:var(--color-emergency)] text-white hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[12px]",
  md: "px-4.5 py-2.5 text-[13px]",
  lg: "px-5.5 py-3.5 text-[14px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium tracking-[-0.005em] " +
  "transition-colors duration-150 ease-out " +
  "disabled:opacity-50 disabled:pointer-events-none";

export type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
