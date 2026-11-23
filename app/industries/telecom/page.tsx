import type { Metadata } from "next";

import { IndustryPage } from "@/components/industry/industry-page";
import { getIndustry, industries } from "@/components/industry/industry-data";

const industry = getIndustry("telecom")!;

export const metadata: Metadata = {
  title: "Telecom — Industries — Shuroq",
  description: industry.heroLead,
};

export default function TelecomPage() {
  return (
    <IndustryPage
      industry={industry}
      related={industries.filter((item) => item.slug !== industry.slug)}
    />
  );
}
