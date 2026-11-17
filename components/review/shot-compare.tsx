"use client";

import { useState } from "react";
import { OptionalBadge } from "@/components/review/badges";
import type { ReviewShot } from "@/content/review";
import { SHOT_SIZES } from "@/content/review-shots";
import { cn } from "@/lib/utils";

type Device = "d" | "m";

function Shot({ id, device, state, tall }: { id: string; device: Device; state: "before" | "after"; tall?: boolean }) {
  const name = `${id}-${device}-${state}`;
  const [width, height] = SHOT_SIZES[name] ?? [0, 0];
  return (
    <figure className="min-w-0">
      <figcaption className="bz-figlabel mb-2 flex items-center gap-2">
        <span className={cn("bz-pip", state === "after" && "bz-pip--live")} aria-hidden="true" />
        {state === "before" ? "Before / live site" : "After / version 2"}
      </figcaption>
      <div
        className={cn(
          "bz-shot overflow-auto",
          tall && "max-h-[640px]",
          device === "m" && "mx-auto max-w-[390px]"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/review/${name}.webp`}
          width={width}
          height={height}
          loading="lazy"
          alt={`${state === "before" ? "Before" : "After"}: ${id.replace(/-/g, " ")}, ${device === "d" ? "desktop" : "mobile"}`}
          className="block h-auto w-full"
        />
      </div>
    </figure>
  );
}

const DEVICES: { id: Device; label: string }[] = [
  { id: "d", label: "Desktop" },
  { id: "m", label: "Mobile" },
];

/** Before and after side by side, with a desktop or mobile switch. The screenshots are Provident's site, so their frames stay white. */
export function ShotCompare({ shots }: { shots: ReviewShot[] }) {
  const [device, setDevice] = useState<Device>("d");
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Screen size" className="bz-segment">
        {DEVICES.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={device === option.id}
            onClick={() => setDevice(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {shots.map((shot) => (
        <div key={shot.id}>
          {(shots.length > 1 || shot.optional) && (
            <p className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
              {shot.caption}
              {shot.optional && <OptionalBadge />}
            </p>
          )}
          <div className={cn("grid gap-6", device === "m" && "sm:grid-cols-2")}>
            <Shot id={shot.id} device={device} state="before" tall={shot.tall} />
            <Shot id={shot.id} device={device} state="after" tall={shot.tall} />
          </div>
        </div>
      ))}
    </div>
  );
}
