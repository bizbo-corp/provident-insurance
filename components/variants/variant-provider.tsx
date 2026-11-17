"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { serialiseVariant, VARIANT_COOKIE, type FeatureId } from "@/lib/variants";

type VariantContextValue = {
  enabled: FeatureId[];
  setEnabled: (features: FeatureId[]) => void;
};

const VariantContext = createContext<VariantContextValue>({
  enabled: [],
  setEnabled: () => {},
});

export function VariantProvider({
  initial,
  children,
}: {
  initial: FeatureId[];
  children: React.ReactNode;
}) {
  const [enabled, setEnabledState] = useState(initial);

  const setEnabled = useCallback((features: FeatureId[]) => {
    setEnabledState(features);
    document.cookie = `${VARIANT_COOKIE}=${serialiseVariant(features)}; path=/; samesite=lax`;
    // Drop any ?v= from the address bar so a refresh keeps this choice.
    const url = new URL(window.location.href);
    url.searchParams.delete("v");
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const value = useMemo(() => ({ enabled, setEnabled }), [enabled, setEnabled]);
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}

export function useVariants() {
  return useContext(VariantContext);
}

/** True when this change is switched on. Everything defaults to the live baseline. */
export function useFeature(id: FeatureId) {
  return useContext(VariantContext).enabled.includes(id);
}

/** Renders `children` only in the after state, or `before` otherwise. */
export function Feature({
  id,
  before = null,
  children,
}: {
  id: FeatureId;
  before?: React.ReactNode;
  children: React.ReactNode;
}) {
  return <>{useFeature(id) ? children : before}</>;
}
