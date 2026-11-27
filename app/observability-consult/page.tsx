import type { Metadata } from "next";
import PlatformServicePage from "@/components/services/platform-service-page";
import { platformServiceDetails } from "@/components/services/platform-service-content";

export const metadata: Metadata = {
  title: "Observability — Shuroq",
  description:
    "Telemetry strategy, SLO and alerting models, and an adoption playbook that turn metrics, logs and traces into a measurable engineering capability.",
};

export default function ObservabilityPage() {
  return (
    <PlatformServicePage service={platformServiceDetails["observability-consult"]} />
  );
}
