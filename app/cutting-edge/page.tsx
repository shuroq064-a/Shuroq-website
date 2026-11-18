import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/service-detail-page";
import { serviceDetails } from "@/components/services/service-detail-content";

export const metadata: Metadata = {
  title: "Cutting Edge Digital Services — Shuroq",
  description:
    "Modernize enterprise systems and build digital products, cloud services, and business platforms with Shuroq.",
};

export default function CuttingEdgePage() {
  return <ServiceDetailPage service={serviceDetails["cutting-edge"]} />;
}
