"use client";

import { useState } from "react";

import { ChipGroup } from "@/components/arc/chip-group/chip-group";

/**
 * The chip group is a client component with a controlled value, so the page
 * can't pass the state down from the server. This wrapper keeps the selection
 * on the client and lets the page stay a server component.
 */
export function ToolsChipFilter({
  options,
  label,
}: {
  options: { value: string; label: string }[];
  label: string;
}) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ChipGroup
      options={options}
      value={value}
      onValueChange={setValue}
      label={label}
      multiple
    />
  );
}
