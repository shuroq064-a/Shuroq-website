import type { Metadata } from "next";

import EventsPage from "@/components/resources/events-page";

export const metadata: Metadata = {
  title: "Events · Shuroq",
  description:
    "Community events on cloud-native engineering, DevOps, platform reliability and AI-enabled delivery — talks, workshops and the Shuroq Build Sprint.",
};

export default function EventsRoute() {
  return <EventsPage />;
}
