"use client";

import { CardStack } from "@/components/arc/card-stack/card-stack";
import styles from "./platform-service-page.module.css";

export type UseCase = {
  title: string;
  description: string;
};

/**
 * CardStack is a client component and needs callbacks, which cannot cross a
 * server-to-client boundary. This wrapper keeps those callbacks on the client
 * and leaves the page component free to stay a server component.
 */
export function UseCaseDeck({
  items,
  labels,
  outcomes,
  label,
  className,
}: {
  items: UseCase[];
  labels: { left: string; right: string };
  outcomes: { left: string; right: string };
  label: string;
  className?: string;
}) {
  return (
    <CardStack
      items={items}
      getKey={(item) => item.title}
      getLabel={(item) => item.title}
      labels={labels}
      outcomes={outcomes}
      label={label}
      className={className}
      renderCard={(item) => (
        <div className={styles.useCaseCard}>
          <span className={styles.useCaseIndex}>
            {String(items.indexOf(item) + 1).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      )}
    />
  );
}
