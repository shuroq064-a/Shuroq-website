import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/service-detail-page";
import { serviceDetails } from "@/components/services/service-detail-content";

export const metadata: Metadata = {
  title: "Data Engineering & Analytics — Shuroq",
  description:
    "Build trusted data pipelines, warehouses, integrations, analytics, and business intelligence with Shuroq.",
};

export default function DataAnalyticsPage() {
  return <ServiceDetailPage service={serviceDetails["data-analytics"]} />;
}
