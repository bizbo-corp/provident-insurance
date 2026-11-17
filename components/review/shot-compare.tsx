"use client";

import { useState } from "react";
import { OptionalBadge } from "@/components/review/badges";
import { LightboxImage } from "@/components/review/lightbox";
import type { ReviewShot } from "@/content/review";
import { SHOT_SIZES } from "@/content/review-shots";
import { cn } from "@/lib/utils";

type Device = "d" | "m";

function Shot({ id, device, state, tall }: { id: string; device: Device; state: "before" | "after"; tall?: boolean }) {
  const name = `${id}-${device}-${state}`;
  const [width, height] = SHOT_SIZES[name] ?? [0, 0];
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2">
        <span className={cn("bz-state", state === "before" ? "bz-state--before" : "bz-state--after")}>
          {state === "before" ? "Before" : "After"}
          <small>{state === "before" ? "/ live site" : "/ version 2"}</small>
        </span>
      </figcaption>
      <div
        className={cn(
          "overflow-auto rounded-[2px]",
          state === "before" ? "bz-shot--before" : "bz-shot--after",
          tall && "max-h-[640px]",
          device === "m" && "mx-auto max-w-[390px]"
        )}
      >
        <LightboxImage
          src={`/review/${name}.webp`}
          width={width}
          height={height}
          tall={tall || device === "m"}
          alt={`${state === "before" ? "Before" : "After"}: ${id.replace(/-/g, " ")}, ${device === "d" ? "desktop" : "mobile"}`}
          caption={`${state === "before" ? "Before / live site" : "After / version 2"}`}
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
          {(shots.length > 1 || shot.optional || shot.note) && (
            <div className="mb-3">
              <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                {shot.caption}
                {shot.optional && <OptionalBadge />}
              </p>
              {shot.note && <p className="bz-muted mt-1 max-w-3xl text-sm leading-relaxed">{shot.note}</p>}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Shot id={shot.id} device={device} state="before" tall={shot.tall} />
            <Shot id={shot.id} device={device} state="after" tall={shot.tall} />
          </div>
        </div>
      ))}
    </div>
  );
}
