import { cn } from "@/lib/utils";

/**
 * A five-segment meter for a 0 to 5 rating, filled proportionally (3.2 is
 * three full segments and a fifth of the fourth). One neutral colour: the
 * number beside it carries the reading, the meter only shows its size.
 */
export function ScoreMeter({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("bz-meter", className)} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <span key={index} className="bz-meter-seg">
          <span style={{ width: `${Math.min(Math.max(value - index, 0), 1) * 100}%` }} />
        </span>
      ))}
    </span>
  );
}
