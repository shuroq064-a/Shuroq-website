import type { Metadata } from "next";

import { CloudNativePage } from "@/components/services/cloud-native-page";

export const metadata: Metadata = {
  title: "Cloud Native Product Development — Shuroq",
  description:
    "Resilient, scalable products built for the cloud era: container orchestration, cloud-native architecture, CI/CD, service mesh, API gateways and observability.",
};

export default function Page() {
  return <CloudNativePage />;
}
