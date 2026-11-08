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
 * Brand marks self-hosted from thesvg.org (`/icons/<name>/default.svg`), so the
 * diagram keeps its colours offline and never waits on a third-party CDN.
 * Order matters: satellites are placed clockwise from 12 o'clock.
 *
 * The hub is a monogram rather than the full logo: at 64px the illustrated
 * globe turns to mush. GitHub's mark is near-black, so it is inverted to white
 * on the dark theme — everything else is a colour mark that reads on both.
 */
const nodes: AnimatedBeamNode[] = [
  {
    id: "app",
    label: "Your app",
    icon: (
      <span
        aria-hidden="true"
        className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-foreground"
      >
        S
      </span>
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
  { id: "linear", label: "Linear", src: "/icons/linear.svg" },
  { id: "stripe", label: "Stripe", src: "/icons/stripe.svg" },
  { id: "dropbox", label: "Dropbox", src: "/icons/dropbox.svg" },
  { id: "hubspot", label: "HubSpot", src: "/icons/hubspot.svg" },
  { id: "drive", label: "Google Drive", src: "/icons/google-drive.svg" },
];

const beams: BeamLink[] = [
  { from: "slack", to: "app" },
  { from: "figma", to: "app", delay: 400 },
  { from: "github", to: "app", delay: 800 },
  { from: "linear", to: "app", delay: 1200 },
  { from: "stripe", to: "app", delay: 1600, reverse: true },
  { from: "dropbox", to: "app", delay: 2000 },
  { from: "hubspot", to: "app", delay: 2400 },
  { from: "drive", to: "app", delay: 2800, reverse: true },
];

/**
 * Hub-and-spoke integration diagram with a pulse travelling along each beam.
 * Eight spokes crowd the 16:10 box on phones, so below `sm` the nodes shrink to
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
    >
      <AnimatedBeamBeams />
      <AnimatedBeamNodes label="Integrations" showLabels={!compact} />
    </AnimatedBeam>
  );
}

export default ConnectedTools;
