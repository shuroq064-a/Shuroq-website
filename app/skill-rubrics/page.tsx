import type { Metadata } from "next";

import SkillRubricsPage from "@/components/resources/skill-rubrics-page";

export const metadata: Metadata = {
  title: "Skill Rubrics · Shuroq",
  description:
    "Role-based cloud-native skill rubrics for SRE, platform engineers, Kubernetes engineers and DevOps engineers — hire, evaluate and grow with clear proficiency levels.",
};

export default function SkillRubricsRoute() {
  return <SkillRubricsPage />;
}
