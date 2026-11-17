"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tick boxes on /review/testimonials. Ticked testimonials show on the site,
 * unticked ones are hidden straight away (saved in Redis, read on every page view).
 */
type State = { status: "loading" | "ready" | "off"; hidden: Set<string> };
let state: State = { status: "loading", hidden: new Set() };
let started = false;
const listeners = new Set<() => void>();
const emit = (next: State) => {
  state = next;
  listeners.forEach((listener) => listener());
};
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

function load() {
  if (started) return;
  started = true;
  fetch("/api/testimonials", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) return emit({ status: "off", hidden: new Set() });
      const body = (await response.json()) as { hidden: string[] };
      emit({ status: "ready", hidden: new Set(body.hidden) });
    })
    .catch(() => emit({ status: "off", hidden: new Set() }));
}

async function setShown(id: string, shown: boolean) {
  const previous = state.hidden;
  const hidden = new Set(previous);
  if (shown) hidden.delete(id);
  else hidden.add(id);
  emit({ ...state, hidden });
  const response = await fetch("/api/testimonials", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, shown }),
  }).catch(() => null);
  if (!response?.ok) emit({ ...state, hidden: previous });
  return Boolean(response?.ok);
}

export function TestimonialPick({ id, page, children }: { id: string; page: string; children: ReactNode }) {
  const current = useSyncExternalStore(subscribe, () => state, () => state);
  const [error, setError] = useState(false);
  useEffect(load, []);
  const shown = !current.hidden.has(id);
  const disabled = current.status !== "ready";

  return (
    <li className="bz-cell bz-pick p-5" data-shown={shown}>
      <label className={cn("bz-pick__toggle", disabled && "bz-pick__toggle--off")}>
        <input
          type="checkbox"
          className="bz-check"
          checked={shown}
          disabled={disabled}
          onChange={async (event) => setError(!(await setShown(id, event.target.checked)))}
        />
        <span className="font-semibold">{shown ? `Showing on the ${page}` : `Hidden from the ${page}`}</span>
        <span className="bz-muted text-xs">
          {current.status === "loading" && "Loading…"}
          {current.status === "off" && "Can't save here: the Redis connection isn't set up"}
          {current.status === "ready" && (error ? "Couldn't save, please try again" : "Changes show on the site straight away")}
        </span>
      </label>
      <div className="bz-pick__body">{children}</div>
    </li>
  );
}
