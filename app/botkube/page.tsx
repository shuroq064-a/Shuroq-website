import type { Metadata } from "next";

import BotkubePage from "@/components/marketplace/botkube-page";

export const metadata: Metadata = {
  title: "Botkube Enterprise · Shuroq",
  description:
    "Botkube Enterprise implemented and operated by Shuroq: governed ChatOps for Kubernetes, alert intelligence, least-privilege command execution and incident runbooks.",
};

export default function BotkubeRoute() {
  return <BotkubePage />;
}
