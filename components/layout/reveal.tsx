"use client";

import { useEffect, useRef, useState } from "react";

/** Fades content in the first time it enters the viewport, as ScrollReveal does on live. */
export function Reveal({ className, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-revealed={revealed}
      className={`reveal ${className ?? ""}`}
      {...props}
    />
  );
}
