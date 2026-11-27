"use client";

import { useMemo, useState } from "react";

import { Calendar } from "@/components/arc/calendar/calendar";

import { shuroqEvents } from "./events-content";

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const longFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The calendar and the session list share one selection, so picking a day
 * shows what is on it.
 */
export function EventsCalendar() {
  const [selected, setSelected] = useState<Date | null>(null);

  const selectedKey = selected ? dateKey(selected) : null;
  const onDay = useMemo(
    () => shuroqEvents.filter((event) => event.date === selectedKey),
    [selectedKey],
  );

  return (
    <div>
      <Calendar
        showToday
        onChange={(date) => setSelected(date)}
        locale="en-US"
      />
      <div aria-live="polite">
        {selected ? (
          onDay.length > 0 ? (
            <ul style={{ display: "grid", gap: 10, margin: "20px 0 0", padding: 0, listStyle: "none" }}>
              {onDay.map((event) => (
                <li key={event.id}>
                  <strong style={{ display: "block", fontSize: 16, fontWeight: 500 }}>
                    {event.title}
                  </strong>
                  <span style={{ display: "block", marginTop: 4, color: "var(--text-secondary)", fontSize: 14 }}>
                    {event.time} {event.zone} · {event.format}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: "20px 0 0", color: "var(--text-secondary)", fontSize: 15 }}>
              No session on {longFormat.format(new Date(`${selectedKey}T00:00:00Z`))}.
            </p>
          )
        ) : (
          <p style={{ margin: "20px 0 0", color: "var(--text-secondary)", fontSize: 15 }}>
            Pick a day to see what is on.
          </p>
        )}
      </div>
    </div>
  );
}
