import type { SVGProps } from "react";

// 24×24 view-box, 1.6px stroke, currentColor — DESIGN.md §3.
// Decorative only; meaningful copy lives in adjacent text. Always render
// inside a labelled element or set aria-hidden when decorative.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(props: IconProps) {
  const { size = 16, ...rest } = props;
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": rest["aria-hidden"] ?? true,
    ...rest,
  };
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 1.5, ...props })}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2, ...props })}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function BackIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  const { size = 12, "aria-hidden": ariaHidden = true, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      {...rest}
    >
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.7 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z" />
    </svg>
  );
}

export const Icons = {
  arrow: ArrowIcon,
  search: SearchIcon,
  pin: PinIcon,
  phone: PhoneIcon,
  cal: CalendarIcon,
  check: CheckIcon,
  chev: ChevronIcon,
  back: BackIcon,
  star: StarIcon,
} as const;

export type IconName = keyof typeof Icons;
