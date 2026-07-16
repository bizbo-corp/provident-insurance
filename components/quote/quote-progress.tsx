"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SectionProgressContextValue = {
  /** How far through the current step the user is, 0..1. */
  progress: number;
  setProgress: (value: number) => void;
};

const SectionProgressContext = createContext<SectionProgressContextValue>({
  progress: 0,
  setProgress: () => {},
});

/**
 * Lets a step's page report its own completion up to the stepper in the layout,
 * so the current step's bar fills as questions get answered.
 */
export function QuoteProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const value = useMemo(() => ({ progress, setProgress }), [progress]);

  return (
    <SectionProgressContext.Provider value={value}>
      {children}
    </SectionProgressContext.Provider>
  );
}

export function useSectionProgress() {
  return useContext(SectionProgressContext).progress;
}

/**
 * Reports the current step's completion fraction. Resets to 0 on unmount so a
 * step that doesn't report progress doesn't inherit the previous step's value.
 */
export function useReportSectionProgress(value: number) {
  const { setProgress } = useContext(SectionProgressContext);
  const reset = useCallback(() => setProgress(0), [setProgress]);

  useEffect(() => {
    setProgress(value);
    return reset;
  }, [value, setProgress, reset]);
}
