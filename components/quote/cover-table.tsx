import { CheckCircle2, Minus } from "lucide-react";
import { coverMatrix, coverTiers, type CoverStatus, type CoverTierId } from "@/content/quote";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<CoverStatus, string> = {
  included: "Included",
  optional: "Optional add-on",
  none: "Not covered",
};

function StatusIcon({ status, className = "size-5" }: { status: CoverStatus; className?: string }) {
  if (status === "none") return <Minus className={cn(className, "text-black/30")} aria-hidden="true" />;
  return (
    <CheckCircle2
      aria-hidden="true"
      className={cn(className, status === "included" ? "text-quote-success" : "text-quote-info")}
    />
  );
}

export function CoverTable({ selected }: { selected: CoverTierId }) {
  const cellClass = (tierId: CoverTierId) => cn("px-2", tierId === selected && "bg-quote-notice");
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-black/15 text-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-quote-track/50 text-left">
            <th scope="col" className="w-1/2 px-3 py-3 font-normal">What&rsquo;s covered</th>
            {coverTiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                className={cn(
                  "border-t-2 border-transparent py-3 text-center text-xs",
                  cellClass(tier.id),
                  tier.id === selected && "border-quote-accent"
                )}
              >
                {tier.shortName}
                <span className="block font-normal text-quote-muted">{tier.annual}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coverMatrix.map((row) => (
            <tr key={row.label} className="border-t border-black/10">
              <th scope="row" className="px-3 py-3 text-left font-normal">{row.label}</th>
              {row.statuses.map((status, index) => (
                <td key={coverTiers[index].id} className={cellClass(coverTiers[index].id)}>
                  <span className="flex justify-center">
                    <StatusIcon status={status} />
                    <span className="sr-only">{STATUS_LABELS[status]}</span>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 border-t border-black/10 bg-quote-track/50 px-3 py-2 text-xs text-quote-muted">
        {(Object.keys(STATUS_LABELS) as CoverStatus[]).map((status) => (
          <span key={status} className="flex items-center gap-1">
            <StatusIcon status={status} className="size-4" />
            {STATUS_LABELS[status]}
          </span>
        ))}
      </div>
    </div>
  );
}
