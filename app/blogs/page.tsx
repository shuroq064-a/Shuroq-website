import type { Metadata } from "next";

import BlogsPage from "@/components/resources/blogs-page";

export const metadata: Metadata = {
  title: "Blogs · Shuroq",
  description:
    "Insights and engineering notes from the Shuroq teams: product engineering, platform engineering, SRE, DevSecOps and observability.",
};

export default function BlogsRoute() {
  return <BlogsPage />;
}
