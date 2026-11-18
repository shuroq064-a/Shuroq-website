import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/service-detail-page";
import { serviceDetails } from "@/components/services/service-detail-content";

export const metadata: Metadata = {
  title: "Automation & DevOps Services — Shuroq",
  description:
    "Automate software delivery, infrastructure, and repeatable business workflows with Shuroq.",
};

export default function AutomatePage() {
  return <ServiceDetailPage service={serviceDetails.automate} />;
}
