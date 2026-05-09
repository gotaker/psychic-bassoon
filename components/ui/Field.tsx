import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
};

// Shared shell — uppercase tracked label, focus-aware border, optional hint/error.
// DESIGN.md §5.1.
function FieldShell({ id, label, hint, error, children }: FieldShellProps) {
  const describedById = hint || error ? `${id}-desc` : undefined;
  return (
    <label className="block" htmlFor={id}>
      <span className="meta mb-1.5 block uppercase tracking-[0.12em] text-[color:var(--color-ink-soft)]">
        {label}
      </span>
      {children}
      {(hint || error) && (
        <span
          id={describedById}
          aria-live={error ? "polite" : undefined}
          className={cn(
            "body-sm mt-1.5 block",
            error ? "text-[color:var(--color-emergency)]" : "text-[color:var(--color-ink-soft)]",
          )}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}

const inputClasses =
  "block w-full rounded-[var(--radius-md)] border border-[color:var(--color-line-soft)] bg-white " +
  "px-3.5 py-2.5 text-[15px] leading-[1.4] text-[color:var(--color-ink)] " +
  "transition-colors duration-150 ease-out " +
  "placeholder:text-[color:var(--color-ink-soft)]/60 " +
  "focus:border-[color:var(--color-deep)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-deep)] " +
  "disabled:opacity-50";

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { id, label, hint, error, className, ...rest },
  ref,
) {
  if (!id) {
    throw new Error("<Field> requires `id` so the label associates with the input.");
  }
  const describedBy = hint || error ? `${id}-desc` : undefined;
  return (
    <FieldShell id={id} label={label} {...(hint ? { hint } : {})} {...(error ? { error } : {})}>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputClasses, className)}
        {...rest}
      />
    </FieldShell>
  );
});

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ id, label, hint, error, className, ...rest }, ref) {
    if (!id) {
      throw new Error("<TextareaField> requires `id` so the label associates with the textarea.");
    }
    const describedBy = hint || error ? `${id}-desc` : undefined;
    return (
      <FieldShell id={id} label={label} {...(hint ? { hint } : {})} {...(error ? { error } : {})}>
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          rows={rest.rows ?? 3}
          className={cn(inputClasses, "resize-y", className)}
          {...rest}
        />
      </FieldShell>
    );
  },
);
