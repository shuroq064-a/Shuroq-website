import type { Metadata } from "next";
import PlatformServicePage from "@/components/services/platform-service-page";
import { platformServiceDetails } from "@/components/services/platform-service-content";

export const metadata: Metadata = {
  title: "DevSecOps — Shuroq",
  description:
    "Secure SDLC, CI/CD security guardrails, runtime security and security operations that integrate security into the delivery lifecycle without slowing it down.",
};

export default function DevSecOpsPage() {
  return <PlatformServicePage service={platformServiceDetails["devsec-ops"]} />;
}
