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
 * The hub uses thesvg's `ui:inference` outline mark and is labelled AI Workflow.
 * Its strokes are `currentColor`, which an `<img>` resolves to black, so it is
 * inverted on the dark theme. GitHub's octocat is near-black for the same
 * reason; Notion's is black-on-white page art and reads on both. Everything
 * else is a colour mark.
 */
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
  { id: "slack", label: "Slack", src: "/icons/slack.svg" },
  { id: "figma", label: "Figma", src: "/icons/figma.svg" },
  {
    id: "github",
    label: "GitHub",
    icon: (
      // SVG mark passed straight through; next/image would need dangerouslyAllowSVG.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/github.svg"
        alt=""
        draggable={false}
        className="size-1/2 object-contain select-none dark:invert"
      />
    ),
  },
  { id: "notion", label: "Notion", src: "/icons/notion.svg" },
  { id: "linear", label: "Linear", src: "/icons/linear.svg" },
  { id: "jira", label: "Jira", src: "/icons/jira.svg" },
  { id: "stripe", label: "Stripe", src: "/icons/stripe.svg" },
  { id: "dropbox", label: "Dropbox", src: "/icons/dropbox.svg" },
  { id: "datadog", label: "Datadog", src: "/icons/datadog.svg" },
  { id: "hubspot", label: "HubSpot", src: "/icons/hubspot.svg" },
  { id: "drive", label: "Google Drive", src: "/icons/google-drive.svg" },
];

/** One pulse starts every 300 ms, so the eleven beams fill the 3.2 s travel time. */
const beams: BeamLink[] = [
  { from: "slack", to: "app" },
  { from: "figma", to: "app", delay: 300 },
  { from: "github", to: "app", delay: 600 },
  { from: "notion", to: "app", delay: 900 },
  { from: "linear", to: "app", delay: 1200 },
  { from: "jira", to: "app", delay: 1500 },
  { from: "stripe", to: "app", delay: 1800, reverse: true },
  { from: "dropbox", to: "app", delay: 2100 },
  { from: "datadog", to: "app", delay: 2400 },
  { from: "hubspot", to: "app", delay: 2700 },
  { from: "drive", to: "app", delay: 3000, reverse: true },
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
