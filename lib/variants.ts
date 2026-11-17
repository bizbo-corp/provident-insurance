/**
 * Before/after switches. "Before" is the live baseline. With no choice made,
 * the site shows "after" (every change), so the newest version is the default. Each change has its own id, so it can be shown alone or with others.
 */
export const FEATURES = [
  { id: "neutral-panels", label: "01 Neutral info panels" },
  { id: "social-proof", label: "02 Social proof in the hero" },
  { id: "button-hierarchy", label: "03 Button hierarchy" },
  { id: "progress-steps", label: "04 Labelled progress steps" },
  { id: "benefits-table", label: "Benefits table categories" },
  { id: "google-reviews", label: "Google reviews section" },
] as const;

export type FeatureId = (typeof FEATURES)[number]["id"];

export const ALL_FEATURES: FeatureId[] = FEATURES.map((feature) => feature.id);

/** Renamed when the default changed to "after", so older saved choices are ignored. */
export const VARIANT_COOKIE = "provident-variant-v2";
export const VARIANT_HEADER = "x-provident-variant";

/** Accepts "before", "after", or a comma-separated list of feature ids. */
export function parseVariant(value?: string | null): FeatureId[] {
  if (!value) return ALL_FEATURES;
  if (value === "before") return [];
  if (value === "after") return ALL_FEATURES;
  const requested = value.split(",");
  return ALL_FEATURES.filter((id) => requested.includes(id));
}

export function serialiseVariant(enabled: FeatureId[]) {
  if (enabled.length === 0) return "before";
  if (enabled.length === ALL_FEATURES.length) return "after";
  return enabled.join(",");
}
