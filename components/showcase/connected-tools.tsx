"use client";

import {
  AnimatedBeam,
  AnimatedBeamBeams,
  AnimatedBeamNodes,
  type AnimatedBeamNode,
  type BeamLink,
} from "@/components/animated/animated-beam";
import { useMediaQuery } from "@/components/showcase/use-media-query";

/**
 * Every mark is vendored with `npx @thesvg/cli add <slug> --dir ./public/icons`,
 * so the diagram keeps its colours offline and never waits on a third-party CDN.
 * Order matters: satellites are placed clockwise from 12 o'clock.
 *
 * Two mark shapes need help on a 48px card: near-black glyphs (`mono`) are
 * forced to pure white on the dark theme, and the n8n legacy lockup is 1.9:1,
 * so it gets width rather than a square box. Pinecone is vendored as its `mono`
 * variant, which is the square symbol instead of the wordmark; OpenAI uses the
 * `openai-badge` lockup, whose black disc plus white spiral reads on both themes.
 */
type MarkVariant = "colour" | "mono" | "wordmark";

function Mark({ src, variant = "colour" }: { src: string; variant?: MarkVariant }) {
  const sizing = variant === "wordmark" ? "h-auto w-[86%]" : "size-1/2";
  const filter = variant === "mono" ? "dark:brightness-0 dark:invert" : "";
  return (
    // Vendored SVGs pass straight through; next/image would need dangerouslyAllowSVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      className={`${sizing} object-contain select-none ${filter}`}
    />
  );
}

const nodes: AnimatedBeamNode[] = [
  {
    id: "app",
    label: "AI Workflow",
    icon: (
      // Vendored ui:inference; <img> cannot inherit currentColor, hence dark:invert.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/ui-inference.svg"
        alt=""
        draggable={false}
        className="size-8 object-contain select-none dark:invert"
      />
    ),
  },
  { id: "n8n", label: "n8n", icon: <Mark src="/icons/n8n-legacy.svg" variant="wordmark" /> },
  { id: "langgraph", label: "LangGraph", icon: <Mark src="/icons/langgraph.svg" variant="mono" /> },
  { id: "openai", label: "OpenAI", icon: <Mark src="/icons/openai-badge.svg" /> },
  { id: "pinecone", label: "Pinecone", icon: <Mark src="/icons/pinecone.svg" variant="mono" /> },
  { id: "redis", label: "Redis", src: "/icons/redis.svg" },
  { id: "kafka", label: "Apache Kafka", icon: <Mark src="/icons/apache-kafka.svg" variant="mono" /> },
  { id: "datadog", label: "Datadog", src: "/icons/datadog.svg" },
  { id: "hubspot", label: "HubSpot", src: "/icons/hubspot.svg" },
  { id: "slack", label: "Slack", src: "/icons/slack.svg" },
  { id: "github", label: "GitHub", icon: <Mark src="/icons/github.svg" variant="mono" /> },
  { id: "jira", label: "Jira", src: "/icons/jira.svg" },
];

/** One pulse starts every 300 ms, so the eleven beams fill the 3.2 s travel time. */
const beams: BeamLink[] = [
  { from: "n8n", to: "app" },
  { from: "langgraph", to: "app", delay: 300 },
  { from: "openai", to: "app", delay: 600 },
  { from: "pinecone", to: "app", delay: 900 },
  { from: "redis", to: "app", delay: 1200, reverse: true },
  { from: "kafka", to: "app", delay: 1500 },
  { from: "datadog", to: "app", delay: 1800 },
  { from: "hubspot", to: "app", delay: 2100 },
  { from: "slack", to: "app", delay: 2400 },
  { from: "github", to: "app", delay: 2700 },
  { from: "jira", to: "app", delay: 3000, reverse: true },
];

/**
 * Hub-and-spoke integration diagram with a pulse travelling along each beam.
 * Eleven spokes crowd the 16:10 box on phones, so below `sm` the nodes shrink to
 * `sm` and the labels drop to screen-reader only, which also halves the bow
 * (curvature is in px, so 80 would swallow the whole box at that size).
 */
export function ConnectedTools() {
  const compact = useMediaQuery("(max-width: 639px)");

  return (
    <AnimatedBeam
      nodes={nodes}
      beams={beams}
      center="app"
      layout="hub"
      size={compact ? "sm" : "md"}
      tone="spectrum"
      curvature={compact ? 40 : 80}
      // 11 spokes need a taller box on phones or the side nodes touch.
      className={compact ? "aspect-[4/3]" : undefined}
    >
      <AnimatedBeamBeams />
      <AnimatedBeamNodes label="Integrations" showLabels={!compact} />
    </AnimatedBeam>
  );
}

export default ConnectedTools;
