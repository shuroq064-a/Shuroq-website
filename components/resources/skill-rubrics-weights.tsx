"use client";

import { useEffect, useMemo, useState } from "react";

import { Treemap, type TreemapNode } from "@/components/arc/treemap/treemap";

import { rubricRoles } from "./skill-rubrics-content";

/**
 * How the rubric divides each role: every competency is sized by its share of
 * the role, so a reader sees where the expectations sit.
 */
export function SkillRubricsWeights() {
  const data = useMemo<TreemapNode>(
    () => ({
      id: "roles",
      label: "Cloud-native roles",
      children: rubricRoles.map((role) => ({
        id: role.id,
        label: role.title,
        children: role.competencies.map((competency) => ({
          id: `${role.id}-${competency.id}`,
          label: competency.name,
          value: competency.weight,
        })),
      })),
    }),
    [],
  );

  // A narrow tile stack needs a deeper stage, or the small tiles lose their
  // labels entirely.
  const [height, setHeight] = useState(440);
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 640px)");
    const apply = () => setHeight(narrow.matches ? 360 : 440);
    apply();
    narrow.addEventListener("change", apply);
    return () => narrow.removeEventListener("change", apply);
  }, []);

  return (
    <Treemap
      data={data}
      label="Share of role by competency area"
      height={height}
      formatValue={(value) => `${value}%`}
    />
  );
}
