import type { Metadata } from "next";
import PlatformServicePage from "@/components/services/platform-service-page";
import { platformServiceDetails } from "@/components/services/platform-service-content";

export const metadata: Metadata = {
  title: "CI/CD & Dev Experience — Shuroq",
  description:
    "Fast, reliable CI/CD pipelines, progressive delivery with canaries and feature flags, and developer tooling that shortens the path from idea to running service.",
};

export default function CicdDevPage() {
  return <PlatformServicePage service={platformServiceDetails["ci-cd-dev"]} />;
}
