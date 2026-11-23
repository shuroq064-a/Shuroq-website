import type { Metadata } from "next";

import { IndustryPage } from "@/components/industry/industry-page";
import { getIndustry, industries } from "@/components/industry/industry-data";

const industry = getIndustry("finance")!;

export const metadata: Metadata = {
  title: "Finance — Industries — Shuroq",
  description: industry.heroLead,
};

export default function FinancePage() {
  return (
    <IndustryPage
      industry={industry}
      related={industries.filter((item) => item.slug !== industry.slug)}
    />
  );
}
