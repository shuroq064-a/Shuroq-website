"use client";

import { useEffect } from "react";
import styles from "./services-page.module.css";

export default function ServicesMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(`.${styles.page}`);
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = page.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(styles.visible));
      return;
    }

    page.dataset.motionReady = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -48px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
