"use client";

import { SlopeChart } from "@/components/arc/slope-chart/slope-chart";

/**
 * The slope chart formats its own values, so the formatter has to live on the
 * client. This wrapper keeps that callback out of the server component.
 */
export function SlopeFigure({
  data,
  label,
  startLabel,
  endLabel,
  unit,
}: {
  data: { key: string; label: string; start: number; end: number }[];
  label: string;
  startLabel: string;
  endLabel: string;
  unit: string;
}) {
  return (
    <SlopeChart
      data={data}
      label={label}
      startLabel={startLabel}
      endLabel={endLabel}
      formatValue={(value) => `${value} ${unit}`}
      formatChange={(change, item) =>
        `${change > 0 ? "+" : ""}${change} ${unit} for ${item.label}`
      }
      ranks
    />
  );
}
