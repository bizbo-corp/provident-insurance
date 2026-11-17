"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A thumbnail that opens the full image in a modal. Uses the native <dialog>,
 * so Escape closes it and focus is kept inside while it's open.
 */
export function LightboxImage({
  src,
  alt,
  caption,
  className,
  thumbClassName,
  tall = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  thumbClassName?: string;
  /** A long page: the enlarged view scrolls instead of shrinking to fit the screen. */
  tall?: boolean;
  width?: number;
  height?: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={cn("bz-lightbox-thumb group relative block w-full cursor-zoom-in", className)}
        aria-label={`Enlarge: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={width} height={height} loading="lazy" className={cn("block h-auto w-full", thumbClassName)} />
        <span className="bz-lightbox-hint" aria-hidden="true">
          Enlarge
        </span>
      </button>
      <dialog
        ref={dialog}
        className="bz-lightbox"
        aria-label={alt}
        onClick={(event) => {
          // A click on the backdrop (the dialog itself, not its contents) closes it.
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <figure className="flex max-h-full flex-col">
          <div className={cn("min-h-0 flex-1", tall && "max-h-[calc(100vh-120px)] overflow-auto")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className={cn(
                "mx-auto block h-auto max-w-full",
                tall ? "w-[min(100%,960px)]" : "max-h-[calc(100vh-120px)] w-auto object-contain"
              )}
            />
          </div>
          <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm">
            <span>{caption ?? alt}</span>
            <button type="button" className="bz-btn bz-btn--ghost bz-btn--sm shrink-0" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
