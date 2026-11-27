import type { Metadata } from "next";

import ManagedKubernetesPage from "@/components/marketplace/managed-kubernetes-page";

export const metadata: Metadata = {
  title: "Managed Services for Kubernetes · Shuroq",
  description:
    "Shuroq runs your Kubernetes platform: cluster operations, security and compliance, reliability engineering, and performance and cost — with three engagement models.",
};

export default function ManagedKubernetesRoute() {
  return <ManagedKubernetesPage />;
}
