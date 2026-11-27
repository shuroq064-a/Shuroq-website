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
        width: "minmax(0, 1.6fr)",
        cell: (data) => <span>{data.title}</span>,
      },
      {
        id: "level",
        header: "Expected level",
        width: "minmax(0, 0.7fr)",
        cell: (data) => data.level,
      },
      {
        id: "weight",
        header: "Share of role",
        width: "minmax(0, 0.6fr)",
        align: "end",
        sortValue: (data) => data.weight,
        cell: (data) => `${data.weight}%`,
      },
      {
        id: "signal",
        header: "What good looks like",
        width: "minmax(0, 1.4fr)",
        cell: (data) => data.signal,
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
