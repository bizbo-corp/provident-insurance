"use client";

import { useState } from "react";
import { ChoiceGroup } from "@/components/quote/quote-question";

const OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export function ChoiceGroupPreview() {
  const [value, setValue] = useState<string | null>("no");
  return <ChoiceGroup options={OPTIONS} value={value} onChange={setValue} />;
}
