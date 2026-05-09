"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <Button variant="primary" size="md" onClick={() => window.print()} type="button">
      {children}
    </Button>
  );
}
