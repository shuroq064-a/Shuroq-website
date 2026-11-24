import type { Metadata } from "next";

import { ProductEngineeringPage } from "@/components/services/product-engineering-page";

export const metadata: Metadata = {
  title: "Product Engineering Services — Shuroq",
  description:
    "Enterprise software built around the people who use it: custom applications, CRM and ERP, SaaS products, APIs, automation and cloud-native development.",
};

export default function Page() {
  return <ProductEngineeringPage />;
}
