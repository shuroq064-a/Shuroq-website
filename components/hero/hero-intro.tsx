"use client";

import * as React from "react";

const HEADLINE_PHRASES = [
  "We build platforms that scale",
  "Intelligent automation at enterprise scale",
  "Cloud-native from the ground up",
  "Reliability without the downtime",
  "Modernise the core of your business",
  "Turning data into decisions you trust",
];

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Headline typed out in the Caveat handwriting font, cycling through sentences. */
export function HeroHeadline() {
  const reducedMotion = usePrefersReducedMotion();
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reducedMotion) return;

    const phrase = HEADLINE_PHRASES[phraseIndex];
    const isComplete = typed === phrase;

    const delay = deleting ? 22 : isComplete ? 2200 : 58;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (!isComplete) {
          setTyped(phrase.slice(0, typed.length + 1));
        } else {
          setDeleting(true);
        }
        return;
      }

      if (typed.length > 0) {
        setTyped(phrase.slice(0, typed.length - 1));
      } else {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % HEADLINE_PHRASES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typed, deleting, phraseIndex, reducedMotion]);

  const visibleText = reducedMotion ? HEADLINE_PHRASES[0] : typed;

  return (
    <h1 className="hero-headline">
      <span className="sr-only">
        {HEADLINE_PHRASES.join(". ")}
      </span>
      <span className="hero-headline-text" aria-hidden="true">
        {visibleText}
        {!reducedMotion && (
          <span className="hero-headline-caret" />
        )}
      </span>
    </h1>
  );
}

