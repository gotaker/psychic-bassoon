import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = 56 | 64 | 72 | 84 | 96 | 120;

type DoctorAvatarProps = {
  initials: string;
  tone: `#${string}`;
  size?: Size;
  className?: string;
  photo?: string;
  alt?: string;
};

// Gradient + serif initials by default. When `photo` is provided, renders
// next/image instead. DESIGN.md §5.3.
// Tones are seeded per-doctor in content/doctors.ts and stay stable as identity.
export function DoctorAvatar({
  initials,
  tone,
  size = 64,
  className,
  photo,
  alt,
}: DoctorAvatarProps) {
  if (photo) {
    return (
      <div
        className={cn("relative flex-shrink-0 overflow-hidden rounded-full", className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={photo}
          alt={alt ?? ""}
          width={size}
          height={size}
          sizes={`${size}px`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        "grid flex-shrink-0 place-items-center rounded-full text-white/95",
        "[box-shadow:inset_0_-8px_24px_rgba(0,0,0,0.18)]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${tone}, ${tone}99 60%, #1d2528)`,
        fontFamily: "var(--font-serif)",
        fontSize: Math.round(size / 3),
        lineHeight: 1,
        letterSpacing: "-0.01em",
        fontWeight: 500,
      }}
    >
      {initials}
    </div>
  );
}

export function getInitials(fullName: string): string {
  const parts = fullName
    .replace(/^Dr\.?\s+|^डॉ\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) {
    const first = parts[0] ?? "";
    return first.slice(0, 2).toUpperCase();
  }
  const first = parts[0] ?? "";
  const last = parts[parts.length - 1] ?? "";
  const a = first.charAt(0);
  const b = last.charAt(0);
  return `${a}${b}`.toUpperCase();
}
