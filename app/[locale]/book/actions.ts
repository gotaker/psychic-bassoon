"use server";

import { z } from "zod";
import { departments } from "@/content/departments";
import { doctors } from "@/content/doctors";

// Server-action contract per CLAUDE.md. Validates, logs, returns a generated
// reference. v1 is mocked — no DB, no SMS gateway. The HIS integration
// arriving post-launch will be a one-file swap.

const phoneRegex = /^\+91 9\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;
const dayValues = ["today", "tomorrow", "d2", "d3"] as const;

const departmentSlugs = departments.map((d) => d.slug);
const doctorIds = doctors.map((d) => d.id);

const BookingInputSchema = z.object({
  departmentId: z.string().refine((v) => (departmentSlugs as readonly string[]).includes(v), {
    message: "Unknown department",
  }),
  doctorId: z.string().refine((v) => (doctorIds as readonly string[]).includes(v), {
    message: "Unknown doctor",
  }),
  day: z.enum(dayValues),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be HH:MM"),
  patientName: z.string().min(2, "Please enter the full name."),
  phoneE164: z.string().regex(phoneRegex, "Enter a 10-digit Indian mobile, prefixed with +91."),
  notes: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof BookingInputSchema>;

export type BookingResult =
  | { ok: true; ref: string; smsETA: number }
  | { ok: false; field?: keyof BookingInput; message: string };

function generateRef(): string {
  // 5-digit, uniformly distributed; no PRNG concerns at this scope.
  const n = 10000 + Math.floor(Math.random() * 90000);
  return `DNH-${n}`;
}

export async function submitBooking(raw: unknown): Promise<BookingResult> {
  const parsed = BookingInputSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (!issue) return { ok: false, message: "Invalid booking input." };
    const field = issue.path[0] as keyof BookingInput | undefined;
    return field
      ? { ok: false, field, message: issue.message }
      : { ok: false, message: issue.message };
  }

  const ref = generateRef();
  // Log without leaking phone numbers in plaintext analytics.

  console.info(
    "[booking]",
    JSON.stringify({
      ref,
      departmentId: parsed.data.departmentId,
      doctorId: parsed.data.doctorId,
      day: parsed.data.day,
      time: parsed.data.time,
      patientNameInitial: parsed.data.patientName.slice(0, 1),
      phoneSuffix: parsed.data.phoneE164.slice(-4),
      hasNotes: Boolean(parsed.data.notes),
    }),
  );

  return { ok: true, ref, smsETA: 30 };
}
