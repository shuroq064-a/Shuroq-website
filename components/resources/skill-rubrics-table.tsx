"use client";

import { useMemo } from "react";

import {
  TreeTable,
  type TreeTableColumn,
  type TreeTableRow,
} from "@/components/arc/tree-table/tree-table";

import { rubricRoles } from "./skill-rubrics-content";

type RubricRow = {
  kind: "role" | "competency";
  title: string;
  summary: string;
  level: string;
  weight: number;
  signal: string;
};

export function SkillRubricsTable() {
  const rows = useMemo<TreeTableRow<RubricRow>[]>(
    () =>
      rubricRoles.map((role) => ({
        id: role.id,
        data: {
          kind: "role" as const,
          title: role.title,
          summary: role.summary,
          level: `${role.competencies.length} areas`,
          weight: 100,
          signal: "Expand for the competency areas",
        },
        children: role.competencies.map((competency) => ({
          id: competency.id,
          data: {
            kind: "competency" as const,
            title: competency.name,
            summary: "",
            level: competency.level,
            weight: competency.weight,
            signal: competency.signal,
          },
        })),
      })),
    [],
  );

  const columns = useMemo<TreeTableColumn<RubricRow>[]>(
    () => [
      {
        id: "area",
        header: "Competency area",
        width: "minmax(120px, 1.6fr)",
        cell: (data) => <span>{data.title}</span>,
      },
      {
        id: "level",
        header: "Expected level",
        width: "minmax(110px, 0.7fr)",
        // The expected level and the evidence line fold away as the table
        // narrows, so a phone keeps the competency and its share.
        hideBelow: 760,
        cell: (data) => data.level,
      },
      {
        id: "weight",
        header: "Share of role",
        width: "minmax(76px, 0.6fr)",
        align: "end",
        sortValue: (data) => data.weight,
        cell: (data) => `${data.weight}%`,
      },
      {
        id: "signal",
        header: "What good looks like",
        width: "minmax(180px, 1.4fr)",
        // The note now ends in an ellipsis inside its own column, so it can
        // stay as long as the column has room for it.
        hideBelow: 860,
        // The note is a full sentence, so it ends in an ellipsis at the edge of
        // its column rather than stretching the row wider than the table.
        cell: (data) => <span title={data.signal}>{data.signal}</span>,
      },
    ],
    [],
  );

  return (
    <TreeTable
      rows={rows}
      columns={columns}
      label="Role based skill rubrics"
      defaultExpanded={rubricRoles.slice(0, 1).map((role) => role.id)}
      selectable
      rowLabel={(data) => data.title}
    />
  );
}
