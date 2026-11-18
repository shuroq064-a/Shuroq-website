import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/service-detail-page";
import { serviceDetails } from "@/components/services/service-detail-content";

export const metadata: Metadata = {
  title: "Quality Assurance Engineering — Shuroq",
  description:
    "Functional, performance, security, API, mobile, and automation testing built into the software lifecycle.",
};

export default function AssurancePage() {
  return <ServiceDetailPage service={serviceDetails.assurance} />;
}
