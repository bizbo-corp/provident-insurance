"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The review content scrolls inside its own panel on wide screens, which Next.js
 * doesn't reset between pages. Back to the top on each new page, unless the
 * address points at a section.
 */
export function ScrollReset({ targetId }: { targetId: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    document.getElementById(targetId)?.scrollTo({ top: 0 });
  }, [pathname, targetId]);
  return null;
}
