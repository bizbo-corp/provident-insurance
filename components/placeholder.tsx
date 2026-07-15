import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Placeholder({
  label = "Image placeholder",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted text-muted-foreground",
        className
      )}
    >
      <ImageIcon className="size-8" aria-hidden="true" />
      <span className="text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
