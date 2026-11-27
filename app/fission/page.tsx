import type { Metadata } from "next";

import FissionPage from "@/components/marketplace/fission-page";

export const metadata: Metadata = {
  title: "Fission · AI Marketplace · Shuroq",
  description:
    "Fission matches you with vetted professionals instantly: transparent pricing, seamless booking, and a marketplace built for people who ship.",
};

export default function FissionRoute() {
  return <FissionPage />;
}
