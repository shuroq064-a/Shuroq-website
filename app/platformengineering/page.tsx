import type { Metadata } from "next";
import PlatformServicePage from "@/components/services/platform-service-page";
import { platformServiceDetails } from "@/components/services/platform-service-content";

export const metadata: Metadata = {
  title: "Platform Engineering — Shuroq",
  description:
    "Internal developer platforms, Backstage portals, CI/CD and progressive delivery that accelerate engineering velocity. Platform engineering with Shuroq.",
};

export default function PlatformEngineeringPage() {
  return (
    <PlatformServicePage service={platformServiceDetails["platform-engineering"]} />
  );
}
