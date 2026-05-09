"use client";

import { useState } from "react";
import { FilterPillGroup } from "@/components/ui/FilterPillGroup";

export function FilterDemo() {
  const [spec, setSpec] = useState("all");
  const [day, setDay] = useState("any");
  return (
    <div className="grid gap-4">
      <FilterPillGroup
        label="Specialty"
        value={spec}
        onChange={setSpec}
        options={[
          { value: "all", label: "All" },
          { value: "card", label: "Cardiology" },
          { value: "ped", label: "Pediatrics" },
          { value: "ortho", label: "Orthopedics" },
          { value: "obg", label: "OB-GYN" },
          { value: "neuro", label: "Neurology" },
          { value: "onco", label: "Oncology" },
        ]}
      />
      <FilterPillGroup
        label="Availability"
        value={day}
        onChange={setDay}
        options={[
          { value: "any", label: "Any day" },
          { value: "today", label: "Today" },
          { value: "tomorrow", label: "Tomorrow" },
          { value: "week", label: "This week" },
        ]}
      />
      <p className="body-sm text-[color:var(--color-ink-soft)]">
        Selection: <code className="mono-tag">{spec}</code> ·{" "}
        <code className="mono-tag">{day}</code>
      </p>
    </div>
  );
}
