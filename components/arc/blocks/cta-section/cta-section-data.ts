import { avatar, type PersonId } from "../../lib/media";

export interface CtaAction {
  label: string;
  /** Renders a link. */
  href?: string;
  onClick?: () => void;
  /** With no href or onClick, the button confirms in place with this label, which suits previews. */
  confirmedLabel?: string;
}

export const ctaCopy = {
  centered: {
    title: "Start with a conversation",
    description: "Tell us what your team is trying to ship, and where the current way of working gets in the way.",
    primary: { label: "Talk to our team", confirmedLabel: "Message sent" },
    secondary: { label: "See our services", confirmedLabel: "Opening services" },
    note: "A reply within one working day",
  },
  split: {
    title: "Your team, set up before lunch",
    description: "Import your projects, bring everyone in, and keep working the way you already do.",
    primary: { label: "Create a workspace", confirmedLabel: "Workspace created" },
    secondary: { label: "Book a demo", confirmedLabel: "Demo requested" },
    points: ["Import from any tracker in one step", "Single sign-on and audit logs included", "Cancel anytime from settings"],
  },
  banner: {
    title: "Workflows are here",
    description: "Automate handoffs between teams with no code.",
    primary: { label: "See how it works", confirmedLabel: "Opened" },
  },
} satisfies Record<string, { title: string; description: string; primary: CtaAction; secondary?: CtaAction; note?: string; points?: string[] }>;

/** Faces for the social proof line in the centered variant. */
export const ctaFaces = (["sofia-ramirez", "nathan-cole", "chloe-nguyen", "tyler-hayes"] as PersonId[]).map(id => avatar(id));

/** Sample content for the split variant's setup card. */
export const ctaSetup = {
  workspace: "delivery-platform",
  steps: ["Create the platform", "Connect your services", "Invite the engineering teams"],
  faces: (["emma-collins", "marcus-johnson", "jasmine-brooks", "daniel-kim"] as PersonId[]).map(id => avatar(id)),
};
