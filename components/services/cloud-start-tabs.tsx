"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import SegmentedControl from "@/components/arc/segmented-control/segmented-control";

import type { StartingPoint } from "./cloud-data";

/** The design-master segmented control drives three short, honest starting points. */
export function CloudStartTabs({ points }: { points: StartingPoint[] }) {
  const [value, setValue] = useState(points[0]?.value ?? "");
  const reduced = useReducedMotion();
  const active = points.find((point) => point.value === value) ?? points[0];

  return (
    <div>
      <div className="arc-service-tokens">
        <SegmentedControl
          label="Where to start"
          options={points.map((point) => ({ value: point.value, label: point.label }))}
          value={value}
          onValueChange={setValue}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.value}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          style={{ marginTop: 32 }}
        >
          <h3 className="subheading">{active.title}</h3>
          <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.5, maxWidth: 620 }}>
            {active.text}
          </p>
          <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none" }}>
            {active.bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 0",
                  borderTop: "1px solid var(--border)",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--fg)" }}>—</span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CloudStartTabs;
