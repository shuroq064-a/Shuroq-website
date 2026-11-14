"use client";

/**
 * The contact panels, wired to Shuroq's real channels.
 *
 * The Arc block is a client component, so the submit handler lives here
 * rather than on the server-rendered page.
 */
import { Mail, MapPin, Phone } from "lucide-react";
import {
  ContactSection,
  type ContactChannel,
  type ContactMessage,
} from "@/components/arc/blocks/contact-section/contact-section";

const ICON = { size: 18, strokeWidth: 1.75, "aria-hidden": true } as const;

const OFFICE_ADDRESS = [
  "AWFIS, Hi-tech City, N Heights",
  "Plot No. 38, Siddiq Nagar, Gachibowli",
  "Hyderabad, Telangana 500081",
  "India",
];

const MAPS_QUERY =
  "Awfis+Hitech+City+N+Heights,+Siddiq+Nagar,+Gachibowli,+Hyderabad,+Telangana+500081";

const channels: ContactChannel[] = [
  {
    value: "email",
    label: "Email",
    meta: "Replies within one business day",
    icon: <Mail {...ICON} />,
    detail: (
      <>
        <h3>Email</h3>
        <p>
          Write to us with the problem you are trying to solve. We read every
          message and route it to the engineer who knows that part of the stack.
        </p>
        <a className="body" href="mailto:contact@shuroq.com">
          contact@shuroq.com
        </a>
      </>
    ),
  },
  {
    value: "phone",
    label: "Phone",
    meta: "Mon to Fri, 09:00 to 18:00 IST",
    icon: <Phone {...ICON} />,
    detail: (
      <>
        <h3>Phone</h3>
        <p>
          The Hyderabad desk answers calls during working hours. Outside those
          hours, email reaches us first thing the next morning.
        </p>
        <a className="body" href="tel:+918983140094">
          +91 89831 40094
        </a>
      </>
    ),
  },
  {
    value: "office",
    label: "Hyderabad",
    meta: "AWFIS, Hi-tech City",
    icon: <MapPin {...ICON} />,
    detail: (
      <>
        <h3>Hyderabad</h3>
        <p>
          Our engineering office sits in the AWFIS tower at Hi-tech City. Let us
          know before you visit so someone is free to meet you.
        </p>
        <div className="body">
          {OFFICE_ADDRESS.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
        <a
          className="btn btn-pill btn-black"
          href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
          target="_blank"
          rel="noreferrer"
        >
          Get directions
        </a>
      </>
    ),
  },
];

/** The form: it posts to the site route and springs into a confirmation. */
export function ContactFormSection() {
  return (
    <ContactSection
      variant="form"
      title="Tell us what you are building"
      description="Modernising operations, automating workflows or replacing a system that no longer scales. A sentence is enough to start."
      topics={["New business", "Partnerships", "Support", "Careers"]}
      onSubmit={async (message: ContactMessage) => {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message),
        });
        if (!response.ok) throw new Error("Could not send");
      }}
    />
  );
}

/** The channels: email, phone, office and support hours. */
export function ContactChannelsSection() {
  return (
    <ContactSection
      variant="channels"
      title="Reach us directly"
      description="Four ways in. They all land with the same small team."
      channels={channels}
      defaultChannel="email"
    />
  );
}
