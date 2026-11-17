"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * How many questions are answered on the screen on show, so the progress bar
 * fills as each one is answered rather than only when the screen changes.
 */
let current: { slug: string; answered: number } = { slug: "", answered: 0 };
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Called by each quote screen with its answered count. */
export function useReportAnswers(slug: string, answered: number) {
  useEffect(() => {
    current = { slug, answered };
    listeners.forEach((listener) => listener());
  }, [slug, answered]);
}

/** The answered count for this screen, or null before the screen has reported. */
export function useAnswered(slug: string) {
  const value = useSyncExternalStore(subscribe, () => current, () => current);
  return value.slug === slug ? value.answered : null;
}
