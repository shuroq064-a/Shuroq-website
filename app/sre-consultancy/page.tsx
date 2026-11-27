import type { Metadata } from "next";
import PlatformServicePage from "@/components/services/platform-service-page";
import { platformServiceDetails } from "@/components/services/platform-service-content";

export const metadata: Metadata = {
  title: "SRE Consultancy — Shuroq",
  description:
    "SLO and error budget design, incident management, runbooks and reliability roadmaps that move operations from reactive firefighting to proactive reliability engineering.",
};

export default function SreConsultancyPage() {
  return <PlatformServicePage service={platformServiceDetails["sre-consultancy"]} />;
}
